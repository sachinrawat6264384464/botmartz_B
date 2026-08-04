// lib/analytics.ts

type GTMEvent = 
  | 'page_view'
  | 'form_submission'
  | 'button_click'
  | 'link_click'
  | 'registration_completed'
  | 'newsletter_signup'
  | 'event_registration_started'
  | 'event_registration_completed';

export const trackEvent = (eventName: GTMEvent, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Push the event
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: new Date().toISOString()
    });
  }
};

// Also declare dataLayer on the global Window object for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
