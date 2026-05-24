import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { fullName, company, phone, email, projectName, units, message } = data;
    if (!fullName || !company || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("Missing WEB3FORMS_ACCESS_KEY — lead not delivered:", data);
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const unitsLabel = units
      ? { "1-20": "1-20 יחידות", "21-50": "21-50 יחידות", "51-100": "51-100 יחידות", "100+": "100+ יחידות" }[units as string] ?? units
      : "לא צוין";

    const payload = {
      access_key: accessKey,
      subject: `ליד חדש מ-BaseVR — ${fullName} (${company})`,
      from_name: "BaseVR Landing",
      replyto: email,
      "h-Captcha-Response": undefined,
      botcheck: "",
      name: fullName,
      email,
      phone,
      company,
      project: projectName || "לא צוין",
      units: unitsLabel,
      notes: message || "אין",
      message: [
        `שם מלא: ${fullName}`,
        `חברה / יזם: ${company}`,
        `טלפון: ${phone}`,
        `אימייל: ${email}`,
        `שם הפרויקט: ${projectName || "לא צוין"}`,
        `מספר יחידות: ${unitsLabel}`,
        `הערות: ${message || "אין"}`,
        ``,
        `נשלח מ-BaseVR Landing Page · ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}`,
      ].join("\n"),
    };

    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok || !result.success) {
      console.error("Web3Forms rejected the lead:", result);
      return NextResponse.json(
        { error: result.message || "Failed to deliver lead" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead route crashed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
