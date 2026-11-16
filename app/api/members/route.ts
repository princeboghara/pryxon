import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getFilePath() {
  const dataDir = process.env.VERCEL ? "/tmp/data" : path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {}
  }
  return path.join(dataDir, "members.json");
}

function readMembers() {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  return [];
}

function writeMembers(data: any[]) {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  return NextResponse.json({ members: readMembers() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, department } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Name, email, and role are required" }, { status: 400 });
    }

    const members = readMembers();
    if (members.some((m: any) => m.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: "Member email already exists" }, { status: 400 });
    }

    const initials = name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newMember = {
      id: "mem_" + Date.now().toString(36),
      name,
      email,
      role,
      avatar: initials || "TM",
      department: department || "Engineering",
      status: "active",
      activeProjects: 0,
      completedTasks: 0,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    members.push(newMember);
    writeMembers(members);

    return NextResponse.json({ success: true, member: newMember });
  } catch {
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
  }
}

