import React from "react";
import Navbar from "../components/Navbar";
import { CircularProgress, Tab } from "@nextui-org/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import OutlineImage from "../assets/outline-js.png";
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
export default function BasicJS() {
  return (
    <div className="w-full space-y-16 mb-10 p-5 md:p-0">
      <Navbar />
      <Header />
      <CourseOutline />

      <Content />
    </div>
  );
}

const Header = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="w-full flex gap-4">
        <div className="basis-1/2 flex flex-col gap-6">
          <h1 className="text-5xl font-black">
            Learn the basics of JavaScript{" "}
          </h1>
          <p className="mt-3 text-md text-zinc-600">
            Learn the basics of JavaScript to add interactivity and dynamic
            behavior to your web pages.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-5 self-start gap-4 py-3 px-10 bg-yellow-300 border border-black text-black text-sm font-bold shadow-[-4px_4px_0px_black] hover:translate-y-[-4px] hover:shadow-[-6px_6px_0px_black] duration-300 outline-none"
          >
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
    <div className="size-[280px] bg-yellow-100 border border-black text-black shadow-[-8px_8px_0px_black] grid place-items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-sm font-black">Learning Progress</h1>
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-yellow-500",
            track: "stroke-black",
            value: "text-3xl font-black text-black",
          }}
          value={progress}
          strokeWidth={4}
          showValueLabel={true}
        />

        <div className="self-center w-full px-3 py-2 border border-dashed border-black grid place-items-center">
          <h1 className="text-xs font-bold">Keep Learning! 🐈</h1>
        </div>
      </div>
    </div>
  );
};

