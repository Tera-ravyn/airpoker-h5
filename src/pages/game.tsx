"use client";
import { PokerHandDB } from "../models/card";
import data from "../assets/poker_hands.json";
import { useMount, useUnmount } from "ahooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { desktopAtom, settingsAtom, switchAtom } from "@/models/jotai";
import { FaGear } from "react-icons/fa6";
import { createPortal } from "react-dom";
const pokerDB = new PokerHandDB(data);
enum Suit {
  "C" = 0,
  "D" = 1,
  "H" = 2,
  "S" = 3,
}
interface pokerItem {
  rank: number;
  suit: Suit;
}
//出示的数字牌
const NumberCard = () => {
  return <div>NumberCard</div>;
};
//一手牌的显示
const Hand = ({ hand }: { hand: pokerItem[] }) => {
  return <div>Hand</div>;
};
//推荐手牌
const RecommendHand = ({ sum }: { sum: number }) => {
  const hands = pokerDB.queryBySum(sum);

  return (
    <Modal>
      <Hand hand={[]} />
    </Modal>
  );
};

interface modalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}
const Modal = ({ isOpen, onOpen, onClose, children }: modalProps) => {
  const dom = document.getElementById("modal-root");
  if (dom)
    return createPortal(
      <>
        {isOpen && (
          <div
            className={`cursor-pointer w-full h-full flex justify-center items-center bg-black/50 ${
              isOpen ? "animate-fadeIn" : "animate-fadeOut"
            }`}
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            >
              {children}
            </div>
          </div>
        )}
      </>,
      dom
    );
};
// 生命值
const HP = () => {
  return <div className="w-full h-2 bg-red-500 rounded-full"></div>;
};

const Settings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const setDesktop = useSetAtom(desktopAtom);
  const setSwitchAni = useSetAtom(switchAtom);
  useMount(() => {
    setSettings(false);
  });
  return (
    <>
      <FaGear
        className="absolute top-4 right-4 text-black text-xl cursor-pointer"
        onClick={() => {
          setSettings(!settings);
        }}
      ></FaGear>
      <Modal isOpen={settings} onClose={() => setSettings(false)}>
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg ">
          <button
            className="p-4 hover:bg-black/10 rounded-md transition duration-300 cursor-pointer"
            onClick={() => {
              setSettings(false);
            }}
          >
            返回游戏
          </button>
          <button
            className="p-4 hover:bg-black/10 rounded-md transition duration-300 cursor-pointer"
            onClick={() => {
              setSwitchAni(true);
              // setDesktop(false);
            }}
          >
            退出
          </button>
        </div>
      </Modal>
    </>
  );
};
const Desktop = () => {
  const setSwitchAni = useSetAtom(switchAtom);

  useMount(() => {
    setSwitchAni(false);
  });
  return (
    <div id="modal-root" className="w-full h-full bg-white relative">
      <Settings />
    </div>
  );
};
export default Desktop;
