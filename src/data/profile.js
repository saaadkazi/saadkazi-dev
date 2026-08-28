/**
 * Centralized profile configuration for Saad Kazi's Link Hub.
 * Edit values in this single file to update text, contact info, social handles, resume, and pre-filled messages across the entire application.
 */

const contactMessages = {
  whatsapp:
    "Hello Saad, I came across your profile and wanted to connect with you. When you're free, please message me back.",
  emailSubject:
    "Inquiry from your Link Hub",
  emailBody:
    `Hello Saad,

I came across your profile and wanted to get in touch with you. Please reply whenever you're available.

Thank you.`,
};

const whatsappUrl = `https://wa.me/918788940660?text=${encodeURIComponent(contactMessages.whatsapp)}`;
const emailUrl = `mailto:saadkazi0901@gmail.com?subject=${encodeURIComponent(contactMessages.emailSubject)}&body=${encodeURIComponent(contactMessages.emailBody)}`;

export const downloadVCard = () => {
  const vcardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Saad Kazi',
    'N:Kazi;Saad;;;',
    'TEL;TYPE=CELL:+918788940660',
    'EMAIL;TYPE=INTERNET:saadkazi0901@gmail.com',
    'URL;TYPE=Portfolio:https://saadkazi.vercel.app',
    'URL;TYPE=LinkedIn:https://www.linkedin.com/in/saadkazi-dev',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Saad_Kazi.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const profileData = {
  name: "Saad Kazi",
  logoInitials: "SK",
  roles: [
    "Full Stack Developer",
    "AI Developer",
    "Software Developer",
    "Prompt Engineer",
  ],
  bio: "Building modern web experiences, scalable applications & AI-powered solutions.",
  email: "saadkazi0901@gmail.com",
  phone: "+918788940660",
  displayPhone: "+91 87889 40660",
  resumeUrl: "/Resume.pdf",
  avatarUrl: "/profile-avatar.png",
  contactMessages,
  whatsappUrl,
  emailUrl,
  
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/saadkazi-dev",
      iconName: "Linkedin",
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/saaadkazi",
      iconName: "Github",
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/saad_kazi0001",
      iconName: "Instagram",
    },
    {
      id: "email",
      label: "Email",
      url: emailUrl,
      iconName: "Mail",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: whatsappUrl,
      iconName: "MessageCircle",
    },
  ],

  mainCards: [
    {
      id: "portfolio",
      title: "Portfolio",
      subtitle: "Explore my work & experience",
      url: "https://saadkazi.vercel.app",
      iconName: "Globe",
      isSpecial: true, // Special subtle accent for Portfolio
    },
    {
      id: "github",
      title: "GitHub",
      subtitle: "Explore my repositories",
      url: "https://github.com/saaadkazi",
      iconName: "Github",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      subtitle: "Connect with me professionally",
      url: "https://www.linkedin.com/in/saadkazi-dev",
      iconName: "Linkedin",
    },
    {
      id: "instagram",
      title: "Instagram",
      subtitle: "Follow my journey",
      url: "https://www.instagram.com/saad_kazi0001",
      iconName: "Instagram",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      subtitle: "Let's talk",
      url: whatsappUrl,
      iconName: "MessageCircle",
    },
  ],
};
