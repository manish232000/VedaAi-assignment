import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  X, 
  Eye, 
  AlertCircle,
  FileCheck,
  Sparkles
} from 'lucide-react';

export default function UploadCard({
  type = 'question', // 'question' | 'answer'
  title = 'Upload Question Paper',
  highlightText = 'Question Paper',
  maxSizeMB = 10,
  file,
  onFileUpload,
  onFileRemove,
  sampleFileName,
  sampleFileSize
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateAndProcessFile = (selectedFile) => {
    setErrorMessage('');
    if (!selectedFile) return;

    // Check size
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setErrorMessage(`File exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    // Simulate smooth upload progress
    setIsUploading(true);
    setUploadProgress(15);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            const mbSize = selectedFile.size / (1024 * 1024);
            const formattedSize = mbSize >= 1 ? `${Math.round(mbSize)}MB` : `${(selectedFile.size / 1024).toFixed(0)}KB`;
            onFileUpload({
              name: selectedFile.name,
              size: formattedSize,
              pages: type === 'question' ? '2 Pages' : '6 Pages',
              rawFile: selectedFile,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }, 200);
          return 100;
        }
        return prev + 30;
      });
    }, 80);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleLoadSample = (e) => {
    e.stopPropagation();
    setIsUploading(true);
    setUploadProgress(20);
    setTimeout(() => {
      setUploadProgress(70);
      setTimeout(() => {
        setIsUploading(false);
        onFileUpload({
          name: sampleFileName || (type === 'question' ? 'CBSE_Class10_Maths_MidTerm_2026.pdf' : 'Class10_Maths_AnswerSheets_BatchA.pdf'),
          size: sampleFileSize || (type === 'question' ? '2.4 MB' : '6.8 MB'),
          timestamp: 'Just now',
          isSample: true
        });
      }, 200);
    }, 200);
  };

  return (
    <div className="upload-card-wrapper">
      <div 
        className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''} ${isUploading ? 'uploading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && !isUploading && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={title}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
          onChange={handleFileInputChange}
        />

        {!file && !isUploading && (
          <div className="dropzone-empty-state">
            {/* Upload Icon with rounded tray button */}
            <div className="upload-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>

            {/* Title with orange highlight */}
            <div className="dropzone-text-group">
              <h3 className="dropzone-title">
                Upload <span className="highlight-text">{highlightText}</span>
              </h3>
              <p className="dropzone-subtitle">Max {maxSizeMB}MB</p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="dropzone-uploading-state">
            <div className="upload-spinner" />
            <p className="uploading-label">Processing & Validating...</p>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <span className="progress-percentage">{uploadProgress}%</span>
          </div>
        )}

        {file && !isUploading && (
          <div className="uploaded-capsule-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="uploaded-file-capsule">
              {/* Red PDF Icon Badge */}
              <div className="pdf-icon-badge">
                <span className="pdf-badge-text">PDF</span>
              </div>

              {/* File Info */}
              <div className="uploaded-file-details">
                <p className="uploaded-file-title" title={file.name}>
                  {file.name}
                </p>
                <p className="uploaded-file-meta">
                  {file.size} • {file.pages || (type === 'question' ? '2 Pages' : '4 Pages')}
                </p>
              </div>

              {/* Dark Circular Close Button with white border */}
              <button 
                type="button" 
                className="dark-circle-remove-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  onFileRemove();
                }}
                title="Remove file"
                aria-label="Remove file"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="2" x2="10" y2="10"></line>
                  <line x1="10" y1="2" x2="2" y2="10"></line>
                </svg>
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="dropzone-error-badge">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
