import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Store, LineChart, LogOut, Settings } from 'lucide-react';
import './MainLayout.css';

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/onboarding');
  };

  return (
    <div className="main-layout flex">
      {/* Sidebar */}
      <aside className="sidebar flex flex-col glass-panel">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon flex items-center justify-center">
              <span className="text-gradient font-bold">AI</span>
            </div>
            <h2 className="logo-text">TAMOC <span className="text-muted">Pro</span></h2>
          </div>
        </div>

        <nav className="sidebar-nav flex flex-col gap-2">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} />
            <span>Gösterge Paneli</span>
          </NavLink>
          
          <NavLink to="/ad-creative" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Megaphone size={20} />
            <span>Reklam Kreatifi</span>
          </NavLink>

          <NavLink to="/store-dev" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Store size={20} />
            <span>Mağaza Geliştirme</span>
          </NavLink>

          <NavLink to="/competitor-analysis" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LineChart size={20} />
            <span>Rakip Analizi</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer mt-auto">
          <button className="nav-item w-full" onClick={() => alert('Settings')}>
            <Settings size={20} />
            <span>Ayarlar</span>
          </button>
          <button className="nav-item w-full text-danger mt-4" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar flex justify-between items-center glass-panel">
          <div className="user-greeting">
            <h3 className="m-0">Merhaba, Mağaza Sahibi 👋</h3>
            <p className="text-muted text-sm m-0">Bugün pazarlama stratejin nasıl gidiyor?</p>
          </div>
          <div className="user-profile flex items-center gap-4">
            <div className="notification-bell btn-icon">
              <span className="indicator"></span>
              🔔
            </div>
            <div className="avatar">
              <span>MS</span>
            </div>
          </div>
        </header>

        <div className="content-area animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
