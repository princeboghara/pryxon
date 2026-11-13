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

const defaultInquiries = [
  {
    id: "inq_dnora01",
    name: "Aarav Mehta",
    email: "aarav@dnorastore.com",
    service: "E-Commerce",
    budget: "8k-15k",
    details: "Looking for a luxury storefront redesign with Next.js, Stripe & Razorpay instant checkout, and interactive 3D product showcase for bridal clutches.",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "new",
    ip: "103.24.88.12",
  },
  {
    id: "inq_avira02",
    name: "Dr. Rohini Shah",
    email: "dr.rohini@avirawellness.in",
    service: "Web Development",
    budget: "15k+",
    details: "D2C Ayurvedic wellness portal with personalized dosage quiz, subscription replenishment engine, and integrated WhatsApp order tracking.",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: "contacted",
    ip: "49.36.120.4",
  },
  {
    id: "inq_diraa03",
    name: "Siddharth Verma",
    email: "siddharth@cloudengine.dev",
    service: "Custom Software",
    budget: "8k-15k",
    details: "Enterprise microservices router with low-latency API proxy, rate limiter, automated SSL cert issuance, and real-time analytics dashboard.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: "completed",
    ip: "157.34.12.98",
  },
];

function getFilePath() {
  const dataDir = process.env.VERCEL ? "/tmp/data" : path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {}
  }
  return path.join(dataDir, "inquiries.json");
}

function readInquiries() {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn("Read warning:", err);
  }
  return defaultInquiries;
}

function writeInquiries(data: any[]) {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Write warning:", err);
  }
}

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

    const existing = readInquiries();
    existing.unshift(submission);
    writeInquiries(existing);

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
  const inquiries = readInquiries();
  return NextResponse.json({ inquiries });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    const inquiries = readInquiries();
    const index = inquiries.findIndex((inq: any) => inq.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    inquiries[index].status = status;
    inquiries[index].updatedAt = new Date().toISOString();
    writeInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id parameter required" }, { status: 400 });
    }

    let inquiries = readInquiries();
    inquiries = inquiries.filter((inq: any) => inq.id !== id);
    writeInquiries(inquiries);

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
