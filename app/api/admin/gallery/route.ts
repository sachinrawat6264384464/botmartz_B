import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const snap = await adminDb.collection("gallery_images").orderBy("createdAt", "desc").get();
    const images = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, caption, imageBase64 } = body;

    if (!title || !imageBase64) {
      return NextResponse.json({ error: "Missing title or image file data" }, { status: 400 });
    }

    // Process Base64 image
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid base64 format" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(matches[2], "base64");
    const fileName = `upload-${Date.now()}.jpg`;
    const outDir = path.resolve(process.cwd(), "public/gallery");

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const filePath = path.join(outDir, fileName);
    fs.writeFileSync(filePath, imageBuffer);

    const stats = fs.statSync(filePath);
    const sizeKb = (stats.size / 1024).toFixed(1);

    const imageUrl = `/gallery/${fileName}`;

    const docData = {
      title,
      category: category || "Events",
      caption: caption || "",
      url: imageUrl,
      sizeKb: `${sizeKb} KB`,
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection("gallery_images").add(docData);

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded and compressed successfully!",
        image: { id: docRef.id, ...docData },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin Gallery Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing image ID" }, { status: 400 });
    }

    const docRef = adminDb.collection("gallery_images").doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.url && data.url.startsWith("/gallery/upload-")) {
        const localPath = path.resolve(process.cwd(), `public${data.url}`);
        if (fs.existsSync(localPath)) {
          try {
            fs.unlinkSync(localPath);
          } catch (e) {
            console.warn("Could not delete local file:", e);
          }
        }
      }
      await docRef.delete();
    }

    return NextResponse.json({ success: true, message: "Photo deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
