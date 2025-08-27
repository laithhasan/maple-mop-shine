import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "NEGOT Cleaning <onboarding@resend.dev>";
const TO_EMAIL = Deno.env.get("TO_EMAIL") || "laith57xd@gmail.com";

const resend = new Resend(RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  frequency: string;
  message?: string;
  preferredDate?: string;
};

const escapeHtml = (s = "") =>
  s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
   .replaceAll('"',"&quot;").replaceAll("'","&#039;");

const row = (k: string, v?: string) =>
  v ? `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111;font-weight:600;width:160px">${escapeHtml(k)}</td><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#374151">${escapeHtml(v)}</td></tr>` : "";

const html = (d: ContactFormData) => `
  <div style="background:#0b1220;padding:24px">
    <div style="max-width:640px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:20px 24px;border-bottom:1px solid #f1f5f9;background:linear-gradient(135deg,#fff,#f8fafc)">
        <h1 style="margin:0;font-size:20px;color:#C30003">New Cleaning Quote Request</h1>
        <p style="margin:4px 0 0;font-size:13px;color:#475569">Submitted via Contact form</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          ${row("Name", d.name)}
          ${row("Email", d.email)}
          ${row("Phone", d.phone)}
          ${row("Address", d.address)}
          ${row("Service Type", d.serviceType)}
          ${row("Frequency", d.frequency)}
          ${row("Preferred Date", d.preferredDate)}
        </tbody>
      </table>
      ${d.message ? `<div style="padding:16px 24px;border-top:1px solid #f1f5f9">
        <div style="font-weight:600;color:#111;margin-bottom:6px">Message</div>
        <div style="font-size:14px;white-space:pre-wrap;color:#374151">${escapeHtml(d.message)}</div>
      </div>` : ""}
      <div style="padding:14px 24px;border-top:1px solid #f1f5f9;background:#fafafa;font-size:12px;color:#6b7280">
        Reply goes to <strong>${escapeHtml(d.email)}</strong>.
      </div>
    </div>
  </div>`;

const text = (d: ContactFormData) =>
  [
    "New Cleaning Quote Request",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Address: ${d.address}`,
    `Service Type: ${d.serviceType}`,
    `Frequency: ${d.frequency}`,
    d.preferredDate ? `Preferred Date: ${d.preferredDate}` : "",
    "",
    d.message ? `Message:\n${d.message}` : "",
  ].filter(Boolean).join("\n");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const data = (await req.json()) as ContactFormData;

    if (!data.name || !data.email || !data.phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const subject = `New Quote Request — ${data.name}`;

    const { data: sent, error } = await resend.emails.send({
      from: FROM_EMAIL,           // ✅ onboarding@resend.dev for testing
      to: [TO_EMAIL],             // ✅ your inbox
      subject,
      html: html(data),
      text: text(data),
      reply_to: data.email,       // ✅ correct field name
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: sent?.id }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
