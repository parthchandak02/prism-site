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

const PatentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const VolunteerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const MediaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h6V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h6z"/>
  </svg>
);

const SpeakingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
  </svg>
);

// Comprehensive timeline data from resume
export const timelineData = [
  // === CURRENT WORK ===
  {
    id: 1,
    icon: ExperienceIcon,
    title: "Creative Technologist (User Experience Prototyping)",
    date: "February 2022 - Present",
    category: "experience",
    location: "Zoox, Foster City, CA",
    description: "Created a UX focused robot platform and creative lab for designing 20+ visual and sonic experience projects. Reduced design iteration time from weeks to 1-2 days (90% reduction). Tested 40+ digital and mechanical designs on autonomous vehicle platforms."
  },

  // === RECENT ACHIEVEMENTS 2024-2025 ===
  {
    id: 2,
    icon: PatentIcon,
    title: "Audio Prioritization Patent (Pending)",
    date: "June 2024",
    category: "patent",
    location: "Application #1/###,573; Ref. 1246-02850US1",
    description: "Innovative patent pending for audio prioritization technology, demonstrating cutting-edge research in autonomous vehicle audio systems and user experience optimization."
  },
  {
    id: 3,
    icon: SpeakingIcon,
    title: "A Practical Framework for Rapid Prototyping and Fidelity in Product Development",
    date: "June 2025",
    category: "speaking",
    location: "ICETAIA Conference",
    description: "Keynote presentation on innovative rapid prototyping methodologies and fidelity frameworks for modern product development, sharing insights from autonomous vehicle development."
  },
  {
    id: 4,
    icon: VolunteerIcon,
    title: "BuildOn Nepal School Project - $55K Fundraising Lead",
    date: "January 2025",
    category: "volunteering",
    location: "Nepal",
    description: "Raised $55,000 to build a school in Nepal, directly impacting 210+ students (including 108 girls) in a community of 2250 farmers. Led fundraising strategy and participated in construction trek."
  },
  {
    id: 5,
    icon: VolunteerIcon,
    title: "Manager, Team Innovation Program",
    date: "May 2025 - Present",
    category: "volunteering",
    location: "Mentor Discover Inspire",
    description: "Leading 3+ cross-team initiatives to enhance inter and intra team cohesion. Managing innovative mentorship programs and organizational development."
  },

  // === 2024 RESEARCH PUBLICATIONS ===
  {
    id: 6,
    icon: ResearchIcon,
    title: "The Evolution of Haptic Feedback Systems and User Experience",
    date: "2024",
    category: "research",
    volume: "JEAST, Volume 5, Issue 4",
    description: "Comprehensive analysis of haptic feedback evolution and its impact on user experience design in modern interactive systems."
  },
  {
    id: 7,
    icon: ResearchIcon,
    title: "Optimizing Bio-Inspired Phototropic Materials",
    date: "2024", 
    category: "research",
    volume: "IJACT, Volume 2, Issue 4",
    description: "Research on bio-inspired materials that respond to light, with applications in smart materials and autonomous systems."
  },
  {
    id: 8,
    icon: ResearchIcon,
    title: "Advancing Telemedicine Through Adaptive UX",
    date: "August 2024",
    category: "research",
    volume: "ProMedSci, Volume 8, Issue E178",
    description: "Investigation of adaptive user experience design principles in telemedicine platforms, focusing on accessibility and user engagement."
  },
  {
    id: 9,
    icon: ResearchIcon,
    title: "Systematic Review of Healthcare IoT and Rapid Prototyping",
    date: "August 2024",
    category: "research",
    volume: "ProMedSci, Volume 8, Issue E153",
    description: "Comprehensive review of IoT applications in healthcare with focus on rapid prototyping methodologies for medical device development."
  },
  {
    id: 10,
    icon: ResearchIcon,
    title: "User-Centered Design in Healthcare Education Technologies",
    date: "2024",
    category: "research",
    volume: "ProMedSci, Volume 9, Issue E174",
    description: "Framework for implementing user-centered design principles in healthcare education technology development."
  },
  {
    id: 11,
    icon: ResearchIcon,
    title: "Integrating User-Centered Design in Rapid Robotic System Prototyping",
    date: "August 2024",
    category: "research",
    volume: "IJIRMPS, Volume 12, Issue 4",
    description: "Framework for incorporating user-centered design principles in rapid prototyping of robotic systems, with emphasis on human-robot interaction."
  },

  // === 2025 RESEARCH PUBLICATIONS ===
  {
    id: 12,
    icon: ResearchIcon,
    title: "Ethical, Governance, and Usability Challenges in AI-Powered Virtual Health Assistants",
    date: "2025",
    category: "research",
    volume: "IJFMR, Volume 7, Issue 1",
    description: "Systematic exploration of ethical frameworks and governance challenges in AI health assistants, focusing on user experience and regulatory compliance."
  },
  {
    id: 13,
    icon: ResearchIcon,
    title: "Augmented Reality Enhances Telemedicine Training",
    date: "2025",
    category: "research",
    volume: "IJFMR, Volume 7, Issue 3",
    description: "Research on AR applications in telemedicine training, demonstrating improved learning outcomes and practical skill development."
  },

  // === 2024 GITHUB PROJECTS ===
  {
    id: 14,
    icon: ProjectIcon,
    title: "LLM Assisted Research Platform",
    date: "2024",
    category: "projects",
    description: "Comprehensive research platform leveraging large language models for automated research assistance and knowledge synthesis. Features AI-powered literature review, data analysis, and research workflow automation.",
    url: "https://github.com/parthchandak02/research-assistant"
  },
  {
    id: 15,
    icon: ProjectIcon,
    title: "Google Apps Script AI Integration Framework",
    date: "2024",
    category: "projects",
    description: "Framework for integrating AI capabilities into Google Workspace applications using Apps Script and Gemini API. Enables automated document processing, intelligent data analysis, and workflow optimization.",
    url: "https://github.com/parthchandak02/gapps-script-gemini"
  },
  {
    id: 16,
    icon: ProjectIcon,
    title: "Financial Trading API for Interactive Brokers (IBKR)",
    date: "2024",
    category: "projects",
    description: "Comprehensive REST API interface for Interactive Brokers platform enabling automated trading, portfolio management, and real-time market data integration.",
    url: "https://github.com/parthchandak02/ibkr-ibind-rest-api"
  },
  {
    id: 17,
    icon: ProjectIcon,
    title: "Calendar and Alarm Productivity System",
    date: "2024",
    category: "projects",
    description: "Advanced productivity system combining intelligent calendar management with context-aware alarm systems for optimized time management and task completion.",
    url: "https://github.com/parthchandak02/cal-tag-app"
  },

  // === PREVIOUS WORK EXPERIENCE ===
  {
    id: 18,
    icon: ExperienceIcon,
    title: "Manufacturing Engineer, Advanced Hardware Manufacturing Operations",
    date: "October 2018 - January 2022",
    category: "experience",
    location: "Zoox, Foster City, CA",
    description: "Tracked 12,000+ parts with custom built scripts leading to less than 10 part traceability errors. Created tools and processes for 40+ technicians, improving manufacturing quality and testing workflows."
  },
  {
    id: 19,
    icon: ExperienceIcon,
    title: "Engineering Intern, Charging Special Projects",
    date: "May 2018 - August 2018",
    category: "experience",
    location: "Tesla Motors, Fremont, CA",
    description: "Planned and executed a 2000+ mile logistics trip with the Tesla Semi using VBA and PowerQuery. Designed 20+ Supercharger components library and 10+ civil/architectural sites for next-generation Supercharger."
  },
  {
    id: 20,
    icon: ExperienceIcon,
    title: "Engineering and Manufacturing Assistant",
    date: "June 2017 - August 2017",
    category: "experience",
    location: "BERG Manufacturing (now HDT Global), Spokane, WA",
    description: "Achieved minimum 10% higher production rate with LEAN manufacturing and CAD/CAM prototyping for hard-wall shelters. Implemented efficiency improvements in manufacturing processes."
  },
  {
    id: 21,
    icon: ExperienceIcon,
    title: "Resident Advisor & Technology Assistant",
    date: "August 2015 - May 2018",
    category: "experience", 
    location: "Washington State University, Pullman, WA",
    description: "Enforced campus policies and organized technology-focused events for 400+ residents. Served as Resident Advisor (1 year) and Resident Technology Assistant (2 years)."
  },

  // === EDUCATION ===
  {
    id: 22,
    icon: EducationIcon,
    title: "Bachelor of Science: Mechanical Engineering",
    date: "May 2018",
    category: "education",
    location: "Washington State University",
    description: "Graduated with GPA 3.7/4.0. Minors in Computer Science and Mathematics. Focused on robotics, automation, engineering design, and interdisciplinary technology integration.",
    volume: "GPA: 3.7/4.0, Minors: Computer Science, Mathematics"
  },
  {
    id: 23,
    icon: EducationIcon,
    title: "Essentials of UX Design, User Experience",
    date: "June 2022 - August 2022",
    category: "education",
    location: "UC Berkeley Extension",
    description: "Comprehensive course in user experience design principles, methodologies, and practical application in product development. Achieved exceptional academic performance.",
    volume: "Grade: 97.6/100"
  },

  // === MAJOR AWARDS & ACHIEVEMENTS ===
  {
    id: 24,
    icon: AwardIcon,
    title: "Harold Frank Engineering Entrepreneurship Kauffman Award",
    date: "2016 - 2018",
    category: "awards",
    location: "Washington State University",
    description: "Prestigious multi-year award recognizing outstanding engineering entrepreneurship and innovation. Awarded for demonstrated excellence in combining engineering principles with entrepreneurial thinking."
  },
  {
    id: 25,
    icon: AwardIcon,
    title: "Crimson Code Software Hackathon - 1st Place (Tier 1)",
    date: "2017",
    category: "awards",
    location: "Washington State University",
    description: "First place winner for developing advanced image processing capabilities for neural networks in robotic systems. Demonstrated innovation in computer vision and AI integration."
  },
  {
    id: 26,
    icon: AwardIcon,
    title: "Guy E. Thornton Engineering Scholarship",
    date: "2016",
    category: "awards",
    location: "Washington State University",
    description: "Merit-based scholarship recognizing academic excellence and potential in engineering. Awarded for outstanding academic performance and engineering aptitude."
  },
  {
    id: 27,
    icon: AwardIcon,
    title: "Robert W. Finch Memorial Scholarship",
    date: "2015",
    category: "awards",
    location: "Washington State University", 
    description: "Scholarship awarded to incoming engineering students demonstrating exceptional academic potential and commitment to engineering excellence."
  },
  {
    id: 28,
    icon: AwardIcon,
    title: "International Merit Award",
    date: "2015 - 2018",
    category: "awards",
    location: "Washington State University",
    description: "Multi-year merit award recognizing exceptional academic achievement and international student excellence throughout undergraduate career."
  },

  // === MAJOR PROJECTS ===
  {
    id: 29,
    icon: ProjectIcon,
    title: "Boeing: Damping Ratios of Piloted Systems",
    date: "2018",
    category: "projects",
    location: "Boeing Collaboration, WSU",
    description: "Served as Team Technical Lead and Liaison. Developed innovative damping ratio analysis tool using advanced mathematical techniques for piloted aircraft systems, contributing to aerospace engineering research."
  },
  {
    id: 30,
    icon: ProjectIcon,
    title: "IEEE Hardware Hackathon - Sunlight-Following Robot",
    date: "2017",
    category: "projects",
    location: "Washington State University",
    description: "Designed and programmed a centipede robot with phototropic behavior that autonomously follows sunlight. Integrated sensors, microcontrollers, and mechanical design for bio-inspired robotics."
  },
  {
    id: 31,
    icon: ProjectIcon,
    title: "Center for Materials Research - ACRT Furnace System",
    date: "2018",
    category: "projects",
    location: "WSU Materials Research",
    description: "Designed and assembled standardization system for accelerated crystal rotation technique (ACRT) furnace for SURCA research. Contributed to advanced materials science research."
  },

  // === HISTORICAL RESEARCH (2019-2023) ===
  {
    id: 32,
    icon: ResearchIcon,
    title: "Leveraging Haptic Feedback in Mixed Reality",
    date: "July 2023",
    category: "research",
    volume: "JEAST, Volume 5, Issue 4",
    description: "Investigation of haptic feedback systems in mixed reality environments and their impact on user experience and task performance."
  },
  {
    id: 33,
    icon: ResearchIcon,
    title: "Rapid Prototyping Technologies and Design Frameworks",
    date: "2023",
    category: "research",
    volume: "JMSMR, Volume 4, Issue 1",
    description: "Comprehensive study of rapid prototyping methodologies and their application in modern design frameworks across multiple industries."
  },
  {
    id: 34,
    icon: ResearchIcon,
    title: "Integrating Advanced Sensor Fusion with User-Centered Design in Robotics",
    date: "2023",
    category: "research",
    volume: "ISJEM, Volume 2, Issue 9",
    description: "Research on combining advanced sensor technologies with human-centered design principles in robotic system development."
  },
  {
    id: 35,
    icon: ResearchIcon,
    title: "User-Centric Design in IoT Prototyping for Smart Agriculture",
    date: "2022",
    category: "research",
    volume: "IJIRMPS, Volume 10, Issue 2",
    description: "Application of user-centered design principles in IoT system development for agricultural automation and smart farming solutions."
  },
  {
    id: 36,
    icon: ResearchIcon,
    title: "Rapid Prototyping Methodologies for Smart Shop Tools",
    date: "2022",
    category: "research",
    volume: "URF Journals",
    description: "Development of rapid prototyping frameworks specifically designed for smart manufacturing tools and Industry 4.0 applications."
  },
  {
    id: 37,
    icon: ResearchIcon,
    title: "Advancing Robotics-Enabled STEM Education in K-12",
    date: "2021",
    category: "research",
    volume: "IJSREM, Volume 5, Issue 12",
    description: "Research on integrating robotics platforms into K-12 STEM education to enhance learning outcomes and student engagement."
  },
  {
    id: 38,
    icon: ResearchIcon,
    title: "Advances in Human-Robot Interaction",
    date: "2021",
    category: "research",
    volume: "IJIRMPS, Volume 9, Issue 5",
    description: "Comprehensive study of human-robot interaction principles and their application in developing intuitive robotic interfaces."
  },
  {
    id: 39,
    icon: ResearchIcon,
    title: "Advancements in Electric Bicycle Technology",
    date: "2020",
    category: "research",
    volume: "Zenodo",
    description: "Technical analysis of electric bicycle innovations, focusing on battery technology, motor efficiency, and sustainable transportation solutions."
  },
  {
    id: 40,
    icon: ResearchIcon,
    title: "Growth and Characterization of Cadmium Telluride",
    date: "2019",
    category: "research",
    volume: "IJFMR, Volume 1, Issue 2",
    description: "Materials science research on cadmium telluride crystal growth and characterization for semiconductor applications."
  },

  // === MEDIA COVERAGE ===
  {
    id: 41,
    icon: MediaIcon,
    title: "User-Centered Design Approaches for Manufacturing Systems",
    date: "2025",
    category: "media",
    location: "Analytics Insight",
    description: "Featured article discussing innovative approaches to user-centered design in modern manufacturing systems and Industry 4.0 applications."
  },
  {
    id: 42,
    icon: MediaIcon,
    title: "The Creative Technologist: Bridging Engineering, UX, and Robotics",
    date: "2025",
    category: "media",
    location: "Deccan Chronicle",
    description: "Profile piece highlighting the intersection of engineering, user experience design, and robotics in autonomous vehicle development."
  },
  {
    id: 43,
    icon: MediaIcon,
    title: "Bridging the Trust Gap Between Humans and Autonomous Systems",
    date: "2025",
    category: "media",
    location: "Free Press Journal",
    description: "Analysis of trust-building strategies in human-autonomous system interactions, drawing from automotive industry experience."
  },
  {
    id: 44,
    icon: MediaIcon,
    title: "Leveraging Mixed Reality and Haptic Feedback for Immersive User Experiences",
    date: "2024",
    category: "media",
    location: "The Hans India",
    description: "Technical discussion of mixed reality applications and haptic feedback systems in creating immersive user experiences."
  },
  {
    id: 45,
    icon: MediaIcon,
    title: "Rapid Prototyping Methodologies for Complex Systems",
    date: "2023",
    category: "media",
    location: "Indiahood",
    description: "In-depth coverage of rapid prototyping techniques for complex engineering systems, from concept to testing phases."
  },
  {
    id: 46,
    icon: MediaIcon,
    title: "Advancing Human-Robot Interaction Through Intuitive Interfaces",
    date: "2022",
    category: "media",
    location: "India CSR",
    description: "Discussion of innovative interface design approaches for improving human-robot interaction in various applications."
  },
  {
    id: 47,
    icon: MediaIcon,
    title: "Freedom to Soar",
    date: "2018",
    category: "media",
    location: "WSU VCEA News",
    description: "University feature highlighting academic achievements and entrepreneurial spirit during undergraduate engineering studies."
  }
];

export default timelineData; 