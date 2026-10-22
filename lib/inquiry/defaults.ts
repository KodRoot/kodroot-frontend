import type { InquiryAnswers } from "@/types/inquiry";

export const emptyInquiryAnswers: InquiryAnswers = {
  projectType: null,
  goals: [],
  goalsOther: "",
  payments: null,
  productCount: null,
  manageStore: null,
  shipping: null,
  accounts: null,
  accountFeatures: [],
  contentManagement: null,
  integrations: [],
  integrationsOther: "",
  timeline: null,
  name: "",
  businessName: "",
  email: "",
  projectDescription: "",
  existingWebsite: "",
  consent: false,
};

export const PRICING_ENABLED = false;
