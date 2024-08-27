import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import LevelHeader from "../components/LevelHeader";

const BasicLevelHTML = () => {
  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <LevelHeader
          title="Basic Level"
          description="Build your foundation in a modern web development."
        />
        <MainContent />
      </div>
    </div>
  );
};

const MainContent = () => {
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto flex gap-2">
      <SideBar sectionRefs={sectionRefs} />
      <Content addToRefs={addToRefs} />
    </div>
  );
};

const SideBar = ({ sectionRefs }) => {
  const scrollToSection = (index) => {
    sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const items = [
    { title: "So what is HTML?", index: 0 },
    { title: "Images", index: 1 },
    { title: "Marking up text", index: 2 },
    { title: "Links", index: 3 },
    { title: "Conclusion", index: 4 },
  ];

  return (
    <div className="shrink-0 w-[200px] flex flex-col border border-zinc-200 overflow-auto">
      <ul className="p-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="p-2 hover:bg-zinc-100 underline cursor-pointer"
            onClick={() => scrollToSection(item.index)}
          >
            <span className="text-sm font-medium">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Content = ({ addToRefs }) => (
  <div className="flex-grow flex-col gap-2 p-5 border space-y-6">
    <Title> HTML for Beginners – HTML Basics With Code Examples</Title>
    <img
      src="https://wallpaperaccess.com/full/4868335.jpg"
      className="w-full"
    />
    <div className="font-medium space-y-4">
      <Paragraph>
        HTML is a markup language that defines the structure of your content.
        HTML consists of a series of elements, which you use to enclose, or
        wrap, different parts of the content to make it appear a certain way, or
        act a certain way. The enclosing tags can make a word or image hyperlink
        to somewhere else, can italicize words, can make the font bigger or
        smaller, and so on. For example, take the following line of content:
      </Paragraph>
    </div>

    <div ref={addToRefs} className="space-y-3">
      <Title>So what is HTML?</Title>
      <Paragraph>
        HTML is a markup language that defines the structure of your content.
        HTML consists of a series of elements, which you use to enclose, or
        wrap, different parts of the content to make it appear a certain way, or
        act a certain way. The enclosing tags can make a word or image hyperlink
        to somewhere else, can italicize words, can make the font bigger or
        smaller, and so on. For example, take the following line of content:
      </Paragraph>
      <SampleCode>My cat is very grumpy</SampleCode>
      <Paragraph>
        If we wanted the line to stand by itself, we could specify that it is a
        paragraph by enclosing it in paragraph tags:
      </Paragraph>
    </div>
  </div>
);

const Paragraph = ({ children }) => <p className="text-md">{children}</p>;
const Title = ({ children }) => (
  <p className="font-semibold text-3xl">{children}</p>
);
const SampleCode = ({ children }) => (
  <div className="w-full bg-zinc-800 text-zinc-200 tracking-wide grid place-items-start p-4 text-center rounded">
    {children}
  </div>
);

const Code = ({ children }) => <code className="text-sm">{children}</code>;

export default BasicLevelHTML;
