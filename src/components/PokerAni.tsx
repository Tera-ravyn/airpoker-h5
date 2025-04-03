"use client";
import { useMemo, useEffect, useState, CSSProperties } from "react";
import PokerCard from "./PokerCard";

type PokerItem = {
  id: number;
  suit: number; //花色
  rank: number; //点数
  left: number; //左位移
  delay: number; //动画延迟时间
  flip: string; //随机旋转角度，css格式
  translateZ: number; //z轴纵深
};
const PokerAni = ({ count = 20 }: { count?: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  const pokerItems = useMemo(() => {
    if (!isMounted) return [];
    const items: PokerItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      suit: Math.ceil(Math.random() * 4),
      rank: Math.ceil(Math.random() * 13),
      left: Math.random() * 80,
      delay: Math.random() * 10,
      flip: `${Math.random()},${Math.random()}, ${Math.random()},${
        Math.random() * 2
      }turn`,
      translateZ: Math.random() * 60 - 30,
    }));
    const minDelayIndex = items.reduce((minIndex, _, currentIndex) => {
      return items[currentIndex].delay < items[minIndex].delay
        ? currentIndex
        : minIndex;
    }, 0);

    items[minDelayIndex].delay = 0; // Set the minimum delay to a random value between 0 and 1
    return items;
  }, [count, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed w-full h-screen overflow-hidden -z-1 perspective-[1000px]">
      {pokerItems.map(({ id, left, delay, translateZ, flip, suit, rank }) => (
        <div
          key={id}
          className="animate-fallAndFlip absolute -top-24 md:-top-36 "
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            zIndex: Math.floor(translateZ),
            filter: `blur(${
              (Math.abs(translateZ) * Math.abs(translateZ)) / 180
            }px)`,
            "--translate-z": `${translateZ}rem`,
            "--flip-angel": `${flip}`,
          }}
        >
          <PokerCard
            suit={suit}
            rank={rank}
            distance={(translateZ + 30) / 60}
          />
        </div>
      ))}
    </div>
  );
};

export default PokerAni;
