import axios from "axios";

export async function sendSMS(phone: string, text: string) {
  try {
    const res = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "v3",
        sender_id: "TXTIND",
        message: text,
        language: "english",
        numbers: phone
      },
      {
        headers: { authorization: process.env.FAST2SMS_API_KEY! }
      }
    );

    console.log("SMS SENT:", res.data);
    return true;
  } catch (error) {
    console.log("SMS ERROR:", error);
    return false;
  }
}
