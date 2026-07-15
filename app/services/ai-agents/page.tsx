import Link from "next/link";
import { ArrowRight, Database, Layout, Mail, MessageSquare, Calendar, Globe, Server, ShieldCheck, Zap, Activity, Code, Briefcase, FileSearch, HelpCircle, Users, Speaker, PieChart, Workflow, Lock, Settings } from "lucide-react";

export default function AIAgentsPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative pt-[80px] pb-0 bg-ink text-white overflow-hidden blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap relative z-10 flex flex-col lg:flex-row items-center gap-10 pb-16">
          <div className="flex-1 lg:max-w-[580px]">
            <div className="font-mono text-[11px] text-signal uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
              <Link href="/services" className="hover:text-white transition-colors">Services</Link> <span>/</span> <span className="text-white">AI Agents</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,54px)] leading-[1.05] font-semibold mb-6">
              Intelligent AI Agents<br/>That <span className="text-brand">Get Things Done.</span>
            </h1>
            <p className="text-[17px] text-[#9FB9C8] max-w-[540px] mb-8">
              We build production-ready AI agents that reason, plan, take action, and deliver real business outcomes across your tools, data, and workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary bg-brand text-white hover:bg-deep">Book an AI Strategy Session →</Link>
              <Link href="/work/case-studies" className="btn btn-ghost border-line text-white hover:border-brand hover:text-brand">Explore Case Studies ↗</Link>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:block">
            {/* Agent Integration Node Graphic */}
            <div className="w-full relative max-w-[600px] mx-auto ml-auto">
               <div className="grid grid-cols-2 gap-4">
                 
                 {/* Left Integrations */}
                 <div className="flex flex-col gap-4 justify-center">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm relative overflow-hidden group hover:border-brand/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Database className="text-[#8598A6] group-hover:text-brand" />
                      <div>
                        <div className="font-semibold text-[14px]">CRM</div>
                        <div className="text-[11px] text-[#8598A6] font-mono">Salesforce, HubSpot</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm relative overflow-hidden group hover:border-brand/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Mail className="text-[#8598A6] group-hover:text-brand" />
                      <div>
                        <div className="font-semibold text-[14px]">Email</div>
                        <div className="text-[11px] text-[#8598A6] font-mono">Gmail, Outlook</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm relative overflow-hidden group hover:border-brand/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Server className="text-[#8598A6] group-hover:text-brand" />
                      <div>
                        <div className="font-semibold text-[14px]">Database</div>
                        <div className="text-[11px] text-[#8598A6] font-mono">PostgreSQL, MySQL</div>
                      </div>
                    </div>
                 </div>

                 {/* Right Integrations */}
                 <div className="flex flex-col gap-4 justify-center">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm relative overflow-hidden group hover:border-brand/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <MessageSquare className="text-[#8598A6] group-hover:text-brand" />
                      <div>
                        <div className="font-semibold text-[14px]">Slack</div>
                        <div className="text-[11px] text-[#8598A6] font-mono">Messages, Actions</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm relative overflow-hidden group hover:border-brand/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Calendar className="text-[#8598A6] group-hover:text-brand" />
                      <div>
                        <div className="font-semibold text-[14px]">Calendar</div>
                        <div className="text-[11px] text-[#8598A6] font-mono">Schedules, Events</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm relative overflow-hidden group hover:border-brand/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Globe className="text-[#8598A6] group-hover:text-brand" />
                      <div>
                        <div className="font-semibold text-[14px]">APIs & Web</div>
                        <div className="text-[11px] text-[#8598A6] font-mono">REST, GraphQL</div>
                      </div>
                    </div>
                 </div>

                 {/* Center Agent Node */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/20 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,146,215,0.4)]">
                   <div className="w-24 h-24 bg-gradient-to-br from-brand to-deep rounded-2xl flex items-center justify-center shadow-lg border border-brand/50 z-10 relative">
                     <Settings className="w-10 h-10 text-white animate-[spin_10s_linear_infinite]" />
                     {/* Connecting lines SVG overlay would go here in prod */}
                   </div>
                 </div>

               </div>
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-md relative z-10">
          <div className="wrap grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { t: 'Autonomous Execution', i: Activity },
              { t: 'Context-Aware Decisions', i: Database },
              { t: 'Secure & Enterprise Ready', i: ShieldCheck },
              { t: 'Human-in-the-Loop Control', i: Users }
            ].map((f, i) => (
              <div key={i} className="py-5 px-4 flex items-center justify-center gap-3 text-center md:text-left">
                <f.i className="w-5 h-5 text-brand" />
                <span className="font-mono text-[11px] text-[#9FB9C8] uppercase tracking-wider">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT ARE AI AGENTS FOR BUSINESS - AEO ANSWER BLOCK */}
      <section className="section-pad">
        <div className="wrap mb-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-[30px] font-semibold mb-4">What are AI agents for business?</h2>
            <p className="text-[16px] text-ink leading-relaxed">
              AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. Unlike traditional chatbots that only answer questions, enterprise AI agents connect to your internal tools (like CRM, databases, and email) to execute multi-step tasks such as customer support, sales research, and data analysis.
            </p>
          </div>
          <div className="md:w-1/2 bg-paper p-8 border border-line rounded-sm">
             <blockquote className="text-[15px] italic text-ink-soft border-l-2 border-brand pl-4 mb-4">
               "The real value of an AI agent isn't in its chat interface—it's in its ability to securely execute tools and take autonomous actions within your company's existing infrastructure."
             </blockquote>
             <cite className="text-[13px] font-semibold font-mono text-brand not-italic">— Soham Sharma, Founder at Botmartz</cite>
          </div>
        </div>
      </section>

      {/* AGENT TYPES / FUNCTIONS */}
      <section className="section-pad section-alt">
        <div className="wrap text-center mb-[50px]">
          <div className="eyebrow justify-center">What AI Agents Can Do</div>
          <h2 className="text-[32px] font-semibold">Power Every Function. Elevate Every Outcome.</h2>
        </div>
        
        <div className="wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { icon: Briefcase, title: 'Sales Agents', desc: 'Qualify leads, research prospects, and draft personalized outreach that converts.' },
            { icon: HelpCircle, title: 'Support Agents', desc: 'Resolve tickets, find answers, and take actions across your systems.' },
            { icon: FileSearch, title: 'Research Agents', desc: 'Deep research, data synthesis, and insight reports in minutes, not hours.' },
            { icon: Speaker, title: 'Marketing Agents', desc: 'Create content, run campaigns, analyze performance, and optimize results.' },
            { icon: Users, title: 'HR Agents', desc: 'Screen resumes, answer employee queries, and streamline HR workflows.' },
            { icon: Settings, title: 'Ops Agents', desc: 'Monitor systems, trigger workflows, and ensure smooth operations.' },
            { icon: Code, title: 'Dev Agents', desc: 'Write code, review PRs, generate tests, and accelerate engineering velocity.' },
            { icon: PieChart, title: 'Finance Agents', desc: 'Reconcile data, flag anomalies, and generate financial reports.' },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-line p-6 hover:border-brand transition-colors text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="w-12 h-12 rounded-full bg-grid-bg border border-line flex items-center justify-center text-brand mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-[17px] font-semibold mb-2">{item.title}</h3>
              <p className="text-[13.5px] text-ink-soft leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AGENT ARCHITECTURE */}
      <section className="section-pad bg-ink text-white blueprint" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.08) 1px, transparent 1px)' }}>
        <div className="wrap">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between mb-12">
             <div className="lg:max-w-[400px]">
                <div className="font-mono text-[11px] text-brand uppercase tracking-[0.12em] mb-3">Our Agent Architecture</div>
                <h2 className="text-[34px] font-semibold mb-4 leading-tight">Built for Reasoning.<br/>Designed for Action.</h2>
                <p className="text-[15px] text-[#9FB9C8]">
                  Our agent architecture combines state-of-the-art models with robust engineering to deliver reliable, scalable, and controllable AI agents.
                </p>
             </div>
             <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm relative">
                
                {/* Agent Flow Diagram */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between relative z-10">
                   
                   <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg text-center flex flex-col items-center">
                      <div className="text-brand mb-3"><Activity className="w-6 h-6" /></div>
                      <div className="font-semibold text-[14px] mb-2 text-white">1. Perceive</div>
                      <div className="text-[11px] text-[#9FB9C8] font-mono leading-relaxed">
                        Input & Context<br/>Data Connectors<br/>Events & Triggers
                      </div>
                   </div>
                   
                   <div className="hidden sm:flex items-center text-white/30"><ArrowRight className="w-4 h-4"/></div>

                   <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg text-center flex flex-col items-center">
                      <div className="text-brand mb-3"><Database className="w-6 h-6" /></div>
                      <div className="font-semibold text-[14px] mb-2 text-white">2. Understand</div>
                      <div className="text-[11px] text-[#9FB9C8] font-mono leading-relaxed">
                        Intent Recognition<br/>Retrieval (RAG)<br/>Memory Access
                      </div>
                   </div>

                   <div className="hidden sm:flex items-center text-white/30"><ArrowRight className="w-4 h-4"/></div>

                   <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg text-center flex flex-col items-center border-brand/50 shadow-[0_0_20px_rgba(0,146,215,0.2)]">
                      <div className="text-signal mb-3"><Workflow className="w-6 h-6" /></div>
                      <div className="font-semibold text-[14px] mb-2 text-white">3. Plan</div>
                      <div className="text-[11px] text-[#9FB9C8] font-mono leading-relaxed">
                        Task Decomposition<br/>Reasoning<br/>Tool Selection
                      </div>
                   </div>

                   <div className="hidden sm:flex items-center text-white/30"><ArrowRight className="w-4 h-4"/></div>

                   <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg text-center flex flex-col items-center">
                      <div className="text-brand mb-3"><Zap className="w-6 h-6" /></div>
                      <div className="font-semibold text-[14px] mb-2 text-white">4. Act</div>
                      <div className="text-[11px] text-[#9FB9C8] font-mono leading-relaxed">
                        Tool Execution<br/>API Calls<br/>Workflow Actions
                      </div>
                   </div>
                   
                   <div className="hidden sm:flex items-center text-white/30"><ArrowRight className="w-4 h-4"/></div>

                   <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-lg text-center flex flex-col items-center">
                      <div className="text-brand mb-3"><ShieldCheck className="w-6 h-6" /></div>
                      <div className="font-semibold text-[14px] mb-2 text-white">5. Evaluate</div>
                      <div className="text-[11px] text-[#9FB9C8] font-mono leading-relaxed">
                        Self-Check<br/>Guardrails<br/>Human Approval
                      </div>
                   </div>

                </div>

                <div className="mt-8 border-t border-white/10 pt-4 flex justify-between">
                   <span className="font-mono text-[11px] text-signal">Memory & Knowledge Layer</span>
                   <span className="font-mono text-[11px] text-signal">Observability & Feedback Loop</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* STACK / TECH */}
      <section className="border-b border-line bg-white">
        <div className="wrap flex flex-col lg:flex-row items-center py-[60px] gap-10">
          <div className="lg:max-w-[320px]">
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-2">Powered By Modern AI Engineering Stack</div>
            <h3 className="text-[28px] font-semibold">Best-in-Class Technologies.<br/>Production-Ready.</h3>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {['LangGraph', 'Google ADK', 'OpenAI', 'Anthropic', 'FastAPI', 'Pydantic', 'PostgreSQL', 'Redis'].map((tech) => (
              <div key={tech} className="bg-grid-bg border border-line p-4 rounded flex items-center justify-center font-mono text-[13px] text-ink font-semibold">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BOTMARTZ */}
      <section className="section-pad section-alt">
        <div className="wrap text-center lg:text-left flex flex-col lg:flex-row gap-12 items-center">
           <div className="lg:max-w-[320px]">
              <div className="eyebrow">Why Botmartz</div>
              <h2 className="text-[30px] font-semibold mb-4">Enterprise-Grade AI Agents You Can Trust.</h2>
           </div>
           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { i: ShieldCheck, t: 'Production First', d: 'Built with reliability, security, and scalability from day one.' },
                { i: Lock, t: 'Secure by Design', d: 'Your data stays private with enterprise-grade security controls.' },
                { i: Users, t: 'Human in the Loop', d: 'Full visibility and control with approvals and escalations.' },
                { i: Settings, t: 'Custom & Flexible', d: 'Tailored to your workflows, systems, and business needs.' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-line p-6 rounded text-left flex flex-col">
                   <item.i className="w-5 h-5 text-brand mb-4" />
                   <h4 className="font-semibold text-[15px] mb-2">{item.t}</h4>
                   <p className="text-[13px] text-ink-soft">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section-pad bg-ink text-white">
        <div className="wrap flex justify-between items-end gap-6 mb-10">
          <div>
            <div className="font-mono text-[11px] text-brand uppercase tracking-[0.08em] mb-3">AI Agents In Action</div>
            <h2 className="text-[34px] font-semibold">Real Results. Real Impact.</h2>
          </div>
          <Link href="/work/case-studies" className="btn border border-white/20 hover:border-white transition-colors text-[13px] px-6 py-2 rounded-sm hidden md:inline-flex">View All Case Studies →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 wrap">
            <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden group cursor-pointer hover:border-brand/50 transition-colors flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/20 inline-block px-2 py-1 rounded mb-4 self-start">Support Agent</div>
                <h4 className="text-[22px] font-semibold mb-3">70% Faster Ticket Resolution</h4>
                <p className="text-[14px] text-[#9FB9C8] mb-6">An AI support agent that answers questions, takes actions, and escalates only when needed.</p>
                <div className="mt-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden group cursor-pointer hover:border-brand/50 transition-colors flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/20 inline-block px-2 py-1 rounded mb-4 self-start">Sales Agent</div>
                <h4 className="text-[22px] font-semibold mb-3">3X More Qualified Meetings</h4>
                <p className="text-[14px] text-[#9FB9C8] mb-6">Autonomous research agent that qualifies leads and books meetings on autopilot.</p>
                <div className="mt-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden group cursor-pointer hover:border-brand/50 transition-colors flex flex-col">
              <div className="p-8 flex-1 flex flex-col">
                <div className="font-mono text-[10px] text-brand uppercase bg-brand/20 inline-block px-2 py-1 rounded mb-4 self-start">Doc Intelligence Agent</div>
                <h4 className="text-[22px] font-semibold mb-3">90% Time Saved In Analysis</h4>
                <p className="text-[14px] text-[#9FB9C8] mb-6">AI agent that extracts, analyzes, and summarizes documents with high accuracy.</p>
                <div className="mt-auto font-mono text-[12px] text-brand flex items-center gap-2 group-hover:gap-3 transition-all">Read Case Study <ArrowRight className="w-3 h-3" /></div>
              </div>
            </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-[80px]">
        <div className="wrap">
          <div className="bg-ink rounded-[24px] p-[40px] md:p-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,184,240,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,240,.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[500px]">
              <h2 className="text-[36px] font-semibold leading-[1.1] mb-4">Ready to Deploy <span className="text-signal">Intelligent AI Agents</span> in Your Organization?</h2>
              <p className="text-[15px] text-[#9FB9C8] mb-8">Let's design and build AI agents that automate work, enhance productivity, and drive real business outcomes.</p>
              <Link href="/contact" className="btn btn-primary bg-brand hover:bg-deep">Book an AI Strategy Session →</Link>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[340px]">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Free Strategy Call</h4>
                  <p className="text-[13px] text-[#9FB9C8]">60-minute session with our AI experts.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Custom Roadmap</h4>
                  <p className="text-[13px] text-[#9FB9C8]">Tailored agent strategy and implementation plan.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-start">
                <div className="bg-white/10 p-2.5 rounded-lg text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[15px] mb-1">Pilot to Production</h4>
                  <p className="text-[13px] text-[#9FB9C8]">From pilot to enterprise scale deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Enterprise AI Agents Development",
            "provider": {
              "@type": "Organization",
              "name": "Botmartz"
            },
            "description": "AI agents for business are autonomous software systems that can plan, reason, and take action to solve complex workflows. We build enterprise AI agents that connect to your internal tools.",
            "serviceType": "AI Engineering Services"
          })
        }}
      />
    </main>
  );
}
