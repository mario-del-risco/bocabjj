import "./globals.css"; // Adjust the path based on where your CSS is located
import AuthButton from "../components/AuthButton"; // Import the AuthButton component

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
        <div className="w-full  p-4">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">CandelaJitsu</h1>
            <AuthButton /> {/* Include the AuthButton component */}
          </header>
          {children} {/* Render the page content */}
        </div>
      </body>
    </html>
  );
}
