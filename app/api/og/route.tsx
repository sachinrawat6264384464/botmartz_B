import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dynamic OpenGraph Image Generation Endpoint (`@vercel/og` / `next/og`)
 * Generates custom, high-impact glassmorphic branded OG cards on the fly.
 * Usage: `/api/og?title=Case+Study&badge=RAG+Systems&subtitle=Brief+description`
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Botmartz | AI Engineering for Production AI Systems';
    const badge = searchParams.get('badge') || 'PRODUCTION AI & RAG';
    const subtitle = searchParams.get('subtitle') || 'Enterprise RAG, Autonomous Agents & Scalable AI Infrastructure engineered for measurable real-world impact.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#050B14',
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(0, 184, 240, 0.18) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(6, 120, 190, 0.18) 0%, transparent 50%)',
            padding: '64px',
            fontFamily: 'sans-serif',
            color: 'white',
            border: '12px solid #0B1C2C',
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0092D7, #00B8F0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '30px',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(0, 184, 240, 0.3)',
                }}
              >
                B
              </div>
              <span style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#FFFFFF' }}>
                BOTMARTZ
              </span>
            </div>
            <div
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 184, 240, 0.5)',
                backgroundColor: 'rgba(0, 184, 240, 0.12)',
                color: '#00B8F0',
                fontSize: '18px',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </div>
          </div>

          {/* Center Title & Subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1040px' }}>
            <h1
              style={{
                fontSize: title.length > 55 ? '46px' : title.length > 35 ? '56px' : '64px',
                fontWeight: 'bold',
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                lineHeight: 1.45,
                color: '#8A9EB0',
                margin: 0,
              }}
            >
              {subtitle.length > 150 ? subtitle.substring(0, 147) + '...' : subtitle}
            </p>
          </div>

          {/* Bottom Tech Grid / Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderTop: '1px solid rgba(255, 255, 255, 0.14)',
              paddingTop: '28px',
            }}
          >
            <div style={{ display: 'flex', gap: '28px', fontSize: '20px', color: '#00B8F0', fontWeight: 600 }}>
              <span>⚡ LangGraph & PyTorch</span>
              <span>•</span>
              <span>🔒 Enterprise Security</span>
              <span>•</span>
              <span>🧠 Production RAG Core</span>
            </div>
            <div style={{ fontSize: '22px', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: '0.02em' }}>
              botmartz.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Failed to generate OG Image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
