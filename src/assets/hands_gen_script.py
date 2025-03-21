import json
from itertools import combinations
from collections import Counter

# 牌型等级枚举
HAND_RANKS = {
    "HIGH_CARD": 0,
    "ONE_PAIR": 1,
    "TWO_PAIR": 2,
    "THREE_OF_A_KIND": 3,
    "STRAIGHT": 4,
    "FLUSH": 5,
    "FULL_HOUSE": 6,
    "FOUR_OF_A_KIND": 7,
    "STRAIGHT_FLUSH": 8,
    "ROYAL_FLUSH": 9
}

def is_straight(ranks):
    """判断是否为顺子（默认以同花排列优先级）"""
    sorted_ranks = sorted(ranks)
    # 特殊处理A-10-J-Q-K
    if sorted_ranks == [1, 10, 11, 12, 13]:
        return HAND_RANKS["ROYAL_FLUSH"]
    # 普通顺子检查
    if all(sorted_ranks[i] == sorted_ranks[i-1] + 1 for i in range(1,5)):
        return HAND_RANKS["STRAIGHT_FLUSH"]
    return HAND_RANKS["HIGH_CARD"]

def get_hand_rank(ranks):
    """获取牌型等级（简化版，不考虑花色）"""
    count = Counter(ranks)
    counts = sorted(count.values(), reverse=True)
    
    # 四条
    if 4 in counts: return HAND_RANKS["FOUR_OF_A_KIND"]
    # 葫芦
    if counts == [3,2]: return HAND_RANKS["FULL_HOUSE"]
    # 三条
    if 3 in counts: return HAND_RANKS["THREE_OF_A_KIND"]
    # 两对
    if counts.count(2) >= 2: return HAND_RANKS["TWO_PAIR"]
    # 一对
    if 2 in counts: return HAND_RANKS["ONE_PAIR"]
    # 顺子和高牌
    return is_straight(ranks)
    # # 顺子
    # if is_straight(ranks): return HAND_RANKS["STRAIGHT"]
    # # 高牌
    # return HAND_RANKS["HIGH_CARD"]

def generate_combinations():
    # 生成所有有效组合（每个点数最多4个）
    all_ranks = list(range(1,14)) * 4
    seen = set()
    result = []
    
    # 生成所有组合并过滤
    for combo in combinations(all_ranks, 5):
        # 检查点数重复次数
        count = Counter(combo)
        if any(v > 4 for v in count.values()):
            continue
        
        # 排序并去重
        sorted_combo = tuple(sorted(combo))
        if sorted_combo in seen:
            continue
        seen.add(sorted_combo)
        
        # 计算属性和排除高牌
        hand_rank = get_hand_rank(sorted_combo)
        if hand_rank == HAND_RANKS["HIGH_CARD"]:
            continue
        
        result.append({
            "hand": sorted_combo,
            "sum": sum(sorted_combo),
            "level": hand_rank
        })
    
    return result

# 生成并保存数据
data = generate_combinations()
with open("poker_hands.json", "w") as f:
    json.dump(data, f, indent=2)