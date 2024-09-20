import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import { FaRegQuestionCircle, FaEye } from "react-icons/fa";
import { FaRegSquareCheck, FaRegRectangleXmark } from "react-icons/fa6";
import { MdOutlineLeaderboard } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { RiHome2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/AuthContext.tsx";
import supabase from "../config/supabaseClient.js";

export default function Css_Quiz() {
  const { topic } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [points, setPoints] = useState(0);
  const { user } = useAuth();

  //CSS QUIZ PROGRESS
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const url = import.meta.env.VITE_CSS_DATA_API;
        const { data } = await axios.get(url);
        if (topic === "topic1") {
          setQuiz(data.Topic1);
        } else if (topic === "topic2") {
          setQuiz(data.Topic2);
        } else if (topic === "topic3") {
          setQuiz(data.Topic3);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchQuiz();
  }, [topic]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = async () => {
    let totalScore = 0;
    quiz.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    const pointsAdded = totalScore * 5;
    setPoints(pointsAdded);

    const updatedProgress = ((currentQuestionIndex + 1) / quiz.length) * 100;
    setProgress(updatedProgress);

    //insert progress to users_progress table

    const insertProgress = async () => {
      try {
        const { data, error } = await supabase
          .from("users_progress")
          .insert("basic_css", progress)
          .eq("user_id", user.id);
      } catch (error) {
        console.log("Error inserting your progress", error);
      }
    };

    insertProgress();

    if (user) {
      try {
        const { data: currentData, error: fetchError } = await supabase
          .from("profile")
          .select("points")
          .eq("id", user.id)
          .limit(1);

        if (!currentData || currentData.length === 0) {
          console.error("User profile does not exist. Creating new profile.");
          const { data: insertData, error: insertError } = await supabase
            .from("profile")
            .insert({ id: user.id, points: pointsAdded });

          if (insertError) {
            console.error("Error inserting new user profile:", insertError);
            return;
          }

          console.log("New profile created and points inserted:", insertData);
          return;
        }

        if (fetchError) {
          console.error("Error fetching current points:", fetchError);
          return;
        }

        const currentPoints = currentData[0]?.points || 0;
        const newTotalPoints = currentPoints + pointsAdded;

        // Update points using upsert
        const { data, error: updateError } = await supabase
          .from("profile")
          .upsert(
            { id: user.id, points: newTotalPoints }, // Provide a complete row for upsert
            { onConflict: "id" } // Use onConflict to handle unique key
          );

        if (updateError) {
          console.error("Error updating points:", updateError);
        } else {
          console.log("Points updated successfully:", data);
        }
      } catch (error) {
        console.error("Unexpected error while updating points:", error);
      }
    } else {
      console.error("User is not authenticated, cannot update points.");
    }

    //insert progress to users progress

    if (user) {
    }
  };

  const QuizAccuracyModal = () => (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="3xl"
      className="font-Manrope"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Quiz Accuracy Breakdown
            </ModalHeader>
            <ModalBody>
              <div className="w-full grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col gap-2 border border-zinc-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-xl">
                    <FaRegQuestionCircle className="text-emerald-500" />
                    <h1 className="font-semibold text-emerald-600">
                      {quiz.length}
                    </h1>
                  </div>
                  <h1 className="text-zinc-600 text-sm">Total Questions</h1>
                </div>
                <div className="flex flex-col gap-2 border border-zinc-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-xl">
                    <FaRegSquareCheck className="text-emerald-500" />
                    <h1 className="font-semibold text-emerald-600">{score}</h1>
                  </div>
                  <h1 className="text-zinc-600 text-sm">Correct Answers</h1>
                </div>
                <div className="flex flex-col gap-2 border border-zinc-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-xl">
                    <FaRegRectangleXmark className="text-red-500" />
                    <h1 className="font-semibold text-red-600">
                      {quiz.length - score}
                    </h1>
                  </div>
                  <h1 className="text-zinc-600 text-sm">Wrong Answers</h1>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">
                Question-by-Question Breakdown
              </h3>
              {quiz.map((question, index) => (
                <div
                  key={question.id}
                  className="mb-1 p-4 bg-zinc-50 border border-zinc-200 rounded-lg"
                >
                  <div className="w-full flex justify-between mb-3">
                    <h4 className="font-semibold">Question {index + 1}:</h4>
                    <span
                      className={
                        userAnswers[question.id] === question.correctAnswer
                          ? "text-green-500 px-2 py-2 bg-emerald-50 text-sm border rounded-lg border-emerald-200"
                          : "text-red-500 px-2 py-2 bg-red-50 text-sm border rounded-lg border-red-200"
                      }
                    >
                      {userAnswers[question.id] === question.correctAnswer
                        ? "Correct"
                        : "Incorrect"}
                    </span>
                  </div>
                  <p className="mb-2">{question.question}</p>
                  <div className="flex justify-between items-center">
                    <span>
                      Your answer: {question.answers[userAnswers[question.id]]}
                    </span>
                  </div>
                  {userAnswers[question.id] !== question.correctAnswer && (
                    <p className="mt-2 text-sm text-gray-600">
                      Correct answer: {question.answers[question.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-emerald-500 text-white"
                onPress={onClose}
                radius="sm"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  if (quiz.length === 0) {
    return <p>Loading quiz...</p>;
  }
  if (score !== null) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full h-screen grid place-items-center"
      >
        <div className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
          <div className="flex">
            <Link to="/basic-css" className="flex items-center gap-2">
              <RiHome2Line />
              <h1 className="text-sm">Back to CSS</h1>
            </Link>
          </div>
          <div className="flex">
            <h1 className="text-sm font-medium">
              Total Points:
              <span className="text-emerald-700 py-1 px-2 bg-emerald-100 rounded-full">
                {points} pts
              </span>
            </h1>
          </div>
        </div>
        <div className="absolute top-16 right-10 flex flex-col gap-2">
          <img
            src="https://www.gstatic.com/classroom/web/home/dark_create_class_arrow.svg"
            alt="arrow"
            className="w-12 self-end"
          />

          <h1 className="text-xs text-zinc-500">
            View here your calculated points
          </h1>
        </div>
        <div className="w-full max-w-xl h-[500px] p-8 mx-auto justify-center flex flex-col gap-5 items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/013/391/041/original/trophy-3d-illustration-free-png.png"
            alt="trophy"
            className="w-28 md:w-[120px]"
          />

          <h1 className="text-2xl md:text-5xl font-semibold">Quiz Completed</h1>
          <h2 className="text-zinc-500 text-sm md:text-lg font-semibold">
            You've scored:{" "}
            <span className={score <= 4 ? "text-red-500" : "text-green-500"}>
              {score}
            </span>{" "}
            out of {quiz.length}
          </h2>

          <div className="w-full grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-2 bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 p-5 rounded-lg">
              <div className="flex items-center gap-2 text-xl">
                <FaRegQuestionCircle className="text-emerald-500" />
                <h1 className="font-semibold text-emerald-600">
                  {quiz.length}
                </h1>
              </div>
              <h1 className="text-zinc-600 text-xs md:text-sm">
                Total Questions
              </h1>
            </div>
            <div className="flex flex-col gap-2 bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 p-5 rounded-lg">
              <div className="flex items-center gap-2 text-xl">
                <FaRegSquareCheck className="text-emerald-500" />
                <h1 className="font-semibold text-emerald-600">{score}</h1>
              </div>
              <h1 className="text-zinc-600 text-xs md:text-sm">
                Correct Answers
              </h1>
            </div>
            <div className="flex flex-col gap-2 bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 p-5 rounded-lg">
              <div className="flex items-center gap-2 text-xl">
                <FaRegRectangleXmark className="text-red-500" />
                <h1 className="font-semibold text-red-600">
                  {quiz.length - score}
                </h1>
              </div>
              <h1 className="text-zinc-600 text-xs md:text-sm">
                Wrong Answers
              </h1>
            </div>
          </div>
          <div className="mt-10 w-full flex justify-center items-center gap-6">
            <button
              onClick={onOpen}
              className="flex items-center text-sm gap-2 text-zinc-500 px-4 py-3 rounded outline-none font-semibold"
            >
              <FaEye /> View Accuracy
            </button>
            <Link
              to="/assessments"
              className="flex items-center text-sm gap-2 bg-zinc-700 text-white px-4 py-3 rounded font-semibold"
            >
              Leaderboards
              <MdOutlineLeaderboard size={15} />
            </Link>
          </div>

          <QuizAccuracyModal />
        </div>
      </motion.div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="w-full max-w-screen-md p-8 mx-auto flex flex-col justify-center items-center space-y-4 ">
        <h2 className="mt-6 text-sm text-zinc-700">
          <span className="font-bold">{currentQuestionIndex + 1} </span>
          of <span className="font-bold">{quiz.length}</span> Questions
        </h2>

        <div className="mb-6">
          <p className="text-2xl mb-8 font-bold">{currentQuestion.question}</p>
          <div className="flex flex-col mb-10">
            {Object.entries(currentQuestion.answers).map(([key, option]) => (
              <label
                key={key}
                className="mb-2 p-4 border border-zinc-100 bg-white shadow shadow-zinc-100 rounded text-sm focus-within:bg-emerald-500 focus-within:border-emerald-500 focus-within:text-white focus-within:shadow-2xl cursor-pointer font-semibold text-zinc-500 duration-500 transition-all ease-in-out"
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={key}
                  checked={userAnswers[currentQuestion.id] === key}
                  onChange={() => handleAnswerChange(currentQuestion.id, key)}
                  className="mr-2 focus:ring-2 focus:ring-emerald-500 accent-white border-white outline-none "
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!userAnswers[currentQuestion.id]}
          className={`text-sm font-bold rounded-full size-16 border grid place-items-center px-4 py-2 
            ${
              !userAnswers[currentQuestion.id]
                ? "opacity-40 bg-gray-300 text-gray-600 border border-zinc-200"
                : "bg-emerald-500 text-white"
            } 
            transition-all duration-600 ease-in-out`}
        >
          <GrLinkNext size={20} />
        </button>
      </div>
    </div>
  );
}
