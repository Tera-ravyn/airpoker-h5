"use client";

import { FadeOutnInAni } from "@/components/SceneSwitchAni";
import Menu from "../pages/menu";
import Desktop from "@/pages/game";
import { useAtomValue } from "jotai";
import { desktopAtom } from "@/models/jotai";

export default function Home() {
  const desktop = useAtomValue(desktopAtom);
  // const [pokerDB, setPokerDB] = useState<PokerHandDB>();
  // useMount(() => {
  //   console.log("data", data);
  //   const db = new PokerHandDB(data);
  //   setPokerDB(db);
  //   console.log(
  //     "Database initialized with",
  //     data.length,
  //     "hands",
  //     pokerDB?.queryBySum(47)
  //   );

  // 查询示例
  // const findHands=(sum: number)=> {
  //     if (!pokerDB) throw new Error('Database not initialized');
  //     return pokerDB.queryBySum(sum)
  // }
  // });

  return (
    <div className="h-screen w-full ">
      <FadeOutnInAni />
      <div className="h-full w-full absolute -z-100 bg-black "></div>
      {desktop ? <Desktop /> : <Menu />}
    </div>
  );
}
