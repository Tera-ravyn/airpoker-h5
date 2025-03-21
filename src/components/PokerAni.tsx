"use client";
import { useMemo, useEffect, useState } from "react";
import PokerCard from "./PokerCard";

type PokerItem = {
  id: number;
  left: number;
  delay: number;
  flipX: number; // 随机X轴旋转角度
  flipY: number; // 随机Y轴旋转角度
};

const PokerAni = ({ count = 20 }: { count?: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  const pokerItems = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: count }, (_, i) => ({
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
          className="animate-fallAndFlip absolute -top-24 "
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
