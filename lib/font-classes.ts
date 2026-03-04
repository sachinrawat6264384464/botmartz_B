/**
 * Font class name constants for use inside "use client" components.
 *
 * next/font registers CSS custom properties (e.g. --font-inter-tight) on
 * <body> from app/layout.tsx (a server component). The matching CSS utility
 * classes are defined in app/globals.css and consume those variables.
 *
 * Import from HERE instead of @/lib/fonts inside any client component.
 * @/lib/fonts must NEVER be imported by client components.
 */

export const interTight   = { className: 'font-inter-tight'   };
export const mono         = { className: 'font-mono-custom'   };
export const spaceGrotesk = { className: 'font-space-grotesk' };
export const anton        = { className: 'font-anton'         };
export const playfair     = { className: 'font-playfair'      };
