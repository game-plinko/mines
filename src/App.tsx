import React, { useEffect, useState } from "react";
import { MinesTable } from "./components/MinesTable";
import { Wager } from "./components/Wager";
import dollarSignSvg from "./assets/svg/dollar-sign-orange.svg";
import leftNavBarPng from "./assets/img/left-nav-bar.png";
import stakeLogo from "./assets/img/stake-logo-white.png";
import bottomBar from "./assets/img/bottom-bar.png";
import headerOptions from "../src/assets/img/Header_options.jpg";
import downArrowSvg from "./assets/svg/Down_arrow.svg";

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
          <header className="h-16 border-b-2 border-slate-800 shadow-xl flex w-full justify-center items-center">
            <div className="w-11/12 sm:w-3/4 lg:w-11/12 2xl:w-3/4 flex justify-between items-center lg:ml-12">
              <div>
                <img className="h-8" src={stakeLogo} alt="Stake Logo" />
              </div>
              <div className="flex items-center md:ml-24">
                <div className="w-40 h-12 flex justify-center items-center space-x-1 rounded-l-md bg-[#10212B]">
                  <p className="text-slate-200 font-bold text-center text-sm">
                    CA${cashAmount.toFixed(2)}
                  </p>
                  <img
                    className="h-4 w-4"
                    src={dollarSignSvg}
                    alt="Dollar Sign"
                  />
                  <div className="px-2">
                    <img
                      className="h-1.5 pointer-events-none"
                      src={downArrowSvg}
                      alt="arrow"
                    />
                  </div>
                </div>
                <div className="w-20 h-12 bg-[#1876E6] rounded-r-md text-center flex justify-center text-slate-200 font-bold items-center text-sm">
                  Wallet
                </div>
              </div>
              <div className="hidden lg:block">
                <img className="h-9" src={headerOptions} alt="Options" />
              </div>
            </div>
          </header>
          <div className="w-full flex justify-center">
            <div className="lg:ml-12 w-full sm:w-3/4 lg:w-11/12 2xl:w-3/4 bg-[#0F212E] items-start rounded-lg mt-8">
              <div className="lg:flex justify-between">
                <Wager
                  wagerAmount={wagerAmount}
                  setWagerAmount={setWagerAmount}
                  inGame={inGame}
                  setInGame={setInGame}
                  cashOut={cashOut}
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
    </div>
  );
};

export default App;
