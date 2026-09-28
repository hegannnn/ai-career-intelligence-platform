import { useState } from 'react';
import { api, getErrorMessage } from '../api/client';
import Alert from '../components/Alert';
import { scoreLevel } from '../constants';
import type { JobMatchResult } from '../types';

const SAMPLE_RESUME =
  'Software engineer with 3 years experience in Python, FastAPI, React, PostgreSQL, and Docker. ' +
  'Built REST APIs and deployed microservices on AWS. Strong problem solving and team collaboration.';

const SAMPLE_JD =
  'We are hiring a backend developer proficient in Python, FastAPI, REST APIs, PostgreSQL, ' +
  'Docker, and cloud deployment. Experience with CI/CD and agile teams is a plus.';

export default function JobMatcher() {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const match = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const { data } = await api.post<JobMatchResult>('/jobs/match', {
        resume_text: resumeText,
        job_description: jobText,
      });
      setResult(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const level = result ? scoreLevel(result.match_score) : null;

  return (
    <>
      <header className="page-header">
        <h2>Job Matcher</h2>
        <p>
          Compare resume text to a job description using ML embeddings.
          First run may take up to a minute while the model loads.
        </p>
      </header>

      <div className="card">
        {error && <Alert message={error} />}
        {loading && (
          <Alert
            variant="info"
            message="Loading ML model and computing similarity… please wait."
          />
        )}
        <div className="field">
          <label htmlFor="resume-text">Resume text</label>
          <textarea
            id="resume-text"
            placeholder="Paste resume text or summary (min 50 characters)"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <button
            type="button"
            className="field-hint"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary)' }}
            onClick={() => setResumeText(SAMPLE_RESUME)}
          >
            Use sample resume text
          </button>
        </div>
        <div className="field">
          <label htmlFor="job-text">Job description</label>
          <textarea
            id="job-text"
            placeholder="Paste the job posting (min 50 characters)"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />
          <button
            type="button"
            className="field-hint"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary)' }}
            onClick={() => setJobText(SAMPLE_JD)}
          >
            Use sample job description
          </button>
        </div>
        <button
          type="button"
          className="btn btn-accent"
          disabled={loading || resumeText.length < 50 || jobText.length < 50}
          onClick={match}
        >
          {loading ? 'Matching…' : 'Calculate Match'}
        </button>

        {result && (
          <div className="result-box">
            <div className="score-display">
              <div className={`score-value ${level}`}>{result.match_score}%</div>
              <div className="score-caption">Semantic match · {result.model}</div>
            </div>
            <p className={`verdict ${level}`}>{result.verdict}</p>
            <p>{result.advice}</p>
          </div>
        )}
      </div>
    </>
  );
}
