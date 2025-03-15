import dollarSignSvg from "../assets/svg/dollar-sign-orange.svg";

interface Props {
  wagerAmount: number;
  setWagerAmount: React.Dispatch<React.SetStateAction<number>>;
  inGame: boolean;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
  setCashOut: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfMines: number;
  setNumberOfMines: React.Dispatch<React.SetStateAction<number>>;
}

export const Wager: React.FC<Props> = ({
  wagerAmount,
  setWagerAmount,
  inGame,
  setInGame,
  setCashOut,
  numberOfMines,
  setNumberOfMines,
}) => {
  return (
    <div className="w-[320px] text-slate-300 bg-[#213743] h-[640px] rounded-tl-lg">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="w-full space-y-4">
          <div className="w-full space-y-1">
            <div className="flex justify-between w-full text-sm font-semibold">
              <h1>Bet Amount</h1>
              <p>CA${wagerAmount.toFixed(2)}</p>
            </div>
            <div className="w-full border-2 border-[#283E4B] drop-shadow-lg rounded-md flex items-center justify-between">
              <div className="bg-[#13212E] p-2 w-3/5 flex justify-between">
                <input
                  disabled={inGame}
                  type="number"
                  className="bg-[#13212E]"
                  value={wagerAmount.toFixed(2)}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setWagerAmount(isNaN(value) ? 0 : value);
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
                  className="w-1/2 flex justify-center items-center text-center"
                  onClick={() => setWagerAmount((wagerAmount * 1) / 2)}
                >
                  1/2
                </button>
                <div className="h-6 bg-[#16252e] w-0.5 rounded-lg"></div>
                <button
                  disabled={inGame}
                  className="w-1/2 flex justify-center items-center text-center"
                  onClick={() => setWagerAmount(wagerAmount * 1 * 2)}
                >
                  2x
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold">Mines</h1>
            <div className="w-full border-2 border-[#283E4B] drop-shadow-lg rounded-md flex items-center justify-between">
              <div className="bg-[#13212E] p-2 w-full flex justify-between">
                <input
                  type="number"
                  disabled={inGame}
                  className="bg-[#13212E] w-full"
                  value={numberOfMines}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setNumberOfMines(isNaN(value) ? 0 : value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className="bg-[#01E801] w-full h-12 rounded-lg flex justify-center items-center"
            onClick={() => {
              if (inGame) {
                setInGame(false);
                setCashOut(true);
              } else {
                setInGame(true);
                setCashOut(false);
              }
            }}
          >
            <span className="font-medium text-slate-800">
              {inGame ? "Cashout" : "Bet"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Wager;
