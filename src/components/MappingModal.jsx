import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  FileText, 
  Bot, 
  BarChart3, 
  Award,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MappingModal({ isOpen, onClose, questionFile, answerFile }) {
  const [step, setStep] = useState('processing'); // 'processing' | 'ready'
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    if (isOpen) {
      setStep('processing');
      setProgress(10);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            setTimeout(() => {
              setStep('ready');
              try {
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              } catch (e) {
                // ignore
              }
            }, 300);
            return 100;
          }
          return prev + 15;
        });
      }, 180);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mockQuestions = [
    {
      id: 'Q1',
      type: 'Section A - 2 Marks',
      text: 'Find the roots of the quadratic equation 2x² - 5x + 3 = 0 using factorization method.',
      mappedStatus: 'Matched',
      confidence: '99.4%',
      detectedAnswers: 28,
      rubric: '1 mark for splitting middle term, 1 mark for both correct roots (x=1, x=3/2)'
    },
    {
      id: 'Q2',
      type: 'Section A - 3 Marks',
      text: 'Prove that √5 is an irrational number using the method of contradiction.',
      mappedStatus: 'Matched',
      confidence: '98.8%',
      detectedAnswers: 28,
      rubric: '1 mark for assumption setup, 1.5 marks for p/q algebra, 0.5 marks for contradiction conclusion'
    },
    {
      id: 'Q3',
      type: 'Section B - 5 Marks',
      text: 'From the top of a 75m high lighthouse, the angles of depression of two ships are 30° and 45°. Find the distance between the two ships.',
      mappedStatus: 'Matched',
      confidence: '97.2%',
      detectedAnswers: 27,
      rubric: '1 mark for geometric diagram, 2 marks for tan(45°) & tan(30°) equations, 2 marks for final distance calculation'
    },
    {
      id: 'Q4',
      type: 'Section C - 4 Marks (Case Study)',
      text: 'A metal cylinder has height 14cm and radius 3.5cm. Calculate the total surface area and the cost of painting at ₹15 per cm².',
      mappedStatus: 'Matched',
      confidence: '99.1%',
      detectedAnswers: 28,
      rubric: '2 marks for TSA formula & computation, 2 marks for cost multiplication'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-badge-sparkle">
              <Sparkles size={16} className="sparkle-gold" />
              <span>VedaAI Auto-Mapping Engine</span>
            </div>
            <h2 className="modal-title">Question Paper & Answer Sheet Mapping</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {step === 'processing' ? (
            <div className="modal-processing-state">
              <div className="processing-orb">
                <div className="orb-ring ring-1"></div>
                <div className="orb-ring ring-2"></div>
                <div className="orb-icon">
                  <Bot size={36} color="#FF5A22" />
                </div>
              </div>
              <h3 className="processing-title">Aligning Question Paper with Answer Sheets</h3>
              <p className="processing-desc">
                Extracting OCR bounding boxes, splitting question sections, and matching student response zones...
              </p>

              <div className="processing-progress-wrapper">
                <div className="processing-progress-bar">
                  <div className="processing-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="processing-count">{progress}% Complete</span>
              </div>

              <div className="processing-steps-list">
                <div className={`step-item ${progress > 20 ? 'done' : 'active'}`}>
                  <CheckCircle2 size={16} />
                  <span>Reading {questionFile?.name || 'Question Paper'}</span>
                </div>
                <div className={`step-item ${progress > 60 ? 'done' : progress > 20 ? 'active' : ''}`}>
                  <CheckCircle2 size={16} />
                  <span>Segmenting {answerFile?.name || 'Answer Sheets'}</span>
                </div>
                <div className={`step-item ${progress >= 95 ? 'done' : progress > 60 ? 'active' : ''}`}>
                  <CheckCircle2 size={16} />
                  <span>Generating AI Scoring Rubric & Confidence Matrix</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-ready-state">
              {/* Summary Stats Banner */}
              <div className="mapping-stats-banner">
                <div className="stat-card">
                  <span className="stat-num">4 / 4</span>
                  <span className="stat-label">Questions Detected</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">28</span>
                  <span className="stat-label">Student Answer Sheets</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">98.6%</span>
                  <span className="stat-label">AI Confidence Score</span>
                </div>
                <div className="stat-card stat-accent">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Auto-Mapped</span>
                </div>
              </div>

              {/* Mapped Questions List */}
              <div className="mapped-questions-container">
                <div className="mapped-list-header">
                  <h4>Detected Questions & Automated Rubrics</h4>
                  <span className="sync-badge">✓ All Sheets Synchronized</span>
                </div>

                <div className="questions-grid">
                  {mockQuestions.map((q) => (
                    <div key={q.id} className="mapped-question-item">
                      <div className="question-item-top">
                        <div className="q-tag-group">
                          <span className="q-id-pill">{q.id}</span>
                          <span className="q-section-pill">{q.type}</span>
                        </div>
                        <span className="q-confidence-pill">
                          <Sparkles size={12} /> {q.confidence} match
                        </span>
                      </div>
                      <p className="q-text">{q.text}</p>
                      <div className="q-rubric-box">
                        <strong>Evaluation Rubric:</strong> {q.rubric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {step === 'ready' && (
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Back to Upload
            </button>
            <button className="btn-primary-orange" onClick={() => alert('Starting AI Auto-Grading & Evaluation process!')}>
              <span>Start AI Auto-Grading</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
