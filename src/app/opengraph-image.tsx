import { ImageResponse } from "next/og";
import bidiFactory from "bidi-js";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BaseVR — חוויית המכירה החדשה בעולם הנדל״ן";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bidi = bidiFactory();
const rtl = (text: string) =>
  bidi.getReorderedString(text, bidi.getEmbeddingLevels(text, "rtl"));

export default async function Image() {
  const [heeboBold, heeboRegular] = await Promise.all([
    readFile(join(process.cwd(), "assets/Heebo-Bold.ttf")),
    readFile(join(process.cwd(), "assets/Heebo-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #000814 0%, #001a33 35%, #002e5c 70%, #001a33 100%)",
          fontFamily: "Heebo",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(0,162,255,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(79,191,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,8 86,29 86,71 50,92 14,71 14,29"
              fill="none"
              stroke="#4FBFFF"
              strokeWidth="4"
            />
            <path
              d="M30 38 L50 28 L70 38 L70 62 L50 72 L30 62 Z"
              fill="none"
              stroke="#00A2FF"
              strokeWidth="3"
            />
            <path
              d="M30 38 L50 48 L70 38"
              fill="none"
              stroke="#00A2FF"
              strokeWidth="3"
            />
            <line
              x1="50"
              y1="48"
              x2="50"
              y2="72"
              stroke="#00A2FF"
              strokeWidth="3"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            <span>Base</span>
            <span style={{ color: "#00A2FF" }}>VR</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            textAlign: "center",
            marginTop: 12,
            color: "#E5F3FF",
            maxWidth: 1000,
            justifyContent: "center",
          }}
        >
          {rtl('חוויית המכירה החדשה בעולם הנדל"ן')}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 400,
            textAlign: "center",
            marginTop: 28,
            color: "rgba(255,255,255,0.7)",
            justifyContent: "center",
          }}
        >
          {rtl("טכנולוגיית VR מתקדמת · 25% יותר סגירות · 31% מהר יותר")}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 2,
            fontWeight: 700,
          }}
        >
          <span>IMMERSIVE</span>
          <span style={{ color: "#00A2FF" }}>·</span>
          <span>REAL</span>
          <span style={{ color: "#00A2FF" }}>·</span>
          <span>EFFECTIVE</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Heebo", data: heeboBold, style: "normal", weight: 700 },
        { name: "Heebo", data: heeboRegular, style: "normal", weight: 400 },
      ],
    }
  );
}
