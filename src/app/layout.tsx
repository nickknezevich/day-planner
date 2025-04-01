"use client";
import HomeLayout from "@/layouts/home-layout";
import { ThemeProviderWrapper } from "@/context/theme-context";
import { CssBaseline } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <CssBaseline />
          <HomeLayout>{children}</HomeLayout>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
