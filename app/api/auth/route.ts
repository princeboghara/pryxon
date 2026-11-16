import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getMembers() {
  try {
    const dataDir = process.env.VERCEL ? "/tmp/data" : path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "members.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  return [];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // 1. Admin Authentication Gateway
    if (role === "admin") {
      const normalizedPass = String(password).trim();
      const validAdminPass = normalizedPass === "pryxon@admin2026" || normalizedPass === "pryxon@2026";
      const validAdminEmail = !email || email.trim().toLowerCase() === "admin@pryxon.com";

      if (validAdminPass && validAdminEmail) {
        const token = "admin_sess_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
        return NextResponse.json({
          success: true,
          role: "admin",
          token,
          user: {
            name: "Executive Administrator",
            email: "admin@pryxon.com",
            role: "Principal Admin",
            avatar: "PA",
          },
        });
      }

      return NextResponse.json({ error: "Invalid administrative credentials." }, { status: 401 });
    }

    // 2. Member Authentication Gateway
    if (role === "member") {
      const normalizedPass = String(password).trim();
      const validMemberPass = normalizedPass === "pryxon@team2026" || normalizedPass === "pryxon@member2026";
      const normalizedEmail = (email || "").trim().toLowerCase();

      const members = getMembers();
      const matchedMember = members.find((m: any) => m.email.toLowerCase() === normalizedEmail);

      if (validMemberPass && (matchedMember || normalizedEmail === "developer@pryxon.com")) {
        const user = matchedMember || {
          id: "mem_01",
          name: "Alex Morgan",
          email: "developer@pryxon.com",
          role: "Lead Architect & Fullstack",
          avatar: "AM",
          department: "Engineering",
        };

        const token = "member_sess_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
        return NextResponse.json({
          success: true,
          role: "member",
          token,
          user,
        });
      }

      return NextResponse.json(
        { error: "Invalid employee credentials. Please check your email and workspace passcode." },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: "Invalid login target role." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication server error." }, { status: 500 });
  }
}

