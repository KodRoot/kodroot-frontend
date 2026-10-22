"use client";

import {
  addTransitionType,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  ViewTransition,
  type FormEvent,
} from "react";
import { AppLink } from "@/components/app-link";
import { ChoiceList } from "@/components/inquiry/choice-list";
import {
  FollowUp,
  TextField,
  toggleIntegration,
} from "@/components/inquiry/inquiry-fields";
import { InquirySuccess } from "@/components/inquiry/inquiry-result";
import { InquiryReview } from "@/components/inquiry/inquiry-review";
import { TextButton } from "@/components/ui/text-link";
import { Vinculum } from "@/components/ui/vinculum";
import { emptyInquiryAnswers } from "@/lib/inquiry/defaults";
import {
  accountFeatureOptions,
  accountOptions,
  budgetRangeOptions,
  contentOptions,
  integrationOptions,
  paymentsOptions,
  productCountOptions,
  projectGoalOptions,
  projectTypeOptions,
  timelineOptions,
  yesNoUnsureOptions,
} from "@/lib/inquiry/options";
import {
  inquirySubmissionSchema,
  needsStoreFollowUp,
  validateInquiryStep,
} from "@/lib/inquiry/schema";
import { isQuestionStep, questionSteps, stepCopy } from "@/lib/inquiry/steps";
import type {
  InquiryAnswers,
  InquiryApiResult,
  InquiryStep,
} from "@/types/inquiry";

function failureMessage(status: number, payload: InquiryApiResult | null) {
  if (payload?.status === "unavailable") {
    return payload.message;
  }
  if (payload?.status === "limited") {
    return payload.message;
  }
  if (payload?.status === "invalid") {
    return payload.message;
  }
  if (payload?.status === "error") {
    return payload.message;
  }
  if (status === 503) {
    return "This form cannot send email yet.";
  }
  return "The inquiry was not sent. Try again.";
}

