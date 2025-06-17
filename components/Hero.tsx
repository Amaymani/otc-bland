import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col lg:mt-[10%] mt-[20%] lg:mb-28 mb-16 w-screen  justify-center">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-black leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Speak. Select. Trade.
      </span>

        <span className="pointer-events-none mt-3 dark:text-zinc-300 text-zinc-900 text-center text-lg font-semibold leading-none">
            The future of OTC crypto trading—one voice command at a time.
        </span>
    </div>
  );
};

export default Hero;
