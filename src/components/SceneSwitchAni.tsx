import { useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { desktopAtom, switchAtom } from "@/models/jotai";

interface switchAniProps {
  fadeOut?: () => void;
  fadeIn?: () => void;
}
export const FadeOutnInAni = ({ fadeOut, fadeIn }: switchAniProps) => {
  const [switchAni, setSwitchAni] = useAtom(switchAtom);
  const [desktop, setDesktop] = useAtom(desktopAtom);

  const timerIn = useRef<NodeJS.Timeout>(null);
  const timerOut = useRef<NodeJS.Timeout>(null);
  useEffect(() => {
    if (switchAni) {
      document
        .getElementById("switchAni")
        ?.classList.remove("hidden", "animate-fadeOut");
      document
        .getElementById("switchAni")
        ?.classList.add("opacity-0", "animate-fadeIn");
      timerIn.current = setTimeout(() => {
        setDesktop(!desktop);
        // fadeOut();
      }, 2000);
    } else {
      // document
      //   .getElementById("switchAni")
      //   ?.classList.replace("animate-fadeIn", "animate-fadeOut");
      timerOut.current = setTimeout(() => {
        document.getElementById("switchAni")?.classList.add("hidden");
        // fadeIn();
      }, 2000);
    }
    return () => {
      if (timerIn.current) {
        clearInterval(timerIn.current);
      }
      if (timerOut.current) {
        clearInterval(timerOut.current);
      }
    };
  }, [switchAni]);

  return (
    <div
      id="switchAni"
      className="w-full h-full bg-black fixed top-0 left-0 z-[999]"
    >
      {switchAni && (
        <div className="animate-pulse w-full h-full flex justify-center items-center text-lg font-bold text-white">
          Loading...
        </div>
      )}
    </div>
  );
};
