import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ResumeAnalyzer from './features/ResumeAnalyzer';
import SkillGap from './features/SkillGap';
import JobMatcher from './features/JobMatcher';
import type { TabId } from './types';

const PANELS: Record<TabId, () => JSX.Element> = {
  resume: ResumeAnalyzer,
  skills: SkillGap,
  jobs: JobMatcher,
};

export default function App() {
  const [tab, setTab] = useState<TabId>('resume');
  const Panel = PANELS[tab];

  return (
    <div className="app-shell">
      <Sidebar active={tab} onChange={setTab} />
      <Sidebar active={tab} onChange={setTab} compact />
      <main className="main">
        <Panel />
      </main>
    </div>
  );
}