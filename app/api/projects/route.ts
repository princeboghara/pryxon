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
  return path.join(dataDir, "projects.json");
}

function readProjects() {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  return [];
}

function writeProjects(data: any[]) {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  return NextResponse.json({ projects: readProjects() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, client, clientEmail, service, budget, deadline, leadArchitect, description } = body;

    if (!name || !client || !service) {
      return NextResponse.json({ error: "Name, client, and service are required" }, { status: 400 });
    }

    const newProject = {
      id: "proj_" + Date.now().toString(36),
      name,
      client,
      clientEmail: clientEmail || "",
      service,
      budget: budget || "₹50,000",
      status: "in-progress",
      progress: 10,
      deadline: deadline || new Date(Date.now() + 86400000 * 20).toISOString().split("T")[0],
      leadArchitect: leadArchitect || "Alex Morgan",
      repoUrl: "https://github.com/pryxon",
      figmaUrl: "https://figma.com",
      description: description || "Client bespoke software implementation.",
    };

    const projects = readProjects();
    projects.unshift(newProject);
    writeProjects(projects);

    return NextResponse.json({ success: true, project: newProject });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, progress } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const projects = readProjects();
    const index = projects.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (status !== undefined) projects[index].status = status;
    if (progress !== undefined) projects[index].progress = progress;

    writeProjects(projects);
    return NextResponse.json({ success: true, project: projects[index] });
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

