import React from "react";
import Navbar from "../components/Navbar";
import { CircularProgress } from "@nextui-org/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import OutlineImage from "../assets/outline-css.png";
import { useState } from "react";
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
  ListItem,
} from "../layout/UILayout";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Link } from "react-router-dom";

export default function BasicCSS() {
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
          <h1 className="text-5xl font-medium">Learn the basics of CSS </h1>
          <p className="mt-3 text-md text-zinc-600">
            Learn the basics of CSS to style and enhance the appearance of your
            web pages.
          </p>

          <button className="mt-5 self-start gap-4 py-3 px-10 bg-sky-700 text-white text-sm font-semibold shadow-[-4px_4px_0px_black] hover:translate-y-[-4px] hover:shadow-[-6px_6px_0px_black] duration-300 outline-none">
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
  const [progress, setProgress] = useState(20);
  return (
    <div className="size-[280px] bg-sky-100 border border-black text-black shadow-[-8px_8px_0px_black] grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-sm font-semibold">Learning Progress</h1>
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-sky-500",
            track: "stroke-black",
            value: "text-3xl font-extrabold text-black",
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
    "What is CSS",
    "Fonts and Text",
    "CSS: all about boxes",
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
        className="w-40 md:w-60 absolute right-0 bottom-0 "
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
        <Topic>CSS basics</Topic>
        <Description>
          CSS (Cascading Style Sheets) is the code that styles web content. CSS
          basics walks through what you need to get started. We'll answer
          questions like: How do I make text red? How do I make content display
          at a certain location in the (webpage) layout? How do I decorate my
          webpage with background images and colors?
        </Description>

        <Topic1 />
        <Topic2 />

        <Topic3 />
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>What is CSS?</Title>
      <Description>
        Like HTML, CSS is not a programming language. It's not a markup language
        either. CSS is a style sheet language. CSS is what you use to
        selectively style HTML elements. For example, this CSS selects paragraph
        text, setting the color to red:
      </Description>

      <Code
        code={`p {
  color: red;
}
`}
      />

      <Description>
        Let's try it out! Using a text editor, paste the three lines of CSS
        (above) into a new file. Save the file as style.css in a directory named
        styles.
      </Description>

      <Description>
        To make the code work, we still need to apply this CSS (above) to your
        HTML document. Otherwise, the styling won't change the appearance of the
        HTML. (If you haven't been following our project, pause here to read
        Dealing with files and HTML basics.)
      </Description>

      <List
        items={[
          `Open your index.html file. Paste the following line in the head (between the <head> and </head> tags):`,
        ]}
      />

      <Code
        code={`<link href="styles/style.css" rel="stylesheet" />
`}
      />

      <List
        items={[
          `Save index.html and load it in your browser. You should see something like this:`,
        ]}
      />

      <Image
        image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/website-screenshot-styled.png"
        height={400}
      />

      <Description>
        If your paragraph text is red, congratulations! Your CSS is working.
      </Description>

      <Title>Anatomy of a CSS ruleset</Title>
      <Description>
        Let's dissect the CSS code for red paragraph text to understand how it
        works:
      </Description>
      <Image
        image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/css-declaration-small.png"
        height={300}
      />

      <Description>
        The whole structure is called a ruleset. (The term ruleset is often
        referred to as just rule.) Note the names of the individual parts:
      </Description>
      <ListItem
        title="Selector"
        text="This is the HTML element name at the start of the ruleset. It defines the element(s) to be styled (in this example, &lt;p&gt; elements). To style a different element, change the selector."
      />

      <ListItem
        title="Declaration"
        text="This is a single rule like color: red;. It specifies which of the element's properties you want to style."
      />

      <ListItem
        title="Properties"
        text={`These are ways in which you can style an HTML element. (In this example, color is a property of the <p> elements.) In CSS, you choose which properties you want to affect in the rule.`}
      />
      <ListItem
        title="Property value"
        text={`To the right of the property—after the colon—there is the property value. This chooses one out of many possible appearances for a given property. (For example, there are many color values in addition to red.)`}
      />

      <List
        title={`Note the other important parts of the syntax:`}
        items={[
          `Apart from the selector, each ruleset must be wrapped in curly braces. ({})`,
          `Within each declaration, you must use a colon (:) to separate the property from its value or values.`,
          `Within each ruleset, you must use a semicolon (;) to separate each declaration from the next one.`,
        ]}
      />

      <Description>
        To modify multiple property values in one ruleset, write them separated
        by semicolons, like this:
      </Description>

      <Code
        code={`p {
  color: red;
  width: 500px;
  border: 1px solid black;
}
`}
      />

      <Title>Selecting multiple elements</Title>
      <Description>
        You can also select multiple elements and apply a single ruleset to all
        of them. Separate multiple selectors by commas. For example:
      </Description>

      <Code
        code={`p,
li,
h1 {
  color: red;
}
`}
      />

      <Title>Different types of selectors</Title>
      <Description>
        There are many different types of selectors. The examples above use
        element selectors, which select all elements of a given type. But we can
        make more specific selections as well. Here are some of the more common
        types of selectors:
      </Description>

      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Selector Name</TableColumn>
            <TableColumn>What does it select</TableColumn>
            <TableColumn>Example</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                Element selector (sometimes called a tag or type selector)
              </TableCell>
              <TableCell>All HTML elements of the specified type.</TableCell>
              <TableCell>{`p
selects <p>`}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>ID selector</TableCell>
              <TableCell>
                The element on the page with the specified ID. On a given HTML
                page, each id value should be unique.
              </TableCell>
              <TableCell>{`#my-id
selects <p id="my-id"> or <a id="my-id">`}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Class selector</TableCell>
              <TableCell>
                The element(s) on the page with the specified class. Multiple
                instances of the same class can appear on a page.
              </TableCell>
              <TableCell>{`.my-class
selects <p class="my-class"> and <a class="my-class">`}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Attribute selector</TableCell>
              <TableCell>
                The element(s) on the page with the specified attribute.
              </TableCell>
              <TableCell>{`img[src]
selects <img src="myimage.png"> but not <img>`}</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>Pseudo-class selector</TableCell>
              <TableCell>
                The specified element(s), but only when in the specified state.
                (For example, when a cursor hovers over a link.)
              </TableCell>
              <TableCell>{`a:hover
selects <a>, but only when the mouse pointer is hovering over the link.`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Description>
          There are many more selectors to discover. To learn more, see the MDN
          Selectors guide.
        </Description>
        <div className="w-full flex justify-end p-5">
          <Link
            to="/css-quiz/topic1"
            className="underline underline-offset-8 flex items-center gap-2 font-semibold"
          >
            Quiz on What is CSS 👉
          </Link>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>Fonts and text</Title>
      <Description>
        Now that we've explored some CSS fundamentals, let's improve the
        appearance of the example by adding more rules and information to the
        style.css file.
      </Description>

      <List
        items={[
          `First, find the output from Google Fonts that you previously saved from What will your website look like?. Add the <link> element somewhere inside your index.html's head (anywhere between the <head> and </head> tags). It looks something like this:`,
        ]}
      />

      <Code
        code={`<link
  href="https://fonts.googleapis.com/css?family=Open+Sans"
  rel="stylesheet" />`}
      />

      <Description>
        This code links your page to a style sheet that loads the Open Sans font
        family with your webpage.
      </Description>

      <List
        items={[
          `Next, delete the existing rule you have in your style.css file. It was a good test, but let's not continue with lots of red text.`,
          `Add the following lines (shown below), replacing the font-family assignment with your font-family selection from What will your website look like?. The property font-family refers to the font(s) you want to use for text. This rule defines a global base font and font size for the whole page. Since <html> is the parent element of the whole page, all elements inside it inherit the same font-size and font-family.`,
        ]}
      />

      <Code
        code={`html {
  font-size: 10px; /* px means "pixels": the base font size is now 10 pixels high */
  font-family: "Open Sans", sans-serif; /* this should be the rest of the output you got from Google Fonts */
}
`}
      />

      <Note>
        Anything in CSS between /* and */ is a CSS comment. The browser ignores
        comments as it renders the code. CSS comments are a way for you to write
        helpful notes about your code or logic.
      </Note>

      <List
        items={[
          `Now let's set font sizes for elements that will have text inside the HTML body (<h1>, <li>, and <p>). We'll also center the heading. Finally, let's expand the second ruleset (below) with settings for line height and letter spacing to make body content more readable.`,
        ]}
      />

      <Code
        code={`h1 {
  font-size: 60px;
  text-align: center;
}

p,
li {
  font-size: 16px;
  line-height: 2;
  letter-spacing: 1px;
}
`}
      />

      <Description>
        Adjust the px values as you like. Your work-in-progress should look
        similar to this:
      </Description>

      <Image image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/website-screenshot-font-small.png" />

      <div className="w-full flex justify-end p-5">
        <Link
          to="/css-quiz/topic2"
          className="underline underline-offset-8 flex items-center gap-2 font-semibold"
        >
          Quiz on Fonts and Text 👉
        </Link>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Title>CSS: all about boxes</Title>

      <Description>
        Something you'll notice about writing CSS: a lot of it is about boxes.
        This includes setting size, color, and position. Most HTML elements on
        your page can be thought of as boxes sitting on top of other boxes.
      </Description>

      <Image image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/boxes.jpg" />

      <Description>
        {`Photo from https://www.geograph.org.uk/photo/3418115 Copyright © Jim Barton cc-by-sa/2.0`}
      </Description>

      <Description>
        CSS layout is mostly based on the box model. Each box taking up space on
        your page has properties like:
      </Description>

      <List
        items={[
          `padding, the space around the content. In the example below, it is the space around the paragraph text.`,
          `border, the solid line that is just outside the padding.`,
          `margin, the space around the outside of the border.`,
        ]}
      />

      <Image
        image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/box-model.png"
        height={400}
      />

      <Description>In this section we also use:</Description>

      <List
        items={[
          `width (of an element).`,
          `background-color, the color behind an element's content and padding.`,
          `color, the color of an element's content (usually text).`,
          `text-shadow sets a drop shadow on the text inside an element.`,
          `display sets the display mode of an element. (keep reading to learn more)`,
        ]}
      />

      <Description>
        To continue, let's add more CSS. Keep adding these new rules at the
        bottom of style.css. Experiment with changing values to see what
        happens.
      </Description>

      <Title>Changing the page color</Title>

      <Code
        code={`html {
  background-color: #00539f;
}
`}
      />

      <Description>
        This rule sets a background color for the entire page. Change the color
        code to the color you chose in What will my website look like?.
      </Description>

      <Title>Styling the body</Title>
      <Code
        code={`body {
  width: 600px;
  margin: 0 auto;
  background-color: #ff9500;
  padding: 0 20px 20px 20px;
  border: 5px solid black;
}
`}
      />

      <Description>
        {`There are several declarations for the <body> element. Let's go through these line-by-line:`}
      </Description>

      <List
        items={[
          `width: 600px; This forces the body to always be 600 pixels wide.`,
          `margin: 0 auto; When you set two values on a property like margin or padding, the first value affects the element's top and bottom side (setting it to 0 in this case); the second value affects the left and right side. (Here, auto is a special value that divides the available horizontal space evenly between left and right). You can also use one, two, three, or four values, as documented in Margin Syntax.`,
          `background-color: #FF9500; This sets the element's background color. This project uses a reddish orange for the body background color, as opposed to dark blue for the <html> element. (Feel free to experiment.)`,
          ` padding: 0 20px 20px 20px; This sets four values for padding. The goal is to put some space around the content. In this example, there is no padding on the top of the body, and 20 pixels on the right, bottom and left. The values set top, right, bottom, left, in that order. As with margin, you can use one, two, three, or four values, as documented in Padding Syntax.`,
          `border: 5px solid black; This sets values for the width, style and color of the border. In this case, it's a five-pixel–wide, solid black border, on all sides of the body.`,
        ]}
      />

      <Title>Positioning and styling the main page title</Title>
      <Code
        code={`h1 {
  margin: 0;
  padding: 20px 0;
  color: #00539f;
  text-shadow: 3px 3px 1px black;
}
`}
      />

      <Description>
        You may have noticed there's a horrible gap at the top of the body. That
        happens because browsers apply default styling to the h1 element (among
        others). That might seem like a bad idea, but the intent is to provide
        basic readability for unstyled pages. To eliminate the gap, we overwrite
        the browser's default styling with the setting margin: 0;.
      </Description>

      <Description>
        Next, we set the heading's top and bottom padding to 20 pixels.
      </Description>
      <Description>
        Following that, we set the heading text to be the same color as the HTML
        background color.
      </Description>
      <Description>
        Finally, text-shadow applies a shadow to the text content of the
        element. Its four values are:
      </Description>

      <List
        items={[
          `The first pixel value sets the horizontal offset of the shadow from the text: how far it moves across.`,
          `The second pixel value sets the vertical offset of the shadow from the text: how far it moves down.`,
          `The third pixel value sets the blur radius of the shadow. A larger value produces a more fuzzy-looking shadow.`,
          `The fourth value sets the base color of the shadow.`,
        ]}
      />

      <Description>
        Try experimenting with different values to see how it changes the
        appearance.
      </Description>

      <Title>Centering the image</Title>

      <Code
        code={`img {
  display: block;
  margin: 0 auto;
}
`}
      />

      <Description>
        Next, we center the image to make it look better. We could use the
        margin: 0 auto trick again as we did for the body. But there are
        differences that require an additional setting to make the CSS work.
      </Description>

      <Description>
        {`The <body> is a block element, meaning it takes up space on the page. The margin applied to a block element will be respected by other elements on the page. In contrast, images are inline elements, for the auto margin trick to work on this image, we must give it block-level behavior using display: block;.`}
      </Description>

      <Note>
        {`Note: The instructions above assume that you're using an image smaller than the width set on the body. (600 pixels) If your image is larger, it will overflow the body, spilling into the rest of the page. To fix this, you can either: 1) reduce the image width using a graphics editor, or 2) use CSS to size the image by setting the width property on the <img> element with a smaller value.`}
      </Note>

      <Note>
        {`Note: Don't be too concerned if you don't completely understand display: block; or the differences between a block element and an inline element. It will make more sense as you continue your study of CSS. You can find more information about different display values on MDN's display reference page.`}
      </Note>

      <div className="w-full flex justify-end p-5">
        <Link
          to="/css-quiz/topic3"
          className="underline underline-offset-8 flex items-center gap-2 font-semibold"
        >
          Quiz on CSS: All about Boxes 👉
        </Link>
      </div>

      <Title>Conclusion</Title>

      <Description>
        If you followed all the instructions in this article, you should have a
        page that looks similar to this one:
      </Description>

      <Image image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/website-screenshot-final.png" />
    </div>
  );
};
