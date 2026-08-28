import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { profileData } from '../data/profile';

const ICON_MAP = {
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
  Instagram: InstagramIcon,
  Mail: Mail,
  MessageCircle: WhatsAppIcon,
};

export const SocialIcons = () => {
  return (
    <nav className="social-row" aria-label="Social Profiles">
      {profileData.socials.map((social) => {
        const IconComponent = ICON_MAP[social.iconName] || Mail;
        return (
          <a
            key={social.id}
            href={social.url}
            target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="social-btn"
            aria-label={social.label}
            title={social.label}
          >
            <IconComponent size={19} className="social-icon" />
          </a>
        );
      })}
    </nav>
  );
};
