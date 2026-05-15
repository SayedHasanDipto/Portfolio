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
  title: "Sayed Hasan Dipto | MERN Stack Developer & UI/UX Designer",
  description: "Specialized in building high-performance Next.js applications with premium animations and intuitive user experiences.",
  keywords: ["Next.js", "React", "Full-Stack Developer", "UI/UX Designer", "MERN Stack", "GSAP Animations"],
  authors: [{ name: "Sayed Hasan Dipto" }],
  icons: {
    icon: [
      { url: "https://i.ibb.co/wZVXT6Yd/m1.png" },
      { url: "https://i.ibb.co/wZVXT6Yd/m1.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["https://i.ibb.co/wZVXT6Yd/m1.png"],
    apple: [
      { url: "https://i.ibb.co/wZVXT6Yd/m1.png" },
      { url: "https://i.ibb.co/wZVXT6Yd/m1.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Sayed Hasan Dipto | Portfolio",
    description: "Creative MEARN Stack Developer specialized in the modern web ecosystem.",
    url: "https://sayedhasandipto.vercel.app",
    siteName: "Sayed Hasan Dipto Portfolio",
    images: [
      {
        url: "https://i.ibb.co/wZVXT6Yd/m1.png", // Using your hero image as the preview
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed Hasan Dipto | Portfolio",
    description: "Creative Full-Stack Developer specialized in the modern web ecosystem.",
    images: ["https://i.ibb.co/wZVXT6Yd/m1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} bg-[#050505] text-white font-sans selection:bg-brand selection:text-dark antialiased transition-colors duration-300 relative min-h-screen`}
      >
        <div className="relative min-h-screen">
          <SmoothScroll>
            <NoiseOverlay />
            <ClickEffect />
            <CustomCursor />
            {children}
          </SmoothScroll>
        </div>

        {/* JSON-LD Structured Data for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sayed Hasan Dipto",
              "url": "https://sayedhasandipto.com",
              "jobTitle": "Full-Stack Web Developer",
              "description": "Specialized in building high-performance Next.js applications with premium animations and intuitive user experiences.",
              "sameAs": [
                "https://www.linkedin.com/in/sayedhasandipto/",
                "https://github.com/sayedhasandipto"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
