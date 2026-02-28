export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center ">
      {children}
    </main>
  );
}