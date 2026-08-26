import React from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Menu, 
  Wifi, 
  Battery, 
  Lock, 
  RotateCw, 
  Share,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import AvatarHalo from './AvatarHalo';
import UploadCard from './UploadCard';

export default function MobileFrame({
  questionFile,
  answerFile,
  onQuestionUpload,
  onQuestionRemove,
  onAnswerUpload,
  onAnswerRemove,
  onStartMapping,
  isMappingReady
}) {
  return (
    <div className="mobile-device-wrapper">
      <div className="mobile-frame-container">
        {/* iOS Dynamic Island / Status Bar */}
        <div className="mobile-status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor">
              <path d="M0 8.5C0 7.67 0.67 7 1.5 7h1C3.33 7 4 7.67 4 8.5v2C4 11.33 3.33 12 2.5 12h-1C0.67 12 0 11.33 0 10.5v-2zm6-4C6 3.67 6.67 3 7.5 3h1C9.33 3 10 3.67 10 4.5v6c0 .83-.67 1.5-1.5 1.5h-1C6.67 12 6 11.33 6 10.5v-6zm6-4C12 .67 12.67 0 13.5 0h1C15.33 0 16 .67 16 1.5v9c0 .83-.67 1.5-1.5 1.5h-1C12.67 12 12 11.33 12 10.5v-9z"/>
            </svg>
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* Browser URL Bar */}
        <div className="mobile-url-bar">
          <div className="url-chip">
            <Lock size={11} className="lock-icon" />
            <span className="url-text">web-to-figma.design</span>
            <RotateCw size={11} className="reload-icon" />
          </div>
          <button className="browser-share-btn">
            <Share size={13} />
          </button>
        </div>

        {/* Mobile App Header */}
        <div className="mobile-app-header">
          <div className="mobile-header-left">
            <ArrowLeft size={16} />
            <span className="mobile-brand-title">VedaAI</span>
          </div>

          <div className="mobile-header-right">
            <button className="mobile-icon-btn">
              <Bell size={16} />
              <span className="mobile-bell-dot"></span>
            </button>
            <div className="mobile-user-avatar">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Madhur" 
              />
            </div>
            <button className="mobile-icon-btn">
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Main Content Area */}
        <div className="mobile-body-content">
          <div className="mobile-hero-header">
            <h2 className="mobile-main-heading">
              Upload <span className="highlight-text-mobile">Question Paper</span><br />
              <span className="highlight-text-mobile">& Answer Sheets</span>
            </h2>
          </div>

          {/* Teacher Avatar Halo */}
          <div className="mobile-avatar-scale">
            <AvatarHalo />
          </div>

          {/* Dual Stacked Upload Cards */}
          <div className="mobile-cards-stack">
            <UploadCard 
              type="question"
              title="Upload Question Paper"
              highlightText="Question Paper"
              maxSizeMB={10}
              file={questionFile}
              onFileUpload={onQuestionUpload}
              onFileRemove={onQuestionRemove}
              sampleFileName="CBSE_Class10_Maths_QP.pdf"
              sampleFileSize="2.4 MB"
            />

            <UploadCard 
              type="answer"
              title="Upload Answer Sheet"
              highlightText="Answer Sheet"
              maxSizeMB={10}
              file={answerFile}
              onFileUpload={onAnswerUpload}
              onFileRemove={onAnswerRemove}
              sampleFileName="Class10_Student_Answers_Batch1.pdf"
              sampleFileSize="6.8 MB"
            />
          </div>

          {/* Start Mapping CTA */}
          <div className="mobile-cta-section">
            <button 
              className={`start-mapping-btn ${isMappingReady ? 'ready' : 'disabled'}`}
              disabled={!isMappingReady}
              onClick={onStartMapping}
            >
              <span>Start Mapping</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <p className="mobile-helper-text">
              Once both files are uploaded, you'll be able to map answers with questions
            </p>
          </div>
        </div>

        {/* Mobile Bottom Home Bar */}
        <div className="mobile-home-indicator-bar">
          <div className="home-bar-line"></div>
        </div>
      </div>
    </div>
  );
}
