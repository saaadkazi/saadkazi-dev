import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profile';

export const EmailQuickAction = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profileData.email);
      } else {
        // Robust fallback for headless browsers or HTTP environments
        const textArea = document.createElement('textarea');
        textArea.value = profileData.email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback failed silently
    }
  };

  return (
    <div className="email-action-container">
      <div className="email-pill">
        <a 
          href={profileData.emailUrl} 
          className="email-link"
          aria-label={`Send email to ${profileData.email}`}
          title="Click to compose email"
        >
          <Mail size={16} className="email-icon" aria-hidden="true" />
          <span className="email-address">{profileData.email}</span>
        </a>
        
        <button
          type="button"
          onClick={handleCopy}
          className={`btn-copy ${copied ? 'copied' : ''}`}
          aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
          title={copied ? "Copied!" : "Copy email"}
        >
          {copied ? (
            <>
              <Check size={14} className="copy-icon check" />
              <span className="copy-text">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} className="copy-icon" />
              <span className="copy-text">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
