import { useState } from 'react';
import { api, getErrorMessage } from '../api/client';
import Alert from '../components/Alert';
import { ROLES } from '../constants';
import type { SkillGapResult } from '../types';

export default function SkillGap() {
  const [skills, setSkills] = useState('');
  const [role, setRole] = useState<string>(ROLES[0]);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await api.post<SkillGapResult>('/skills/gap', {
        current_skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        target_role: role,
      });
      setResult(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="page-header">
        <h2>Skill Gap Detector</h2>
        <p>Enter skills you already have and pick a target role. Get a match percentage and learning roadmap.</p>
      </header>

      <div className="card">
        {error && <Alert message={error} />}
        <div className="field">
          <label htmlFor="skills-input">Your skills</label>
          <input
            id="skills-input"
            placeholder="python, sql, pandas, machine learning"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className="field-hint">Separate skills with commas.</p>
        </div>
        <div className="field">
          <label htmlFor="skills-role">Target role</label>
          <select id="skills-role" value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-accent" disabled={loading} onClick={check}>
          {loading ? 'Checking…' : 'Check Skill Gap'}
        </button>

        {result && (
          <div className="result-box">
            <div className="stat-row">
              <div className="stat-card">
                <div className="value">{result.match_percentage}%</div>
                <div className="label">Role match</div>
              </div>
              <div className="stat-card">
                <div className="value">{result.skills_matched}/{result.skills_required}</div>
                <div className="label">Skills covered</div>
              </div>
            </div>
            <p><strong>Target:</strong> {result.target_role}</p>
            <p>
              <strong>Missing skills:</strong>{' '}
              {result.missing_skills.length
                ? result.missing_skills.join(', ')
                : 'None — you meet the baseline for this role!'}
            </p>
            {result.roadmap.length > 0 && (
              <>
                <p><strong>Learning roadmap</strong></p>
                <ol className="roadmap">
                  {result.roadmap.map((r) => (
                    <li key={r.step}>
                      {r.skill}{' '}
                      <span className={r.priority === 'high' ? 'priority-high' : 'priority-medium'}>
                        ({r.priority} priority)
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
