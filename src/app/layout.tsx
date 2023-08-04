import "./globals.css";
import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";

const varelaRound = Varela_Round({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EECS281 Autograder Status",
  description:
    "Autograder status page for EECS 281 at the University of Michigan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${varelaRound.className} dark:bg-pumablack dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
