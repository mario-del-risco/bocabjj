import sendgrid from "@sendgrid/mail";

// Initialize SendGrid with API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { email, name } = body;

  try {
    await sendgrid.send({
      to: email, // Recipient
      from: process.env.SENDGRID_SENDER_EMAIL, // Your verified sender
      subject: "Welcome to the Squad!",
      text: `Yo ${name}, welcome to the crew! Thanks for signing up.`,
      html: `<p>Yo <strong>${name}</strong>, welcome to the crew! Thanks for signing up.</p>`,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.body || error.message
    );
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