const CourseOutline = () => {
  const outline = [
    "So what is JavaScript",
    "A Hello world! example",
    "Language Basics crash course",
    "Supercharging your example website",
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
          <h1 className="text-xl font-black">Learning Outline</h1>
          <p className="text-sm font-medium">
            Introduction to HTML structure, elements, attributes, and basic tags
            usage.
          </p>
        </div>

        <ul className="mt-8 flex flex-col gap-4">
          {outline.map((item, idx) => (
            <li
              key={idx}
              className="list-inside list-disc font-bold underline underline-offset-4"
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
        <Topic>JavaScript basics</Topic>
        <Description>
          JavaScript is a programming language that adds interactivity to your
          website. This happens in games, in the behavior of responses when
          buttons are pressed or with data entry on forms; with dynamic styling;
          with animation, etc. This article helps you get started with
          JavaScript and furthers your understanding of what is possible.
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
      <Title>What is JavaScript?</Title>
      <Description>
        JavaScript is a powerful programming language that can add interactivity
        to a website. It was invented by Brendan Eich.
      </Description>

      <Description>
        JavaScript is versatile and beginner-friendly. With more experience,
        you'll be able to create games, animated 2D and 3D graphics,
        comprehensive database-driven apps, and much more!
      </Description>

      <Description>
        JavaScript itself is relatively compact, yet very flexible. Developers
        have written a variety of tools on top of the core JavaScript language,
        unlocking a vast amount of functionality with minimum effort. These
        include:
      </Description>

      <List
        items={[
          `Browser Application Programming Interfaces (APIs) built into web browsers, providing functionality such as dynamically creating HTML and setting CSS styles; collecting and manipulating a video stream from a user's webcam, or generating 3D graphics and audio samples.`,
          `Third-party APIs that allow developers to incorporate functionality in sites from other content providers, such as Disqus or Facebook.`,
          `Third-party frameworks and libraries that you can apply to HTML to accelerate the work of building sites and applications.`,
        ]}
      />

      <Description>
        It's outside the scope of this article—as a light introduction to
        JavaScript—to present the details of how the core JavaScript language is
        different from the tools listed above. You can learn more in MDN's
        JavaScript learning area, as well as in other parts of MDN.
      </Description>

      <Description>
        The section below introduces some aspects of the core language and
        offers an opportunity to play with a few browser API features too. Have
        fun!
      </Description>

      <Title>A "Hello world!" example</Title>

      <Description>
        JavaScript is one of the most popular modern web technologies! As your
        JavaScript skills grow, your websites will enter a new dimension of
        power and creativity.
      </Description>

      <Description>
        However, getting comfortable with JavaScript is more challenging than
        getting comfortable with HTML and CSS. You may have to start small, and
        progress gradually. To begin, let's examine how to add JavaScript to
        your page for creating a Hello world! example. (Hello world! is the
        standard for introductory programming examples.)
      </Description>

      <List
        items={[
          `Go to your test site and create a new folder named scripts. Within the scripts folder, create a new text document called main.js, and save it.`,
          `In your index.html file, enter this code on a new line, just before the closing </body> tag:`,
        ]}
      />

      <Code
        code={`<script src="scripts/main.js"></script>
`}
      />

      <List
        items={[
          `This is doing the same job as the <link> element for CSS. It applies the JavaScript to the page, so it can have an effect on the HTML (along with the CSS, and anything else on the page).Add this code to the scripts/main.js file:`,
        ]}
      />

      <Code
        code={`const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";
`}
      />

      <List
        items={[
          `Make sure the HTML and JavaScript files are saved. Then load index.html in your browser. You should see something like this:`,
        ]}
      />

      <Image image="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics/hello-world.png" />

      <Note>
        {`Note: The reason the instructions (above) place the <script> element near the bottom of the HTML file is that the browser reads code in the order it appears in the file.

If the JavaScript loads first and it is supposed to affect the HTML that hasn't loaded yet, there could be problems. Placing JavaScript near the bottom of an HTML page is one way to accommodate this dependency. To learn more about alternative approaches, see Script loading strategies.`}
      </Note>

      <Title>What happened?</Title>
      <Description>
        The heading text changed to Hello world! using JavaScript. You did this
        by using a function called querySelector() to grab a reference to your
        heading, and then store it in a variable called myHeading. This is
        similar to what we did using CSS selectors. When you want to do
        something to an element, you need to select it first.
      </Description>

      <Description>
        Following that, the code set the value of the myHeading variable's
        textContent property (which represents the content of the heading) to
        Hello world!.
      </Description>

      <Note>
        Note: Both of the features you used in this exercise are parts of the
        Document Object Model (DOM) API, which has the capability to manipulate
        documents.
      </Note>
    </div>
  );
};
const Topic2 = () => {
  return (
    <div className="space-y-6 bg-zinc-50 border-2 border-dashed border-zinc-900 p-5">
      <Topic>Language basics crash course</Topic>

      <Description>
        To give you a better understanding of how JavaScript works, let's
        explain some of the core features of the language. It's worth noting
        that these features are common to all programming languages. If you
        master these fundamentals, you have a head start on coding in other
        languages too!
      </Description>

      <Title>Variables</Title>

      <Description>
        Variables are containers that store values. You start by declaring a
        variable with the let keyword, followed by the name you give to the
        variable:
      </Description>

      <Code
        code={`let myVariable;
`}
      />

      <Description>
        A semicolon at the end of a line indicates where a statement ends. It is
        only required when you need to separate statements on a single line.
        However, some people believe it's good practice to have semicolons at
        the end of each statement. There are other rules for when you should and
        shouldn't use semicolons. For more details, see Your Guide to Semicolons
        in JavaScript.
      </Description>

      <Description>
        You can name a variable nearly anything, but there are some
        restrictions. (See this section about naming rules.) If you are unsure,
        you can check your variable name to see if it's valid.
      </Description>

      <Description>
        JavaScript is case sensitive. This means myVariable is not the same as
        myvariable. If you have problems in your code, check the case!
      </Description>

      <Description>
        After declaring a variable, you can give it a value:
      </Description>

      <Code
        code={`myVariable = "Bob";
`}
      />

      <Description>
        Also, you can do both these operations on the same line:
      </Description>

      <Code
        code={`let myVariable = "Bob";
`}
      />

      <Description>
        You retrieve the value by calling the variable name:
      </Description>

      <Code
        code={`myVariable;
`}
      />

      <Description>
        After assigning a value to a variable, you can change it later in the
        code:
      </Description>

      <Code
        code={`let myVariable = "Bob";
myVariable = "Steve";
`}
      />

      <Description>
        Note that variables may hold values that have different data types:
      </Description>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Variable</TableColumn>
          <TableColumn>Explanation</TableColumn>
          <TableColumn>Example</TableColumn>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>String</TableCell>
            <TableCell>
              This is a sequence of text known as a string. To signify that the
              value is a string, enclose it in single or double quote marks.
            </TableCell>
            <TableCell>{`let myVariable = 'Bob'; or
let myVariable = "Bob";`}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>
              This is a number. Numbers don't have quotes around them.
            </TableCell>
            <TableCell>{`let myVariable = 10;`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Boolean</TableCell>
            <TableCell>
              This is a True/False value. The words true and false are special
              keywords that don't need quote marks.
            </TableCell>
            <TableCell>{`let myVariable = true;`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Array</TableCell>
            <TableCell>
              {" "}
              This is a structure that allows you to store multiple values in a
              single reference.
            </TableCell>
            <TableCell>{`let myVariable = [1,'Bob','Steve',10];
Refer to each member of the array like this:
myVariable[0], myVariable[1], etc.`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Object</TableCell>
            <TableCell>
              This can be anything. Everything in JavaScript is an object and
              can be stored in a variable. Keep this in mind as you learn.
            </TableCell>
            <TableCell>{`let myVariable = document.querySelector('h1');
All of the above examples too.`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Description>
        So why do we need variables? Variables are necessary to do anything
        interesting in programming. If values couldn't change, then you couldn't
        do anything dynamic, like personalize a greeting message or change an
        image displayed in an image gallery.
      </Description>

      <Title>Comments</Title>
      <Description>
        Comments are snippets of text that can be added along with code. The
        browser ignores text marked as comments. You can write comments in
        JavaScript just as you can in CSS:
      </Description>

      <Code
        code={`/*
Everything in between is a comment.
*/
`}
      />

      <Description>
        If your comment contains no line breaks, it's an option to put it behind
        two slashes like this:
      </Description>

      <Code
        code={`// This is a comment
`}
      />

      <Title>Operators</Title>
      <Description>
        An operator is a mathematical symbol that produces a result based on two
        values (or variables). In the following table, you can see some of the
        simplest operators, along with some examples to try in the JavaScript
        console.
      </Description>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Operator</TableColumn>
          <TableColumn>Explanation</TableColumn>
          <TableColumn>Symbol(s)</TableColumn>
          <TableColumn>Example</TableColumn>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Addition</TableCell>
            <TableCell>
              This is a sequence of text known as a string. To signify that the
              value is a string, enclose it in single or double quote marks.
            </TableCell>
            <TableCell>{`+`}</TableCell>
            <TableCell>{`6 + 9;
'Hello ' + 'world!';`}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Subtraction, Multiplication, Division</TableCell>
            <TableCell>
              These do what you'd expect them to do in basic math.
            </TableCell>
            <TableCell>{`-, *, /`}</TableCell>
            <TableCell>{`	9 - 3;
8 * 2; // multiply in JS is an asterisk
9 / 3;`}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell>
              As you've seen already: this assigns a value to a variable.
            </TableCell>
            <TableCell>{`=`}</TableCell>
            <TableCell>{`let myVariable = 'Bob';`}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Strict equality</TableCell>
            <TableCell>
              This performs a test to see if two values are equal and of the
              same data type. It returns a true/false (Boolean) result.
            </TableCell>
            <TableCell>{`===`}</TableCell>
            <TableCell>{`let myVariable = 3;
myVariable === 4;`}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Not, Does-not-equal</TableCell>
            <TableCell>{`This returns the logically opposite value of what it precedes. It turns a true into a false, etc.. When it is used alongside the Equality operator, the negation operator tests whether two values are not equal.`}</TableCell>
            <TableCell>{`!, !==`}</TableCell>
            <TableCell>{`For "Not", the basic expression is true, but the comparison returns false because we negate it:

let myVariable = 3;
!(myVariable === 3);

"Does-not-equal" gives basically the same result with different syntax. Here we are testing "is myVariable NOT equal to 3". This returns false because myVariable IS equal to 3:`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Description>
        There are a lot more operators to explore, but this is enough for now.
        See Expressions and operators for a complete list.
      </Description>

      <Note>
        Note: Mixing data types can lead to some strange results when performing
        calculations. Be careful that you are referring to your variables
        correctly, and getting the results you expect. For example, enter '35' +
        '25' into your console. Why don't you get the result you expected?
        Because the quote marks turn the numbers into strings, so you've ended
        up concatenating strings rather than adding numbers. If you enter 35 +
        25 you'll get the total of the two numbers.
      </Note>
      <Title>Conditionals</Title>

      <Description>
        Conditionals are code structures used to test if an expression returns
        true or not. A very common form of conditionals is the if...else
        statement. For example:
      </Description>

      <Code
        code={`let iceCream = "chocolate";
if (iceCream === "chocolate") {
  alert("Yay, I love chocolate ice cream!");
} else {
  alert("Awwww, but chocolate is my favorite…");
}
`}
      />

      <Description>
        The expression inside the if () is the test. This uses the strict
        equality operator (as described above) to compare the variable iceCream
        with the string chocolate to see if the two are equal. If this
        comparison returns true, the first block of code runs. If the comparison
        is not true, the second block of code—after the else statement—runs
        instead.
      </Description>

      <Title>Functions</Title>

      <Description>
        Functions are a way of packaging functionality that you wish to reuse.
        It's possible to define a body of code as a function that executes when
        you call the function name in your code. This is a good alternative to
        repeatedly writing the same code. You have already seen some uses of
        functions. For example:
      </Description>

      <Code
        code={`let myVariable = document.querySelector("h1");
`}
      />

      <Code
        code={`alert("hello!");
`}
      />

      <Description>
        These functions, document.querySelector and alert, are built into the
        browser.
      </Description>

      <Description>
        If you see something which looks like a variable name, but it's followed
        by parentheses— () —it is likely a function. Functions often take
        arguments: bits of data they need to do their job. Arguments go inside
        the parentheses, separated by commas if there is more than one argument.
      </Description>

      <Description>
        For example, the alert() function makes a pop-up box appear inside the
        browser window, but we need to give it a string as an argument to tell
        the function what message to display.
      </Description>

      <Description>
        You can also define your own functions. In the next example, we create a
        simple function which takes two numbers as arguments and multiplies
        them:
      </Description>

      <Code
        code={`function multiply(num1, num2) {
  let result = num1 * num2;
  return result;
}
`}
      />

      <Description>
        Try running this in the console; then test with several arguments. For
        example:
      </Description>

      <Code
        code={`multiply(4, 7);
multiply(20, 20);
multiply(0.5, 3);
`}
      />

      <Note>
        Note: The return statement tells the browser to return the result
        variable out of the function so it is available to use. This is
        necessary because variables defined inside functions are only available
        inside those functions. This is called variable scoping. (Read more
        about variable scoping.)
      </Note>
    </div>
  );
};
const Topic3 = () => {
  return <div></div>;
};
