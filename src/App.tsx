import React, { useEffect, useState } from "react";
import { MinesTable } from "./components/MinesTable";
import { Wager } from "./components/Wager";
import dollarSignSvg from "./assets/svg/dollar-sign-orange.svg";
import leftNavBarPng from "./assets/img/left-nav-bar.png";
import stakeLogo from "./assets/img/stake-logo-white.png";
import bottomBar from "./assets/img/bottom-bar.png";

const App: React.FC = () => {
  const [cashAmount, setCashAmount] = useState<number>(100);
  const [wagerAmount, setWagerAmount] = useState<number>(0);
  const [numberOfGems, setNumberOfGems] = useState<number>(22);
  const [numberOfMines, setNumberOfMines] = useState<number>(3);
  const [inGame, setInGame] = useState<boolean>(false);
  const [cashOut, setCashOut] = useState<boolean>(false);

  useEffect(() => {
    setNumberOfGems(25 - numberOfMines);
  }, [numberOfMines]);

  return (
    <div className="bg-[#1A2C38] min-h-screen">
      <div className="flex w-full">
        <img className="h-screen" src={leftNavBarPng} alt="Left Nav Bar" />
        <div className="w-full">
          <header className="h-16 border-b-2 border-slate-800 shadow-xl flex w-full justify-start items-center px-16 space-x-96">
            <div>
              <img className="h-8" src={stakeLogo} alt="Stake Logo" />
            </div>
            <div className="flex items-center">
              <div className="w-32 h-12 flex justify-center items-center space-x-1 rounded-l-md bg-[#10212B]">
                <p className="text-slate-200 font-bold text-center text-sm">
                  CA${cashAmount.toFixed(2)}
                </p>
                <img
                  className="h-4 w-4"
                  src={dollarSignSvg}
                  alt="Dollar Sign"
                />
              </div>
              <div className="w-24 h-12 bg-[#1876E6] rounded-r-md text-center flex justify-center text-slate-200 font-bold items-center text-sm">
                Wallet
              </div>
            </div>
          </header>
          <div className=" ml-12 w-11/12 bg-[#0F212E] h-[670px] items-start rounded-lg mt-8">
            <div className="flex justify-between">
              <Wager
                wagerAmount={wagerAmount}
                setWagerAmount={setWagerAmount}
                inGame={inGame}
                setInGame={setInGame}
                setCashOut={setCashOut}
                numberOfMines={numberOfMines}
                setNumberOfMines={setNumberOfMines}
              />
              <MinesTable
                inGame={inGame}
                setInGame={setInGame}
                cashOut={cashOut}
                wagerAmount={wagerAmount}
                cashAmount={cashAmount}
                setCashOut={setCashOut}
                setCashAmount={setCashAmount}
                numberOfMines={numberOfMines}
                numberOfGems={numberOfGems}
              />
            </div>
            <div className="h-[60px] flex justify-center items-center p-4 bg-[#0F212E] border-t-2 border-[#213743] rounded-b-lg">
              <img src={bottomBar} alt="Bottom Bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
