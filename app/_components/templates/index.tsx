"use client";

import React from 'react';
import Template1Standard from './Template1Standard';
import Template2RoiGrid from './Template2RoiGrid';
import Template3TechDeepDive from './Template3TechDeepDive';
import Template4ResearchCaseStudy from './Template4ResearchCaseStudy';

export interface TemplateDispatcherProps {
  content: any;
}

export default function TemplateRenderer({ content }: TemplateDispatcherProps) {
  if (!content) return null;

  const templateKey = content.template || content.pageTemplate || 'template-1';

  switch (templateKey) {
    case 'template-2':
      return <Template2RoiGrid content={content} />;
    case 'template-3':
      return <Template3TechDeepDive content={content} />;
    case 'template-4':
      return <Template4ResearchCaseStudy content={content} />;
    case 'template-1':
    default:
      return <Template1Standard content={content} />;
  }
}
