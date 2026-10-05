import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === '2809') {
      setError(false);
      setCode('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0f1a] border border-amber-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Instructor Authorization</h3>
            <p className="text-xs text-slate-400 font-mono">CODE RESTRICTED ACCESS</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          Quick-Fill Demo is restricted to authorized instructors and evaluators. Please enter the 4-digit authorization code to activate:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter 4-digit code"
              className="w-full text-center tracking-widest text-lg font-mono bg-slate-900 border border-slate-700 rounded-xl py-3 text-amber-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder:text-slate-600 placeholder:text-sm placeholder:tracking-normal"
            />
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Invalid authorization code. Access denied.
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              Unlock Demo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
