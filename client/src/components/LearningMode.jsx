import '../styles/LearningMode.css';

/**
 * Learning Mode Component
 * Shows "Before vs After" comparison in a high-fidelity terminal environment
 */

const LearningMode = ({ result }) => {
  const { aiResponse } = result;

  return (
    <div className="learning-mode glass-panel">
      <div className="learning-header">
        <h3>TRACE.AI LEARNING MODE</h3>
        <p className="learning-intro">
          Parallel analysis of source code vs optimized heuristic patterns.
        </p>
      </div>

      <div className="code-comparison">
        <div className="code-column">
          <h4>SOURCE SEQUENCE</h4>
          <pre className="code-block">
            <code>{result.originalCode || '// No source available'}</code>
          </pre>
        </div>

        <div className="code-column">
          <h4>EVOLVED PATTERN</h4>
          <pre className="code-block" style={{ borderColor: 'var(--accent-neon-green)' }}>
            <code>{aiResponse.optimizedCode || '// No optimization available'}</code>
          </pre>
        </div>
      </div>

      {aiResponse.issues && aiResponse.issues.length > 0 && (
        <div className="changes-explanation">
          <h4>Evolution Logic: Delta Report</h4>
          <div className="explanation-list">
            {aiResponse.issues.map((issue, index) => (
              <div key={index} className="explanation-item">
                <div className="explanation-number">{index + 1}</div>
                <div className="explanation-content">
                  <p className="explanation-title"><strong>{issue.description}</strong></p>
                  <div className="explanation-details">
                    <p className="explanation-why">
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>RATIONALE:</span> {issue.impact}
                    </p>
                    <p className="explanation-how">
                      <span style={{ color: 'var(--accent-neon-blue)', fontSize: '0.8rem', textTransform: 'uppercase' }}>RESOLUTION:</span> {issue.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningMode;
