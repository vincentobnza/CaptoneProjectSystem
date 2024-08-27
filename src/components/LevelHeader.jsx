import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function LevelHeader({ title, description }) {
  return (
    <div className="mt-5 w-full max-w-screen-xl mx-auto p-8 md:p-5 lg:p-5 grid place-items-center gap-2 relative">
      <div className="w-full max-w-screen-lg mx-auto flex justify-between items-center text-left">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm font-semibold text-zinc-600">{description}</p>
        </div>
        <LanguageSelector />
      </div>

      <div className="absolute top-6 left-6 text-sm font-semibold text-zinc-400">
        <Link to="/online-resources" className="hover:text-zinc-600">
          Explore
        </Link>
      </div>
    </div>
  );
}

const LanguageSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    {
      value: "HTML",
      label: "HTML",
      default: true,
      navigate: "/basic-level-html/resources=online",
    },
    {
      value: "CSS",
      label: "CSS",
      default: false,
      navigate: "/basic-level-css/resources=online",
    },
    {
      value: "JavaScript",
      label: "JavaScript",
      default: false,
      navigate: "/basic-level-javascript/resources=online",
    },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(
    options.find((option) => option.navigate === location.pathname)?.value ||
      options.find((option) => option.default)?.value ||
      options[0].value
  );
  const [selectedResource, setSelectedResource] = useState("Select Resources");

  useEffect(() => {
    const currentOption = options.find(
      (option) => option.navigate === location.pathname
    );
    if (currentOption) {
      setSelectedLanguage(currentOption.value);
    }
  }, [location.pathname]);

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setSelectedLanguage(value);
    const selected = options.find((option) => option.value === value);
    if (selected && selected.navigate) {
      navigate(selected.navigate);
    }
  };

  return (
    <div className="flex gap-2">
      <Select
        variant="bordered"
        label="Default"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="w-[150px]"
        size="sm"
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
