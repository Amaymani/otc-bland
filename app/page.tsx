'use client'
import Call from "@/components/Call";
import { DockDemo } from "@/components/Dock";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const page = () => {

  const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, [isMounted]);
  
    if (isMounted === false) {
      return <div>loading</div>;
    }
  return (
    <div className="flex flex-col h-screen w-screen items-center ">
      <Navbar />

      <Hero />

      <Call />

      <DockDemo />
    </div>
  );
};

export default page;
