import React from 'react';

// Simple icon components using SVG
const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h6V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h6z"/>
  </svg>
);

const ResearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72L5.18 9L12 5.28L18.82 9zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.77L5.82 22L7 14.14l-5-4.87l6.91-1.01L12 2z"/>
  </svg>
);

const ProjectIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
  </svg>
);

const EducationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
  </svg>
);

// Timeline data based on the resume
export const timelineData = [
  // Experience
  {
    id: 1,
    icon: ExperienceIcon,
    title: "Creative Technologist (User Experience Prototyping)",
    date: "February 2022 - Present",
    category: "experience",
    location: "Zoox, Foster City, CA",
    description: "Created a UX focused robot platform and creative lab for designing 20+ visual and sonic experience projects. Reduced design iteration time from weeks to 1-2 days (90% reduction)."
  },
  {
    id: 2,
    icon: ExperienceIcon,
    title: "Manufacturing Engineer, Advanced Hardware Manufacturing Operations",
    date: "October 2018 - January 2022",
    category: "experience",
    location: "Zoox, Foster City, CA",
    description: "Tracked 12,000+ parts with custom built scripts leading to less than 10 part traceability errors. Created tools and processes for 40+ technicians."
  },
  {
    id: 3,
    icon: ExperienceIcon,
    title: "Engineering Intern, Charging Special Projects",
    date: "May 2018 - August 2018",
    category: "experience",
    location: "Tesla Motors, Fremont, CA",
    description: "Planned and executed a 2000+ mile logistics trip with the Tesla Semi using VBA and PowerQuery. Designed 10+ civil/architectural sites for next-generation Supercharger."
  },
  
  // Research Publications (Recent)
  {
    id: 4,
    icon: ResearchIcon,
    title: "Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants",
    date: "2025",
    category: "research",
    volume: "IJFMR, Volume 7, Issue 1",
    description: "Systematic exploration of ethical frameworks and governance challenges in AI health assistants, focusing on user experience and regulatory compliance."
  },
  {
    id: 5,
    icon: ResearchIcon,
    title: "Systematic Review of Healthcare IoT and Rapid Prototyping Applications",
    date: "August 2024",
    category: "research",
    volume: "ProMedSci, Volume 8, Issue 4",
    description: "Comprehensive review of IoT applications in healthcare with focus on rapid prototyping methodologies for medical device development."
  },
  {
    id: 6,
    icon: ResearchIcon,
    title: "Integrating User-Centered Design in Rapid Robotic System Prototyping",
    date: "August 2024",
    category: "research",
    volume: "IJIRMPS, Volume 12, Issue 4",
    description: "Framework for incorporating user-centered design principles in rapid prototyping of robotic systems, with emphasis on human-robot interaction."
  },
  {
    id: 7,
    icon: ResearchIcon,
    title: "Leveraging Haptic Feedback in Mixed Reality",
    date: "July 2023",
    category: "research",
    volume: "JEAST, Volume 5, Issue 4",
    description: "Investigation of haptic feedback systems in mixed reality environments and their impact on user experience and task performance."
  },
  
  // Awards
  {
    id: 8,
    icon: AwardIcon,
    title: "Harold Frank Engineering Entrepreneurship Kauffman Award",
    date: "2016 - 2018",
    category: "awards",
    location: "Washington State University",
    description: "Prestigious award recognizing outstanding engineering entrepreneurship and innovation during undergraduate studies."
  },
  {
    id: 9,
    icon: AwardIcon,
    title: "Crimson Code Software Hackathon - 1st Place (Tier 1)",
    date: "2017",
    category: "awards",
    location: "Washington State University",
    description: "First place winner for developing image processing capabilities for neural networks of a robot in competitive hackathon environment."
  },
  
  // Projects
  {
    id: 10,
    icon: ProjectIcon,
    title: "LLM Assisted Research Platform",
    date: "2024",
    category: "projects",
    description: "Developed comprehensive research platform leveraging large language models for automated research assistance and knowledge synthesis.",
    location: "GitHub Project"
  },
  {
    id: 11,
    icon: ProjectIcon,
    title: "Google Apps Script AI Integration Framework",
    date: "2024",
    category: "projects",
    description: "Created framework for integrating AI capabilities into Google Workspace applications using Apps Script and Gemini API.",
    location: "GitHub Project"
  },
  {
    id: 12,
    icon: ProjectIcon,
    title: "Financial Trading API for Interactive Brokers (IBKR)",
    date: "2024",
    category: "projects",
    description: "Built comprehensive REST API interface for Interactive Brokers platform enabling automated trading and portfolio management.",
    location: "GitHub Project"
  },
  
  // Education
  {
    id: 13,
    icon: EducationIcon,
    title: "Bachelor of Science: Mechanical Engineering",
    date: "May 2018",
    category: "education",
    location: "Washington State University",
    description: "Graduated with GPA 3.7/4.0. Minors in Computer Science and Mathematics. Focused on robotics, automation, and engineering design.",
    volume: "GPA: 3.7/4.0"
  },
  {
    id: 14,
    icon: EducationIcon,
    title: "Essentials of UX Design, User Experience",
    date: "June 2022 - August 2022",
    category: "education",
    location: "UC Berkeley Extension",
    description: "Comprehensive course in user experience design principles, methodologies, and practical application in product development.",
    volume: "Grade: 97.6/100"
  }
];

export default timelineData; 