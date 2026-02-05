import { useState } from 'react';
import LearningMode from './LearningMode';
import '../styles/ReviewResult.css';

/**
 * Review Result Component
 * Displays AI feedback in a structured, high-fidelity format
 */

const ReviewResult = ({ result }) => {
  const [showLearningMode, setShowLearningMode] = useState(false);

  const { aiResponse } = result;

  const getIssueIcon = (type) => {
    switch (type) {
      case 'logic': return '💣';
      case 'performance': return '⚡';
      case 'style': return '🎨';
      case 'best-practice': return '🛡️';
      default: return '📍';
    }
  };

  return (
    <div className="review-result">
      <h2>Trace Intelligence Analysis</h2>

      {/* Summary Section */}
      <div className="result-card summary-card glass-panel">
        <h3>Overview</h3>
        <p>{aiResponse.summary}</p>
      </div>

      <div className="result-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Complexity Section */}
        <div className="result-card complexity-card glass-panel">
          <h3>Algorithm Efficiency</h3>
          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="label">Time Complexity</span>
              <span className="value">{aiResponse.timeComplexity}</span>
            </div>
            <div className="complexity-item">
              <span className="label">Space Complexity</span>
              <span className="value">{aiResponse.spaceComplexity}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats - Simulated */}
        <div className="result-card stats-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
           <h3 style={{ alignSelf: 'flex-start' }}>Code Health Score</h3>
           <div className="health-gauge" style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-neon-green)', textShadow: 'var(--glow-green)' }}>
              {aiResponse.issues?.length === 0 ? '100%' : aiResponse.issues?.length < 3 ? '85%' : '60%'}
           </div>
           <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Based on Trace.ai heuristics</p>
        </div>
      </div>

      {/* Issues Section */}
      {aiResponse.issues && aiResponse.issues.length > 0 && (
        <div className="result-card issues-card glass-panel">
          <h3>Detected Discrepancies ({aiResponse.issues.length})</h3>
          <div className="issues-list">
            {aiResponse.issues.map((issue, index) => (
              <div key={index} className={`issue-item ${issue.type}`}>
                <div className="issue-header">
                  <span className="issue-icon">{getIssueIcon(issue.type)}</span>
                  <span className="issue-type">{issue.type.replace('-', ' ')}</span>
                </div>
                <div className="issue-details">
                  <p><strong>Description</strong> {issue.description}</p>
                  <p><strong>Heuristic Impact</strong> {issue.impact}</p>
                  <p><strong>Resolution</strong> {issue.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Notes Section */}
      {aiResponse.learningNotes && aiResponse.learningNotes.length > 0 && (
        <div className="result-card learning-card glass-panel">
          <h3>Theory & Best Practices</h3>
          <ul className="learning-notes">
            {aiResponse.learningNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Learning Mode Toggle */}
      {aiResponse.optimizedCode && (
        <div className="learning-mode-toggle">
          <button
            onClick={() => setShowLearningMode(!showLearningMode)}
            className="btn-learning-mode"
          >
            {showLearningMode ? (
              <><span>⇠</span> Hide Comparison</>
            ) : (
              <><span>⇢</span> Launch Learning Mode</>
            )}
          </button>
        </div>
      )}

      {/* Learning Mode Component */}
      {showLearningMode && (
        <div className="learning-mode-wrapper" style={{ marginTop: '24px' }}>
             <LearningMode result={result} />
        </div>
      )}
    </div>
  );
};

export default ReviewResult;
