import Image from "next/image";
import PokerAni from "../components/PokerAni";
import WaterAni from "../components/WaterAni";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useSetAtom } from "jotai";
import { desktopAtom, switchAtom } from "@/models/jotai";
import { useMount } from "ahooks";

const MenuItem = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" group transition duration-300 cursor-pointer hover:bg-linear-to-r hover:from-white/0 hover:via-white/50 hover:to-white/0 w-full text-white bg-transparent px-4 py-6 flex justify-center items-center gap-x-4"
    >
      <div className="group-hover:opacity-100 opacity-0 transition duration-300 ">
        ☣
      </div>
      <div className=" text-lg md:text-xl drop-shadow-lg">{children}</div>
      <div className="group-hover:opacity-100 opacity-0 transition duration-300">
        ☣
      </div>
    </button>
  );
};
const Divider = () => {
  return (
    <div className="w-full h-px bg-linear-to-r from-white/0 via-white/50 to-white/0  shadow-lg shadow-black"></div>
  );
};
// const Settings = () => {
//   const t = useTranslations("Menu");
//   return (
//     <div className="w-1/2 flex flex-col justify-center items-center">
//       <MenuItem>{t("start")}</MenuItem>
//       <Divider />
//       <MenuItem>{t("settings")}</MenuItem>
//       <Divider />
//       <MenuItem>{t("help")}</MenuItem>
//       <Divider />
//       <MenuItem>{t("about")}</MenuItem>
//     </div>
//   );
// };

const Help = () => {
  return <div>Help</div>;
};
const About = () => {
  const t = useTranslations("About");
  return <div className="w-full h-full m-6 bg-black/50">{t("content")}</div>;
};

const Menu = () => {
  const t = useTranslations("Menu");
  const [open, setOpen] = useState(false);
  const setSwitchAni = useSetAtom(switchAtom);
  const setDesktop = useSetAtom(desktopAtom);
  const handleSwipe = () => {
    setOpen(!open);
  };
  useMount(() => {
    setSwitchAni(false);
  });

  return (
    <div className="w-full h-full overflow-hidden">
      <div
        className={`${
          open ? "-translate-x-1/10" : "translate-0"
        } w-[120%] h-full transition-all duration-700 fixed top-0`}
      >
        <WaterAni />
      </div>

      {/* 菜单首页 */}
      <div
        className={`${
          open ? "-translate-x-1/2" : "translate-x-0"
        } w-[200%] h-full transition-all duration-700 fixed top-0 flex items-center`}
      >
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <PokerAni count={10} />
          <Image src="/logo.png" alt="logo" width={400} height={200} />
          <div className="w-1/2 flex flex-col justify-center items-center">
            <MenuItem
              onClick={() => {
                setSwitchAni(true);
                // setDesktop(true);
              }}
            >
              {t("start")}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSwipe}>{t("settings")}</MenuItem>
            <Divider />
            <MenuItem onClick={handleSwipe}>{t("help")}</MenuItem>
            <Divider />
            <MenuItem onClick={handleSwipe}>{t("about")}</MenuItem>
          </div>
        </div>

        {/* 菜单子页面 */}
        <div className="w-1/2 h-full relative">
          <button
            type="button"
            className="absolute cursor-pointer top-8 left-8 bg-white/30 text-white py-2 px-4 text-2xl rounded-md"
            onClick={handleSwipe}
          >
            <FaAngleLeft />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Menu;
