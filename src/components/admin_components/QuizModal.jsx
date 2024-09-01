import React, { useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { Button, Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import QuizPreview from "../../pages/QuizPreview";
import { MdDriveFolderUpload } from "react-icons/md";

const QuizModal = ({ quiz, setQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: "multiple_choice", text: "", options: [""] },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  return (
    <AnimatePresence>
      {quiz && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 inset-0 bg-zinc-900/50 grid place-items-center z-[90] p-5 text-zinc-700"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-screen-md h-full bg-white rounded-xl flex flex-col gap-1 overflow-y-auto relative"
          >
            <div className="sticky top-0 bg-white w-full grid place-items-center rounded-tr-xl rounded-tl-xl border-b border-zinc-100 p-3 z-10">
              <div className="w-full flex bg-white backdrop-blur-xl text-black justify-between items-center rounded-xl px-2">
                <div className="flex items-center gap-1">
                  <img
                    src="https://cdn-icons-gif.flaticon.com/11545/11545350.gif"
                    className="size-10"
                    alt="Quiz icon"
                  />
                  <h1 className="text-sm font-bold">Quiz Maker</h1>
                </div>
                <div className="flex items-center cursor-pointer gap-2 p-2 rounded-lg  text-zinc-500">
                  <Tooltip content="Preview" radius="sm" placement="bottom">
                    <Link
                      to="/quiz-preview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm mr-4"
                    >
                      <VscOpenPreview size={25} />
                    </Link>
                  </Tooltip>
                  <Button
                    radius="sm"
                    className="bg-zinc-600 text-white text-xs font-bold"
                  >
                    Create Quiz
                  </Button>
                  <Tooltip content="Exit" radius="sm" placement="bottom">
                    <Button
                      isIconOnly
                      variant="bordered"
                      onClick={() => setQuiz(false)}
                      className="flex border rounded p-2 border-zinc-200 text-zinc-600"
                    >
                      <IoExitOutline size={20} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="p-5 mt-2">
              <div className="flex flex-col gap-4 p-5 rounded-xl border border-zinc-100 ">
                <h1 className="text-lg font-bold">Add your quiz title</h1>
                <input
                  type="text"
                  className="w-full h-10 border-b border-zinc-200 outline-none text-sm focus:border-b-2 focus:border-zinc-500 transition duration-500"
                  placeholder="Untitled Quiz"
                  required
                  onChange={(e) => handleTitleChange(e)}
                  value={title}
                />
                <h1 className="text-sm font-bold">Add description</h1>
                <input
                  type="text"
                  className="w-full h-10 border-b border-zinc-200 outline-none text-sm focus:border-b-2 focus:border-zinc-500 transition duration-500"
                  placeholder="Quiz Description Here"
                  required
                  onChange={(e) => handleDescriptionChange(e)}
                  value={description}
                />
              </div>

              <AnimatePresence>
                {questions.map((question, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    key={index}
                    className="mt-2 flex flex-col gap-2 p-5 rounded-xl bg-white border border-zinc-100  mb-4 relative "
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        className="w-full h-10 border-b border-zinc-300 outline-none text-sm font-bold placeholder:font-normal"
                        placeholder={`Question ${index + 1}`}
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(index, "text", e.target.value)
                        }
                      />
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        className="w-full h-10 border-b border-zinc-300 outline-none text-sm"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].options[optionIndex] =
                            e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ))}

                    <Tooltip content="Delete" radius="sm" placement="top">
                      <div className="absolute top-2 right-2 text-zinc-400 cursor-pointer">
                        <IoIosRemoveCircleOutline
                          size={20}
                          onClick={() => removeQuestion(index)}
                        />
                      </div>
                    </Tooltip>

                    <button
                      className="flex items-center gap-1 outline-none mt-4 self-start text-emerald-500 text-sm font-semibold"
                      onClick={() => addOption(index)}
                    >
                      <IoMdAdd />
                      Add option
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                onClick={addQuestion}
                radius="sm"
                endContent={<IoMdAdd size={16} />}
                className="flex items-center gap-2 mt-3 ml-2 bg-zinc-600 text-white text-xs font-bold"
              >
                Add Question
              </Button>
            </div>

            <UploadFile />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UploadFile = () => {
  return (
    <div className="w-full p-8 flex flex-col gap-2">
      <h1 className="text-sm font-semibold">Or Upload a quiz file</h1>

      <div className="mt-5">
        <div className="p-8 border-2 border-dashed border-zinc-300 grid place-items-center">
          <div className="flex text-center justify-center items-center flex-col gap-4 cursor-pointer">
            <MdDriveFolderUpload size={20} id="upload" />
            <label
              htmlFor="upload"
              className="text-xs font-medium text-zinc-500"
            >
              Upload file
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
