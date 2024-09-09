import React from "react";
import Navbar from "../components/Navbar";
import { CircularProgress } from "@nextui-org/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import OutlineImage from "../assets/outline-image.png";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Topic,
  Description,
  Title,
  Code,
  Example,
  Image,
  List,
  Text,
  Note,
} from "../layout/UILayout";

export default function BasicHTML() {
  return (
    <>
      <div className="w-full space-y-16 mb-10 p-5 md:p-0">
        <Navbar />
        <Header />
        <CourseOutline />
        <Content />
      </div>
    </>
  );
}

const Header = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="w-full flex gap-4">
        <div className="basis-1/2 flex flex-col gap-6">
          <h1 className="text-5xl font-semibold">Learn the basics of HTML </h1>
          <p className="text-md font-semibold text-zinc-600">
            Begin with the basics by learning HTML — a crucial foundation for
            creating and editing web pages.
          </p>

          <button className="mt-10 self-start gap-4 py-3 px-10 bg-orange-700 text-white text-sm font-semibold shadow-[-4px_4px_0px_black] hover:translate-y-[-4px] hover:shadow-[-6px_6px_0px_black] duration-300 outline-none">
            Get Started
          </button>
        </div>

        <div className="basis-1/2 flex justify-end items-center">
          <ProgressCard />
        </div>
      </div>
    </div>
  );
};

const ProgressCard = () => {
  const [progress, setProgress] = useState(10);
  return (
    <div className="size-[280px] bg-orange-100 text-black border border-black shadow-[-8px_8px_0px_black] grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-sm font-semibold">Learning Progress</h1>
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-orange-500",
            track: "stroke-black",
            value: "text-3xl font-semibold text-black",
          }}
          value={progress}
          strokeWidth={4}
          showValueLabel={true}
        />

        <div className="self-center w-full px-3 py-2 border border-dashed border-black grid place-items-center">
          <h1 className="text-xs font-semibold">Keep Learning! 🐈</h1>
        </div>
      </div>
    </div>
  );
};

