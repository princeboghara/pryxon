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
  return path.join(dataDir, "tasks.json");
}

function readTasks() {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  return [];
}

function writeTasks(data: any[]) {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const assignedTo = searchParams.get("assignedTo");

  let tasks = readTasks();
  if (assignedTo) {
    tasks = tasks.filter((t: any) => t.assignedTo?.toLowerCase() === assignedTo.toLowerCase());
  }

  return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, projectName, title, description, priority, assignedTo, assigneeName, dueDate } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTask = {
      id: "task_" + Date.now().toString(36),
      projectId: projectId || "proj_general",
      projectName: projectName || "Pryxon Internal",
      title,
      description: description || "",
      status: "todo",
      priority: priority || "normal",
      assignedTo: assignedTo || "developer@pryxon.com",
      assigneeName: assigneeName || "Alex Morgan",
      dueDate: dueDate || new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0],
    };

    const tasks = readTasks();
    tasks.unshift(newTask);
    writeTasks(tasks);

    return NextResponse.json({ success: true, task: newTask });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, priority } = body;

    if (!id) {
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }

    const tasks = readTasks();
    const index = tasks.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (status !== undefined) tasks[index].status = status;
    if (priority !== undefined) tasks[index].priority = priority;

    writeTasks(tasks);
    return NextResponse.json({ success: true, task: tasks[index] });
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

