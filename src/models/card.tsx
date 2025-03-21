export type PokerHand = {
  hand: number[];
  sum: number;
  level: number;
};

export class PokerHandDB {
  private sumIndex: Map<number, PokerHand[]>;
  private levelIndex: Map<number, PokerHand[]>;
  private allHands: PokerHand[];

  constructor(data: PokerHand[]) {
    this.allHands = data;
    this.sumIndex = this.buildSumIndex(data);
    this.levelIndex = this.buildLevelIndex(data);
  }

  private buildSumIndex(data: PokerHand[]): Map<number, PokerHand[]> {
    const index = new Map<number, PokerHand[]>();
    for (const hand of data) {
      const sum = hand.sum;
      if (!index.has(sum)) {
        index.set(sum, []);
      }
      index.get(sum)!.push(hand);
    }
    // 预排序存储
    for (const [sum, hands] of index) {
      index.set(
        sum,
        hands.sort((a, b) => b.level - a.level)
      );
    }
    return index;
  }

  private buildLevelIndex(data: PokerHand[]): Map<number, PokerHand[]> {
    const index = new Map<number, PokerHand[]>();
    for (const hand of data) {
      const level = hand.level;
      if (!index.has(level)) {
        index.set(level, []);
      }
      index.get(level)!.push(hand);
    }
    return index;
  }

  // 根据点数总和查询
  queryBySum(targetSum: number): PokerHand[] {
    return this.sumIndex.get(targetSum) || [];
  }

  // 根据牌型等级查询
  queryByLevel(targetLevel: number): PokerHand[] {
    return this.levelIndex.get(targetLevel) || [];
  }

  // 组合查询
  queryCombined(params: { sum?: number; level?: number }): PokerHand[] {
    return this.allHands.filter((hand) => {
      const sumMatch = params.sum === undefined || hand.sum === params.sum;
      const levelMatch =
        params.level === undefined || hand.level === params.level;
      return sumMatch && levelMatch;
    });
  }
}
