import { Cormorant_Garamond } from 'next/font/google';
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cormorantGaramond.className}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