export function InquiryForm() {
  const [step, setStep] = useState<InquiryStep>("type");
  const [answers, setAnswers] = useState<InquiryAnswers>(emptyInquiryAnswers);
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [received, setReceived] = useState(false);
  const [, startTransition] = useTransition();
  const errorId = useId();
  const errorRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const sending = useRef(false);
  const startedAt = useRef(0);
  const submissionId = useRef("");

  useEffect(() => {
    startedAt.current = Date.now();
    submissionId.current = crypto.randomUUID();
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  function update(partial: Partial<InquiryAnswers>) {
    setAnswers((current) => ({ ...current, ...partial }));
    setError(null);
  }

  function goTo(next: InquiryStep) {
    startTransition(() => {
      addTransitionType("step-change");
      setError(null);
      setStep(next);
    });
  }

  function goBack() {
    if (submitting) {
      return;
    }
    if (step === "review") {
      goTo("contact");
      return;
    }
    const index = questionSteps.indexOf(step as (typeof questionSteps)[number]);
    const previous = questionSteps[index - 1];
    if (previous) {
      goTo(previous);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) {
      return;
    }
    if (step === "review") {
      void sendInquiry();
      return;
    }
    const message = validateInquiryStep(step, answers);
    if (message) {
      setError(message);
      return;
    }
    if (step === "contact") {
      goTo("review");
      return;
    }
    if (isQuestionStep(step)) {
      const index = questionSteps.indexOf(step);
      const next = questionSteps[index + 1];
      if (next) {
        goTo(next);
      }
    }
  }

  async function sendInquiry() {
    if (sending.current) {
      return;
    }

    const parsed = inquirySubmissionSchema.safeParse(answers);
    if (!parsed.success) {
      setError("Some answers are missing. Go back and check them.");
      return;
    }

    sending.current = true;
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company,
          startedAt: startedAt.current,
          submissionId: submissionId.current,
        }),
      });
      const payload = (await response
        .json()
        .catch(() => null)) as InquiryApiResult | null;

      if (response.ok && payload?.status === "received") {
        setReceived(true);
        return;
      }

      setError(failureMessage(response.status, payload));
    } catch {
      setError(
        "The inquiry was not sent. Check your connection and try again.",
      );
    } finally {
      sending.current = false;
      setSubmitting(false);
    }
  }

  function reset() {
    startedAt.current = Date.now();
    submissionId.current = crypto.randomUUID();
    setCompany("");
    setAnswers(emptyInquiryAnswers);
    setReceived(false);
    setError(null);
    setStep("type");
  }

  if (received) {
    return <InquirySuccess onReset={reset} />;
  }

  const questionIndex = isQuestionStep(step)
    ? questionSteps.indexOf(step)
    : questionSteps.length;
  const progress =
    step === "review" ? 1 : (questionIndex + 1) / (questionSteps.length + 1);

  return (
    <form
      className="relative"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      aria-busy={submitting}
      aria-describedby={error ? errorId : undefined}
    >
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="inquiry-company">Company</label>
        <input
          id="inquiry-company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <div className="pb-4">
        <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
          {step === "review"
            ? "Review"
            : `Question ${String(questionIndex + 1).padStart(2, "0")} of ${String(questionSteps.length).padStart(2, "0")}`}
        </p>
        <Vinculum
          className="mt-3"
          progress={progress}
          label="Question progress"
        />
      </div>

      <ViewTransition
        key={step}
        name="inquiry-step"
        enter={{ "step-change": "step-enter", default: "none" }}
        exit={{ "step-change": "step-exit", default: "none" }}
        default="none"
      >
        <div className="mt-8">
          {isQuestionStep(step) ? (
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
                {stepCopy[step].kicker}
              </p>
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="type-display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] text-ink outline-none"
              >
                {stepCopy[step].question}
              </h3>
              {stepCopy[step].hint ? (
                <p className="mt-3 leading-relaxed text-muted">
                  {stepCopy[step].hint}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className={isQuestionStep(step) ? "mt-8" : undefined}>
            {step === "type" ? (
              <ChoiceList
                legend={stepCopy.type.question}
                options={projectTypeOptions}
                value={answers.projectType}
                onChange={(projectType) => update({ projectType })}
              />
            ) : null}

            {step === "description" ? (
              <TextField
                id="inquiry-description"
                label="Project description"
                required
                value={answers.projectDescription}
                onChange={(projectDescription) =>
                  update({ projectDescription })
                }
                multiline
              />
            ) : null}

            {step === "goals" ? (
              <div className="space-y-8">
                <ChoiceList
                  multiple
                  legend={stepCopy.goals.question}
                  options={projectGoalOptions}
                  value={answers.goals}
                  onChange={(goal) =>
                    update({
                      goals: answers.goals.includes(goal)
                        ? answers.goals.filter((item) => item !== goal)
                        : [...answers.goals, goal],
                    })
                  }
                />
                {answers.goals.includes("something-else") ? (
                  <TextField
                    id="goals-other"
                    label="Describe the other outcome"
                    value={answers.goalsOther}
                    onChange={(goalsOther) => update({ goalsOther })}
                    multiline
                  />
                ) : null}
              </div>
            ) : null}

            {step === "payments" ? (
              <div className="space-y-10">
                <ChoiceList
                  legend={stepCopy.payments.question}
                  options={paymentsOptions}
                  value={answers.payments}
                  onChange={(payments) => update({ payments })}
                />
                {needsStoreFollowUp(answers) ? (
                  <>
                    <FollowUp question="Approximately how many products will you sell?">
                      <ChoiceList
                        legend="Approximately how many products will you sell?"
                        options={productCountOptions}
                        value={answers.productCount}
                        onChange={(productCount) => update({ productCount })}
                      />
                    </FollowUp>
                    <FollowUp question="Do you need to manage products and orders yourself?">
                      <ChoiceList
                        legend="Do you need to manage products and orders yourself?"
                        options={yesNoUnsureOptions}
                        value={answers.manageStore}
                        onChange={(manageStore) => update({ manageStore })}
                      />
                    </FollowUp>
                    <FollowUp question="Do you need delivery or shipping options?">
                      <ChoiceList
                        legend="Do you need delivery or shipping options?"
                        options={yesNoUnsureOptions}
                        value={answers.shipping}
                        onChange={(shipping) => update({ shipping })}
                      />
                    </FollowUp>
                  </>
                ) : null}
              </div>
            ) : null}

            {step === "accounts" ? (
              <div className="space-y-10">
                <ChoiceList
                  legend={stepCopy.accounts.question}
                  options={accountOptions}
                  value={answers.accounts}
                  onChange={(accounts) => update({ accounts })}
                />
                {answers.accounts === "yes-accounts" ? (
                  <FollowUp
                    question="What should people be able to do once they have signed in?"
                    hint="Optional."
                  >
                    <ChoiceList
                      multiple
                      legend="What should people be able to do once they have signed in?"
                      options={accountFeatureOptions}
                      value={answers.accountFeatures}
                      onChange={(feature) =>
                        update({
                          accountFeatures: answers.accountFeatures.includes(
                            feature,
                          )
                            ? answers.accountFeatures.filter(
                                (item) => item !== feature,
                              )
                            : [...answers.accountFeatures, feature],
                        })
                      }
                    />
                  </FollowUp>
                ) : null}
              </div>
            ) : null}

            {step === "content" ? (
              <ChoiceList
                legend={stepCopy.content.question}
                options={contentOptions}
                value={answers.contentManagement}
                onChange={(contentManagement) => update({ contentManagement })}
              />
            ) : null}

            {step === "integrations" ? (
              <div className="space-y-8">
                <ChoiceList
                  multiple
                  legend={stepCopy.integrations.question}
                  options={integrationOptions}
                  value={answers.integrations}
                  onChange={(integration) =>
                    update({
                      integrations: toggleIntegration(
                        answers.integrations,
                        integration,
                      ),
                    })
                  }
                />
                {answers.integrations.includes("other") ? (
                  <TextField
                    id="integrations-other"
                    label="Describe the other tools"
                    value={answers.integrationsOther}
                    onChange={(integrationsOther) =>
                      update({ integrationsOther })
                    }
                    multiline
                  />
                ) : null}
              </div>
            ) : null}

            {step === "budget" ? (
              <div className="space-y-10">
                <ChoiceList
                  legend={stepCopy.budget.question}
                  options={budgetRangeOptions}
                  value={answers.budgetRange}
                  onChange={(budgetRange) => update({ budgetRange })}
                />
                <FollowUp question="When do you hope to launch?">
                  <ChoiceList
                    legend="When do you hope to launch?"
                    options={timelineOptions}
                    value={answers.timeline}
                    onChange={(timeline) => update({ timeline })}
                  />
                </FollowUp>
              </div>
            ) : null}

            {step === "contact" ? (
              <div className="space-y-6">
                <TextField
                  id="inquiry-name"
                  label="Name"
                  required
                  autoComplete="name"
                  value={answers.name}
                  onChange={(name) => update({ name })}
                />
                <TextField
                  id="inquiry-business"
                  label="Business name"
                  hint="Optional"
                  autoComplete="organization"
                  value={answers.businessName}
                  onChange={(businessName) => update({ businessName })}
                />
                <TextField
                  id="inquiry-email"
                  label="Email"
                  required
                  type="email"
                  autoComplete="email"
                  value={answers.email}
                  onChange={(email) => update({ email })}
                />
                <TextField
                  id="inquiry-website"
                  label="Existing website"
                  hint="Optional"
                  autoComplete="url"
                  inputMode="url"
                  value={answers.existingWebsite}
                  onChange={(existingWebsite) => update({ existingWebsite })}
                />
                <div className="flex gap-3">
                  <input
                    id="inquiry-consent"
                    type="checkbox"
                    checked={answers.consent}
                    onChange={(event) =>
                      update({ consent: event.target.checked })
                    }
                    className="mt-1 size-4 shrink-0 border border-ink/35 accent-mark"
                  />
                  <p className="leading-relaxed text-ink">
                    <label htmlFor="inquiry-consent" className="cursor-pointer">
                      I agree that KodRoot may use these details to respond to
                      this inquiry.
                    </label>{" "}
                    <AppLink
                      href="/privacy"
                      className="text-ink underline underline-offset-4"
                    >
                      Privacy policy
                    </AppLink>
                  </p>
                </div>
              </div>
            ) : null}

            {step === "review" ? (
              <InquiryReview
                answers={answers}
                onEdit={goTo}
                headingRef={headingRef}
              />
            ) : null}
          </div>
        </div>
      </ViewTransition>

      {error ? (
        <p
          ref={errorRef}
          id={errorId}
          tabIndex={-1}
          role="alert"
          className="form-note mt-6 leading-relaxed text-ink outline-none"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-12 flex flex-wrap items-center gap-4">
        {step !== "type" ? (
          <TextButton
            variant="secondary"
            onClick={goBack}
            disabled={submitting}
          >
            Back
          </TextButton>
        ) : null}
        <TextButton type="submit" disabled={submitting}>
          {submitting
            ? "Sending"
            : step === "review"
              ? "Send inquiry"
              : "Continue"}
        </TextButton>
      </div>
    </form>
  );
}
