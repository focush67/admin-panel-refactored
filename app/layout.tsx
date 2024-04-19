import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Add your products here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#000",
        },
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <body className={`${inter.className} bg-black`}>{children}</body>
        </ThemeProvider>

        <Toaster />
      </html>
    </ClerkProvider>
  );
}
