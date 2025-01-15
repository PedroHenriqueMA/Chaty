export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center ">
      {children}
    </div>
  );
}