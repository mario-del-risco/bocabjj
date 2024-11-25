export const metadata = {
  title: "Jiu-Jitsu Gym Schedule",
  description: "Mobile-friendly app for managing Jiu-Jitsu classes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center">
        {children}
      </body>
    </html>
  );
}
