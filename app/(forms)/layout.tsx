import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <Image priority={true} width={150} height={50} src={'/logo/logo-white.png'} alt="chaty logo" />
      <div>{children}</div>
    </div>
  );
}