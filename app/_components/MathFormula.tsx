"use client";

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  formula: string;
  label?: string;
  className?: string;
}

export default function MathFormula({ formula, label, className = "" }: MathFormulaProps) {
  const renderedHtml = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: true,
        throwOnError: false,
      });
    } catch (e) {
      return formula;
    }
  }, [formula]);

  return (
    <div className={`p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 shadow-inner overflow-x-auto ${className}`}>
      {label && (
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] font-bold mb-2">
          {label}
        </div>
      )}
      <div 
        className="katex-display-wrapper text-sm sm:text-base font-serif"
        dangerouslySetInnerHTML={{ __html: renderedHtml }} 
      />
    </div>
  );
}

