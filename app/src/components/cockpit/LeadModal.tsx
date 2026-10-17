'use client';

import React, { useState } from 'react';
import { EvaluationResult } from '@/lib/engine/prj-evaluator';
import { X, CheckCircle2, Shield, Loader2, ArrowRight } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: EvaluationResult;
  projectName: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  projectName,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'CIO / CTO',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          programName: projectName,
          quadrantId: evaluation.quadrant.id,
          govScore: evaluation.gov.totalScore,
          delScore: evaluation.del.totalScore,
          message: formData.notes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedData(data.data);
      } else {
        throw new Error(data.error || 'Failed to submit advisory request');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Confirmation View */
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">
              Executive Consultation Confirmed
            </h3>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your DGRF diagnostic snapshot has been routed to our enterprise practice. An executive advisor has been allocated to review your program dynamics.
            </p>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left text-xs space-y-1.5 max-w-sm mx-auto font-mono">
              <div className="text-slate-400">
                Tracking Ref: <span className="text-slate-200">{submittedData.leadId}</span>
              </div>
              <div className="text-slate-400">
                Advisory Tier: <span className="text-emerald-400 font-bold">{submittedData.advisoryTier}</span>
              </div>
              <div className="text-slate-400">
                Target SLA: <span className="text-slate-200">{submittedData.estimatedResponseHours} Hours</span>
              </div>
              <div className="text-slate-400">
                Practice Lead: <span className="text-slate-200">{submittedData.advisorAssigned}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all"
            >
              Return to Cockpit
            </button>
          </div>
        ) : (
          /* Input Form View */
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">
                Request Executive Turnaround Consultation
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Direct advisory engagement with Ali Maleki and the DGRF governance architecture practice.
            </p>

            {/* Diagnostic Snapshot pill */}
            <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Program: </span>
                <span className="font-semibold text-slate-200">{projectName || 'Enterprise Program'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400">Gov: {evaluation.gov.totalScore}</span>
                <span className="font-mono text-sky-400">Del: {evaluation.del.totalScore}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${evaluation.quadrant.badgeClass}`}>
                  {evaluation.quadrant.id}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. jdoe@enterprise.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Enterprise / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Global Financial Corp"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Executive Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="CIO / CTO">Chief Information / Technology Officer</option>
                    <option value="VP Engineering">VP of Engineering / Architecture</option>
                    <option value="Head of PMO">Head of PMO / Transformation</option>
                    <option value="Board Director">Board Director / Executive Sponsor</option>
                    <option value="Other">Other IT Executive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Confidential Context or Specific Impasse
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Impasse with primary systems integrator regarding Phase 2 deliverable milestones..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-lg shadow-emerald-950/40 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Dispatching Request...
                    </>
                  ) : (
                    <>
                      Confirm Advisory Dispatch
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
