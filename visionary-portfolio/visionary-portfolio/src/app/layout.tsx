import { Inter } from 'next/font/google';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-background antialiased">
        {children}
      </body>
    </html>
  );
}
