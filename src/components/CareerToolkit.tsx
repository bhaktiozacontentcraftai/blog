import React, { useState, useEffect } from 'react';
import { Calculator, CheckSquare, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';

export const CareerToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'milestones'>('calculator');

  // Calculator State
  const [monthlyTarget, setMonthlyTarget] = useState<number>(2000);
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  const [taxPercent, setTaxPercent] = useState<number>(25);
  const [expenses, setExpenses] = useState<number>(150);

  // Milestones State
  const initialMilestones = [
    { id: 'm1', phase: 'Phase 1: Days 1–30', task: 'Target Role Gap Analysis: Audit 5 job descriptions for required competencies', done: false },
    { id: 'm2', phase: 'Phase 1: Days 1–30', task: 'Conduct 360-degree feedback check with 3 peers and manager', done: false },
    { id: 'm3', phase: 'Phase 1: Days 1–30', task: 'Revamp resume using the Google XYZ achievement bullet formula', done: false },
    { id: 'm4', phase: 'Phase 2: Days 31–60', task: 'Select 1 target skill (e.g., AI workflow automation, financial modeling)', done: false },
    { id: 'm5', phase: 'Phase 2: Days 31–60', task: 'Deliver a cross-functional internal "quick win" project', done: false },
    { id: 'm6', phase: 'Phase 2: Days 31–60', task: 'Quantify metrics and compile a 1-page case study deck', done: false },
    { id: 'm7', phase: 'Phase 3: Days 61–90', task: 'Identify and schedule coffee with an executive sponsor outside reporting line', done: false },
    { id: 'm8', phase: 'Phase 3: Days 61–90', task: 'Conduct promotion alignment meeting with direct manager', done: false },
    { id: 'm9', phase: 'Phase 3: Days 61–90', task: 'Benchmark compensation range and prepare market data portfolio', done: false },
  ];

  const [milestones, setMilestones] = useState(initialMilestones);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('growth_desk_milestones');
      if (stored) {
        setMilestones(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleMilestone = (id: string) => {
    const updated = milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m));
    setMilestones(updated);
    try {
      localStorage.setItem('growth_desk_milestones', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const resetMilestones = () => {
    setMilestones(initialMilestones);
    try {
      localStorage.removeItem('growth_desk_milestones');
    } catch {
      // Ignore
    }
  };

  // Calculations
  const monthlyHours = weeklyHours * 4.2;
  const grossNeeded = (monthlyTarget + expenses) / (1 - taxPercent / 100);
  const hourlyRateNeeded = monthlyHours > 0 ? Math.round(grossNeeded / monthlyHours) : 0;
  const retainerClientsNeededAt1k = Math.ceil(grossNeeded / 1000);

  const completedCount = milestones.filter((m) => m.done).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Growth Utilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          The Career & Business Toolkit
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Complement our in-depth guides with functional calculators and progress trackers designed to turn reading into measurable real-world execution.
        </p>

        {/* Tab switchers - functional buttons */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl mt-4">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'calculator'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Side Hustle Rate Calculator
            </span>
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'milestones'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" />
              90-Day Promotion Tracker
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">
                After-Work Hourly & Retainer Pricing Engine
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Calculate the exact hourly rate and retainer price required to hit your income goal after taxes and software overhead.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1.5">
                  <span>Target Net Monthly Side Income:</span>
                  <span className="font-bold text-slate-900">${monthlyTarget.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={monthlyTarget}
                  onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>$500</span>
                  <span>$5,000</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1.5">
                  <span>Available Weekly Billable Hours:</span>
                  <span className="font-bold text-slate-900">{weeklyHours} hrs / week</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="25"
                  step="1"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>4 hrs (Light)</span>
                  <span>12 hrs (Balanced)</span>
                  <span>25 hrs (Maximum)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Tax Reserve %
                  </label>
                  <select
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:outline-none"
                  >
                    <option value={20}>20% (Conservative)</option>
                    <option value={25}>25% (Standard US/UK)</option>
                    <option value={30}>30% (High Tax Bracket)</option>
                    <option value={35}>35% (Self-Employed High)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Monthly Software / Tools ($)
                  </label>
                  <input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-7 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Recommended Price Points
              </span>
              <div className="mt-4">
                <span className="text-xs text-slate-400">Target Minimum Hourly Rate</span>
                <div className="text-4xl font-serif font-bold text-white mt-0.5">
                  ${hourlyRateNeeded}
                  <span className="text-xs font-sans text-slate-400 font-normal"> / hour</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Gross Monthly Billing:</span>
                <span className="font-semibold text-white">${Math.round(grossNeeded).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Taxes Set Aside:</span>
                <span className="text-amber-400">${Math.round(grossNeeded * (taxPercent / 100)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Retainers needed at $1,500/mo:</span>
                <span className="font-semibold text-white">{Math.max(1, Math.round(grossNeeded / 1500))} clients</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 leading-relaxed">
              💡 <span className="font-semibold text-white">Rule of Thumb:</span> Instead of billing {weeklyHours} hours individually, package your offering as a ${Math.round(grossNeeded / retainerClientsNeededAt1k).toLocaleString()}/month fixed retainer for {retainerClientsNeededAt1k} client{retainerClientsNeededAt1k > 1 ? 's' : ''}.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 90-Day Tracker */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-9 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">
                90-Day Career Roadmap Checklist
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your real progress across the 3 strategic phases outlined in our 90-day career guide.
              </p>
            </div>
            <button
              onClick={resetMilestones}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Checklist</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Roadmap Completion</span>
              <span className="text-amber-700">{progressPercent}% ({completedCount}/{milestones.length})</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3 pt-2">
            {milestones.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleMilestone(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.done
                    ? 'bg-slate-50 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleMilestone(item.id)}
                  className="mt-0.5 rounded text-slate-900 focus:ring-slate-900 h-4 w-4 shrink-0"
                />
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                    {item.phase}
                  </span>
                  <p className={`text-xs ${item.done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                    {item.task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
