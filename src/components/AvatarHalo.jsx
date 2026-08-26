import React from 'react';
import teacherAvatarImg from '../assets/teacher_avatar.jpg';

export default function AvatarHalo() {
  return (
    <div className="avatar-halo-container">
      {/* Outer Glowing Halo Rings */}
      <div className="halo-ring-outer"></div>
      <div className="halo-ring-middle"></div>
      
      {/* Mini Circular Accent Badges */}
      <div className="halo-badge badge-top-right">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        </svg>
      </div>
      <div className="halo-badge badge-left">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div className="halo-badge badge-right">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        </svg>
      </div>
      <div className="halo-badge badge-bottom-left">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="6"></circle>
        </svg>
      </div>

      {/* Main Avatar Circle */}
      <div className="avatar-circle-wrapper">
        <img 
          src={teacherAvatarImg} 
          alt="AI Teacher Assistant" 
          className="avatar-image"
        />
      </div>
    </div>
  );
}
