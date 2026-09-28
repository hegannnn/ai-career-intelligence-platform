import { TABS } from '../constants';
import type { TabId } from '../types';

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
  compact?: boolean;
}

export default function Sidebar({ active, onChange, compact }: Props) {
  if (compact) {
    return (
      <div className="mobile-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab${active === tab.id ? ' active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <span className="nav-step">{tab.step}</span>
            <span>
              <span className="nav-label">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Career Intelligence</h1>
        <p>3 tools · 1 platform · powered by FastAPI + React</p>
      </div>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`nav-tab${active === tab.id ? ' active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-step">{tab.step}</span>
          <span>
            <span className="nav-label">{tab.label}</span>
            <span className="nav-desc">{tab.desc}</span>
          </span>
        </button>
      ))}
      <div className="sidebar-footer">
        Backend: localhost:8000 · API docs at /docs
      </div>
    </aside>
  );
}