const CourseOutline = () => {
  const outline = [
    "So what is HTML",
    "HTML Images",
    "Marking Up Text",
    "Links",
    "Conclusion",
  ];
  return (
    <div className="w-full max-w-screen-lg mx-auto p-5 border-2 border-dashed border-zinc-700 bg-zinc-50 relative">
      <div className="absolute top-2 right-2 size-10  border border-zinc-700 grid place-items-center shadow-[-4px_4px_0px_black]">
        <IoMdCheckboxOutline className="text-zinc-900" size={25} />
      </div>

      <img
        src={OutlineImage}
        alt=""
        className="w-60 absolute right-0 bottom-0 "
      />
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Learning Outline</h1>
          <p className="text-sm font-medium">
            Introduction to HTML structure, elements, attributes, and basic tags
            usage.
          </p>
        </div>

        <ul className="mt-8 flex flex-col gap-4">
          {outline.map((item, idx) => (
            <li
              key={idx}
              className="list-inside list-disc font-semibold underline underline-offset-4"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col space-y-6">
        <Topic>HTML BASICS</Topic>
        <Description>
          HTML (HyperText Markup Language) is the code that is used to structure
          a web page and its content. For example, content could be structured
          within a set of paragraphs, a list of bulleted points, or using images
          and data tables. As the title suggests, this article will give you a
          basic understanding of HTML and its functions.
        </Description>

        <Topic1 />
        <Topic2 />
        <Topic3 />
        <Topic4 />
      </div>
    </div>
  );
};

const Topic1 = () => {
  const [error, setError] = useState(false);
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>So what is HTML?</Title>
      <Description>
        HTML is a markup language that defines the structure of your content.
        HTML consists of a series of elements, which you use to enclose, or
        wrap, different parts of the content to make it appear a certain way, or
        act a certain way. The enclosing tags can make a word or image hyperlink
        to somewhere else, can italicize words, can make the font bigger or
        smaller, and so on. For example, take the following line of content:
      </Description>
      <Example text="My cat is very grumpy"></Example>
      <Description>
        If we wanted the line to stand by itself, we could specify that it is a
        paragraph by enclosing it in paragraph tags:
      </Description>
      <Code code="<p>My cat is very grumpy</p>" language="htmlbars"></Code>
      <Title>Anatomy of an HTML element</Title>
      <Description>
        Let's explore this paragraph element a bit further.
      </Description>
      <Image
        image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics/grumpy-cat-small.png"
        height={280}
      />
      <List
        title="The main parts of our element are as follows"
        items={[
          "The opening tag: This consists of the name of the element (in this case, p), wrapped in opening and closing angle brackets. This states where the element begins or starts to take effect — in this case where the paragraph begins.",
          "The closing tag: This is the same as the opening tag, except that it includes a forward slash before the element name. This states where the element ends — in this case where the paragraph ends. Failing to add a closing tag is one of the standard beginner errors and can lead to strange results.",
          "The content: This is the content of the element, which in this case, is just text.",
          "The element: The opening tag, the closing tag, and the content together comprise the element.",
        ]}
      />
      <Description>
        Elements can also have attributes that look like the following:
      </Description>
      <Image image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics/grumpy-cat-attribute-small.png" />
      <Description>
        Attributes contain extra information about the element that you don't
        want to appear in the actual content. Here, class is the attribute name
        and editor-note is the attribute value. The class attribute allows you
        to give the element a non-unique identifier that can be used to target
        it (and any other elements with the same class value) with style
        information and other things. Some attributes have no value, such as
        required.
      </Description>
      <List
        title="Attributes that set a value always have:"
        items={[
          "A space between it and the element name (or the previous attribute, if the element already has one or more attributes).",
          "The attribute name followed by an equal sign.",
          "The attribute value wrapped by opening and closing quotation marks.",
        ]}
      />
      <Note>
        {
          "HTML elements are case sensitive. The letter 'p' is not the same as the letter 'P'."
        }
      </Note>
      <Title>Nesting elements</Title>
      <Description>
        {`You can put elements inside other elements too — this is called nesting. If we wanted to state that our cat is very grumpy, we could wrap the word "very" in a <strong> element, which means that the word is to be strongly emphasized:`}
      </Description>
      <Code code={`<p>My cat is <strong>very</strong> grumpy.</p>`} />
      <Description>
        {`You do however need to make sure that your elements are properly nested. In the example above, we opened the <p> element first, then the <strong> element; therefore, we have to close the <strong> element first, then the <p> element. The following is incorrect:`}
      </Description>
      <Code
        code={`<p>My cat is <strong>very grumpy.</p></strong>`}
        error={!error}
      />
      <Description>
        The elements have to open and close correctly so that they are clearly
        inside or outside one another. If they overlap as shown above, then your
        web browser will try to make the best guess at what you were trying to
        say, which can lead to unexpected results. So don't do it!
      </Description>
      <Title>Void elements</Title>
      <Description>
        {`Some elements have no content and are called void elements. Take the <img> element that we already have in our HTML page:`}
      </Description>
      <Code code={`<img src="images/firefox-icon.png" alt="My test image"/>`} />
      <Description>
        {`This contains two attributes, but there is no closing </img> tag and no inner content. This is because an image element doesn't wrap content to affect it. Its purpose is to embed an image in the HTML page in the place it appears.`}
      </Description>
      <Title>Anatomy of an HTML document</Title>
      <Description>
        {`That wraps up the basics of individual HTML elements, but they aren't handy on their own. Now we'll look at how individual elements are combined to form an entire HTML page. Let's revisit the code we put into our index.html example (which we first met in the Dealing with files article):`}
      </Description>
      <Code
        code={`
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
      `}
      />
      <List
        title={"Here, we have the following:"}
        items={[
          `<!doctype html> — doctype. It is a required preamble. In the mists of time, when HTML was young (around 1991/92), doctypes were meant to act as links to a set of rules that the HTML page had to follow to be considered good HTML, which could mean automatic error checking and other useful things. However, these days, they don't do much and are basically just needed to make sure your document behaves correctly. That's all you need to know for now.`,
          `<html></html> — the <html> element. This element wraps all the content on the entire page and is sometimes known as the root element. It also includes the lang attribute, setting the primary language of the document.`,
          `<head></head> — the <head> element. This element acts as a container for all the stuff you want to include on the HTML page that isn't the content you are showing to your page's viewers. This includes things like keywords and a page description that you want to appear in search results, CSS to style our content, character set declarations, and more.`,
          `<meta charset="utf-8"> — This element sets the character set your document should use to UTF-8 which includes most characters from the vast majority of written languages. Essentially, it can now handle any textual content you might put on it. There is no reason not to set this, and it can help avoid some problems later on.`,
          `<meta name="viewport" content="width=device-width"> — This viewport element ensures the page renders at the width of viewport, preventing mobile browsers from rendering pages wider than the viewport and then shrinking them down.`,
          `<title></title> — the <title> element. This sets the title of your page, which is the title that appears in the browser tab the page is loaded in. It is also used to describe the page when you bookmark/favorite it.`,
          `<body></body> — the <body> element. This contains all the content that you want to show to web users when they visit your page, whether that's text, images, videos, games, playable audio tracks, or whatever else.`,
        ]}
      />

      <div className="w-full flex justify-end p-5">
        <Link
          to="/"
          className="underline underline-offset-8 flex items-center gap-2 font-semibold"
        >
          Quiz on What is HTML 👉
        </Link>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>Marking up text</Title>
      <Description>
        This section will cover some essential HTML elements you'll use for
        marking up the text.
      </Description>
      <Title>Headings</Title>
      <Description>
        {`Heading elements allow you to specify that certain parts of your content are headings — or subheadings. In the same way that a book has the main title, chapter titles, and subtitles, an HTML document can too. HTML contains 6 heading levels, <h1> - <h6>, although you'll commonly only use 3 to 4 at most:`}
      </Description>
      <Code
        code={`<!-- 4 heading levels: -->
<h1>My main title</h1>
<h2>My top level heading</h2>
<h3>My subheading</h3>
<h4>My sub-subheading</h4>
`}
      />
      <Note>
        {`Anything in HTML between <!-- and --> is an HTML comment. The browser ignores comments as it renders the code. In other words, they are not visible on the page - just in the code. HTML comments are a way for you to write helpful notes about your code or logic.`}
      </Note>
      <Description>
        {`Now try adding a suitable title to your HTML page just above your <img> element.`}
      </Description>
      <Note>
        {`You'll see that your heading level 1 has an implicit style. Don't use heading elements to make text bigger or bold, because they are used for accessibility and other reasons such as SEO. Try to create a meaningful sequence of headings on your pages, without skipping levels.`}
      </Note>
      <Title>{"Paragraphs"}</Title>
      <Description>
        {`As explained above, <p> elements are for containing paragraphs of text; you'll use these frequently when marking up regular text content:`}
      </Description>
      <Code code={`<p>This is a single paragraph</p>`} />
      <Description>
        {`Add your sample text (you should have it from What will your website look like?) into one or a few paragraphs, placed directly below your <img> element.`}
      </Description>
      <Title>Lists</Title>
      <Description>
        A lot of the web's content is lists and HTML has special elements for
        these. Marking up lists always consists of at least 2 elements. The most
        common list types are ordered and unordered lists:
      </Description>
      <List
        items={[
          `Unordered lists are for lists where the order of the items doesn't matter, such as a shopping list. These are wrapped in a <ul> element.`,
          `Ordered lists are for lists where the order of the items does matter, such as a recipe. These are wrapped in an <ol> element.`,
        ]}
      />
      <Description>
        {`Each item inside the lists is put inside an <li> (list item) element.`}
      </Description>
      <Description>
        For example, if we wanted to turn the part of the following paragraph
        fragment into a list
      </Description>
      <Code
        code={`<p>
  At Mozilla, we're a global community of technologists, thinkers, and builders
  working together…
</p>
`}
      />
      <Description>We could modify the markup to this</Description>
      <Code
        code={`<p>At Mozilla, we're a global community of</p>

<ul>
  <li>technologists</li>
  <li>thinkers</li>
  <li>builders</li>
</ul>

<p>working together…</p>
`}
      />
      <div className="w-full flex justify-end p-5">
        <Link
          to="/"
          className="underline underline-offset-8 flex items-center gap-2 font-semibold"
        >
          Quiz on Marking Up Text 👉
        </Link>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>Images</Title>
      <Description>
        {`Let's turn our attention to the <img> element again:`}
      </Description>
      <Code
        code={`<img src="images/firefox-icon.png" alt="My test image" />`}
      />
      <Description>
        As we said before, it embeds an image into our page in the position it
        appears. It does this via the src (source) attribute, which contains the
        path to our image file.
      </Description>
      <Description>
        We have also included an alt (alternative) attribute. In the alt
        attribute, you specify descriptive text for users who cannot see the
        image, possibly because of the following reasons:
      </Description>
      <List
        items={[
          "They are visually impaired. Users with significant visual impairments often use tools called screen readers to read out the alt text to them.",
          "Something has gone wrong causing the image not to display. For example, try deliberately changing the path inside your src attribute to make it incorrect. If you save and reload the page, you should see something like this in place of the image:",
        ]}
      />
      <Description>
        The keywords for alt text are "descriptive text". The alt text you write
        should provide the reader with enough information to have a good idea of
        what the image conveys. In this example, our current text of "My test
        image" is no good at all. A much better alternative for our Firefox logo
        would be "The Firefox logo: a flaming fox surrounding the Earth."
      </Description>
      <Description>
        Try coming up with some better alt text for your image now.
      </Description>
      <Note>
        Find out more about accessibility in our accessibility learning module.
      </Note>

      <Description>
        Try adding an ordered or unordered list to your example page.
      </Description>

      <div className="w-full flex justify-end p-5">
        <Link
          to="/"
          className="underline underline-offset-8 flex items-center gap-2 font-semibold"
        >
          Quiz on Images 👉
        </Link>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>Links</Title>
      <Description>
        {`Links are very important — they are what makes the web a web! To add a link, we need to use a simple element — <a> — "a" being the short form for "anchor". To make text within your paragraph into a link, follow these steps:`}
      </Description>
      <List
        items={[
          `Choose some text. We chose the text "Mozilla Manifesto".`,
          `Wrap the text in an <a> element, as shown below :`,
        ]}
      />
      <Code code={`<a>Mozilla Manifesto</a>`} />
      <List
        items={[`Give the <a> element an href attribute, as shown below:`]}
      />
      <Code code={`<a href="">Mozilla Manifesto</a>`} />
      <List
        items={[
          `Fill in the value of this attribute with the web address that you want the link to point to:`,
        ]}
      />

      <Code
        code={`<a href="https://www.mozilla.org/en-US/about/manifesto/">
  Mozilla Manifesto</a>`}
      />
      <Description>
        {`You might get unexpected results if you omit the https:// or http:// part, called the protocol, at the beginning of the web address. After making a link, click it to make sure it is sending you where you wanted it to.`}
      </Description>

      <Note>
        {`href might appear like a rather obscure choice for an attribute name at first. If you are having trouble remembering it, remember that it stands for hypertext reference.`}
      </Note>
      <Text>
        Add a link to your page now, if you haven't already done so.😎
      </Text>

      <div className="w-full flex justify-end p-5">
        <Link
          to="/"
          className="underline underline-offset-8 flex items-center gap-2 font-semibold"
        >
          Quiz on Links 👉
        </Link>
      </div>
    </div>
  );
};
