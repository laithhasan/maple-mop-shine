import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  frequency: string;
  message: string;
  preferredDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Format the email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">New Quote Request</h1>
          <p style="color: #666; margin: 5px 0;">NEGOT Cleaning Services</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #1e40af; margin-top: 0;">Customer Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Address:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.address}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #1e40af; margin-top: 0;">Service Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Service Type:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Frequency:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.frequency}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #6b7280;">${formData.preferredDate}</td>
            </tr>
          </table>
        </div>

        ${formData.message ? `
        <div style="background-color: #fefce8; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #1e40af; margin-top: 0;">Additional Message</h2>
          <p style="color: #374151; line-height: 1.6; margin: 0;">${formData.message}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            This email was sent from your NEGOT Cleaning website contact form.
          </p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "NEGOT Cleaning <noreply@resend.dev>",
      to: ["info@negoticleaning.com"], // Replace with your actual company email
      subject: `New Quote Request from ${formData.name}`,
      html: emailHTML,
      replyTo: formData.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);