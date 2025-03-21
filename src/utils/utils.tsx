/**
 * @description 初始化一副扑克牌，并随机挑选50张牌组成十手牌，确保每个数字最多被挑选4次。
 * @returns 十组手牌，每手的数字之和
 */
export const initPoker = () => {
  const hands = new Array(10).fill(0); //手牌数组
  const rankCounts = new Array(13).fill(0); // 用于记录每个点数的数量

  for (let i = 0; i < 50; i++) {
    const rank = Math.floor(Math.random() * 13) + 1; // 生成1到13之间的随机数
    if (rankCounts[rank - 1] < 4) {
      hands[Math.trunc(i / 5)] += rank;
      rankCounts[rank - 1]++;
    }
  }

  return hands;
};

export enum Suit {
  "H" = 1,
  "D" = 2,
  "C" = 3,
  "S" = 4,
}
