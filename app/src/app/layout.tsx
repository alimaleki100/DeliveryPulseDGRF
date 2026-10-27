import type { Metadata } from 'next';
import './globals.css';
import { Activity, BookOpen, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DeliveryPulse — DGRF Diagnostic Cockpit & Tri-Agent Risk Advisory',
  description:
    'Decoupled Structural Governance from Operational Delivery in Enterprise IT Initiatives. Based on the peer-reviewed DGRF Framework by Ali Maleki.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080C14] text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 font-sans">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-[#1E293B] bg-[#080C14]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Branding & Version */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-0.5 shadow-lg shadow-emerald-950/50 flex items-center justify-center">
                <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    DeliveryPulse
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    v2.4 - Peer-Reviewed Edition
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  DGRF Diagnostic Cockpit · <span className="text-slate-300 font-semibold">Authored by Ali Maleki</span>
                </p>
              </div>
            </div>

            {/* Navigation & Status */}
            <div className="flex items-center gap-4 text-xs">
              <a
                href="https://github.com/alimaleki100/DeliveryPulseDGRF"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>PM World Journal (PMWJ)</span>
              </a>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DGRF Core Engine: Active</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#1E293B] mt-16 py-8 text-xs text-slate-500 bg-[#080C14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-slate-300 font-semibold">DeliveryPulse (DGRF Framework)</span> — Authored by <strong className="text-white">Ali Maleki</strong> (MBA, PMP) · Brno, Czech Republic.
            </div>
            <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
              <span>Next.js 15 App Router</span>
              <span>•</span>
              <span>Dual-Mode Cartesian 2x2</span>
              <span>•</span>
              <span>Tri-Agent Squad (Gemini)</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
