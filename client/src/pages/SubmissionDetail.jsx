import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '../services/api';
import ReviewResult from '../components/ReviewResult';
import '../styles/SubmissionDetail.css';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Chat State
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your Trace.ai Consultant. Do you have any questions about this review?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getSubmission(id);
      setSubmission(response.data.data.submission);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch submission details');
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await reviewAPI.chatWithConsultant(id, userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response.data.data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having trouble connecting to the brain. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="submission-detail-container">
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

      <div className="submission-detail-content">
        <div className="submission-main">
          {loading && <div className="loading">Retrieving source data...</div>}
          {error && <div className="error-message">{error}</div>}

          {submission && (
            <>
              <div className="submission-meta">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="back-button"
                >
                  ← Back to Center
                </button>
                <div className="meta-info">
                  <span className="lang-badge">{submission.language}</span>
                  <span className="submission-date">
                    {new Date(submission.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="original-code-section">
                <h3>Source Context</h3>
                <div className="editor-wrapper glass-panel" style={{ padding: '20px', borderRadius: '12px' }}>
                  <pre className="code-block" style={{ margin: 0, border: 'none' }}>
                    <code style={{ background: 'transparent' }}>{submission.originalCode}</code>
                  </pre>
                </div>
              </div>

              {submission.status === 'completed' && submission.aiResponse && (
                <ReviewResult result={submission} />
              )}

              {submission.status === 'failed' && (
                <div className="error-message">
                  Trace sequence failed: {submission.errorMessage}
                </div>
              )}
            </>
          )}
        </div>

        {/* AI Consultant Sidebar */}
        <aside className="consultant-sidebar">
          <div className="consultant-card glass-panel">
            <div className="consultant-header">
              <div className="consultant-avatar">🤖</div>
              <div className="consultant-title">
                <h4>AI Consultant</h4>
                <p>ONLINE • CONTEXTUAL</p>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && <div className="typing-indicator">Consultant is thinking...</div>}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-area">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about this review..."
                className="chat-input"
              />
              <button type="submit" className="btn-send" disabled={!inputMessage.trim() || isTyping}>
                <span>➤</span>
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SubmissionDetail;
