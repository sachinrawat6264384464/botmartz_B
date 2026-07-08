"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { CaseStudy } from "@/types/admin";
import CaseStudiesTab from "./CaseStudiesTab";
import CaseStudyEditorModal from "./Components/caseStudyEditor";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);

  // Fetch case studies
  useEffect(() => {
    const q = query(collection(db, "case-studies"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: CaseStudy[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as CaseStudy);
      });
      setCaseStudies(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteCaseStudy = async (id: string) => {
    try {
      await deleteDoc(doc(db, "case-studies", id));
    } catch (error) {
      console.error("Error deleting case study:", error);
      throw error;
    }
  };

  const handleEditCaseStudy = (item: CaseStudy) => {
    setEditingCaseStudy(item);
    setShowEditor(true);
  };

  const handleNewCaseStudy = () => {
    setEditingCaseStudy(null);
    setShowEditor(true);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <CaseStudiesTab
        caseStudies={caseStudies}
        onDeleteCaseStudy={handleDeleteCaseStudy}
        onEditCaseStudy={handleEditCaseStudy}
        onNewCaseStudy={handleNewCaseStudy}
        formatDate={formatDate}
      />

      {showEditor && (
        <CaseStudyEditorModal
          caseStudy={editingCaseStudy}
          onClose={() => {
            setShowEditor(false);
            setEditingCaseStudy(null);
          }}
          onSave={() => {
            setShowEditor(false);
            setEditingCaseStudy(null);
          }}
        />
      )}
    </>
  );
}
