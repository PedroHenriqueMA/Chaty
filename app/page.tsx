'use client'
import Image from "next/image";
import LinkButton from "./ui/LinkButton";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDark] = useState<boolean>(false);
  useEffect(()=>{
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  },[])
  return (
    <div className="flex h-[100vh] items-center justify-center flex-col gap-[5vh]">
      <Image width={"150"} height={"200"} src={isDarkMode ? '/Logo-dark.png' : '/Logo.png'} alt="chaty logo" />
      <Image width={"250"} height={"250"} src={'/imageBackground.png'} alt="Background with people talking to each other by the cellphone" priority={true} />
      <div className="flex items-center justify-center flex-col gap-3">
        <LinkButton href="/login" label="Continue with email" props={isDarkMode ? 'bg-salmon-dark' : "bg-blue-200"} />
        <LinkButton href="/sign-up" label="Create account" props={isDarkMode ? 'bg-wine' : "bg-blue-200"} />
      </div>
    </div>
  );
}
