import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  details: z.string().min(5, "Details must be at least 5 characters").max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = inquirySchema.parse(body);

    const submission = {
      id: "inq_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      ...validatedData,
      createdAt: new Date().toISOString(),
      status: "new",
      ip: req.headers.get("x-forwarded-for") || "local",
    };

    // Save to local JSON database for persistence
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "inquiries.json");
    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        existing = [];
      }
    }

    existing.unshift(submission);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received. Our team will contact you shortly.",
      id: submission.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "inquiries.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return NextResponse.json({ inquiries: data });
    }
    return NextResponse.json({ inquiries: [] });
  } catch {
    return NextResponse.json({ inquiries: [] });
  }
}
