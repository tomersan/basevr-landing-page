import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background:
            "linear-gradient(135deg, #001a33 0%, #002e5c 50%, #001a33 100%)",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="50,8 86,29 86,71 50,92 14,71 14,29"
            fill="none"
            stroke="#4FBFFF"
            strokeWidth="5"
          />
          <path
            d="M30 38 L50 28 L70 38 L70 62 L50 72 L30 62 Z"
            fill="none"
            stroke="#00A2FF"
            strokeWidth="4"
          />
          <path
            d="M30 38 L50 48 L70 38"
            fill="none"
            stroke="#00A2FF"
            strokeWidth="4"
          />
          <line
            x1="50"
            y1="48"
            x2="50"
            y2="72"
            stroke="#00A2FF"
            strokeWidth="4"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
