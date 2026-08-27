import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Minus, 
  Plus, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { extractQuestionsFromFile, getDefaultBiologyQuestions } from '../utils/pdfExtractor';

// Configure pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;

export default function EvaluatedView({ questionFile, answerFile }) {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(2);
  const [expandedQuestions, setExpandedQuestions] = useState({ 2: true, 6: false });
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);
  const [allExpanded, setAllExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState('questions'); // 'questions' | 'answers'
  
  // Real PDF & Image States
  const [pdfDoc, setPdfDoc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isRenderingPdf, setIsRenderingPdf] = useState(false);
  const pdfCanvasRef = useRef(null);
  const answerRefs = useRef({});

  // 1. Extract questions from uploaded Question Paper
  useEffect(() => {
    async function loadQuestions() {
      if (questionFile) {
        const extracted = await extractQuestionsFromFile(questionFile);
        if (extracted && extracted.length > 0) {
          setQuestions(extracted);
          setSelectedQuestionId(extracted[0].id);
          setExpandedQuestions({ [extracted[0].id]: true });
          return;
        }
      }
      setQuestions(getDefaultBiologyQuestions());
    }
    loadQuestions();
  }, [questionFile]);

  // 2. Load uploaded Answer Sheet PDF or Image for native Rendering
  useEffect(() => {
    let objectUrl = null;
    async function loadAnswerDocument() {
      if (!answerFile || !answerFile.rawFile) {
        setPdfDoc(null);
        setImageUrl(null);
        setTotalPages(4);
        return;
      }

      const isPdf = answerFile.rawFile.type === 'application/pdf' || answerFile.name?.toLowerCase().endsWith('.pdf');
      const isImg = answerFile.rawFile.type?.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(answerFile.name || '');

      if (isPdf) {
        try {
          const arrayBuffer = await answerFile.rawFile.arrayBuffer();
          const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
          const loadedPdf = await loadingTask.promise;
          setPdfDoc(loadedPdf);
          setImageUrl(null);
          setTotalPages(loadedPdf.numPages || 1);
          setCurrentPage(1);
        } catch (err) {
          console.warn('PDF load notice:', err);
          setPdfDoc(null);
        }
      } else if (isImg) {
        objectUrl = URL.createObjectURL(answerFile.rawFile);
        setImageUrl(objectUrl);
        setPdfDoc(null);
        setTotalPages(1);
        setCurrentPage(1);
      } else {
        setPdfDoc(null);
        setImageUrl(null);
        setTotalPages(4);
      }
    }

    loadAnswerDocument();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [answerFile]);

  // 3. Render PDF page onto Canvas when page or zoom changes
  useEffect(() => {
    let isCancelled = false;
    async function renderPage() {
      if (!pdfDoc || !pdfCanvasRef.current) return;

      try {
        setIsRenderingPdf(true);
        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled) return;

        const canvas = pdfCanvasRef.current;
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: (zoomLevel / 100) * 1.35 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.warn('Render page notice:', err);
      } finally {
        if (!isCancelled) setIsRenderingPdf(false);
      }
    }

    renderPage();
    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, currentPage, zoomLevel]);

  // Auto-scroll when question changes
  useEffect(() => {
    if (selectedQuestionId && answerRefs.current[selectedQuestionId]) {
      answerRefs.current[selectedQuestionId].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedQuestionId, mobileTab]);

  const toggleQuestion = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedQuestionId(id);
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleExpandAll = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    const newExpanded = {};
    questions.forEach(q => {
      newExpanded[q.id] = newState;
    });
    setExpandedQuestions(newExpanded);
  };

  return (
    <div className="evaluated-container-root">
      {/* Mobile Segmented Tab Bar */}
      <div className="mobile-evaluated-tab-bar mobile-only">
        <div className="segmented-tabs-wrapper">
          <button 
            className={`segmented-tab-btn ${mobileTab === 'questions' ? 'active' : ''}`}
            onClick={() => setMobileTab('questions')}
          >
            <span>Questions</span>
          </button>
          <button 
            className={`segmented-tab-btn ${mobileTab === 'answers' ? 'active' : ''}`}
            onClick={() => setMobileTab('answers')}
          >
            <span>Answer Sheet</span>
          </button>
        </div>
      </div>

      <div className={`evaluated-split-container mobile-view-${mobileTab}`}>
        {/* LEFT PANE: Extracted Questions (from uploaded question paper) */}
        <div className="evaluated-left-pane">
          <div className="left-pane-header">
            <h3 className="pane-title">Extracted Questions (from question paper)</h3>
            <button className="expand-all-pill-btn" onClick={toggleExpandAll}>
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          <div className="questions-scroll-list">
            {questions.map((q) => {
              const isSelected = selectedQuestionId === q.id;
              const isExpanded = Boolean(expandedQuestions[q.id]);

              return (
                <div 
                  key={q.id} 
                  className={`evaluated-q-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
                  onClick={(e) => toggleQuestion(q.id, e)}
                >
                  <div className="q-card-top-row">
                    {/* Number Badge */}
                    <div className="q-badge-box">
                      {q.subNumber ? (
                        <div className="sub-q-badge-group">
                          <span className="q-badge-num">{q.subNumber}</span>
                          <span className="q-sub-letter">{q.subLetter}</span>
                        </div>
                      ) : (
                        <span className="q-badge-num">{q.id}</span>
                      )}
                    </div>

                    {/* Question Text */}
                    <p className="q-main-text">{q.text}</p>

                    {/* Score Pill */}
                    <div className={`score-badge-pill score-${q.scoreType}`}>
                      <span>{q.score}</span>
                    </div>

                    {/* Chevron Toggle */}
                    <button 
                      type="button"
                      className="q-chevron-toggle-btn"
                      onClick={(e) => toggleQuestion(q.id, e)}
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Expanded AI Feedback Section matching Figma */}
                  {isExpanded && (
                    <div className="q-expanded-feedback-box" onClick={(e) => e.stopPropagation()}>
                      <h4 className="feedback-heading">AI Feedback</h4>
                      <p className="feedback-body-text">{q.feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANE: Answer Sheet Document Viewer matching Figma */}
        <div className="evaluated-right-pane">
          {/* Dark Top Toolbar */}
          <div className="answer-sheet-toolbar">
            <span className="sheet-toolbar-title">Answer Sheet</span>

            <div className="toolbar-controls-right">
              {/* Zoom Controls */}
              <div className="sheet-pill-control">
                <button 
                  className="pill-ctrl-btn" 
                  onClick={() => setZoomLevel(prev => Math.max(60, prev - 10))}
                  title="Zoom Out"
                >
                  <Minus size={13} />
                </button>
                <span className="pill-ctrl-text">{zoomLevel}%</span>
                <button 
                  className="pill-ctrl-btn" 
                  onClick={() => setZoomLevel(prev => Math.min(160, prev + 10))}
                  title="Zoom In"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Page Navigation */}
              <div className="sheet-pill-control">
                <button 
                  className="pill-ctrl-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="pill-ctrl-text">Page {currentPage} of {totalPages}</span>
                <button 
                  className="pill-ctrl-btn" 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  title="Next Page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Paper Canvas or Uploaded Document Viewport */}
          <div className="sheet-canvas-viewport">
            {pdfDoc ? (
              /* Actual Uploaded Student PDF Rendered cleanly */
              <div className="uploaded-pdf-sheet-wrapper">
                <div className="pdf-canvas-overlay-container">
                  <canvas ref={pdfCanvasRef} className="native-pdf-canvas" />
                </div>
              </div>
            ) : imageUrl ? (
              /* Actual Uploaded Student Image */
              <div className="uploaded-image-sheet-wrapper" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
                <img src={imageUrl} alt="Uploaded Answer Sheet" className="native-answer-image" />
              </div>
            ) : (
              /* High-Fidelity Lined Paper Document Simulation */
              <div 
                className="lined-paper-document"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                <div className="paper-margin-line"></div>

                {/* ===== Q1 ANSWER BLOCK ===== */}
                <div 
                  ref={el => answerRefs.current[1] = el}
                  className={`handwritten-block ${selectedQuestionId === 1 ? 'mapped-highlight-zone active-zone' : ''}`}
                >
                  {selectedQuestionId === 1 && <div className="mapped-zone-tag">Q1</div>}
                  <div className="handwritten-q-num">Q1.</div>
                  <div className="handwritten-content">
                    <p className="hw-text">
                      Photosynthesis is the process used by green plants and some other organisms to convert light energy into chemical energy.
                    </p>

                    <div className="hw-equation-box">
                      <span className="hw-eq-text">
                        6CO₂ + 6H₂O <span className="eq-arrow-label"><span>Light</span><span>Chlorophyll</span> → </span> C₆H₁₂O₆ + 6O₂
                      </span>
                    </div>

                    {/* Diagram */}
                    <div className="hw-diagram-container">
                      <div className="diagram-sun">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="5" fill="#FEF08A" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                        <span className="diagram-label">Sunlight</span>
                      </div>

                      <div className="diagram-plant">
                        <svg width="120" height="110" viewBox="0 0 120 110" fill="none" stroke="#1E40AF" strokeWidth="1.5">
                          <path d="M60 40 L60 85" strokeWidth="2.5" />
                          <path d="M60 55 C40 50 35 35 48 38 C55 42 58 50 60 55Z" fill="#DCFCE7" />
                          <path d="M60 50 C80 45 85 30 72 33 C65 37 62 45 60 50Z" fill="#DCFCE7" />
                          <line x1="30" y1="85" x2="90" y2="85" strokeDasharray="3 3" />
                          <path d="M60 85 L50 102 M60 85 L60 105 M60 85 L70 100 M55 92 L45 96 M65 92 L75 97" strokeWidth="1.2" />
                        </svg>
                      </div>

                      <div className="diagram-annotation left-ann">
                        <span>Carbon<br />dioxide</span>
                        <svg width="30" height="12" viewBox="0 0 30 12">
                          <line x1="0" y1="6" x2="25" y2="6" stroke="#1E40AF" strokeWidth="1.2" />
                          <polyline points="20 2 26 6 20 10" fill="none" stroke="#1E40AF" strokeWidth="1.2" />
                        </svg>
                      </div>

                      <div className="diagram-annotation right-ann">
                        <svg width="30" height="12" viewBox="0 0 30 12">
                          <line x1="5" y1="6" x2="30" y2="6" stroke="#1E40AF" strokeWidth="1.2" />
                          <polyline points="24 2 30 6 24 10" fill="none" stroke="#1E40AF" strokeWidth="1.2" />
                        </svg>
                        <span>Oxygen</span>
                      </div>

                      <div className="diagram-annotation bottom-ann">
                        <span>Water</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== Q2 ANSWER BLOCK WITH GREEN BOUNDING BOX & FIGMA ANONYMOUS TAG ===== */}
                <div 
                  ref={el => answerRefs.current[2] = el}
                  className={`handwritten-block mapped-highlight-zone ${selectedQuestionId === 2 ? 'active-zone' : ''}`}
                >
                  <div className="mapped-zone-tag">Q2</div>

                  <div className="handwritten-q-num">Q2.</div>
                  <div className="handwritten-content">
                    <p className="hw-text">
                      The process mainly occurs in the chloroplast of the plant cell. It has two main stages:
                    </p>
                    <p className="hw-subtext">
                      1. Light reaction – Captures light energy.
                    </p>
                    <p className="hw-subtext">
                      2. Dark reaction – Uses energy to make glucose.
                    </p>
                  </div>
                </div>

                <div className="paper-divider-scan"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
