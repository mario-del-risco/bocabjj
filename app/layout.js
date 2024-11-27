import "../app/globals.css"; // Adjust the path based on where your CSS is located
export const metadata = {
  title: "Jiu-Jitsu Gym Schedule",
  description: "Mobile-friendly app for managing Jiu-Jitsu classes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 h-screen w-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
