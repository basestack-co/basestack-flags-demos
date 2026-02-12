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
      <div className="mb-6 space-y-3">
        <p className="inline-flex rounded-full border border-border bg-surface-soft px-3 py-1 text-xs uppercase tracking-[0.12em] text-foreground/80">
          Direct Policy Check
        </p>
        <h3 className="font-display text-3xl leading-tight">
          Campaign Header Control
        </h3>
        <p className="max-w-xl text-sm leading-6 text-foreground/80">
          Product teams use this flow to evaluate a live toggle before
          publishing a banner. It checks the current flag and returns a
          ready-to-use visibility decision.
        </p>
      </div>

      <form
        action={formAction}
        className="grid gap-5 rounded-xl border border-border bg-surface-soft p-4"
      >
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/75">
            Display Surface
          </span>
          <select
            name="surface"
            defaultValue={state.surface}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          >
            <option>Homepage</option>
            <option>Search Results</option>
            <option>Checkout</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/75">
            Flag Slug
          </span>
          <input
            name="flagSlug"
            defaultValue={state.flag?.slug ?? "header"}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-accent"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Checking policy..." : "Run policy check"}
        </button>
      </form>

      <div className="mt-5 rounded-xl border border-border bg-surface-soft p-4">
        <p
          className={`text-sm font-semibold ${
            state.status === "error" ? "text-warning" : "text-foreground"
          }`}
        >
          {state.message}
        </p>

        {state.flag && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs uppercase tracking-[0.08em]">
                Flag
              </p>
              <p className="mt-1 text-sm font-semibold">{state.flag.slug}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs uppercase tracking-[0.08em]">
                Status
              </p>
              <p className="mt-1 text-sm font-semibold">
                {state.flag.enabled ? "Visible" : "Hidden"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 sm:col-span-2">
              <p className="font-mono text-xs uppercase tracking-[0.08em]">
                Description
              </p>
              <p className="mt-1 text-sm text-foreground/85">
                {state.flag.description}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-3 sm:col-span-2">
              <p className="font-mono text-xs uppercase tracking-[0.08em]">
                Payload
              </p>
              <pre className="mt-2 overflow-auto text-xs leading-5 text-foreground/85">
                {JSON.stringify(state.flag.payload ?? {}, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {state.checkedAt && (
          <p className="mt-3 font-mono text-xs text-foreground/70">
            Checked at {new Date(state.checkedAt).toLocaleString()}
          </p>
        )}
      </div>
    </article>
  );
}
