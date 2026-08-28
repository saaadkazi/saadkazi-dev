import React, { useState, useRef, useEffect } from 'react';
import { PhoneCall, Check, ChevronRight } from 'lucide-react';
import { profileData } from '../data/profile';

export const SwipeToCall = () => {
  const trackRef = useRef(null);
  const handleRef = useRef(null);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);
  const startXRef = useRef(0);
  const initialDragXRef = useRef(0);

  // Recalculate track bounds on mount & resize
  useEffect(() => {
    const updateMaxDrag = () => {
      if (trackRef.current && handleRef.current) {
        const trackWidth = trackRef.current.clientWidth;
        const handleWidth = handleRef.current.clientWidth;
        setMaxDrag(Math.max(0, trackWidth - handleWidth - 8));
      }
    };

    updateMaxDrag();
    window.addEventListener('resize', updateMaxDrag);
    return () => window.removeEventListener('resize', updateMaxDrag);
  }, []);

  const progress = maxDrag > 0 ? Math.min(1, Math.max(0, dragX / maxDrag)) : 0;

  // Dynamic text based on drag progress
  let dynamicText = "Swipe to call Saad";
  if (hasTriggered || progress >= 0.87) {
    dynamicText = "Opening dialer…";
  } else if (progress >= 0.6) {
    dynamicText = "Keep sliding";
  }

  // Pointer Down (unified Mouse & Touch start)
  const handlePointerDown = (e) => {
    if (hasTriggered) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    initialDragXRef.current = dragX;

    if (e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        // Fallback ignore
      }
    }
  };

  // Pointer Move (unified Mouse & Touch move)
  const handlePointerMove = (e) => {
    if (!isDragging || hasTriggered) return;

    const deltaX = e.clientX - startXRef.current;
    const newDragX = Math.max(0, Math.min(maxDrag, initialDragXRef.current + deltaX));
    setDragX(newDragX);

    // Trigger action if threshold reached (>= 87%)
    if (maxDrag > 0 && newDragX / maxDrag >= 0.87) {
      triggerCall();
    }
  };

  // Pointer Up / Cancel
  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback ignore
      }
    }

    // Soft spring return if threshold not reached
    if (!hasTriggered && dragX / maxDrag < 0.87) {
      setDragX(0);
    }
  };

  const triggerCall = () => {
    setHasTriggered(true);
    setDragX(maxDrag);

    // Short subtle vibration feedback on mobile if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // Ignore if restricted by device/browser
      }
    }

    const sanitizedPhone = profileData.phone.replace(/[^\d+]/g, '');
    
    setTimeout(() => {
      window.location.href = `tel:${sanitizedPhone}`;
    }, 150);

    setTimeout(() => {
      setHasTriggered(false);
      setDragX(0);
    }, 4000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      const nextX = Math.min(maxDrag, dragX + 40);
      setDragX(nextX);
      if (nextX / maxDrag >= 0.87) triggerCall();
    } else if (e.key === 'ArrowLeft') {
      setDragX(Math.max(0, dragX - 40));
    } else if (e.key === 'Enter' || e.key === ' ') {
      triggerCall();
    }
  };

  return (
    <div className="swipe-call-wrapper" aria-label="Swipe to Call Section">
      <div 
        ref={trackRef}
        className={`swipe-track ${hasTriggered ? 'triggered' : ''} ${isDragging ? 'active-drag' : ''}`}
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Swipe right to call Saad Kazi"
        onKeyDown={handleKeyDown}
      >
        {/* Blue-to-purple progress fill following handle */}
        <div 
          className="swipe-progress-fill" 
          style={{ 
            width: `${Math.max(0, dragX + 26)}px`,
            transition: isDragging ? 'none' : 'width 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
          }} 
        />

        {/* Integrated labels inside track */}
        <div 
          className="swipe-track-labels"
          style={{ opacity: hasTriggered ? 0 : Math.max(0, 1 - progress * 1.3) }}
        >
          {/* Center Text with States */}
          <div className="swipe-center-group">
            <span className="swipe-center-text">{dynamicText}</span>
            {progress < 0.6 && !hasTriggered && (
              <div className="swipe-arrows-group">
                <ChevronRight size={13} className="pulse-arrow arrow-1" />
                <ChevronRight size={13} className="pulse-arrow arrow-2" />
              </div>
            )}
          </div>

          {/* Right Phone Number Reveal (Masked -> Full) */}
          <span className="swipe-right-phone">
            {progress > 0.05 ? profileData.displayPhone : "+91 ••••• 40660"}
          </span>
        </div>

        {/* Success message when triggered */}
        {hasTriggered && (
          <div className="swipe-success-text">
            <span>Opening dialer…</span>
          </div>
        )}

        {/* Draggable Circular Phone Handle */}
        <div
          ref={handleRef}
          className={`swipe-handle ${isDragging ? 'dragging' : ''} ${hasTriggered ? 'active' : ''}`}
          style={{
            transform: `translateX(${dragX}px)`,
            transition: isDragging ? 'none' : 'transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {hasTriggered ? (
            <Check size={20} className="handle-icon success" />
          ) : (
            <PhoneCall size={19} className="handle-icon" />
          )}
        </div>
      </div>
    </div>
  );
};
