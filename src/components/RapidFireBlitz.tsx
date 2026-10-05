import React, { useState, useEffect, useRef } from 'react';
import { RAPID_QUESTIONS } from '../data/rapidQuizData';
import { EXTINGUISHERS } from '../data/extinguishersData';
import { FIRE_CLASSES } from '../data/fireClassesData';
import { FireClass, ExtinguisherType, RapidQuestion } from '../types/fireTraining';
import { FireClassSymbol } from './FireClassGraphics';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface RapidFireBlitzProps {
  onFinish?: (stats: { score: number; streak: number; totalAnswered: number; correctCount: number }) => void;
  className?: string;
}

export const RapidFireBlitz: React.FC<RapidFireBlitzProps> = ({ onFinish, className = '' }) => {
  const [gameState, setGameState] = useState<'READY' | 'PLAYING' | 'SUMMARY'>('READY');
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [stage, setStage] = useState<'PICK_CLASS' | 'PICK_EXTINGUISHER'>('PICK_CLASS');
  const [selectedClass, setSelectedClass] = useState<FireClass | null>(null);

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const timerRef = useRef<any>(null);

  // Shuffle questions at start
  const [questions, setQuestions] = useState<RapidQuestion[]>([]);

  const startQuiz = () => {
    const shuffled = [...RAPID_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setStage('PICK_CLASS');
    setSelectedClass(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTotalAnswered(0);
    setCorrectCount(0);
    setTimeRemaining(60);
    setFeedback(null);
    setGameState('PLAYING');
    sounds.playCorrect();
  };

  // Timer loop
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const finishGame = () => {
    setGameState('SUMMARY');
    sounds.playVictory();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    if (onFinish) {
      onFinish({
        score,
        streak: maxStreak,
        totalAnswered,
        correctCount
      });
    }
  };

  const currentQ = questions[currentIndex] || RAPID_QUESTIONS[0];

  // Handle Class Choice
  const handleSelectClass = (fc: FireClass) => {
    if (feedback) return; // Wait for transition
    const isCorrect = fc === currentQ.correctClass;

    if (isCorrect) {
      sounds.playCorrect();
      setSelectedClass(fc);
      setStage('PICK_EXTINGUISHER');
    } else {
      sounds.playIncorrect();
      setStreak(0);
      setTotalAnswered((prev) => prev + 1);
      setFeedback({
        isCorrect: false,
        message: `Incorrect! ${currentQ.fuelItem} is Class ${currentQ.correctClass}. ${currentQ.tacticalTip}`
      });
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  };

  // Handle Extinguisher Choice
  const handleSelectExtinguisher = (ext: ExtinguisherType) => {
    if (feedback) return;
    const isCorrect =
      ext === currentQ.correctExtinguisher ||
      (currentQ.alternativeExtinguisher && ext === currentQ.alternativeExtinguisher);

    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      sounds.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const multiplier = Math.min(4, 1 + Math.floor(newStreak / 3));
      const points = 100 * multiplier;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);

      // Streak time bonus
      if (newStreak % 3 === 0) {
        setTimeRemaining((prev) => Math.min(90, prev + 5)); // +5 seconds!
      }

      setFeedback({
        isCorrect: true,
        message: `PERFECT! +${points} pts (${multiplier}x Streak). ${currentQ.tacticalTip}`
      });
    } else {
      sounds.playIncorrect();
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Agent Incompatible! Best choice is ${EXTINGUISHERS[currentQ.correctExtinguisher]?.name}. ${currentQ.tacticalTip}`
      });
    }

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelectedClass(null);
    setStage('PICK_CLASS');
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop or finish
      finishGame();
    }
  };

  // Build random 4 choices of extinguishers for current question
  const extinguisherOptions: ExtinguisherType[] = React.useMemo(() => {
    const list = [currentQ.correctExtinguisher, ...currentQ.distractorExtinguishers];
    return list.slice(0, 4).sort(() => Math.random() - 0.5);
  }, [currentIndex, currentQ]);

  return (
    <div className={`rounded-xl bg-[#0a0f1a] border border-slate-800 p-6 space-y-6 ${className}`}>
      {/* Top Header & HUD */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Rapid Response Blitz (60s Reflex Drill)
          </h2>
          <p className="text-xs text-slate-400">
            Speed fire classification & rapid tactical extinguisher pairing
          </p>
        </div>

        {gameState === 'PLAYING' && (
          <div className="flex items-center gap-4 font-mono text-xs">
            {/* Countdown Clock */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                timeRemaining <= 10
                  ? 'bg-rose-950/60 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-slate-900 border-amber-500/40 text-amber-400'
              }`}
            >
              <span>TIME:</span>
              <strong className="text-base">{timeRemaining}s</strong>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              <span>STREAK:</span>
              <strong className="text-amber-400">{streak}x</strong>
            </div>

            {/* Tactical Score */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
              <span>SCORE:</span>
              <strong className="text-emerald-400">{score}</strong>
            </div>
          </div>
        )}
      </div>

      {/* GAME STATE: READY */}
      {gameState === 'READY' && (
        <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-5 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 text-2xl font-bold">
            ⚡
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">60-Second Classification Blitz</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Test your instinct under pressure! Identify the Fire Class (A, B, C, D, K) and immediately dispatch the correct fire extinguisher before time runs out. Maintain combos for score multipliers!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left p-3 bg-slate-900 rounded-lg text-xs font-mono">
            <div>
              <span className="text-slate-500 block">Round Duration:</span>
              <span className="text-white font-bold">60 Seconds</span>
            </div>
            <div>
              <span className="text-slate-500 block">Streak Multiplier:</span>
              <span className="text-amber-400 font-bold">Up to 4x Points</span>
            </div>
            <div>
              <span className="text-slate-500 block">Bonus Time:</span>
              <span className="text-emerald-400 font-bold">+5s per 3-streak</span>
            </div>
            <div>
              <span className="text-slate-500 block">Target:</span>
              <span className="text-white font-bold">1,500+ Points</span>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            START 60s BLITZ DRILL
          </button>
        </div>
      )}

      {/* GAME STATE: PLAYING */}
      {gameState === 'PLAYING' && (
        <div className="space-y-6">
          {/* Situation Card */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>FACILITY: {currentQ.airportFacility}</span>
              <span>QUESTION {currentIndex + 1}</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              {currentQ.situation}
            </h3>
            <div className="inline-block px-2.5 py-1 bg-amber-500/10 rounded border border-amber-500/20 text-xs font-mono text-amber-300">
              Fuel: {currentQ.fuelItem}
            </div>
          </div>

          {/* Feedback banner if present */}
          {feedback && (
            <div
              className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                feedback.isCorrect
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-500/60 text-rose-300'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Step 1: Pick Fire Class */}
          {stage === 'PICK_CLASS' && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                STEP 1: SELECT FIRE CLASSIFICATION
              </span>
              <div className="grid grid-cols-5 gap-3">
                {(['A', 'B', 'C', 'D', 'K'] as FireClass[]).map((fc) => {
                  const info = FIRE_CLASSES[fc];
                  return (
                    <button
                      key={fc}
                      onClick={() => handleSelectClass(fc)}
                      className="p-3 bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-amber-500/50 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    >
                      <FireClassSymbol fireClass={fc} size="sm" showLabel={false} />
                      <span className="text-xs font-bold text-white font-mono">CLASS {fc}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                        {fc === 'A' ? 'Combustibles' : fc === 'B' ? 'Liquids' : fc === 'C' ? 'Electrical' : fc === 'D' ? 'Metals' : 'Kitchen Oil'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Pick Extinguisher */}
          {stage === 'PICK_EXTINGUISHER' && selectedClass && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  STEP 2: SELECT APPROPRIATE EXTINGUISHER FOR CLASS {selectedClass}
                </span>
                <span className="text-xs font-mono text-emerald-400">Class {selectedClass} Confirmed</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {extinguisherOptions.map((ext) => {
                  const info = EXTINGUISHERS[ext];
                  if (!info) return null;
                  return (
                    <button
                      key={ext}
                      onClick={() => handleSelectExtinguisher(ext)}
                      className="p-3.5 bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-emerald-500/50 flex flex-col items-start gap-1.5 text-left transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md"
                    >
                      <div
                        className="w-full h-1.5 rounded-full mb-1"
                        style={{ backgroundColor: info.colorBand === '#FFFFFF' ? '#E2E8F0' : info.colorBand }}
                      />
                      <span className="text-xs font-bold text-white leading-tight">
                        {info.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {info.agentLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME STATE: SUMMARY */}
      {gameState === 'SUMMARY' && (
        <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 text-3xl font-bold">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-semibold">
              ROUND COMPLETE
            </span>
            <h3 className="text-2xl font-bold text-white">Tactical Drill Results</h3>
            <p className="text-xs text-slate-400">
              Evaluated against KSIA ERT Emergency Response Directorate Standards
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 rounded-xl text-center font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Final Score</span>
              <strong className="text-xl text-amber-400">{score}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Max Streak</span>
              <strong className="text-xl text-emerald-400">{maxStreak}x</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Accuracy</span>
              <strong className="text-xl text-white">
                {totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0}%
              </strong>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-lg font-mono transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            PLAY RAPID BLITZ AGAIN
          </button>
        </div>
      )}
    </div>
  );
};
