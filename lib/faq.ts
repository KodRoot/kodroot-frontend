import { site } from "@/lib/site";

export const faqHeading = "Questions";

export const faqDescription =
  "Short answers about starting a project with KodRoot.";

export const faqs = [
  {
    question: "Do I need a detailed brief?",
    answer:
      "No. Tell us what you want to achieve and who it is for. If you are not sure what kind of product you need, the form has an “I’m not sure yet” option.",
  },
  {
    question: "What does a project cost?",
    answer:
      "It depends on what the product needs to do. The form does not ask for a number. We talk about cost after we understand the project, and nothing on this site is a quote.",
  },
  {
    question: "How long does it take?",
    answer:
      "That depends on the scope too. The form asks when you hope to launch. That date is a starting point for the conversation, not a delivery promise.",
  },
  {
    question: "Can it work with the tools we already use?",
    answer:
      "Often, yes. Accounting, customer management, email marketing, maps, or your existing business software. Tell us what you use.",
  },
  {
    question: "Where are you based?",
    answer:
      "KodRoot was founded in Kosovo. We build for businesses wherever they are.",
  },
  {
    question: "How do I start?",
    answer: `Use the project form at ${site.domain}/discuss-your-project. A few questions, and we reply by email. You can also write to ${site.email}.`,
  },
] as const;
