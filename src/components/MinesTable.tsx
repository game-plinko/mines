import { useState, useEffect } from "react";
import { getMultiplier } from "../MultiplierCalculator";
import MineBox from "./MineBox";
import dollarSignSvg from "../assets/svg/dollar-sign-orange.svg";
import cashOutSound from "../assets/sounds/cash-out.mp3";
import clickPlaySound from "../assets/sounds/play.mp3";

interface Props {
  inGame: boolean;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
  cashOut: boolean;
  wagerAmount: number;
  cashAmount: number;
  setCashOut: React.Dispatch<React.SetStateAction<boolean>>;
  setCashAmount: React.Dispatch<React.SetStateAction<number>>;
  numberOfGems: number;
  numberOfMines: number;
}

export const MinesTable: React.FC<Props> = ({
  inGame,
  setInGame,
  cashOut,
  wagerAmount,
  cashAmount,
  setCashOut,
  setCashAmount,
  numberOfGems,
  numberOfMines,
}) => {
  const [initialStates, setInitialStates] = useState<number[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [numberUncovered, setNumberUncovered] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(0);
  const [lost, setLost] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const [sounds, setSounds] = useState<{ [key: string]: AudioBuffer | null }>({
    cashOutSound: null,
    clickPlaySound: null,
  });

  useEffect(() => {
    // Create the AudioContext immediately
    const context = new AudioContext();
    setAudioContext(context);

    // Now use the freshly created context for decoding audio data
    const loadSound = async (url: string) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return context.decodeAudioData(arrayBuffer);
    };

    const initAudio = async () => {
      try {
        const [cashOutSoundBuffer, clickPlaySoundBuffer] = await Promise.all([
          loadSound(cashOutSound),
          loadSound(clickPlaySound),
        ]);

        setSounds({
          cashOutSound: cashOutSoundBuffer,
          clickPlaySound: clickPlaySoundBuffer,
        });
      } catch (error) {
        console.error("Error loading sounds:", error);
      }
    };

    initAudio();
  }, []);

  const playSound = (buffer: AudioBuffer | null) => {
    if (!audioContext || !buffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  };

  useEffect(() => {
    setMultiplier(getMultiplier(numberOfMines, numberUncovered));
    console.log(getMultiplier(numberOfMines, numberUncovered));
  }, [cashOut]);

  useEffect(() => {
    if (numberUncovered === numberOfGems) {
      setCashOut(true);
      setInGame(false);
    }
  }, [numberUncovered, numberOfGems]);

  useEffect(() => {
    if (cashOut) {
      setShowAll(true);
      playSound(sounds.cashOutSound);
      setCashAmount(cashAmount + wagerAmount * multiplier);
    } else if (lost) {
      setCashAmount(cashAmount - wagerAmount);
    }
  }, [cashOut, lost]);

  useEffect(() => {
    // This effect runs every time `inGame` changes.
    // We only want to shuffle the board when inGame is true.
    if (inGame) {
      playSound(sounds.clickPlaySound);
      const newStates = shuffleArray([
        ...Array(numberOfGems).fill(1),
        ...Array(numberOfMines).fill(2),
      ]);
      setInitialStates(newStates);
      setShowAll(false);
      setNumberUncovered(0);
      setLost(false);
    }
  }, [inGame]);

  return (
    <div className="w-auto grid grid-cols-5 grid-rows-5 gap-x-3 mt-1 relative mr-28 items-center my-2">
      {cashOut && numberUncovered > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#192C38] rounded-xl z-50 p-4 border-4 border-[#01E801] space-y-2 w-40">
          <div className="flex justify-center w-full items-center text-[#01E801] font-extrabold text-2xl">
            <p>{multiplier}</p>
            <p className="mb-1.5 text-xl">x</p>
          </div>
          <div className="w-16 mx-auto h-0.5 bg-[#344952]"></div>
          <div className="flex justify-center items-center w-full space-x-1">
            <p className="text-[#01E801] font-bold text-center">
              CA${(wagerAmount * multiplier).toFixed(2)}
            </p>
            <img
              className="h-5 w-5 pt-0.5"
              src={dollarSignSvg}
              alt="Dollar Sign"
            />
          </div>
        </div>
      )}
      {initialStates.map((state, i) => (
        <MineBox
          key={i}
          state={state}
          showAll={showAll}
          setShowAll={setShowAll}
          inGame={inGame}
          setInGame={setInGame}
          numberUncovered={numberUncovered}
          setNumberUncovered={setNumberUncovered}
          setLost={setLost}
        />
      ))}
    </div>
  );
};

export default MinesTable;

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
