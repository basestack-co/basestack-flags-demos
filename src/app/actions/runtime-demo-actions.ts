"use server";

import { type Flag, fetchFlag } from "@basestack/flags-react/server";
import { flagsConfig } from "@/libs/feature-flags/config";

export type ServerActionDemoState = {
  status: "idle" | "success" | "error";
  message: string;
  surface: string;
  checkedAt: string | null;
  flag: {
    slug: string;
    enabled: boolean;
    description: string;
    payload: unknown;
    createdAt: Date;
    updatedAt: Date;
    expiredAt: Date | null;
  } | null;
};

export async function getHeaderFlagAction(slug = "header"): Promise<Flag> {
  return fetchFlag(slug, flagsConfig);
}

export async function runHeaderPolicyAction(
  _prevState: ServerActionDemoState,
  formData: FormData,
): Promise<ServerActionDemoState> {
  const surface =
    String(formData.get("surface") ?? "Homepage").trim() || "Homepage";
  const slug = String(formData.get("flagSlug") ?? "header").trim() || "header";

  try {
    const flag = await getHeaderFlagAction(slug);
    const statusLabel = flag.enabled ? "visible" : "hidden";
    return {
      status: "success",
      message: `${slug} is ${statusLabel} on ${surface}.`,
      surface,
      checkedAt: new Date().toISOString(),
      flag: {
        slug: flag.slug,
        enabled: flag.enabled,
        description: flag.description,
        payload: flag.payload ?? null,
        createdAt: flag.createdAt,
        updatedAt: flag.updatedAt,
        expiredAt: flag.expiredAt ? flag.expiredAt : null,
      },
    };
  } catch {
    return {
      status: "error",
      message: "Unable to load release rule. Please try again.",
      surface,
      checkedAt: null,
      flag: null,
    };
  }
}
