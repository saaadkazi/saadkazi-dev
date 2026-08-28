import React from 'react';
import { profileData } from '../data/profile';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container" aria-label="Page Footer">
      <p className="footer-text">
        © {currentYear} {profileData.name}. All rights reserved.
      </p>
    </footer>
  );
};
