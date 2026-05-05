import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "FINNHUB_API_KEY가 없습니다." },
      { status: 500 }
    );
  }

  const symbol = "AAPL";
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json({
      symbol,
      currentPrice: data.c,
      highPrice: data.h,
      lowPrice: data.l,
      openPrice: data.o,
      prevClose: data.pc,
    });
  } catch {
    return NextResponse.json(
      { error: "주가 데이터를 가져오지 못했습니다." },
      { status: 500 }
    );
  }
}