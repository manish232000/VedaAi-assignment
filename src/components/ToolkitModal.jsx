import React from 'react';
import { 
  Sparkles, 
  X, 
  FileCheck, 
  Bot, 
  PenTool, 
  HelpCircle, 
  FileText, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ToolkitModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const tools = [
    {
      title: 'Auto-Rubric Generator',
      desc: 'Create point-by-point marking schemes based on CBSE/ICSE standards.',
      icon: FileCheck,
      badge: 'Popular'
    },
    {
      title: 'Handwriting OCR Enhancer',
      desc: 'Transcribe messy student handwriting with 99.4% mathematical symbol accuracy.',
      icon: Bot,
      badge: 'AI Powered'
    },
    {
      title: 'Plagiarism & Similarity Scanner',
      desc: 'Detect copied answers and unauthorized collusion across student submissions.',
      icon: PenTool,
      badge: 'New'
    },
    {
      title: 'Question Paper Balancing AI',
      desc: 'Analyze Bloom’s taxonomy distribution (Easy, Medium, Hard) for optimal testing.',
      icon: FileText,
      badge: 'Analytics'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="toolkit-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="toolkit-header-title">
            <div className="toolkit-spark-badge">
              <Sparkles size={16} />
              <span>VedaAI Smart Suite</span>
            </div>
            <h2>AI Teacher's Toolkit</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="toolkit-cards-grid">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={i} className="toolkit-card-item">
                <div className="toolkit-card-icon">
                  <Icon size={22} />
                </div>
                <div className="toolkit-card-info">
                  <div className="toolkit-badge-row">
                    <span className="toolkit-tag">{tool.badge}</span>
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="toolkit-modal-footer">
          <button className="btn-primary-orange" onClick={onClose}>
            <span>Explore All Tools</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
