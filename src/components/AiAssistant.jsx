import React, { useState, useEffect } from 'react';
import { Sparkles, X, Bot } from 'lucide-react';

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Bottom-Right Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="ai-trigger-orb"
        aria-label="Ask about Saad - AI Assistant Coming Soon"
        title="Ask about Saad"
      >
        <div className="ai-orb-glow" aria-hidden="true" />
        <Sparkles size={16} className="ai-sparkle-icon" />
        <span className="ai-trigger-label">Ask about Saad</span>
      </button>

      {/* Bottom-Sheet / Compact Panel Placeholder */}
      {isOpen && (
        <div className="ai-panel-overlay" onClick={() => setIsOpen(false)}>
          <div 
            className="ai-panel-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="ai-dialog-title"
            aria-modal="true"
          >
            <div className="ai-panel-header">
              <div className="ai-badge-group">
                <Bot size={18} className="ai-bot-icon" />
                <h3 id="ai-dialog-title" className="ai-panel-title">Saad's AI Assistant</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ai-close-btn"
                aria-label="Close AI panel"
              >
                <X size={16} />
              </button>
            </div>

            <div className="ai-panel-body">
              <div className="ai-coming-soon-badge">Coming Soon</div>
              <p className="ai-panel-text">
                Personal AI assistant coming soon.
              </p>
              <p className="ai-panel-subtext">
                Soon you'll be able to ask questions about Saad's projects, technical skills, background, and experience directly.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

