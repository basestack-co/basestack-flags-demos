import { fetchFlag } from "@basestack/flags-react/server";
import { NextResponse } from "next/server";
import { flagsConfig } from "@/libs/feature-flags/config";

export async function GET() {
  try {
    const flag = await fetchFlag("stats_grid", flagsConfig);

    return NextResponse.json({
      flag: {
        slug: flag.slug,
        enabled: flag.enabled,
        description: flag.description,
        payload: flag.payload ?? null,
        createdAt: flag.createdAt,
        updatedAt: flag.updatedAt,
        expiredAt: flag.expiredAt ? flag.expiredAt : null,
      },
      message: flag.enabled
        ? "Initiative overview is enabled for customers."
        : "Initiative overview is currently disabled.",
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to load flag", error);
    return NextResponse.json(
      { message: "Unable to load flag" },
      { status: 500 },
    );
  }
}
