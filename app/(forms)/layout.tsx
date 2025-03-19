export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center ">
      {children}
    </main>
  );
}