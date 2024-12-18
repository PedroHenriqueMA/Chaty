import Image from "next/image";
import LinkButton from "./ui/LinkButton";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-[100vh] items-center justify-center flex-col gap-[5vh]">
      <Image width={"150"} height={"200"} src={'/Logo-dark.png'} alt="chaty logo" />
      <Image width={"250"} height={"250"} src={'/imageBackground.png'} alt="Background with people talking to each other by the cellphone"  priority={true}/>
      <div className="flex items-center justify-center flex-col gap-3">
        <LinkButton href="/login" label="Continue with email" props="bg-salmon-dark" />
        <LinkButton href="/sign-up" label="Create account" props="bg-wine" />
      </div>
    </div>
  );
}
