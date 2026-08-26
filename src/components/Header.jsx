import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Bell, 
  Sparkles, 
  ChevronDown,
  User,
  Sliders,
  LogOut,
  Menu
} from 'lucide-react';

export default function Header({ onBack, onOpenHelp, onOpenNotifications, onOpenToolkit, onToggleMobileSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  return (
    <header className="main-header">
      {/* Left Area: Desktop Breadcrumb vs Mobile Brand */}
      <div className="header-left">
        <button 
          className="header-back-btn" 
          onClick={onBack}
          title="Go back"
          aria-label="Go back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        {/* Desktop Breadcrumb */}
        <div className="header-breadcrumbs desktop-only">
          <div className="breadcrumb-doc-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <span className="breadcrumb-title">Exams</span>
        </div>

        {/* Mobile Brand Title */}
        <div className="mobile-brand-title mobile-only">
          <span>VedaAI</span>
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="header-right">
        {/* Desktop-only Help Icon */}
        <button 
          className="header-icon-btn desktop-only" 
          onClick={onOpenHelp}
          title="Help & Support"
          aria-label="Help"
        >
          <HelpCircle size={19} />
        </button>

        {/* Notifications Icon with dot */}
        <button 
          className="header-icon-btn notification-btn" 
          onClick={() => {
            setUnreadCount(0);
            if (onOpenNotifications) onOpenNotifications();
          }}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={19} strokeWidth={2.2} />
          {unreadCount > 0 && <span className="notification-dot"></span>}
        </button>

        {/* Desktop-only AI Sparks */}
        <button 
          className="header-icon-btn spark-btn desktop-only" 
          onClick={onOpenToolkit}
          title="AI Toolkit"
          aria-label="AI Assistant"
        >
          <Sparkles size={18} className="sparkle-gold" />
        </button>

        {/* User Profile */}
        <div className="profile-dropdown-wrapper">
          <button 
            className="profile-btn" 
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
          >
            <div className="profile-avatar">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Madhur Rastogi" 
                className="profile-img"
              />
            </div>
            <span className="profile-name desktop-only">Madhur Rastogi</span>
            <ChevronDown size={15} className={`chevron-icon desktop-only ${profileOpen ? 'rotated' : ''}`} />
          </button>

          {profileOpen && (
            <div className="profile-menu">
              <div className="profile-menu-header">
                <p className="menu-user-name">Madhur Rastogi</p>
                <p className="menu-user-email">madhur.rastogi@dpsbokaro.edu.in</p>
              </div>
              <div className="menu-divider" />
              <button className="menu-item" onClick={() => setProfileOpen(false)}>
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button className="menu-item" onClick={() => setProfileOpen(false)}>
                <Sliders size={16} />
                <span>Preferences</span>
              </button>
              <div className="menu-divider" />
              <button className="menu-item text-danger" onClick={() => setProfileOpen(false)}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button 
          className="header-icon-btn hamburger-btn mobile-only"
          onClick={onToggleMobileSidebar}
          title="Menu"
          aria-label="Open Menu"
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}
