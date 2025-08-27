// supabase/functions/send-contact-email/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "NEGOT Cleaning <onboarding@resend.dev>";
const TO_EMAIL = Deno.env.get("TO_EMAIL") || "burin7oils@gmail.com";

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY secret");
}

const resend = new Resend(RESEND_API_KEY ?? "");

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  frequency: string;
  message?: string;
  preferredDate?: string;
}

const escapeHtml = (s = "") =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const fieldRow = (label: string, value?: string) =>
  value
    ? `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111;font-weight:600;width:160px">${escapeHtml(
          label
        )}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#374151">${escapeHtml(
          value
        )}</td>
      </tr>`
    : "";

const renderHtml = (d: ContactFormData) => `
  <div style="background:#0b1220;padding:24px">
    <div style="max-width:640px;margin:auto;background:white;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="padding:20px 24px;border-bottom:1px solid #f1f5f9;background:linear-gradient(135deg,#fff,#f8fafc)">
        <h1 style="margin:0;font-size:20px;line-height:28px;color:#C30003">New Cleaning Quote Request</h1>
        <p style="margin:4px 0 0;font-size:13px;color:#475569">Submitted via the Contact form</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          ${fieldRow("Name", d.name)}
          ${fieldRow("Email", d.email)}
          ${fieldRow("Phone", d.phone)}
          ${fieldRow("Address", d.address)}
          ${fieldRow("Service Type", d.serviceType)}
          ${fieldRow("Frequency", d.frequency)}
          ${fieldRow("Preferred Date", d.preferredDate || "")}
        </tbody>
      </table>
      ${
        d.message
          ? `<div style="padding:16px 24px;border-top:1px solid #f1f5f9">
               <div style="font-weight:600;color:#111;margin-bottom:6px">Message</div>
               <div style="font-size:14px;white-space:pre-wrap;color:#374151">${escapeHtml(d.message)}</div>
             </div>`
          : ""
      }
      <div style="padding:14px 24px;border-top:1px solid #f1f5f9;background:#fafafa;font-size:12px;color:#6b7280">
        Reply directly to reach <strong>${escapeHtml(d.name)}</strong>.
      </div>
    </div>
  </div>
`;

const renderText = (d: ContactFormData) =>
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
  ]
    .filter(Boolean)
    .join("\n");

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const data = (await req.json()) as ContactFormData;

    // minimal validation
    if (!data.name || !data.email || !data.phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const subject = `New Quote Request — ${data.name}`;
    const { data: sent, error } = await resend.emails.send({
      from: FROM_EMAIL,             // ✅ use onboarding@resend.dev or your verified domain
      to: [TO_EMAIL],               // e.g. your Gmail
      subject,
      html: renderHtml(data),
      text: renderText(data),
      reply_to: data.email,         // ✅ correct key name
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: sent?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
