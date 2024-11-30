import "./globals.css"; // Adjust the path based on where your CSS is located
import AuthButton from "../components/AuthButton"; // Import the AuthButton component
import Header from "../components/Header";
import Link from "next/link";
export const metadata = {
  title: "BocaBJJ.structuredCandela",
  description: "CandelaJitsu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center text-gray-900 water-background">
        <div className="w-full  p-4 h-screen">
          <header className="flex justify-between items-center mb-4">
            <Link href="/" className="text-2xl font-bold">
              BocaBJJ
            </Link>
            <AuthButton /> {/* Include the AuthButton component */}
          </header>
          {children} {/* Render the page content */}
        </div>
      </body>
    </html>
  );
}
