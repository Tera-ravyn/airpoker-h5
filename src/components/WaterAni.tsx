import { useMount } from "ahooks";
import Image from "next/image";
import { useState } from "react";

const WaterAni = () => {
  useMount(() => {
    const img = document.querySelector("#displacementFilter feTurbulence");
    let frames = 0;
    const rad = Math.PI / 180;

    function AnimateBaseFrequency() {
      let bf = "1 1";
      let bfx = Number(bf.split(" ")[0]);
      let bfy = Number(bf.split(" ")[1]);
      frames += 0.001;
      bfx += Math.cos(frames * rad);
      bfy += Math.sin(frames * rad);

      bf = bfx.toString() + " " + bfy.toString();
      img?.setAttributeNS(null, "baseFrequency", bf);

      requestAnimationFrame(AnimateBaseFrequency);
    }

    window.requestAnimationFrame(AnimateBaseFrequency);
  });
  return (
    <div className="absolute h-screen w-full overflow-hidden bg-gray-900 -z-2">
      {/* 渐变背景层 */}
      <div className="absolute h-full w-full bg-gradient-to-b from-black via-blue-800 to-blue-400 via-70% -z-3" />

      <svg width="0" height="0" className="absolute">
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="1 1"
            numOctaves="1"
            result="turbulence"
          />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="B"
          />
          <feGaussianBlur stdDeviation="1.1" result="blurred" />
        </filter>
      </svg>
      {/* 波纹层 */}
      <div
        className="absolute w-full h-full bg-[url('/wave.jpeg')] 
        mix-blend-overlay animate-drift scale-150 "
        style={{
          filter: "url(#displacementFilter)",
          "--skew": "  -10deg,3deg",
          "--skew-d": "  3deg,10deg",
        }}
      />
      <div
        className="absolute w-full h-full bg-[url('/wave.jpeg')] 
        mix-blend-soft-light animate-drift rotate-180 scale-120 "
        style={{
          filter: "url(#displacementFilter)",
          animationDelay: "0.5s",
          "--skew": "  3deg,10deg",
          "--skew-d": "  -10deg,3deg",
        }}
      />
    </div>
  );
};
export default WaterAni;
