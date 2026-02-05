import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css'; // Reuse some dashboard styles

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            Trace.ai
          </h1>
          <div className="nav-right">
            <button onClick={() => navigate('/dashboard')} className="btn-logout" style={{ background: 'transparent' }}>
              Dashboard
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
            <h2>Developer Profile</h2>
            <p>Your global standing and performance metrics.</p>
          </div>
        </header>

        <section className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
          {/* User Card */}
          <div className="stat-card glass-panel" style={{ alignItems: 'center', textAlign: 'center', padding: '40px' }}>
            <div className="profile-avatar" style={{ width: '80px', height: '80px', background: 'var(--accent-neon-green)', borderRadius: '50%', fontSize: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', boxShadow: 'var(--glow-green)' }}>
              {user?.username?.[0].toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{user?.username}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{user?.email}</p>
            <div className="rank-badge" style={{ padding: '8px 20px', background: 'rgba(0, 255, 102, 0.1)', color: 'var(--accent-neon-green)', borderRadius: '100px', fontWeight: '800', fontSize: '1.2rem' }}>
              RANK: {user?.stats?.rank || 'D'}
            </div>
          </div>

          {/* Expanded Stats */}
          <div className="stats-details glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '24px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Heuristic Impact Data</h3>
            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div className="detail-item">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>TOTAL REVIEWS</span>
                <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user?.stats?.totalSubmissions || 0}</p>
              </div>
              <div className="detail-item">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>ISSUES RESOLVED</span>
                <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user?.stats?.totalIssuesFound || 0}</p>
              </div>
              <div className="detail-item">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>QUALITY INDEX</span>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-neon-green)' }}>{user?.stats?.averageScore || 0}%</p>
              </div>
              <div className="detail-item">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>ACCOUNT AGE</span>
                <p style={{ fontSize: '1rem', fontWeight: '600' }}>{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="milestones-section" style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border-primary)' }}>
              <h4 style={{ marginBottom: '16px' }}>Performance Milestones</h4>
              <div className="milestone-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="milestone-item" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', opacity: user?.stats?.totalSubmissions >= 1 ? 1 : 0.5 }}>
                  {user?.stats?.totalSubmissions >= 1 ? '✅' : '🔒'} First Trace Analysis Completed
                </div>
                <div className="milestone-item" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', opacity: user?.stats?.averageScore >= 90 ? 1 : 0.5 }}>
                  {user?.stats?.averageScore >= 90 ? '✅' : '🔒'} Elite Quality Baseline Achieved (90%+)
                </div>
                <div className="milestone-item" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', opacity: user?.stats?.totalSubmissions >= 10 ? 1 : 0.5 }}>
                  {user?.stats?.totalSubmissions >= 10 ? '✅' : '🔒'} Persistent Developer Tier (10+ Reviews)
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
