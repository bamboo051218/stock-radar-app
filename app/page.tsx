const themes = [
  { name: "AI / 반도체", score: 92, change: "+4.8%" },
  { name: "전기차 / 2차전지", score: 81, change: "+2.1%" },
  { name: "클라우드 / 사이버보안", score: 77, change: "+1.4%" },
  { name: "바이오 / 헬스케어", score: 69, change: "-0.6%" },
  { name: "핀테크 / 결제", score: 64, change: "-1.2%" },
];

async function getPrice() {
  try {
    const res = await fetch("http://localhost:3000/api/price", {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const price = await getPrice();

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e293b 100%)",
        color: "#e5e7eb",
        fontFamily: "Pretendard, Arial, sans-serif",
      }}
    >
      <section style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "40px", marginBottom: "10px", fontWeight: 800 }}>
          미국 증시 테마 레이더
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "17px", marginBottom: "20px" }}>
          오늘 시장에서 강한 테마를 점수와 등락률로 빠르게 확인하세요.
        </p>

        <div
          style={{
            marginBottom: "24px",
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <strong>AAPL 실시간 가격:</strong>{" "}
          {price ? `$${price.currentPrice}` : "불러오는 중/오류"}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "16px",
          }}
        >
          {themes.map((theme) => {
            const isUp = theme.change.startsWith("+");

            return (
              <article
                key={theme.name}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <div style={{ fontSize: "15px", color: "#cbd5e1", marginBottom: "8px" }}>
                  {theme.name}
                </div>

                <div style={{ fontSize: "30px", fontWeight: 800, marginBottom: "10px" }}>
                  {theme.score}
                  <span style={{ fontSize: "16px", marginLeft: "6px", color: "#94a3b8" }}>
                    점
                  </span>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "14px",
                    background: isUp ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                    color: isUp ? "#34d399" : "#f87171",
                    border: isUp ? "1px solid #10b981" : "1px solid #ef4444",
                  }}
                >
                  {theme.change}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}