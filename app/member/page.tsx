"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Code2,
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  RefreshCw,
  LogOut,
  ExternalLink,
  Github,
  Figma,
  ChevronRight,
  TrendingUp,
  Layers,
  Search,
  Sparkles,
  ArrowLeft,
  X,
  User,
  Check,
  Send,
  Terminal,
  Activity,
  Calendar,
  ShieldCheck,
  Briefcase,
  Copy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "normal" | "high" | "urgent";
  assignedTo: string;
  assigneeName: string;
  dueDate: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  service: string;
  budget: string;
  status: "in-progress" | "in-review" | "completed" | "delayed";
  progress: number;
  deadline: string;
  leadArchitect: string;
  repoUrl?: string;
  figmaUrl?: string;
  description: string;
}

interface MemberUser {
  name: string;
  email: string;
  role: string;
  department: string;
}

interface StandupLog {
  id: string;
  author: string;
  timestamp: string;
  today: string;
  next: string;
  blockers: string;
}

export default function MemberPortalPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<MemberUser>({
    name: "Alex Morgan",
    email: "developer@pryxon.com",
    role: "Senior Fullstack Engineer",
    department: "Web & Core Platform",
  });

  const [activeTab, setActiveTab] = useState<"kanban" | "projects" | "standup" | "resources">("kanban");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedText, setCopiedText] = useState("");

  // New Task Modal
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    projectName: "DNORA Luxury",
    description: "",
    priority: "normal" as Task["priority"],
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
  });

  // Standup State
  const [standupLogs, setStandupLogs] = useState<StandupLog[]>([
    {
      id: "std_1",
      author: "Alex Morgan",
      timestamp: "Today at 10:15 AM",
      today: "Completed Razorpay checkout integration for DNORA Luxury and tested UPI intent flow.",
      next: "Wire Meta Cloud API webhook listener for Avira Global order status updates.",
      blockers: "None. Sandbox test keys are working seamlessly.",
    },
    {
      id: "std_2",
      author: "Priya Sharma",
      timestamp: "Today at 09:40 AM",
      today: "Designed multi-tenant API key management view for Kura Pay.",
      next: "Implement client secret rotation modal and rate-limit configuration cards.",
      blockers: "Awaiting bank sandbox documentation from Kura fintech partners.",
    },
  ]);

  const [newStandup, setNewStandup] = useState({
    today: "",
    next: "",
    blockers: "",
  });

  // Check Session
  useEffect(() => {
    const isAuth = sessionStorage.getItem("pryxon_member_auth");
    if (isAuth !== "true") {
      router.push("/member/login");
    } else {
      setIsAuthenticated(true);
      const storedUser = sessionStorage.getItem("pryxon_member_user");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch {}
      }
      fetchTasks();
      fetchProjects();
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("pryxon_member_auth");
    sessionStorage.removeItem("pryxon_member_token");
    sessionStorage.removeItem("pryxon_member_user");
    router.push("/member/login");
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task["status"]) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
      fetchTasks();
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTask,
          assignedTo: currentUser.email,
          assigneeName: currentUser.name,
        }),
      });

      const data = await res.json();
      if (data.task) {
        setTasks((prev) => [data.task, ...prev]);
        setIsNewTaskOpen(false);
        setNewTask({
          title: "",
          projectName: "DNORA Luxury",
          description: "",
          priority: "normal",
          dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
        });
      }
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  const handleStandupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStandup.today) return;

    const entry: StandupLog = {
      id: "std_" + Date.now().toString(36),
      author: currentUser.name,
      timestamp: "Just now",
      today: newStandup.today,
      next: newStandup.next || "Ongoing sprint tasks.",
      blockers: newStandup.blockers || "No blockers reported.",
    };

    setStandupLogs([entry, ...standupLogs]);
    setNewStandup({ today: "", next: "", blockers: "" });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2500);
  };

  // Metrics
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length;
  const reviewCount = tasks.filter((t) => t.status === "review").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      t.title.toLowerCase().includes(term) ||
      t.projectName.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Verifying Member Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-500/20">
      {/* Top Corporate Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Workspace Name */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-28 sm:w-32 h-7 transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/assets/images/logo_pryxon_studio.png"
                  alt="Pryxon Studio"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <span className="hidden sm:inline-block w-px h-5 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>Member Workspace</span>
              </div>
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Sprint 42 Active
              </span>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg border border-slate-200/60 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              <span>Admin Portal</span>
            </Link>

            {/* Member Info Pill */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {currentUser.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="ml-1 p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Workspace Subheader & KPI Velocity Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2.5">
              <span>Developer Sprint Hub</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Q4 Architecture
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Welcome back, <span className="font-semibold text-slate-800">{currentUser.name}</span>. Track active sprint tasks, review client architecture deliverables, and log daily milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTasks}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Sync Tasks</span>
            </button>

            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Assigned Tasks</span>
              <FolderKanban className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-950">{totalTasks}</div>
            <p className="text-[11px] text-slate-500 mt-1">
              Across 4 live client projects
            </p>
          </Card>

          <Card className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Active In-Progress</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-600">{inProgressCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">
              {reviewCount} tasks currently in review
            </p>
          </Card>

          <Card className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Completed Sprint</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">{completedCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">
              Verified & ready for staging
            </p>
          </Card>

          <Card className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Sprint Completion</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-600">{completionRate}%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </Card>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "kanban"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Sprint Kanban</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === "kanban" ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"}`}>
                {filteredTasks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "projects"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Client Deliverables</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === "projects" ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"}`}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("standup")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "standup"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Standup Log</span>
            </button>

            <button
              onClick={() => setActiveTab("resources")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "resources"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Developer Hub & APIs</span>
            </button>
          </div>

          {/* Search Box */}
          {activeTab === "kanban" && (
            <div className="relative w-48 sm:w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 text-xs bg-white border-slate-200 h-9 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* TAB 1: SPRINT KANBAN BOARD */}
        {activeTab === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
            {/* Column 1: TODO */}
            <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-3 min-h-[500px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    To Do / Backlog
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  {filteredTasks.filter((t) => t.status === "todo").length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredTasks
                  .filter((t) => t.status === "todo")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateStatus={updateTaskStatus}
                    />
                  ))}
                {filteredTasks.filter((t) => t.status === "todo").length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-8">
                    No backlog items.
                  </p>
                )}
              </div>
            </div>

            {/* Column 2: IN PROGRESS */}
            <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-3 min-h-[500px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    In Progress
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {filteredTasks.filter((t) => t.status === "in-progress").length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredTasks
                  .filter((t) => t.status === "in-progress")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateStatus={updateTaskStatus}
                    />
                  ))}
                {filteredTasks.filter((t) => t.status === "in-progress").length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-8">
                    No active tasks right now.
                  </p>
                )}
              </div>
            </div>

            {/* Column 3: IN REVIEW */}
            <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-3 min-h-[500px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Code Review
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {filteredTasks.filter((t) => t.status === "review").length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredTasks
                  .filter((t) => t.status === "review")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateStatus={updateTaskStatus}
                    />
                  ))}
                {filteredTasks.filter((t) => t.status === "review").length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-8">
                    All reviews merged!
                  </p>
                )}
              </div>
            </div>

            {/* Column 4: COMPLETED */}
            <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-3 min-h-[500px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Completed
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {filteredTasks.filter((t) => t.status === "completed").length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredTasks
                  .filter((t) => t.status === "completed")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateStatus={updateTaskStatus}
                    />
                  ))}
                {filteredTasks.filter((t) => t.status === "completed").length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-8">
                    No completed tasks yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT DELIVERABLES & PROJECTS */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {project.service}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                            project.status === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : project.status === "in-review"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {project.status.replace("-", " ")}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Client: {project.client}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 font-medium block">Budget</span>
                      <span className="text-base font-bold text-slate-950">
                        {project.budget}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Engineering Milestone</span>
                      <span className="font-bold text-slate-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          project.progress === 100
                            ? "bg-emerald-500"
                            : project.progress > 70
                            ? "bg-blue-600"
                            : "bg-amber-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target: <strong className="text-slate-700">{project.deadline}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Codebase</span>
                      </a>
                    )}
                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors"
                      >
                        <Figma className="w-3.5 h-3.5 text-purple-600" />
                        <span>Design</span>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: DAILY STANDUP LOG */}
        {activeTab === "standup" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Log New Standup Form */}
            <Card className="lg:col-span-1 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-950">
                  Log Today&apos;s Standup
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Record your daily velocity, upcoming sprint items, and dependencies for the team sync.
              </p>

              <form onSubmit={handleStandupSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    What did you complete today? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Integrated Razorpay webhook listener, closed 3 PRs..."
                    value={newStandup.today}
                    onChange={(e) =>
                      setNewStandup({ ...newStandup, today: e.target.value })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    What is on deck for tomorrow?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Push automated test suites, prepare staging deployment..."
                    value={newStandup.next}
                    onChange={(e) =>
                      setNewStandup({ ...newStandup, next: e.target.value })
                    }
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Any Blockers / Roadblocks?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. None / Awaiting client SSL credentials"
                    value={newStandup.blockers}
                    onChange={(e) =>
                      setNewStandup({ ...newStandup, blockers: e.target.value })
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Daily Log</span>
                </button>
              </form>
            </Card>

            {/* Standup History Feed */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Recent Team Standups
                </h3>
                <span className="text-xs text-slate-500">
                  {standupLogs.length} updates recorded
                </span>
              </div>

              {standupLogs.map((log) => (
                <Card
                  key={log.id}
                  className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                        {log.author[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {log.author}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-emerald-700 block text-[11px] mb-0.5">
                        DONE TODAY:
                      </span>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                        {log.today}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-blue-700 block text-[11px] mb-0.5">
                        UP NEXT:
                      </span>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                        {log.next}
                      </p>
                    </div>

                    {log.blockers && (
                      <div>
                        <span className="font-semibold text-slate-500 block text-[11px] mb-0.5">
                          DEPENDENCIES & BLOCKERS:
                        </span>
                        <p className="text-slate-600 text-[11px]">
                          {log.blockers}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DEVELOPER HUB & APIS */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* API Endpoints Catalog */}
            <Card className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-950">
                  Internal Core API Gateway
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Standard Next.js REST endpoints serving both the client website, Admin portal, and Member Workspace.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                        GET / POST
                      </span>
                      <code className="text-xs font-mono font-semibold text-slate-900">
                        /api/tasks
                      </code>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Sprint kanban task query, status patch, and creation
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard("/api/tasks", "tasks")}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors"
                  >
                    {copiedText === "tasks" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        GET / POST
                      </span>
                      <code className="text-xs font-mono font-semibold text-slate-900">
                        /api/projects
                      </code>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Active client deliverables, progress milestones & budgets (₹)
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard("/api/projects", "projects")}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors"
                  >
                    {copiedText === "projects" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                        POST
                      </span>
                      <code className="text-xs font-mono font-semibold text-slate-900">
                        /api/inquiry
                      </code>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Client intake leads, service bookings & WhatsApp payload
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard("/api/inquiry", "inquiry")}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors"
                  >
                    {copiedText === "inquiry" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                        POST
                      </span>
                      <code className="text-xs font-mono font-semibold text-slate-900">
                        /api/auth
                      </code>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Dual-role authentication verifying admin and member sessions
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard("/api/auth", "auth")}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors"
                  >
                    {copiedText === "auth" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </Card>

            {/* Quick Git Commands & Production Guidelines */}
            <Card className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-950">
                  Engineering Standards & Git Flow
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                All feature branches require passing lint checks, responsive QA on mobile, and zero 60 FPS scroll hitching.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl flex items-center justify-between">
                  <span>git checkout -b feature/sprint-42-dnora</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "git checkout -b feature/sprint-42-dnora",
                        "git1"
                      )
                    }
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedText === "git1" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl flex items-center justify-between">
                  <span>npm run build</span>
                  <button
                    onClick={() => copyToClipboard("npm run build", "git2")}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedText === "git2" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-sans text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Production Architecture Verification</span>
                  </div>
                  <p className="text-emerald-700 text-[11px] leading-relaxed">
                    Always verify mobile swipe behavior: ensure single touch listener with 450ms lockout debounce to prevent card jumping.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* CREATE NEW TASK MODAL */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsNewTaskOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-950 mb-1">
              Create Sprint Task
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add a new actionable engineering item to your Kanban board.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Task Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Implement webhook retry logic"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="text-xs bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Client Project
                  </label>
                  <select
                    value={newTask.projectName}
                    onChange={(e) =>
                      setNewTask({ ...newTask, projectName: e.target.value })
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="DNORA Luxury">DNORA Luxury</option>
                    <option value="Avira Global">Avira Global</option>
                    <option value="Kura Pay">Kura Pay</option>
                    <option value="Diraa Cloud">Diraa Cloud</option>
                    <option value="Pryxon Internal">Pryxon Internal</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority: e.target.value as Task["priority"],
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  className="text-xs bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Description & Technical Specs
                </label>
                <textarea
                  rows={3}
                  placeholder="Details, test acceptance criteria, endpoints..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Kanban Task Card Component
function TaskCard({
  task,
  onUpdateStatus,
}: {
  task: Task;
  onUpdateStatus: (id: string, status: Task["status"]) => void;
}) {
  const priorityColors = {
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-amber-100 text-amber-800 border-amber-200",
    normal: "bg-blue-100 text-blue-800 border-blue-200",
    low: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <Card className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all space-y-3 group">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 truncate max-w-[140px]">
          {task.projectName}
        </span>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border ${
            priorityColors[task.priority] || priorityColors.normal
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{task.dueDate}</span>
        </div>

        {/* Status Transition Control */}
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value as Task["status"])}
          className="text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer hover:bg-slate-100 transition-colors"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">In Review</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </Card>
  );
}

