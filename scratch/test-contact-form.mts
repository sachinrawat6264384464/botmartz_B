import fetch from 'node-fetch';

async function testContactForm() {
  console.log("🚀 Simulating Contact Form Submission to http://localhost:3000/api/contact…\n");

  const payload = {
    name: "Aman Sharma",
    email: "aman.test@botmartz.com",
    company: "Sharma AI Labs",
    message: "Hello Botmartz Team! This is a live integration test for the contact form inquiry to verify email dispatch via Hostinger SMTP."
  };

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const body: any = await response.json();

    console.log(`Response Status: ${status}`);
    if (status === 200) {
      console.log("✅ Success! Contact form submitted successfully.");
      console.log("Response Body:", JSON.stringify(body, null, 2));
      console.log("\n📬 Check your soham@botmartz.com inbox to confirm you received the inquiry email notification!");
    } else {
      console.error("❌ Failed! Server returned an error.");
      console.error("Response Body:", JSON.stringify(body, null, 2));
    }
  } catch (error: any) {
    console.error("❌ Request Error: Could not connect to dev server.", error.message || error);
    console.log("Make sure your Next.js dev server is running on http://localhost:3000");
  }
}

testContactForm().catch(console.error);
