import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AvatarHalo from './components/AvatarHalo';
import UploadCard from './components/UploadCard';
import ExtractingView from './components/ExtractingView';
import EvaluatedView from './components/EvaluatedView';
import ToolkitModal from './components/ToolkitModal';
import { CheckCircle2 } from 'lucide-react';
import './App.css';

export default function App() {
  // Navigation & Screen States
  const [currentScreen, setCurrentScreen] = useState('upload'); // 'upload' | 'extracting' | 'evaluated'
  const [activeTab, setActiveTab] = useState('exams');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Upload Files State
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  
  // Modals & Popups
  const [isToolkitModalOpen, setIsToolkitModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Auto-transition from Extracting to Evaluated after brief simulation
  useEffect(() => {
    let timer;
    if (currentScreen === 'extracting') {
      timer = setTimeout(() => {
        setCurrentScreen('evaluated');
      }, 2200);
    }
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleQuestionUpload = (fileData) => {
    setQuestionFile(fileData);
    if (answerFile) {
      showToast('Both files uploaded! Ready to start mapping.');
    }
  };

  const handleQuestionRemove = () => {
    setQuestionFile(null);
  };

  const handleAnswerUpload = (fileData) => {
    setAnswerFile(fileData);
    if (questionFile) {
      showToast('Both files uploaded! Ready to start mapping.');
    }
  };

  const handleAnswerRemove = () => {
    setAnswerFile(null);
  };

  const handleStartMapping = () => {
    if (!questionFile || !answerFile) return;
    setCurrentScreen('extracting');
    setSidebarCollapsed(true);
  };

  const handleHeaderBack = () => {
    if (currentScreen === 'evaluated' || currentScreen === 'extracting') {
      setCurrentScreen('upload');
      setSidebarCollapsed(false);
    } else {
      showToast('Navigated back');
    }
  };

  const isMappingReady = Boolean(questionFile && answerFile);

  return (
    <div className="app-root-container">
      {/* Desktop & Mobile Layout */}
      <div className={`desktop-layout-wrapper screen-${currentScreen}`}>
        {/* Left Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          onOpenToolkit={() => setIsToolkitModalOpen(true)}
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className={`main-content-layout screen-${currentScreen}-layout`}>
          {/* Top Header */}
          <Header 
            onBack={handleHeaderBack}
            onOpenHelp={() => showToast('Help & Support')}
            onOpenNotifications={() => showToast('No new notifications')}
            onOpenToolkit={() => setIsToolkitModalOpen(true)}
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />

          {/* Main Content Render */}
          {currentScreen === 'upload' && (
            <div className="content-card-canvas">
              {/* Hero Title Section */}
              <div className="upload-hero-section">
                <h1 className="hero-main-title">
                  Upload <span className="hero-title-highlight">Question Paper & Answer Sheets</span>
                </h1>
                <p className="hero-subtitle">
                  Upload both files to get started
                </p>
              </div>

              {/* Central Teacher Avatar with Halo */}
              <div className="hero-avatar-wrapper">
                <AvatarHalo />
              </div>

              {/* Dual Upload Cards Section */}
              <div className="dual-upload-cards-grid">
                <UploadCard 
                  type="question"
                  title="Upload Question Paper"
                  highlightText="Question Paper"
                  maxSizeMB={10}
                  file={questionFile}
                  onFileUpload={handleQuestionUpload}
                  onFileRemove={handleQuestionRemove}
                />

                <UploadCard 
                  type="answer"
                  title="Upload Answer Sheet"
                  highlightText="Answer Sheet"
                  maxSizeMB={10}
                  file={answerFile}
                  onFileUpload={handleAnswerUpload}
                  onFileRemove={handleAnswerRemove}
                />
              </div>

              {/* Action CTA Button & Helper Note */}
              <div className="hero-action-footer">
                <button 
                  className={`start-mapping-cta-btn ${isMappingReady ? 'enabled' : 'disabled'}`}
                  disabled={!isMappingReady}
                  onClick={handleStartMapping}
                >
                  <span>Start Mapping</span>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <p className="footer-helper-note">
                  Once both files are uploaded, you'll be able to map answers with questions
                </p>
              </div>
            </div>
          )}

          {currentScreen === 'extracting' && (
            <div className="content-card-canvas" onClick={() => setCurrentScreen('evaluated')}>
              <ExtractingView />
            </div>
          )}

          {currentScreen === 'evaluated' && (
            <EvaluatedView 
              questionFile={questionFile} 
              answerFile={answerFile} 
            />
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="app-toast-alert">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* AI Teacher's Toolkit Modal */}
      <ToolkitModal 
        isOpen={isToolkitModalOpen} 
        onClose={() => setIsToolkitModalOpen(false)} 
      />
    </div>
  );
}
