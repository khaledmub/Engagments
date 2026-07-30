import 'dotenv/config';

async function testWhatsApp() {
  const waAccessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const waPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const targetPhone = '201143032609';

  if (!waAccessToken || !waPhoneNumberId) {
    console.error("Missing credentials in .env");
    return;
  }

  console.log("Sending test WhatsApp to:", targetPhone);

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${waPhoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${waAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: targetPhone,
        type: "template",
        template: {
          name: "rsvp_confirmation",
          language: { code: "ar" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: "Khaled" },
                { type: "text", text: "9999" }
              ]
            }
          ]
        }
      })
    });

    const data = await response.json();
    console.log("Response Status:", response.status);
    console.log("Response Data:", data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testWhatsApp();
