"use client";

import {
  useId,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChoiceList } from "@/components/inquiry/choice-list";
import { InquiryResult } from "@/components/inquiry/inquiry-result";
import { InquiryReview } from "@/components/inquiry/inquiry-review";
import { TextButton } from "@/components/ui/text-link";
import { Vinculum } from "@/components/ui/vinculum";
import { completeInquiry } from "@/lib/inquiry/complete";
import { emptyInquiryAnswers, PRICING_ENABLED } from "@/lib/inquiry/defaults";
import {
  accountFeatureOptions,
  accountOptions,
  budgetOptions,
  contentOptions,
  integrationOptions,
  paymentsOptions,
  productCountOptions,
  projectGoalOptions,
  projectTypeOptions,
  timelineOptions,
  yesNoUnsureOptions,
} from "@/lib/inquiry/options";
import { needsStoreFollowUp, validateInquiryStep } from "@/lib/inquiry/schema";
import { isQuestionStep, questionSteps, stepCopy } from "@/lib/inquiry/steps";
import type {
  InquiryAnswers,
  InquiryStep,
  Integration,
  SubmitInquiryResult,
} from "@/types/inquiry";

export function InquiryForm() {
  const [step, setStep] = useState<InquiryStep>("type");
  const [answers, setAnswers] = useState<InquiryAnswers>(emptyInquiryAnswers);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<
    SubmitInquiryResult,
    { status: "ready" }
  > | null>(null);
  const errorId = useId();

  function update(partial: Partial<InquiryAnswers>) {
    setAnswers((current) => ({ ...current, ...partial }));
    setError(null);
  }

  function goTo(next: InquiryStep) {
    setError(null);
    setStep(next);
  }

  function goBack() {
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
    if (step === "review") {
      sendInquiry();
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

  function sendInquiry() {
    const next = completeInquiry(answers);
    if (next.status === "invalid") {
      setError(next.message);
      return;
    }
    setError(null);
    setResult(next);
  }

  if (result) {
    return (
      <InquiryResult
        brief={result.brief}
        mailto={result.mailto}
        onRevise={() => {
          setResult(null);
          goTo("review");
        }}
        onReset={() => {
          setResult(null);
          setAnswers(emptyInquiryAnswers);
          goTo("type");
        }}
      />
    );
  }

  const questionIndex = isQuestionStep(step)
    ? questionSteps.indexOf(step)
    : questionSteps.length;
  const progress =
    step === "review" ? 1 : (questionIndex + 1) / (questionSteps.length + 1);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      aria-describedby={error ? errorId : undefined}
    >
      <div className="pb-4">
        <div className="flex items-end justify-between gap-6">
          <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
            {step === "review"
              ? "Review"
              : `Question ${String(questionIndex + 1).padStart(2, "0")} of ${String(questionSteps.length).padStart(2, "0")}`}
          </p>
        </div>
        <Vinculum
          className="mt-3"
          progress={progress}
          label="Question progress"
        />
      </div>

      {isQuestionStep(step) ? (
        <div className="mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-label text-muted">
            {stepCopy[step].kicker}
          </p>
          <h3
            aria-live="polite"
            className="mt-3 text-2xl leading-snug text-ink sm:text-3xl"
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

      <div className="mt-8">
        {step === "type" ? (
          <ChoiceList
            legend={stepCopy.type.question}
            options={projectTypeOptions}
            value={answers.projectType}
            onChange={(projectType) => update({ projectType })}
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
                hint="Optional. Select all that apply."
              >
                <ChoiceList
                  multiple
                  legend="What should people be able to do once they have signed in?"
                  options={accountFeatureOptions}
                  value={answers.accountFeatures}
                  onChange={(feature) =>
                    update({
                      accountFeatures: answers.accountFeatures.includes(feature)
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
                onChange={(integrationsOther) => update({ integrationsOther })}
                multiline
              />
            ) : null}
          </div>
        ) : null}

        {step === "budget" ? (
          <div className="space-y-10">
            <ChoiceList
              legend={stepCopy.budget.question}
              options={budgetOptions}
              value={answers.budgetStance}
              onChange={(budgetStance) => update({ budgetStance })}
            />
            {answers.budgetStance === "have-budget" ? (
              <TextField
                id="budget-amount"
                label="Budget note"
                hint={
                  PRICING_ENABLED
                    ? undefined
                    : "Use whatever currency you work in. This is not a quote."
                }
                value={answers.budgetAmount}
                onChange={(budgetAmount) => update({ budgetAmount })}
              />
            ) : null}
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
            <TextField
              id="inquiry-description"
              label="Project notes"
              hint="Optional. Anything else we should know."
              value={answers.projectDescription}
              onChange={(projectDescription) => update({ projectDescription })}
              multiline
            />
            <label className="flex cursor-pointer gap-3">
              <input
                type="checkbox"
                checked={answers.consent}
                onChange={(event) => update({ consent: event.target.checked })}
                className="mt-1 size-4 shrink-0 border border-ink/35 accent-mark"
              />
              <span className="leading-relaxed text-ink">
                I agree that KodRoot may use these details to respond to this
                inquiry.
              </span>
            </label>
          </div>
        ) : null}

        {step === "review" ? (
          <InquiryReview answers={answers} onEdit={goTo} />
        ) : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-6 leading-relaxed text-ink">
          {error}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        {step !== "type" ? (
          <TextButton variant="secondary" onClick={goBack}>
            Back
          </TextButton>
        ) : null}
        <TextButton type="submit">
          {step === "review" ? "Prepare brief" : "Continue"}
        </TextButton>
      </div>
    </form>
  );
}

function FollowUp({
  question,
  hint,
  children,
}: {
  question: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-lg leading-snug text-ink">{question}</p>
      {hint ? <p className="mt-2 leading-relaxed text-muted">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  required,
  type = "text",
  autoComplete,
  inputMode,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  multiline?: boolean;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const fieldClassName =
    "mt-2 w-full border border-ink/20 bg-paper px-3 py-2.5 text-ink";

  return (
    <div>
      <label
        htmlFor={id}
        className="text-[13px] font-semibold uppercase tracking-label text-ink"
      >
        {label}
        {required ? (
          <span className="font-normal text-muted"> required</span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          aria-describedby={hintId}
          rows={4}
          className={`${fieldClassName} min-h-28`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-describedby={hintId}
          className={`${fieldClassName} min-h-11`}
        />
      )}
    </div>
  );
}

function toggleIntegration(
  current: Integration[],
  value: Integration,
): Integration[] {
  if (value === "nothing" || value === "not-sure") {
    return current.includes(value) ? [] : [value];
  }

  const withoutExclusive = current.filter(
    (item) => item !== "nothing" && item !== "not-sure",
  );

  return withoutExclusive.includes(value)
    ? withoutExclusive.filter((item) => item !== value)
    : [...withoutExclusive, value];
}
