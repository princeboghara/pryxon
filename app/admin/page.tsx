"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  RefreshCw,
  Download,
  Search,
  MessageCircle,
  Mail,
  Trash2,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  X,
  User,
  Filter,
  LogOut,
  FolderKanban,
  Users,
  BarChart3,
  Layers,
  ChevronRight,
  TrendingUp,
  Briefcase,
  AlertCircle,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  details: string;
  createdAt: string;
  status: "new" | "in-review" | "contacted" | "completed";
  ip?: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  clientEmail?: string;
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

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
  status: string;
  activeProjects: number;
  completedTasks: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"inquiries" | "projects" | "team" | "analytics">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    service: "Web Development",
    budget: "60k-1.2L",
    details: "",
  });

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    clientEmail: "",
    service: "Shopify & E-Commerce",
    budget: "₹59,999",
    deadline: "",
    leadArchitect: "Alex Morgan",
    description: "",
  });

  // Team State
  const [members, setMembers] = useState<Member[]>([]);
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Fullstack Engineer",
    department: "Engineering",
  });

  // Check Session
  useEffect(() => {
    const isAuth = sessionStorage.getItem("pryxon_admin_auth");
    if (isAuth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      fetchInquiries();
      fetchProjects();
      fetchMembers();
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("pryxon_admin_auth");
    sessionStorage.removeItem("pryxon_admin_token");
    sessionStorage.removeItem("pryxon_admin_user");
    router.push("/admin/login");
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry");
      const data = await res.json();
      if (Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load inquiries", err);
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
    } catch {}
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      if (Array.isArray(data.members)) {
        setMembers(data.members);
      }
    } catch {}
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiry?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        setIsNewLeadOpen(false);
        setNewLead({
          name: "",
          email: "",
          service: "Web Development",
          budget: "60k-1.2L",
          details: "",
        });
        fetchInquiries();
      }
    } catch (err) {
      console.error("Create lead error", err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        setIsNewProjectOpen(false);
        setNewProject({
          name: "",
          client: "",
          clientEmail: "",
          service: "Shopify & E-Commerce",
          budget: "₹59,999",
          deadline: "",
          leadArchitect: "Alex Morgan",
          description: "",
        });
        fetchProjects();
      }
    } catch {}
  };

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      if (res.ok) {
        setIsNewMemberOpen(false);
        setNewMember({
          name: "",
          email: "",
          role: "Fullstack Engineer",
          department: "Engineering",
        });
        fetchMembers();
      }
    } catch {}
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Service", "Budget", "Details", "Status", "Date"];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.service}"`,
      `"${inq.budget}"`,
      `"${inq.details.replace(/"/g, '""')}"`,
      `"${inq.status}"`,
      `"${new Date(inq.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pryxon_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
          <span>Verifying executive credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-500/20">
      {/* Top Corporate Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-28 sm:w-32 h-8">
              <Image
                src="/assets/images/logo_pryxon_studio.png"
                alt="Pryxon Studio"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-200" />
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin Executive Portal</span>
          </div>
        </div>

        {/* Navigation Tabs & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("inquiries")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "inquiries"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Leads &amp; Inquiries ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "projects"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("team")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "team"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Team ({members.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("analytics")}
              className={`hidden md:block px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "analytics"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Analytics
            </button>
          </nav>

          <Link
            href="/member"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
          >
            <span>Member Workspace</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-xl transition-colors border border-rose-200/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Top KPI Metrics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Leads</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">{inquiries.length}</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14% mo
              </span>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Projects</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {projects.filter((p) => p.status === "in-progress" || p.status === "in-review").length}
              </span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {projects.length} Total
              </span>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pipeline Value</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">₹8.45L</span>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                INR Live
              </span>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Team Allocation</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950">{members.length}</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                100% Active
              </span>
            </div>
          </Card>
        </div>

        {/* TAB 1: INQUIRIES & LEADS */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">Client Inquiries &amp; Pipeline</h2>
                <p className="text-xs sm:text-sm text-slate-500">Direct incoming leads submitted via the public contact gateway.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Manual Lead</span>
                </button>
                <button
                  type="button"
                  onClick={exportCSV}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={fetchInquiries}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors"
                  title="Refresh leads"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-blue-600" : ""}`} />
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by client name, email, service, or requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-xs font-medium rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl text-xs font-semibold">
                {["all", "new", "in-review", "contacted", "completed"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                      statusFilter === st
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {st === "all" ? "All" : st.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <Card className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Budget (INR)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                          No client inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-950">{inq.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{inq.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                              {inq.service}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900">{inq.budget}</span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                              className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none capitalize ${
                                inq.status === "new"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : inq.status === "in-review"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : inq.status === "contacted"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="in-review">In Review</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                            {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/?text=Hello%20${encodeURIComponent(
                                  inq.name
                                )}%2C%20thank%20you%20for%20reaching%20out%20to%20Pryxon%20Studio%20regarding%20${encodeURIComponent(
                                  inq.service
                                )}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Reply via WhatsApp"
                                className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`mailto:${inq.email}?subject=Pryxon%20Studio%20-%20Project%20Inquiry%20Discussion`}
                                title="Send Email"
                                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(inq)}
                                title="View Details"
                                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(inq.id)}
                                title="Delete Lead"
                                className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: PROJECTS & MILESTONES */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">Client Deliverables &amp; Projects</h2>
                <p className="text-xs sm:text-sm text-slate-500">Track milestones, code repositories, Figma designs, and architect assignments.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewProjectOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Client Project</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj) => (
                <Card key={proj.id} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 uppercase tracking-wider">
                        {proj.service}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md capitalize ${
                        proj.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-950 mb-1">{proj.name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mb-3">Client: {proj.client}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">{proj.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">Sprint Delivery</span>
                        <span className="font-extrabold text-slate-950">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50/80 p-3 rounded-xl border border-slate-100 mb-4">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">Lead Architect</span>
                        <span className="font-bold text-slate-800">{proj.leadArchitect}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">Deadline</span>
                        <span className="font-bold text-slate-800">{proj.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-black text-slate-950">{proj.budget}</span>
                    <div className="flex items-center gap-3">
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-600 hover:text-slate-900"
                        >
                          GitHub →
                        </a>
                      )}
                      {proj.figmaUrl && (
                        <a
                          href={proj.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-purple-600 hover:text-purple-700"
                        >
                          Figma →
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEAM ROSTER */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">Core Engineering Roster</h2>
                <p className="text-xs sm:text-sm text-slate-500">Lead architects, senior fullstack engineers, and product designers.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewMemberOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Team Member</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((mem) => (
                <Card key={mem.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-700 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                        {mem.avatar}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
                        {mem.status}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-950 mb-0.5">{mem.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold mb-2">{mem.role}</p>
                    <p className="text-[11px] text-slate-500 font-mono mb-4">{mem.email}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Active Sprints</span>
                    <span className="font-extrabold text-slate-950">{mem.activeProjects} Projects</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS SUMMARY */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">Performance &amp; Pipeline Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <h3 className="text-base font-bold text-slate-950 mb-4">Top Requested Client Capabilities</h3>
                <div className="space-y-3">
                  {[
                    { name: "Web Platforms (Next.js)", pct: 42, color: "bg-blue-600" },
                    { name: "Shopify Store & E-Commerce", pct: 28, color: "bg-emerald-600" },
                    { name: "Mobile Apps (iOS & Android)", pct: 18, color: "bg-purple-600" },
                    { name: "WhatsApp CRM & Lead Bot", pct: 12, color: "bg-amber-600" },
                  ].map((it) => (
                    <div key={it.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{it.name}</span>
                        <span>{it.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full ${it.color} rounded-full`} style={{ width: `${it.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950 mb-2">Deal Velocity &amp; Delivery SLA</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Average response time to incoming public inquiries is currently under 1.8 hours. Sprint delivery completion stands at 98.4% on-schedule.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Sprint On-Time Rate</span>
                  <span className="font-extrabold text-emerald-600">98.4% Exceptional</span>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: Lead Details */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedInquiry(null)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2 inline-block">
              {selectedInquiry.service}
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 mb-1">{selectedInquiry.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedInquiry.email}</p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs mb-4">
              <span className="font-bold text-slate-700 block mb-1">Project Requirements</span>
              <p className="text-slate-600 leading-relaxed">{selectedInquiry.details}</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
              <span className="font-bold text-slate-900">Budget: {selectedInquiry.budget}</span>
              <a
                href={`https://wa.me/?text=Hello%20${encodeURIComponent(
                  selectedInquiry.name
                )}%2C%20thank%20you%20for%20reaching%20out%20to%20Pryxon%20Studio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                Open WhatsApp Chat →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Create Manual Lead */}
      {isNewLeadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setIsNewLeadOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-slate-950 mb-4">Create Client Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service</label>
                  <select
                    value={newLead.service}
                    onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                    className="w-full h-10 px-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Shopify & E-Commerce">Shopify & E-Commerce</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="WhatsApp CRM">WhatsApp CRM</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Budget (INR)</label>
                  <select
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full h-10 px-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="25k-60k">₹25k - ₹60k</option>
                    <option value="60k-1.2L">₹60k - ₹1.2L</option>
                    <option value="1.2L-2.5L">₹1.2L - ₹2.5L</option>
                    <option value="2.5L+">₹2.5L+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Requirements</label>
                <textarea
                  required
                  rows={3}
                  value={newLead.details}
                  onChange={(e) => setNewLead({ ...newLead, details: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-slate-900"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors mt-2"
              >
                Save Client Lead
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Create Project */}
      {isNewProjectOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setIsNewProjectOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-slate-950 mb-4">Add Client Deliverable</h3>
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenora Living App"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Client Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenora Brands Ltd"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Type</label>
                  <select
                    value={newProject.service}
                    onChange={(e) => setNewProject({ ...newProject, service: e.target.value })}
                    className="w-full h-10 px-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Shopify & E-Commerce">Shopify & E-Commerce</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="WhatsApp CRM">WhatsApp CRM</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contract Budget</label>
                  <input
                    type="text"
                    required
                    placeholder="₹59,999"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors mt-2"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Add Member */}
      {isNewMemberOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setIsNewMemberOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-slate-950 mb-4">Add Team Member</h3>
            <form onSubmit={handleCreateMember} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-900"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors mt-2"
              >
                Add Member
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
