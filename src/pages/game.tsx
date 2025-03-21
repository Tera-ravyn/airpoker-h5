"use client";
import { PokerHandDB } from "../models/card";
import data from "../assets/poker_hands.json";
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
const Modal = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-black/80 relative">
      <div className="p-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};
// 生命值
const HP = () => {
  return <div className="w-full h-2 bg-red-500 rounded-full"></div>;
};

const Desktop = () => {
  return <div>Desktop</div>;
};
export default Desktop;
