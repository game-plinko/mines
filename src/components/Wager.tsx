import { useEffect, useState } from "react";
import dollarSignSvg from "../assets/svg/dollar-sign-orange.svg";
import downArrowSvg from "../assets/svg/Down_arrow.svg";
import bombSvg from "../assets/svg/Bomb.svg";

interface Props {
  wagerAmount: number;
  setWagerAmount: React.Dispatch<React.SetStateAction<number>>;
  inGame: boolean;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
  cashOut: boolean;
  setCashOut: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfMines: number;
  setNumberOfMines: React.Dispatch<React.SetStateAction<number>>;
  cashAmount: number;
  setCashAmount: React.Dispatch<React.SetStateAction<number>>;
  numberUncovered: number;
}

export const Wager: React.FC<Props> = ({
  wagerAmount,
  setWagerAmount,
  inGame,
  setInGame,
  cashOut,
  setCashOut,
  numberOfMines,
  setNumberOfMines,
  cashAmount,
  setCashAmount,
  numberUncovered,
}) => {
  useEffect(() => {
    if (cashAmount < wagerAmount) {
      setWagerAmount(cashAmount);
    }
  }, [cashAmount, wagerAmount, setWagerAmount]);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 250);
  };

  return (
    <div className="w-full lg:w-[320px] text-[#B1BAD3] bg-[#213743] rounded-tl-md">
      <div className="flex flex-col justify-center items-center p-4 space-y-3">
        <div className="bg-[#13212E] rounded-full h-14 flex w-full items-center text-white font-semibold text-sm space-x-1 text-center p-1.5">
          <div className="bg-[#283E4B] transform duration-200 ease-in-out w-1/2 h-full flex items-center justify-center rounded-full">
            Manual
          </div>
          <div className="hover:bg-[#283E4B] transform duration-200 ease-in-out w-1/2 h-full flex items-center justify-center rounded-full cursor-pointer">
            Auto
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="w-full space-y-1">
            <div className="flex justify-between items-center w-full text-sm font-bold">
              <h1>Bet Amount</h1>
              <p className="text-xs">CA${wagerAmount.toFixed(2)}</p>
            </div>
            <div className="w-full border-2 border-[#2d4553] hover:border-slate-600 transition duration-200 ease-in-out drop-shadow-lg rounded-md overflow-hidden flex items-center justify-between">
              <div className="bg-[#13212E] p-2 w-3/5 flex justify-between">
                <input
                  disabled={inGame}
                  type="number"
                  className="bg-[#13212E] outline-none text-white"
                  value={wagerAmount.toFixed(2)}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    const validValue = isNaN(value) ? 0 : value;
                    // Clamp value to cashAmount
                    setWagerAmount(
                      validValue > cashAmount ? cashAmount : validValue
                    );
                  }}
                />
                <img
                  className="h-5 w-5 pt-1 -ml-12"
                  src={dollarSignSvg}
                  alt="Dollar Sign"
                />
              </div>
              <div className="w-2/5 h-10 bg-[#283E4B] flex items-center text-sm text-slate-200 font-semibold">
                <button
                  disabled={inGame}
                  className="w-1/2 h-full flex justify-center items-center text-center hover:bg-slate-500 transition duration-200 ease-in-out"
                  onClick={() => setWagerAmount(wagerAmount / 2)}
                >
                  1/2
                </button>
                <div
                  className="h-6 bg-[#16252e] w-0.5 rounded-md
                "
                ></div>
                <button
                  disabled={inGame}
                  className="w-1/2 h-full flex justify-center items-center text-center hover:bg-slate-500 transition duration-200 ease-in-out"
                  onClick={() =>
                    setWagerAmount(
                      wagerAmount > 0
                        ? Math.min(wagerAmount * 2, cashAmount)
                        : 1
                    )
                  }
                >
                  2x
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold">Mines</h1>
            <div className="w-full border-2 border-[#2d4553] hover:border-slate-600 overflow-hidden transition duration-200 ease-in-out drop-shadow-lg rounded-md flex items-center justify-between cursor-pointer">
              <div className="bg-[#13212E] p-2 w-full flex justify-between items-center cursor-pointer">
                <select
                  disabled={inGame}
                  className="bg-[#13212E] text-white w-full outline-none focus:outline-none appearance-none cursor-pointer pl-1"
                  value={numberOfMines}
                  onChange={(e) => setNumberOfMines(parseInt(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                    <option className="text-white" key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <img
                  className="h-2 ml-[-24px] pointer-events-none"
                  src={downArrowSvg}
                  alt="arrow"
                />
              </div>
            </div>
          </div>
          <button
            disabled={numberUncovered === 0 && inGame}
            className={`bg-[#01E801] hover:bg-[#3df13d] transition duration-200 ease-in-out w-full h-12 rounded-md flex justify-center items-center cursor-pointer ${
              clicked ? "scale-95" : ""
            }`}
            onClick={() => {
              handleClick();
              if (inGame) {
                setInGame(false);
                setCashOut(true);
              } else {
                setInGame(true);
                setCashOut(false);
                setCashAmount(cashAmount - wagerAmount);
              }
            }}
          >
            {!clicked || cashOut ? (
              <span className="font-semibold text-slate-900">
                {inGame ? "Cashout" : "Bet"}
              </span>
            ) : (
              <>
                <img className="h-5 opacity-85" src={bombSvg} alt="bomb" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Wager;
