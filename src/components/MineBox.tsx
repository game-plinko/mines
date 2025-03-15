import gemStonePng from "../assets/img/gem-stone.png";
import BombPng from "../assets/img/bomb.png";
import mineSound1 from "../assets/sounds/mine-1.mp3";
import mineSound2 from "../assets/sounds/mine-2.mp3";
import bombSound from "../assets/sounds/bomb.mp3";
import { useState, useEffect } from "react";

interface Props {
  state: number;
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  inGame: boolean;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
  numberUncovered: number;
  setNumberUncovered: React.Dispatch<React.SetStateAction<number>>;
  setLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const MineBox: React.FC<Props> = ({
  state,
  showAll,
  setShowAll,
  inGame,
  setInGame,
  numberUncovered,
  setNumberUncovered,
  setLost,
}) => {
  const [shown, setShown] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [sounds, setSounds] = useState<{ [key: string]: AudioBuffer | null }>({
    mine1: null,
    mine2: null,
    bomb: null,
  });

  useEffect(() => {
    if (inGame) {
      setShown(false);
    }
  }, [inGame]);

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
        const [mine1Buffer, mine2Buffer, bombBuffer] = await Promise.all([
          loadSound(mineSound1),
          loadSound(mineSound2),
          loadSound(bombSound),
        ]);

        setSounds({
          mine1: mine1Buffer,
          mine2: mine2Buffer,
          bomb: bombBuffer,
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

  const handleClick = async (): Promise<void> => {
    if (shown || showAll) return; // Prevent multiple clicks

    // Resume the AudioContext if it's suspended.
    if (audioContext && audioContext.state === "suspended") {
      await audioContext.resume();
    }

    setAnimating(true); // Start animation immediately

    setTimeout(() => {
      // Play preloaded sound during the animation (after 150ms)
      if (state === 1) {
        playSound(Math.random() < 0.5 ? sounds.mine1 : sounds.mine2);
        setNumberUncovered(numberUncovered + 1);
      } else if (state === 2) {
        playSound(sounds.bomb);
        // Only set showAll if it's a bomb
        setShowAll((prev) => prev || true);
        setInGame(false);
        setLost(true);
      }
    }, 150);

    setTimeout(() => {
      setShown(true); // Reveal image after animation completes
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="relative w-[110px] h-[108px]">
      <div
        className={`absolute ${
          shown || showAll ? "" : "top-2"
        } w-full h-full rounded-lg bg-[#243c4c]`}
      />
      <button
        onClick={handleClick}
        disabled={shown || showAll || !inGame}
        className={`relative transition-all duration-300 ease-out
      ${shown || showAll ? "bg-[#0A1825]" : "bg-[#2F4553] hover:bg-[#486579]"}
      w-full h-full rounded-lg flex justify-center items-center
      shadow-2xl
      ${animating ? "scale-110" : "scale-100"}
    `}
      >
        {state === 1 && (shown || showAll) ? (
          <img
            className={`transition-opacity duration-500 ${
              showAll && !shown
                ? "h-14 w-14 opacity-30"
                : "h-20 w-20 opacity-100"
            }`}
            src={gemStonePng}
            alt="gem stone"
          />
        ) : state === 2 && (shown || showAll) ? (
          <img
            className={`transition-opacity duration-500 ${
              showAll && !shown
                ? "h-14 w-14 opacity-40"
                : "h-20 w-20 opacity-100"
            }`}
            src={BombPng}
            alt="bomb"
          />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default MineBox;
