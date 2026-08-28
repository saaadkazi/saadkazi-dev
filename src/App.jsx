import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { EmailQuickAction } from './components/EmailQuickAction';
import { SocialIcons } from './components/SocialIcons';
import { LinkCard } from './components/LinkCard';
import { SwipeToCall } from './components/SwipeToCall';
import { AiAssistant } from './components/AiAssistant';
import { Footer } from './components/Footer';
import { profileData } from './data/profile';
import './App.css';

export function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      {/* Top Bar Minimal Navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main Profile Hero Section */}
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <ProfileHero />
        
        {/* Email Copy Quick Action */}
        <EmailQuickAction />

        {/* Quick Social Buttons Row */}
        <SocialIcons />

        {/* Central Main Link Cards */}
        <section className="link-cards-container" aria-label="Main Navigation Links">
          {profileData.mainCards.map((card) => (
            <LinkCard key={card.id} card={card} />
          ))}
        </section>

        {/* Signature Feature: Swipe to Call */}
        <SwipeToCall />
      </main>

      {/* Floating AI Assistant Trigger & Panel */}
      <AiAssistant />

      {/* Footer Copyright Notice */}
      <Footer />
    </div>
  );
}

export default App;
