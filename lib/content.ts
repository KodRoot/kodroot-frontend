export const services = [
  {
    id: "web",
    number: "01",
    name: "Web development",
    detail:
      "Public websites, customer tools, and internal systems — designed around how the business actually works, and built so the next requirement has a place to go.",
    problems:
      "A site that cannot take on more, a first version without a clear structure, or a product that is hard to change once people start using it.",
    intelligence:
      "When people need to find the right information, finish a task, or stop doing the same step by hand, those features belong in the product — not beside it.",
  },
  {
    id: "mobile",
    number: "02",
    name: "Mobile development",
    detail:
      "Applications for phones and tablets, designed around the people who will use them every day, from the first version through the work that follows.",
    problems:
      "An idea that needs a careful first version in someone’s hand, or an existing product that has to work as well on a phone as it does everywhere else.",
    intelligence:
      "Help finishing a task on the go, or taking over a repetitive step, is built into the same application. It is not a separate novelty.",
  },
  {
    id: "software",
    number: "03",
    name: "Custom software",
    detail:
      "Software engineered around a specific way a business works, including the integrations and supporting systems the work depends on.",
    problems:
      "Processes that still live in spreadsheets, tools that do not talk to each other, or software that cannot take on the next requirement without starting over.",
    intelligence:
      "Automation and intelligent features are useful when they shorten a real workflow, and a person can still review the decisions that need judgement.",
  },
] as const;

export const capabilities = [
  {
    id: "product",
    name: "Product development",
    summary:
      "When the product is still taking shape, we help define it, then build the first version on a foundation that can take on more.",
  },
  {
    id: "consulting",
    name: "Technical consulting",
    summary:
      "Clear advice on structure, approach, and trade-offs, so you can decide what to build, and how, before the work begins.",
  },
] as const;

export const servicesIntro = "Three kinds of work. The same care in each.";

export const capabilitiesIntro =
  "Product development and technical consulting sit inside the same practice, not beside it. We can help you decide what to build, and how to approach it, then engineer it with the same standard.";

export const audienceLine =
  "We work with businesses, startups, and people shaping a product who want software they can keep using as the company grows.";

export const intelligenceHeading = "When the work needs intelligence.";

export const intelligenceIntro =
  "AI is part of how we engineer software, not a separate offering. We use it when it helps a customer, an employee, or a business finish real work — and we leave it out when it would only add noise.";

export const intelligenceCapabilities = [
  {
    id: "features",
    number: "01",
    name: "Intelligent features inside a product",
    summary:
      "Help people find answers, complete a task, or work with information more easily — built into the application they already use.",
  },
  {
    id: "integrations",
    number: "02",
    name: "Connections that shorten a workflow",
    summary:
      "When a business already relies on software, we can connect it to a suitable service so a repetitive step does not have to stay manual.",
  },
  {
    id: "automation",
    number: "03",
    name: "Automation with a person in the loop",
    summary:
      "Reduce steps that still happen by hand, and keep a person able to review the decisions that need judgement.",
  },
] as const;

export const approachHeading = "Build the foundation right.";

export const approachIntro =
  "A product should be reliable today and able to evolve tomorrow. Growth is easier when the foundation was built for it.";

export const approachBody =
  "We start with the structure: clear decisions, careful engineering, and room for what the product has to become. The same care applies to web, mobile, and custom software. The surface changes. The standard does not.";

export const approachPrinciples = [
  "Start with the structure.",
  "Make clear decisions.",
  "Engineer carefully.",
  "Build for actual use.",
  "Leave room for future requirements.",
  "Avoid unnecessary complexity.",
] as const;

export const discussHeading = "Let’s work out what you need.";

export const discussCopy =
  "Tell us what you are planning to build. We’ll help turn your requirements into a clearer project brief.";

export const discussGuidance =
  "You do not need technical knowledge to complete this.";

export const closingHeading = "When you are ready to build.";

export const closingCopy =
  "If you have a website, a product, or a system that has to grow, tell us what you are planning.";

export const originLine =
  "KodRoot begins in Kosovo. The work is for an international audience.";
