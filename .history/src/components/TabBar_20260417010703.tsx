'use client';

import { clsx } from 'clsx';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface Props {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function TabBar({ tabs, active, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-stone-100 rounded-xl p-1 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150',
            active === tab.id
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-700'
          )}
        >
          {tab.label}
          {tab.count !== undefined && tab.count > 0 && (
            <span className={clsx(
              'text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center',
              active === tab.id ? 'bg-amber-100 text-amber-700' : 'bg-stone-200 text-stone-500'
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
