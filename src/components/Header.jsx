import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Download, Share2, UserPlus, MoreHorizontal, Check } from 'lucide-react';
import { profileData, downloadVCard } from '../data/profile';

export const Header = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const menuRef = useRef(null);

  // Scroll listener for sticky floating header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside & Escape key listeners to close dropdown menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleShare = async () => {
    setMenuOpen(false);
    const shareData = {
      title: profileData.name,
      text: `Check out ${profileData.name}'s profile`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share dialog
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(window.location.href);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2400);
      } catch {
        // Fallback failed silently
      }
    }
  };

  const handleSaveContact = () => {
    setMenuOpen(false);
    downloadVCard();
  };

  return (
    <header className={`top-bar ${isScrolled ? 'scrolled-pill' : ''}`} aria-label="Main Navigation">
      {/* Left: Original Simple SK Circle Logo & Saad Kazi */}
      <div className="brand-group">
        <div className="logo-badge" aria-hidden="true">
          {profileData.logoInitials}
        </div>
        <span className="brand-name">{profileData.name}</span>
      </div>

      {/* Right Actions: Resume | Theme | More */}
      <div className="header-actions">
        {/* Resume Download Button */}
        <a 
          href={profileData.resumeUrl} 
          download="Saad_Kazi_Resume.pdf"
          className="btn-resume"
          aria-label="Download Saad Kazi's Resume"
        >
          <Download size={14} className="btn-icon" />
          <span>Resume</span>
        </a>

        {/* Theme Toggle Button */}
        <button 
          type="button"
          onClick={toggleTheme} 
          className="btn-theme-toggle" 
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <Moon size={17} className="theme-icon" />
          ) : (
            <Sun size={17} className="theme-icon" />
          )}
        </button>

        {/* More Dropdown Menu Toggle */}
        <div className="more-menu-wrapper" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`btn-more-toggle ${menuOpen ? 'active' : ''}`}
            aria-label="More options"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            title="More Options"
          >
            <MoreHorizontal size={18} className="more-icon" />
          </button>

          {/* Floating Glass Dropdown Menu */}
          {menuOpen && (
            <div className="more-dropdown-menu" role="menu" aria-label="More options menu">
              <button
                type="button"
                onClick={handleSaveContact}
                className="dropdown-item"
                role="menuitem"
              >
                <UserPlus size={15} className="dropdown-icon" />
                <span>Save Contact</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="dropdown-item"
                role="menuitem"
              >
                {copiedShare ? (
                  <>
                    <Check size={15} className="dropdown-icon check" />
                    <span>Link copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={15} className="dropdown-icon" />
                    <span>Share Profile</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

