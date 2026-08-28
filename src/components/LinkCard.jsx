import React from 'react';
import { Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';

const ICON_MAP = {
  Globe: Globe,
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  MessageCircle: WhatsAppIcon,
};

export const LinkCard = ({ card }) => {
  const IconComponent = ICON_MAP[card.iconName] || Globe;

  return (
    <a
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card card-platform-${card.id} ${card.isSpecial ? 'card-special-portfolio' : ''}`}
      aria-label={`${card.title} - ${card.subtitle}`}
    >
      <div className="card-content-left">
        <div className={`card-icon-box icon-tint-${card.id}`}>
          <IconComponent size={20} className="card-icon" />
        </div>
        <div className="card-text-group">
          <div className="card-title-row">
            <h2 className="card-title">{card.title}</h2>
            {card.isSpecial && (
              <Sparkles size={14} className="portfolio-sparkle-icon" aria-hidden="true" />
            )}
          </div>
          <p className="card-subtitle">{card.subtitle}</p>
        </div>
      </div>

      <div className="card-action-right">
        <div className="arrow-box">
          <ArrowUpRight size={18} className="arrow-icon" />
        </div>
      </div>
      
      {/* Subtle bottom edge gradient highlight visible on hover */}
      <div className="card-hover-edge" />
    </a>
  );
};
