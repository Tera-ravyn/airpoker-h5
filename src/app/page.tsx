"use client";

import Menu from "../pages/menu";

export default function Home() {
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
      <div className="h-full w-full absolute -z-100 bg-black "></div>
      <Menu />
    </div>
  );
}
