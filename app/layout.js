// RootLayout.js
import "./globals.css"; // Adjust the path based on where your CSS is located

export const metadata = {
  title: "BocaBJJ.structuredCandela",
  description: "CandelaJitsu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex items-center justify-center text-gray-900 water-background">
        <div className="w-full  p-4">{children}</div>
      </body>
    </html>
  );
}
