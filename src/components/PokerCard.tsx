// PokerCard.tsx
import React from "react";

type PokerCardProps = {
  suit: number; // 花色
  rank: number; // 点数
  className?: string; // 可选的类名
  distance?: number; //用于增加深度视觉效果
};

const PokerCard: React.FC<PokerCardProps> = ({
  suit,
  rank,
  className,
  distance,
}) => {
  // 定义花色的图标
  const suitIcons = ["♠", "♥", "♦", "♣"];

  // 根据花色选择合适的颜色
  const suitColor = suit === 2 || suit === 3 ? "text-red-500" : "text-black";

  // 根据点数确定中间图案的排列方式
  //基本思路：4~10点的情况都是分了三列，根据数字计算左右两列的数据，剩下的放中间，7特殊处理一下
  const getMiddlePattern = () => {
    if (rank >= 11) {
      return (
        <div className="text-xl md:2xl">
          {suitIcons[suit - 1]}
          {getRankStr()}
        </div>
      );
    } else if (rank <= 3) {
      return (
        <div className="grid place-items-center h-full w-full">
          {new Array(rank).fill(suitIcons[suit - 1]).map((_, index) => (
            <div
              key={`${rank}-${suit}-${index}`}
              className={`${
                index > Math.ceil(rank / 2) - 1 ? "rotate-180" : ""
              }`}
            >
              {_}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex place-items-center h-full w-full ">
          <div className="flex flex-col justify-between items-center h-full w-full">
            {new Array(Math.min(Math.floor(rank / 2), 4))
              .fill(suitIcons[suit - 1])
              .map((_, index) => (
                <div
                  key={`${rank}-${suit}-${index * 2}`}
                  className={`${
                    index + 1 > Math.ceil(Math.min(Math.floor(rank / 2), 4) / 2)
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  {_}
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-around items-center h-full w-full">
            {new Array(rank - Math.min(Math.floor(rank / 2), 4) * 2)
              .fill(suitIcons[suit - 1])
              .map((_, index) => (
                <div
                  key={`${rank}-${suit}-center-${index}`}
                  className={`${index > 0 ? "rotate-180" : ""}`}
                >
                  {_}
                </div>
              ))}
            {rank === 7 && <div></div>}
          </div>
          <div className="flex flex-col justify-between items-center h-full w-full">
            {new Array(Math.min(Math.floor(rank / 2), 4))
              .fill(suitIcons[suit - 1])
              .map((_, index) => (
                <div
                  key={`${rank}-${suit}-${index * 2 + 1}`}
                  className={`${
                    index + 1 > Math.ceil(Math.min(Math.floor(rank / 2), 4) / 2)
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  {_}
                </div>
              ))}
          </div>
        </div>
      );
    }
  };

  const getRankStr = () => {
    switch (rank) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return rank.toString();
    }
  };
  return (
    <div
      className={` text-xs md:text-lg w-16 h-24 md:w-24 md:h-36 bg-white rounded-lg shadow-sm shadow-black/30 overflow-hidden ${suitColor} ${className}`}
    >
      <div
        className="w-full h-full mix-blend-multiply absolute z-[999] rounded-lg"
        style={{
          background: `rgba(100,100,255,${distance ? 1 - distance : 0})`,
        }}
      ></div>
      {/* 左上角花色和点数 */}
      <div className="absolute flex flex-col items-center left-0.5 md:left-1 ">
        {getRankStr()}
        <div className="relative -top-1.5 md:-top-3">{suitIcons[suit - 1]}</div>
      </div>
      {/* 右下角花色和点数 */}
      <div className="absolute flex flex-col items-center bottom-0 right-0.5 rotate-180 md:right-1">
        {getRankStr()}
        <div className="relative -top-1.5 md:-top-3">{suitIcons[suit - 1]}</div>
      </div>
      {/* 中间花色 */}
      <div
        className={`text-sm md:text-2xl flex flex-col justify-center items-center h-full w-full px-4 py-2 md:px-6 md:py-4 `}
      >
        {getMiddlePattern()}
      </div>
    </div>
  );
};

export default PokerCard;
