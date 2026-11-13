"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Unlock,
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    service: "Web Development",
    budget: "3k-8k",
    details: "",
  });

  // Check cached login
  useEffect(() => {
    const cachedAuth = sessionStorage.getItem("pryxon_admin_auth");
    if (cachedAuth === "true") {
      setIsAuthenticated(true);
      fetchInquiries();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "pryxon@2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("pryxon_admin_auth", "true");
      setAuthError("");
      fetchInquiries();
    } else {
      setAuthError("Invalid administrative passcode. Please verify your credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("pryxon_admin_auth");
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
        setIsNewModalOpen(false);
        setNewLead({
          name: "",
          email: "",
          service: "Web Development",
          budget: "3k-8k",
          details: "",
        });
        fetchInquiries();
      }
    } catch (err) {
      console.error("Create lead error", err);
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
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
    link.setAttribute("download", `pryxon-inquiries-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // If not authenticated, show sleek light passcode screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-500/20">
        <div className="w-full max-w-md">
          <Card className="p-8 sm:p-9 rounded-3xl glass-panel border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-300 text-slate-800 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Lock className="w-6 h-6 text-slate-700" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight mb-1">
                Pryxon Admin Console
              </h1>
              <p className="text-xs text-slate-500">
                Restricted Executive Portal &bull; Passcode Protected
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Enter Administrative Passcode
                </label>
                <Input
                  type="password"
                  placeholder="Enter passcode (e.g. pryxon@2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="rounded-xl border-slate-300 bg-white/90 text-sm h-11"
                  required
                />
              </div>

              {authError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="btn-titanium btn-titanium-primary w-full py-3 text-sm justify-center shadow-md font-semibold"
              >
                <Unlock className="w-4 h-4 mr-1.5" />
                <span>Unlock Console</span>
              </button>
            </form>

            <div className="mt-6 text-center pt-4 border-t border-slate-200/80">
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Pryxon Studio Home</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Authenticated Minimal Light Executive Dashboard
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/20 pb-16">
      {/* Top Header Bar with Titanium Buttons */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-32 h-8">
                <Image
                  src="/assets/images/logo_pryxon_studio.png"
                  alt="Pryxon Studio"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <Badge variant="default" className="text-[11px] font-bold bg-slate-100 text-slate-800 border-slate-200/90 py-0.5">
              Admin Console
            </Badge>
          </div>

          {/* Action Titanium Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchInquiries}
              title="Refresh Inquiries"
              className="btn-titanium btn-titanium-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportCSV}
              title="Export CSV"
              className="btn-titanium btn-titanium-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNewModalOpen(true)}
              className="btn-titanium btn-titanium-primary btn-titanium-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Lead</span>
            </button>

            <Link href="/" className="btn-titanium btn-titanium-sm">
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Website</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="btn-titanium btn-titanium-sm text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* KPI Metric Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 rounded-2xl glass-panel border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Total Inquiries
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {inquiries.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>● Live Synced</span>
            </div>
          </Card>

          <Card className="p-5 rounded-2xl glass-panel border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              New Leads
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              {inquiries.filter((x) => x.status === "new").length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Awaiting First Contact
            </div>
          </Card>

          <Card className="p-5 rounded-2xl glass-panel border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              In Contact / Review
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {inquiries.filter((x) => x.status === "contacted" || x.status === "in-review").length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Active Negotiations
            </div>
          </Card>

          <Card className="p-5 rounded-2xl glass-panel border border-slate-200/80 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Completed Deals
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {inquiries.filter((x) => x.status === "completed").length}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              Successfully Closed
            </div>
          </Card>
        </div>

        {/* Search, Filter Bar with Titanium Controls */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by client, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-xl border-slate-200 bg-white text-sm h-10"
            />
          </div>

          {/* Status Filter Titanium Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["all", "new", "in-review", "contacted", "completed"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`btn-titanium btn-titanium-sm ${
                  statusFilter === tab ? "btn-titanium-primary font-bold shadow-sm" : ""
                }`}
              >
                {tab === "all" ? "All Leads" : tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table / Cards Container */}
        {filteredInquiries.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl glass-panel border border-slate-200/80">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Client Inquiries Found</h3>
            <p className="text-xs text-slate-500 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search terms or filters."
                : "New inquiries from the website contact form will appear here automatically."}
            </p>
            <button
              type="button"
              onClick={() => setIsNewModalOpen(true)}
              className="btn-titanium btn-titanium-primary btn-titanium-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Manual Lead</span>
            </button>
          </Card>
        ) : (
          <div className="space-y-3.5">
            {filteredInquiries.map((inq) => {
              const statusColors = {
                new: "bg-blue-50 text-blue-700 border-blue-200",
                "in-review": "bg-purple-50 text-purple-700 border-purple-200",
                contacted: "bg-amber-50 text-amber-700 border-amber-200",
                completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
              }[inq.status] || "bg-slate-50 text-slate-700 border-slate-200";

              return (
                <Card
                  key={inq.id}
                  className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-200/85 hover:border-slate-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-extrabold text-base sm:text-lg text-slate-950">
                        {inq.name}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColors}`}>
                        {inq.status.replace("-", " ")}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(inq.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">{inq.email}</span>
                      <span>&bull;</span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {inq.service}
                      </span>
                      <span>&bull;</span>
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-semibold border border-emerald-100">
                        Budget: {inq.budget}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 max-w-3xl">
                      {inq.details}
                    </p>
                  </div>

                  {/* Titanium Action Buttons for this Lead */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inq)}
                      className="btn-titanium btn-titanium-sm"
                    >
                      <span>View Details</span>
                    </button>

                    {/* WhatsApp Quick Reply Button */}
                    <a
                      href={`https://wa.me/918141815695?text=Hello%20${encodeURIComponent(
                        inq.name
                      )}%2C%20this%20is%20Pryxon%20Studio%20regarding%20your%20inquiry%20for%20${encodeURIComponent(
                        inq.service
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-titanium btn-titanium-sm text-emerald-700 hover:text-emerald-800"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Direct Mail Button */}
                    <a
                      href={`mailto:${inq.email}?subject=Pryxon%20Studio%20-%20Project%20Inquiry%20for%20${encodeURIComponent(
                        inq.service
                      )}&body=Hi%20${encodeURIComponent(inq.name)}%2C%0A%0AThank%20you%20for%20contacting%20Pryxon%20Studio.`}
                      className="btn-titanium btn-titanium-sm text-blue-700 hover:text-blue-800"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Email</span>
                    </a>

                    {/* Status Dropdown */}
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className="text-xs font-semibold rounded-full border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="in-review">In Review</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      title="Delete inquiry"
                      className="p-1.5 rounded-full text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Inquiry Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/30 backdrop-blur-sm">
          <Card className="w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lead Overview &bull; ID: {selectedInquiry.id}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-950 mt-1">
                {selectedInquiry.name}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  {selectedInquiry.service}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Budget: {selectedInquiry.budget}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Email Address
                </label>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Project Vision &amp; Notes
                </label>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.details}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-700">Submitted:</span>{" "}
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </div>
                {selectedInquiry.ip && (
                  <div>
                    <span className="font-semibold text-slate-700">IP:</span> {selectedInquiry.ip}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="text-xs font-semibold rounded-full border border-slate-300 bg-white px-3 py-1.5 text-slate-700 shadow-sm"
                >
                  <option value="new">New</option>
                  <option value="in-review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/918141815695?text=Hello%20${encodeURIComponent(
                    selectedInquiry.name
                  )}%2C%20this%20is%20Pryxon%20Studio%20regarding%20your%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-titanium btn-titanium-sm text-emerald-700"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Lead</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="btn-titanium btn-titanium-primary btn-titanium-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* New Lead Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/30 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-950">Add New Lead Manually</h2>
              <p className="text-xs text-slate-500">Record a phone call, WhatsApp lead, or offline consultation.</p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Client Name
                </label>
                <Input
                  required
                  placeholder="e.g. Rahul Patel"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="rounded-xl border-slate-200 bg-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="rounded-xl border-slate-200 bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Service
                  </label>
                  <select
                    value={newLead.service}
                    onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="WhatsApp CRM">WhatsApp CRM</option>
                    <option value="AI Automations">AI Automations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Budget
                  </label>
                  <select
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700"
                  >
                    <option value="1k-3k">$1k - $3k</option>
                    <option value="3k-8k">$3k - $8k</option>
                    <option value="8k-15k">$8k - $15k</option>
                    <option value="15k+">$15k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Project Notes / Requirements
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Client notes, references, timeline..."
                  value={newLead.details}
                  onChange={(e) => setNewLead({ ...newLead, details: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-800 resize-none focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="btn-titanium btn-titanium-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-titanium btn-titanium-primary btn-titanium-sm"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

