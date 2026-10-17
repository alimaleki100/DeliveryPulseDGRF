import type { Metadata } from 'next';
import './globals.css';
import { ShieldCheck, Activity, ExternalLink, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DeliveryPulse | DGRF Risk Diagnostic Cockpit',
  description:
    'Decoupling Structural Governance from Operational Delivery in Enterprise IT Initiatives. Based on the DGRF Framework by Ali Maleki.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        {/* Top Executive Header */}
        <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-950/50 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    DeliveryPulse
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    DGRF v1.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Delivery & Governance Risk Framework
                </p>
              </div>
            </div>

            {/* Navigation & Research Link */}
            <div className="flex items-center gap-4 text-xs">
              <a
                href="https://github.com/deliverypulse/deliverypulse"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Research Paper (Ali Maleki)
              </a>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Engine: Active</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 mt-16 py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-slate-400 font-semibold">DeliveryPulse (DGRF Framework)</span> · Authored by Ali Maleki. Released under MIT License.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Next.js 15 App Router</span>
              <span>•</span>
              <span>Actuarial Anchors D1–D5 & O1–O5</span>
              <span>•</span>
              <span>Gemini Flash Engine</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
