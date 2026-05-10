import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import ClickEffect from "@/components/ClickEffect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Dymas Alfin | UX Designer Portfolio",
  description: "UX Designer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} bg-[#050505] text-white font-sans selection:bg-brand selection:text-dark antialiased transition-colors duration-300`}
      >
        <SmoothScroll>
          <NoiseOverlay />
          <ClickEffect />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
