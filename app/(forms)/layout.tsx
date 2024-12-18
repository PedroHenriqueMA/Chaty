import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  weight: "400",
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <Image priority={true} width={150} height={50} src={'/logo/logo-white.png'} alt="chaty logo" /> */}
      <div>{children}</div>
    </div>
  );
}