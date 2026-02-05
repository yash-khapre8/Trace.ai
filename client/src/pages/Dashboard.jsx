import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getHistory(currentPage, 6);
      setSubmissions(response.data.data.submissions);
      setTotalPages(response.data.data.pagination.pages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch submissions');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalIssuesCount = () => {
    return submissions.reduce((acc, sub) => acc + (sub.aiResponse?.issues?.length || 0), 0);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1>Trace.ai</h1>
          <div className="nav-right">
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

      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h2>Command Center</h2>
            <p>Monitor your code intelligence and repository health.</p>
          </div>
          <button
            onClick={() => navigate('/submit')}
            className="btn-new-submission"
          >
            <span className="plus-icon">+</span>
            New Code Review
          </button>
        </header>

        {/* Global Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card glass-panel">
            <span className="stat-label">Total Submissions</span>
            <span className="stat-value">{user?.stats?.totalSubmissions || 0}</span>
            <span className="stat-trend neutral">All time activity</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-label">Issues Detected</span>
            <span className="stat-value">{user?.stats?.totalIssuesFound || 0}</span>
            <span className="stat-trend positive">↑ Improving quality</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">{user?.stats?.averageScore || 0}%</span>
            <span className="stat-trend positive">Quality Index</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-label">Developer Rank</span>
            <span className="stat-value">{user?.stats?.rank || 'D'}</span>
            <span className="stat-trend positive">Global standing</span>
          </div>
        </section>

        <section className="submissions-section">
          <div className="submissions-section-header">
            <h3>Recent Activity</h3>
          </div>

          {loading && <div className="loading">Initializing system logs...</div>}
          {error && <div className="error-message">{error}</div>}

          {!loading && submissions.length === 0 && (
            <div className="empty-state">
              <h3>Empty Repository</h3>
              <p>You haven't submitted any code for trace analysis yet.</p>
              <button
                onClick={() => navigate('/submit')}
                className="btn-new-submission"
                style={{ margin: '0 auto' }}
              >
                Launch First Review
              </button>
            </div>
          )}

          {!loading && submissions.length > 0 && (
            <>
              <div className="submissions-list">
                {submissions.map((submission) => (
                  <div
                    key={submission._id}
                    className="submission-card glass-card"
                    onClick={() => navigate(`/submission/${submission._id}`)}
                  >
                    <div className="card-header">
                      <span className="lang-badge">{submission.language}</span>
                      <div className="status-indicator">
                        <div className="dot-pulse"></div>
                        <span>ANALYZED</span>
                      </div>
                    </div>

                    <div className="card-body">
                      <p>{submission.aiResponse?.summary || 'Code analysis pending...'}</p>
                    </div>

                    <div className="card-footer">
                      <span className="submission-date">{formatDate(submission.createdAt)}</span>
                      <span className="issue-count">
                        {submission.aiResponse?.issues?.length || 0} issues
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn-logout"
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-logout"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
