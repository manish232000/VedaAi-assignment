import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  FileSpreadsheet, 
  Bookmark, 
  Settings, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeftOpen,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed, 
  onOpenToolkit,
  isMobileOpen,
  onCloseMobile
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'classroom', label: 'My Classroom', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: FileSpreadsheet },
    { id: 'library', label: 'My Library', icon: Bookmark },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {isMobileOpen && <div className="sidebar-mobile-backdrop" onClick={onCloseMobile} />}
      <aside className={`sidebar-container ${collapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-logo" onClick={() => handleNavClick('exams')}>
            <div className="brand-icon-box">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#121417" />
                <path d="M9 10L16 23L23 10H19.5L16 17.5L12.5 10H9Z" fill="white" />
                <circle cx="16" cy="10" r="2.5" fill="#FF5A22" />
              </svg>
            </div>
            {(!collapsed || isMobileOpen) && <span className="brand-title">Veda<span className="brand-title-bold">AI</span></span>}
          </div>
          <button 
            className="collapse-toggle-btn desktop-only" 
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            <div className="sidebar-toggle-icon">
              <div className="toggle-bar"></div>
              <div className="toggle-pane"></div>
            </div>
          </button>
        </div>

        {/* AI Teacher's Toolkit Pill */}
        <div className="sidebar-toolkit-wrapper">
          <button 
            className="ai-toolkit-btn" 
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onOpenToolkit();
            }}
            title="AI Teacher's Toolkit"
          >
            <div className="toolkit-spark-icon">
              <Sparkles size={15} className="sparkle-svg" />
            </div>
            {(!collapsed || isMobileOpen) && <span className="toolkit-text">AI Teacher's Toolkit</span>}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    title={item.label}
                  >
                    <Icon size={18} className="nav-icon" />
                    {(!collapsed || isMobileOpen) && <span className="nav-label">{item.label}</span>}
                    {(!collapsed || isMobileOpen) && isActive && <div className="active-indicator" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section: Settings & School Info */}
        <div className="sidebar-footer">
          <button 
            className={`nav-link settings-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('settings')}
            title="Settings"
          >
            <Settings size={18} className="nav-icon" />
            {(!collapsed || isMobileOpen) && <span className="nav-label">Settings</span>}
          </button>

          {collapsed && !isMobileOpen && (
            <button 
              className="bottom-expand-btn desktop-only" 
              onClick={() => setCollapsed(false)}
              title="Expand sidebar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
