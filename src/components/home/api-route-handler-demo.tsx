"use client";

import { useState } from "react";

type RouteHandlerResponse = {
  flag: {
    slug: string;
    enabled: boolean;
    description: string;
    payload: unknown;
    createdAt: string;
    updatedAt: string;
    expiredAt: string | null;
  };
  message: string;
  checkedAt: string;
};

const isRouteHandlerResponse = (
  value: unknown,
): value is RouteHandlerResponse => {
  if (!value || typeof value !== "object") return false;
  return "flag" in value && "message" in value && "checkedAt" in value;
};

export function ApiRouteHandlerDemo() {
  const [data, setData] = useState<RouteHandlerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRouteData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/route-handler-demo", {
        cache: "no-store",
      });
      const payload = (await response.json()) as unknown;

      if (!response.ok || !isRouteHandlerResponse(payload)) {
        throw new Error("Unable to load flag status.");
      }

      setData(payload);
    } catch {
      setData(null);
      setError("Request failed. Retry in a few seconds.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="panel rounded-2xl p-6 md:p-7">
      <div className="mb-6 space-y-2">
        <span className="inline-flex items-center rounded-md border border-border bg-surface-soft px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-muted">
          Backend Endpoint Check
        </span>
        <h3 className="font-display text-3xl leading-tight">Shared Flag API</h3>
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          Internal tools call this endpoint to read current release rules and
          stay consistent with the customer-facing app.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-surface-soft p-4">
        <button
          onClick={fetchRouteData}
          disabled={isLoading}
          className="cursor-pointer rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Loading live status..." : "Load live status"}
        </button>

        {error && (
          <p className="rounded-lg border border-warning/30 bg-warning-soft px-3 py-2.5 text-sm text-warning">
            {error}
          </p>
        )}

        {data && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/80">
              {data.message}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  Flag
                </p>
                <p className="mt-1 text-sm font-semibold">{data.flag.slug}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  Status
                </p>
                <p
                  className={`mt-1 text-sm font-semibold ${data.flag.enabled ? "text-accent" : "text-muted"}`}
                >
                  {data.flag.enabled ? "Visible" : "Hidden"}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Description
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                {data.flag.description}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-3">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Payload
              </p>
              <pre className="mt-2 overflow-auto font-mono text-xs leading-5 text-foreground/80">
                {JSON.stringify(data.flag.payload ?? {}, null, 2)}
              </pre>
            </div>

            <p className="font-mono text-xs text-muted">
              Checked at {new Date(data.checkedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
