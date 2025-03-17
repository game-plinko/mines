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
  const [numberUncovered, setNumberUncovered] = useState<number>(0);
  const [inGame, setInGame] = useState<boolean>(false);
  const [cashOut, setCashOut] = useState<boolean>(false);

  useEffect(() => {
    setNumberOfGems(25 - numberOfMines);
  }, [numberOfMines, setNumberOfGems]);

  return (
    <div className="bg-[#1A2C38] h-[130vh] xl:h-[105vh]">
      <div className="flex w-full">
        <img
          className="h-screen hidden xl:block"
          src={leftNavBarPng}
          alt="Left Nav Bar"
        />
        <div className="w-full">
          <header className="h-16 border-b-2 border-slate-800 shadow-xl flex w-full justify-center lg:justify-start items-center md:px-16 space-x-4 md:space-x-10 lg:space-x-96">
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
          <div className="lg:ml-12 w-full sm:w-3/4 lg:w-11/12 bg-[#0F212E] lg:h-[670px] items-start rounded-lg mt-8 mx-auto">
            <div className="lg:flex justify-between">
              <Wager
                wagerAmount={wagerAmount}
                setWagerAmount={setWagerAmount}
                inGame={inGame}
                setInGame={setInGame}
                setCashOut={setCashOut}
                numberOfMines={numberOfMines}
                setNumberOfMines={setNumberOfMines}
                cashAmount={cashAmount}
                setCashAmount={setCashAmount}
                numberUncovered={numberUncovered}
              />
              <MinesTable
                numberUncovered={numberUncovered}
                setNumberUncovered={setNumberUncovered}
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
