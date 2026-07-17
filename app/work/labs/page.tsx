import { Metadata } from 'next';
import { adminDb } from '@/lib/firebase-admin';
import LabsClient from './LabsClient';

export async function generateMetadata(): Promise<Metadata> {
  let meta = {
    title: 'Botmartz Labs | AI Experiments & Open Source',
    description: 'Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems.',
  };
  
  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("labs").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.metadata) {
        meta = { ...meta, ...data.metadata };
      }
    }
  } catch (e) {}

  return {
    ...meta,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: 'https://botmartz.com/work/labs',
      type: 'website',
    },
  };
}

export default async function LabsPage() {
  let initialLabs: any[] = [];
  try {
    const labsRef = adminDb.collection("labs");
    const snapshot = await labsRef.where("status", "==", "active").orderBy("createdAt", "desc").get();
    initialLabs = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null,
        updatedAt: data.updatedAt ? new Date(data.updatedAt.toDate()).toISOString() : null,
      };
    });
  } catch (e) {
    try {
      const fallbackSnapshot = await adminDb.collection("labs").get();
      initialLabs = fallbackSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : null,
            updatedAt: data.updatedAt ? new Date(data.updatedAt.toDate()).toISOString() : null,
          };
        })
        .filter((d: any) => d.status === "active");
    } catch (err) {
      console.error("Error fetching labs:", err);
    }
  }

  let heroContent = {
    badge: "BOTMARTZ LABS",
    title: "Building Today.<br /><span class=\"text-[#00C6FF]\">Engineering</span> Tomorrow.",
    subtitle: "Our labs is where we experiment, build, and open source production-ready AI systems that solve real problems. Every project is built with a focus on performance, scalability, and real-world impact.",
    ctaText: "Explore All Projects",
    ctaLink: "#labs-grid"
  };

  try {
    const docSnap = await adminDb.collection("dynamic_pages").doc("labs").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.hero) {
        heroContent = { ...heroContent, ...data.hero };
      }
    }
  } catch (e) {}

  return (
    <main className="bg-[#F5F8FC] min-h-screen">
      <LabsClient initialLabs={initialLabs} heroContent={heroContent} />
    </main>
  );
}
