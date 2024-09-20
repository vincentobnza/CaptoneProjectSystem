import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeLoader } from "react-spinners";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import supabase from "../config/supabaseClient";
import { useAuth } from "../hooks/AuthContext";

export default function Game_Playground() {
  const [open, setOpen] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_GAME_DATA_API);
        setGameData(data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, []);

  return (
    <div className="bg-zinc-900 w-full h-screen grid place-items-center text-zinc-200 p-5">
      <PopupModal open={open} setOpen={setOpen} setStartGame={setStartGame} />
      <START_IN start={startGame} setStartGame={setStartGame} />
      {!open && !startGame && gameData.length > 0 && (
        <GAME
          gameData={gameData}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          score={score}
          setScore={setScore}
          opponentScore={opponentScore}
          setOpponentScore={setOpponentScore}
        />
      )}
    </div>
  );
}

const PopupModal = ({ open, setOpen, setStartGame }) => {
  const [load, setLoad] = useState(false);
  const [roomName, setRoomName] = useState("");
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchUserInformation();
    fetchRooms();
    const roomSubscription = supabase
      .channel("public:game_room")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "game_room" },
        handleRoomChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomSubscription);
    };
  }, [user]);

  const handleRoomChange = (payload) => {
    if (payload.eventType === "INSERT") {
      setRooms((prevRooms) => [...prevRooms, payload.new]);
    } else if (payload.eventType === "DELETE") {
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== payload.old.id)
      );
    } else if (payload.eventType === "UPDATE") {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === payload.new.id ? payload.new : room
        )
      );
      if (payload.new.opponent_id && payload.new.user_id === user.id) {
        setStartGame(true);
        setOpen(false);
      }
    }
  };

  const fetchUserInformation = async () => {
    if (user && user.id) {
      try {
        const { data, error } = await supabase
          .from("profile")
          .select("username")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from("game_room")
        .select("*")
        .is("opponent_id", null);

      if (error) throw error;
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const createRoom = async () => {
    if (roomName === "") {
      alert("Please enter a room name");
      return;
    }

    setLoad(true);

    try {
      const { data, error } = await supabase
        .from("game_room")
        .insert({
          user_id: user.id,
          room_name: roomName,
        })
        .single();

      if (error) throw error;
      listenForOpponent(roomName);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const joinRoom = async (roomId) => {
    try {
      const { data, error } = await supabase
        .from("game_room")
        .update({ opponent_id: user.id })
        .eq("id", roomId)
        .single();

      if (error) throw error;

      setStartGame(true);
      setOpen(false);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const listenForOpponent = (roomName) => {
    const subscription = supabase
      .from(`game_room:room_name=eq.${roomName}`)
      .on("UPDATE", (payload) => {
        if (payload.new.opponent_id) {
          setStartGame(true);
          setOpen(false);
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900 grid place-items-center z-[50] backdrop-blur-lg"
          >
            <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-2 items-center justify-center text-center">
              <div className="w-full flex flex-col gap-4">
                <h1 className="text-5xl font-medium font-Merriweather">
                  Enter Room
                </h1>
                <p className="text-md text-zinc-200">
                  Username: {userInfo?.username}
                </p>

                <div className="w-full max-w-md mx-auto flex flex-col gap-3">
                  <input
                    type="text"
                    className="mt-5 w-full h-14 border border-zinc-600 bg-zinc-700 rounded focus:border-2 outline-none focus:border-emerald-600 px-2 placeholder:text-sm"
                    placeholder="Room name"
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                  />

                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      onClick={createRoom}
                      className="text-xs font-medium bg-emerald-700 text-white h-14 rounded"
                    >
                      Create Room
                    </button>
                    {rooms.map((room) => (
                      <button
                        key={room.id}
                        type="submit"
                        onClick={() => joinRoom(room.id)}
                        className="text-xs font-medium border border-zinc-600 text-zinc-400 h-14 rounded"
                      >
                        Join Room: {room.room_name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Loading load={load} />
    </>
  );
};

const Loading = ({ load }) => {
  return (
    <>
      <AnimatePresence>
        {load && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/70 backdrop-blur grid place-items-center z-[100]"
          >
            <div className="flex flex-col justify-center items-center gap-8">
              <FadeLoader color="#10b981" className="animate-pulse" />
              <p className="text-sm font-semibold text-zinc-300 animate-pulse">
                Waiting for your opponent to join...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const START_IN = ({ start, setStartGame }) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (start && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1500);

      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setStartGame(false);
    }
  }, [start, timer, setStartGame]);

  return (
    <>
      <AnimatePresence>
        {start && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-zinc-900/50 inset-0 backdrop-blur grid place-items-center z-[100]"
          >
            <div className="flex flex-col gap-5 text-center justify-center items-center">
              <h1 className="text-xl font-medium text-zinc-400">
                Game Starts in
              </h1>
              <h1 className="text-[200px] font-bold bg-gradient-to-br from-emerald-400 to-green-700 bg-clip-text text-transparent">
                {timer}
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const GAME = ({
  gameData,
  currentQuestion,
  setCurrentQuestion,
  score,
  setScore,
  opponentScore,
  setOpponentScore,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const handleAnswerSubmit = (e) => {
    if (e.key === "Enter") {
      const correctAnswer = gameData[currentQuestion].answer;

      if (
        userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
      ) {
        setIsCorrect(true);
        setUserAnswer("");
        setScore((prevScore) => prevScore + 1);
        setCurrentQuestion((prevIndex) =>
          prevIndex < gameData.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else {
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className="w-full max-w-screen-md mx-auto flex flex-col justify-center text-center gap-2 text-zinc-300 h-[80vh] relative">
      <div className="absolute top-0 w-full flex justify-between left-0 p-2 border-b border-zinc-700 text-zinc-400">
        <h1>
          Your Score 👨‍💻:{" "}
          <span className="font-bold text-emerald-600 ml-2">{score}</span>
        </h1>
        <h1>
          Opponents Score 🤖:{" "}
          <span className="font-bold text-emerald-600 ml-2">
            {opponentScore}
          </span>
        </h1>
      </div>
      {gameData.length > 0 && (
        <>
          <div className="w-full flex flex-col gap-6">
            <h1 className="text-3xl">{gameData[currentQuestion].question}</h1>

            <div className="w-[70%] mx-auto flex flex-col gap-2 rounded-2xl">
              <SyntaxHighlighter
                language="javascript"
                style={atomOneDark}
                customStyle={{
                  height: "150px",
                  overflowY: "scroll",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "1rem",
                }}
              >
                {JSON.stringify(gameData[currentQuestion].code, null, 2)}
              </SyntaxHighlighter>

              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleAnswerSubmit}
                className={`mt-5 w-full h-14 border-b-2 ${
                  isCorrect ? "border-zinc-700" : "border-red-600"
                } bg-zinc-900 focus:border-b-2 outline-none focus:border-emerald-600 px-3 text-center placeholder:text-zinc-500`}
                placeholder="Answer here"
                autoFocus={true}
              />
              <p className="text-md mt-5 text-zinc-500 animate-pulse">
                Press enter to submit answer
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
