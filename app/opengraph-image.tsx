import { ImageResponse } from "next/og";

export const alt = "BeamHub: Great minds. Brighter medicine.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          background: "#f6f5ef",
          color: "#25352d",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>
          beamhub
          <span style={{ color: "#b44723", marginLeft: 12 }}>+</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 94, letterSpacing: "-5px", lineHeight: 1.05 }}>
          <span>Great minds.</span>
          <span style={{ color: "#b44723" }}>Brighter medicine.</span>
        </div>
        <div style={{ display: "flex", fontSize: 23, color: "#586259" }}>
          EXPERT-LED LEARNING / A GLOBAL COMMUNITY / SHARED POSSIBILITY
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            right: -150,
            top: -165,
            width: 530,
            height: 530,
            borderRadius: "50%",
            border: "60px solid #dce5d8",
          }}
        />
      </div>
    ),
    size,
  );
}
