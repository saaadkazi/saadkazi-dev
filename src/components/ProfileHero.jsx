import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
import { profileData } from '../data/profile';

export const ProfileHero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // Smooth fade out -> switch role -> fade in cycle
    const interval = setInterval(() => {
      setFadeState('fade-out');
      
      setTimeout(() => {
        setRoleIndex((prevIndex) => (prevIndex + 1) % profileData.roles.length);
        setFadeState('fade-in');
      }, 350); // Duration of fade-out transition
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Open photo lightbox
  const openViewer = () => {
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close photo lightbox
  const closeViewer = () => {
    setIsViewerOpen(false);
    document.body.style.overflow = '';
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Escape key listener & focus management
  useEffect(() => {
    if (!isViewerOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeViewer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isViewerOpen]);

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openViewer();
    }
  };

  return (
    <section className="profile-hero" aria-label="Profile Details">
      {/* Clickable Profile Image with Refined Gradient Ring */}
      <div className="avatar-ring-container">
        <div className="avatar-gradient-ring">
          <div 
            ref={triggerRef}
            className="avatar-wrapper clickable-avatar"
            onClick={openViewer}
            onKeyDown={handleTriggerKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View ${profileData.name}'s profile photo fullscreen`}
            title="Click to view photo"
          >
            <img 
              src={profileData.avatarUrl} 
              alt={profileData.name} 
              className="avatar-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback" style={{ display: 'none' }}>
              {profileData.logoInitials}
            </div>

            {/* Hover Expand Icon Overlay */}
            <div className="avatar-zoom-overlay" aria-hidden="true">
              <Maximize2 size={22} className="zoom-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Name */}
      <h1 className="profile-name">{profileData.name}</h1>

      {/* Smooth Upward Fade Gradient Role Transition */}
      <div className="role-smooth-wrapper" aria-live="polite">
        <span className={`role-gradient-text ${fadeState}`}>
          {profileData.roles[roleIndex]}
        </span>
      </div>

      {/* Bio / One Line Intro */}
      <p className="profile-bio">{profileData.bio}</p>

      {/* Fullscreen Circular Photo Lightbox Modal */}
      {isViewerOpen && (
        <div 
          className="avatar-lightbox-backdrop"
          onClick={closeViewer}
          role="dialog"
          aria-modal="true"
          aria-label={`${profileData.name}'s circular profile photo viewer`}
        >
          <div 
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              ref={closeBtnRef}
              onClick={closeViewer}
              className="lightbox-close-btn"
              aria-label="Close photo viewer"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
            <div className="lightbox-avatar-gradient-ring">
              <div className="lightbox-avatar-wrapper">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="lightbox-avatar-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
