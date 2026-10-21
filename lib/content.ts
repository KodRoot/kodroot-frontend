export const services = [
  {
    id: "web",
    number: "01",
    name: "Web development",
    detail: "Sites, customer tools, and internal systems.",
  },
  {
    id: "mobile",
    number: "02",
    name: "Mobile development",
    detail: "Apps for phones and tablets.",
  },
  {
    id: "software",
    number: "03",
    name: "Custom software",
    detail: "Systems built around how a business works.",
  },
] as const;

export const capabilities = [
  {
    id: "product",
    name: "Product development",
    summary: "Shape the product, then build the first version.",
  },
  {
    id: "consulting",
    name: "Technical consulting",
    summary: "Decide what to build before the engineering starts.",
  },
] as const;

export const servicesHeading = "What we build";

export const intelligenceHeading = "In the product.";

export const intelligenceCapabilities = [
  {
    id: "features",
    number: "01",
    name: "Intelligent features",
    summary: "Help people find answers and finish a task.",
  },
  {
    id: "integrations",
    number: "02",
    name: "Connections",
    summary: "Join the tools a business already uses.",
  },
  {
    id: "automation",
    number: "03",
    name: "Automation",
    summary: "Fewer manual steps. A person still reviews the judgement calls.",
  },
] as const;

export const approachHeading = "How we work";

export const approachPrinciples = [
  "Start with the structure.",
  "Make clear decisions.",
  "Engineer carefully.",
  "Build for actual use.",
  "Leave room for what comes next.",
  "Skip what the work does not need.",
] as const;

export const discussHeading = "Discuss your project";

export const discussCopy = "A few questions. Then a brief you can email.";

export const closingHeading = "Discuss your project";
