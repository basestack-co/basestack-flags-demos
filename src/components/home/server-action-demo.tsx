"use client";

import { useActionState } from "react";
import {
  runHeaderPolicyAction,
  type ServerActionDemoState,
} from "@/app/actions/runtime-demo-actions";

const initialState: ServerActionDemoState = {
  status: "idle",
  message:
    "Run a policy check to confirm if the campaign header should be shown.",
  surface: "Homepage",
  checkedAt: null,
  flag: null,
};

export function ServerActionDemo() {
  const [state, formAction, isPending] = useActionState(
    runHeaderPolicyAction,
    initialState,
  );

  return (
    <article className="panel rounded-2xl p-6 md:p-7">
      <div className="mb-6 space-y-2">
        <span className="inline-flex items-center rounded-md border border-border bg-surface-soft px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-muted">
          Direct Policy Check
        </span>
        <h3 className="font-display text-3xl leading-tight">
          Campaign Header Control
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          Product teams use this flow to evaluate a live toggle before
          publishing a banner. It checks the current flag and returns a
          ready-to-use visibility decision.
        </p>
      </div>

      <form
        action={formAction}
        className="grid gap-4 rounded-xl border border-border bg-surface-soft p-4"
      >
        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Display Surface
          </span>
          <select
            name="surface"
            defaultValue={state.surface}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
          >
            <option>Homepage</option>
            <option>Search Results</option>
            <option>Checkout</option>
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Flag Slug
          </span>
          <input
            name="flagSlug"
            defaultValue={state.flag?.slug ?? "header"}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Checking policy..." : "Run policy check"}
        </button>
      </form>

      <div className="mt-4 rounded-xl border border-border bg-surface-soft p-4">
        <p
          className={`text-sm font-medium ${
            state.status === "error" ? "text-warning" : "text-foreground/80"
          }`}
        >
          {state.message}
        </p>

        {state.flag && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Flag
              </p>
              <p className="mt-1 text-sm font-semibold">{state.flag.slug}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Status
              </p>
              <p
                className={`mt-1 text-sm font-semibold ${state.flag.enabled ? "text-accent" : "text-muted"}`}
              >
                {state.flag.enabled ? "Visible" : "Hidden"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 sm:col-span-2">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Description
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                {state.flag.description}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 sm:col-span-2">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Payload
              </p>
              <pre className="mt-2 overflow-auto font-mono text-xs leading-5 text-foreground/80">
                {JSON.stringify(state.flag.payload ?? {}, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {state.checkedAt && (
          <p className="mt-3 font-mono text-xs text-muted">
            Checked at {new Date(state.checkedAt).toLocaleString()}
          </p>
        )}
      </div>
    </article>
  );
}
