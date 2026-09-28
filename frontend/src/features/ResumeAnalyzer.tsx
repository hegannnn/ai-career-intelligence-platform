import { useState } from 'react';
import { api, getErrorMessage } from '../api/client';
import Alert from '../components/Alert';
import { ROLES, scoreLevel } from '../constants';
import type { ResumeResult } from '../types';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState<string>(ROLES[0]);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('target_role', role);
      const { data } = await api.post<ResumeResult>('/resume/analyze', form);
      setResult(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const level = result ? scoreLevel(result.score) : null;

  return (
    <>
      <header className="page-header">
        <h2>Resume Analyzer</h2>
        <p>Upload a PDF resume. We extract skills, score your resume, and show gaps for your target role.</p>
      </header>

      <div className="card">
        {error && <Alert message={error} />}
        <div className="field">
          <label htmlFor="resume-file">Resume (PDF)</label>
          <input
            id="resume-file"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div className="field">
          <label htmlFor="resume-role">Target role</label>
          <select id="resume-role" value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <p className="field-hint">Missing skills are compared against this role&apos;s requirements.</p>
        </div>
        <button type="button" className="btn btn-primary" disabled={!file || loading} onClick={analyze}>
          {loading ? 'Analyzing…' : 'Analyze Resume'}
        </button>

        {result && (
          <div className="result-box">
            <div className="score-display">
              <div className={`score-value ${level}`}>{result.score}</div>
              <div className="score-caption">Resume score out of 100</div>
            </div>
            <p>{result.summary}</p>
            <p><strong>Skills found</strong></p>
            <div className="tags">
              {result.skills_found.length
                ? result.skills_found.map((s) => <span key={s} className="tag tag-skill">{s}</span>)
                : <span className="field-hint">No keywords detected — try a text-based PDF.</span>}
            </div>
            {result.missing_skills.length > 0 && (
              <>
                <p style={{ marginTop: 16 }}><strong>Missing for {result.target_role}</strong></p>
                <div className="tags">
                  {result.missing_skills.map((s) => (
                    <span key={s} className="tag tag-missing">{s}</span>
                  ))}
                </div>
              </>
            )}
            <p className="field-hint" style={{ marginTop: 12 }}>Word count: {result.word_count}</p>
          </div>
        )}
      </div>
    </>
  );
}
