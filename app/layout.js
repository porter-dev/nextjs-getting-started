import "./globals.css";

export const metadata = {
  title: "Next.js on Porter",
  description: "A minimal Next.js app ready to deploy on Porter.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
