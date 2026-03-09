import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "刘姗姗 - 个人展示网站",
  description: "内容运营专家 | AI+运营创意人才",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
