import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '../services/api';
import CodeEditor from '../components/CodeEditor';
import ReviewResult from '../components/ReviewResult';
import '../styles/SubmitCode.css';

const SubmitCode = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState('// Past your logic here for AI-powered trace review\n');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!code.trim() || code.trim().includes('// Past your logic here')) {
      setError('Please provide code for analysis');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await reviewAPI.submitCode({ code, language });
      const { userStats } = response.data.data;
      
      // Update global user state with new stats
      if (userStats && user) {
        updateUser({
          ...user,
          stats: userStats
        });
      }
      
      setResult(response.data.data);
      setLoading(false);
      // Auto-scroll to results
      setTimeout(() => {
        const resultSection = document.querySelector('.result-section');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Trace sequence failed. Check API status.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode('// Past your logic here for AI-powered trace review\n');
    setResult(null);
    setError('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="submit-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            Trace.ai
          </h1>
          <div className="nav-right">
            <button onClick={() => navigate('/dashboard')} className="btn-logout" style={{ background: 'transparent' }}>
              Dashboard
            </button>
            <button onClick={() => navigate('/profile')} className="btn-logout" style={{ background: 'transparent' }}>
              Profile
            </button>
            <span className="user-name">Terminal: {user?.username}</span>
            <button onClick={handleLogout} className="btn-logout">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="submit-content">
        <div className="editor-section">
          <header className="editor-header">
            <h2>Source Terminal</h2>
            <div className="editor-controls">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="go">Go</option>
                <option value="cpp">C++</option>
              </select>
              <button
                onClick={handleReset}
                className="btn-reset"
                disabled={loading}
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="btn-trace"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader"></span>
                    Tracing...
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    Review Code
                  </>
                )}
              </button>
            </div>
          </header>

          {error && <div className="error-message">{error}</div>}

          <div className="editor-wrapper glass-panel" style={{ padding: '2px', borderRadius: '12px' }}>
            <CodeEditor value={code} onChange={setCode} language={language} />
          </div>
        </div>

        {result && (
          <div className="result-section">
            <ReviewResult result={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitCode;
