export interface Project {
  title: string;
  description: string;
  techStack: string[];
  mockupUrl: string;
}

export const projects: Project[] = [
  {
    title: "PacPay",
    description: "A high-value FinTech solution integrating AI for seamless payment processing and financial management.",
    techStack: ["React", "Three.js", "Node.js", "PostgreSQL", "AI/ML"],
    mockupUrl: "https://example.com/pacpay-mockup",
  },
  {
    title: "AquaPure",
    description: "A social impact platform utilizing AI to monitor and raise awareness about water pollution levels globally.",
    techStack: ["React", "Three.js", "Python", "MongoDB", "AI/ML"],
    mockupUrl: "https://example.com/aquapure-mockup",
  },
  {
    title: "Vocalize",
    description: "An accessibility-focused AI tool for Sign Language Recognition, bridging the communication gap.",
    techStack: ["React", "Three.js", "TensorFlow", "Webcam API"],
    mockupUrl: "https://example.com/vocalize-mockup",
  },
  {
    title: "NexaPrism",
    description: "A holographic real estate visualization platform redefining the future of property exploration.",
    techStack: ["React", "Three.js", "WebGL", "GLSL"],
    mockupUrl: "https://example.com/nexaprism-mockup",
  },
];
