import { adminDb } from "./lib/firebase-admin";

async function main() {
  try {
    const snap = await adminDb.collection('bootcamps').get();
    console.log("Bootcamps found:", snap.size);
    snap.docs.forEach(doc => {
      console.log(doc.id, "=>", doc.data().slug);
    });
  } catch (e) {
    console.error(e);
  }
}
main();
