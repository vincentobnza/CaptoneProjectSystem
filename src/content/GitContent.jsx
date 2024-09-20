import React from "react";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { Code } from "../layout/UILayout";
import { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
export default function GitContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full  bg-zinc-900 text-zinc-300 p-5"
    >
      <ScrollUp />
      <div className="w-full max-w-screen-xl flex justify-between items-center mx-auto ">
        <Link
          to="/student-dashboard"
          className="flex items-center gap-3 text-xs md:text-sm font-medium md:font-semibold"
        >
          <IoReturnDownBackOutline size={30} />
          Return
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="https://git-scm.com/downloads"
            className="flex items-center gap-2 text-xs font-medium md:font-semibold py-2 px-3 border border-zinc-700 rounded-lg hover:text-white hover:border-zinc-600 transition-all duration-500"
          >
            Download GIT
          </Link>
          <Link
            to="https://www.baeldung.com/ops/git-guide"
            className="flex items-center gap-2 text-xs font-medium md:font-semibold py-2 px-3 border border-zinc-700 rounded-lg hover:text-white hover:border-zinc-600 transition-all duration-500"
          >
            <MdOutlineRoomPreferences />
            Reference
          </Link>
        </div>
      </div>

      <div className="mt-16 w-full max-w-screen-md mx-auto space-y-4">
        <Title />
        <Content
          title="Overview"
          description="In this tutorial, we’ll discuss the commands that we most frequently use when working with Git.

We’ll start with installation and configuration and then create our first local repository. Next, we’ll learn how to commit changes and synchronize them with a remote repository.

Additionally, we’ll discuss branching and also learn some advanced techniques like amending commits and manipulating the commit history."
        />
        <Content
          title="What Is Git?"
          description="Git is a version control system (VCS) that allows saving and tracking changes to files over time without overwriting previous snapshots. It helps developers collaborate on projects together.

Unlike its main competitor – SVN, Git also implements a distributed workflow system. It means that every developer working with Git has a local copy of the entire repository. Git also allows working asynchronously without a constant connection to the central repository."
        />
        <Content
          title="Git Installation"
          description="We can install Git on the most common operating systems like Windows, Mac, and Linux. In fact, on most Mac and Linux machines, Git comes installed by default.

To see if we already have Git installed, let’s open up a terminal and execute:"
        />
        <Terminal
          code={`$ git version
git version 2.24.3 (Apple Git-128)`}
        />
        <Text>
          Moreover, Git comes with built-in GUI tools for committing (git-gui)
          and browsing (gitk). There are also plenty of third-party tools or IDE
          plugins that enhance the experience.
        </Text>

        <Content
          title="git help"
          description="Before we create our first repository, let’s run the git help command. It displays useful information about Git itself:"
        />

        <Terminal
          code={`$ git help
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
...`}
        />

        <Text>
          We can also check the manual for a specific command in multiple ways:
        </Text>

        <Terminal
          code={`$ git --help init
$ git help init
$ git init --help`}
        />

        <Text>
          All the three variants above return identical output. <br /> With the
          -g option, we can also access the list of internal guides to develop
          our skills:
        </Text>

        <Terminal
          code={`$ git help -g
The common Git guides are:
   attributes          Defining attributes per path
   cli                 Git command-line interface and conventions
   core-tutorial       A Git core tutorial for developers
...
$ git help core-tutorial`}
        />

        <Text>
          To print the tutorial, we need to provide its name as a parameter.
        </Text>

        <Content
          title="git config – Configuring Git"
          description="Once we have Git installed, we can easily configure it with the gitconfig command, which allows managing options.

Git supports options at different levels like system, global, local, worktree, or file.

While the system settings are system-wide and are applied to every user and all of their repositories on the system, the global level refers to user-specific settings.

The local configuration is specific to the single repository, and it is the default level that Git uses when we don’t pass any option to the git config command.

The worktree and file levels are more advanced configuration levels, which can be applied to a single branch or file in the repository. Further, Git resolves the effective value of an option by checking the local level first and then goes until the system level if the option isn’t set.

As an example, let’s configure our username used in the commit history:"
        />

        <Terminal code={`$ git config --global user.name "Baeldung User"`} />
        <Text>
          We’ve just set our name globally. <br /> To override an option for a
          single repository, we can use the –local flag in its directory. <br />{" "}
          To print the list of effective options, we use:
        </Text>

        <Terminal
          code={`$ git config -l
user.name=Baeldung User`}
        />

        <Text>
          We can execute the git –help config command to get details about all
          the available options.
        </Text>

        <Content
          title="Creating a Repository"
          description="Next, we need to create a repository. For this, we have two alternatives –  a new repository can be either created locally from scratch, or an existing one can be cloned."
        />
        <Content
          title="git init – Initialize a New Repository"
          description="If we decide to initialize a new repository, we need to use the git init command. It turns the current directory into a Git repository and starts tracking its content:"
        />

        <Terminal
          code={`$ mkdir simple-repo; cd simple-repo; git init
Initialized empty Git repository in /simple-repo/.git/`}
        />

        <Text>
          Git also creates a hidden directory called .git in it. This directory
          stores all the objects and refs that Git creates and uses as part of
          our project’s history. Those files are created during commits and
          point to specific revisions of our files.
        </Text>

        <Text>
          After that, in most cases, we want to connect our already created
          repository with a remote one. We use the git remote command to manage
          remote links for the current repository:
        </Text>

        <Terminal
          code={`$ git remote add origin https://github.com/eugenp/tutorials.git`}
        />

        <Text>
          We’ve just added a new remote called origin and connected it to the
          official Baeldung GitHub repository.
        </Text>

        <Content
          title="git clone – Clone an External Repository"
          description="Sometimes we want to contribute to an existing repository. First, we need to download the existing repository locally."
        />

        <Text>
          The <span className="font-bold italic text-zinc-200">git clone</span>{" "}
          command clones the repository into a new directory:
        </Text>

        <Terminal
          code={`$ git clone https://github.com/eugenp/tutorials.git
Cloning into 'repo'...`}
        />

        <Text>
          Git will use those origin links to manage any further changes.
        </Text>

        <Content
          title="Git Workflow"
          description="After we have configured our local repository, we are ready to apply the first changes. But before we do that, let’s check how Git tracks those changes.

Our local repository consists of three different trees maintained by Git."
        />

        <Text>
          The first one is the{" "}
          <span className="font-bold italic text-zinc-200">
            Working Directory, which holds the actual version of files.
          </span>
        </Text>

        <Text>
          After making our changes to the files, we can move the files into
          Index, which acts as a staging area. We do this using the git add
          command.{" "}
          <span className="font-bold italic text-zinc-200">
            Files in Index begin to be tracked by Git.
          </span>
        </Text>

        <Text>
          Finally,{" "}
          <span className="font-bold italic text-zinc-200">
            we can apply and save our changes into the Local Repository using
            the git commit command
          </span>
          . Committing the changes updates the repository’s HEAD, which always
          points to the last commit we’ve made.
        </Text>

        <Text>
          Those three steps are used to maintain the local changes. But as we
          know, the repository may also contain an external source. The last
          step is to synchronize both repositories and publish our changes.
        </Text>

        <img
          className="grayscale w-full"
          src="https://www.baeldung.com/wp-content/uploads/sites/6/2024/02/git_workflow.webp"
          alt="image"
        />

        <Content
          title="Making Changes"
          description="Now that we know how Git’s tracking system works, we’re ready to apply our first changes to our repository."
        />
        <Content
          title="git status – Show Current Changes"
          description="Let’s create a simple file and add it to our repository. Afterward, we execute the git status command and analyze its output:"
        />

        <Terminal
          code={`$ "Hello World" >> myfile.txt
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	myfile.txt

nothing added to commit but untracked files present (use "git add" to track)`}
        />

        <Text>
          <span className="font-bold italic text-zinc-200">
            The command prints the current detailed status of our changes
          </span>
          . The first part shows if the local and remote branches are
          synchronized.
          <br />
          <br />
          Next, the output shows the status of the working tree – the list of
          currently modified files with their maintenance status. As we see, the
          myfile.txt file is currently in the Working Directory area and not
          tracked by Git.
        </Text>

        <Content
          title="git add – Track the Changes"
          description="To start tracking the changes, we need to move them to the Index by using the git add command:"
        />

        <Terminal
          code={`$ git add myfile.txt
$ git stage *`}
        />

        <Text>
          We can specify multiple files at once by separating them with a space.
          We can also specify all files using the asterisk sign. <br />{" "}
          Alternatively, we can also use the{" "}
          <span className="italic font-bold text-zinc-200">git stage</span>{" "}
          command, which is a synonym for the git add command. <br />
          Let’s now verify the status:
        </Text>

        <Terminal
          code={`$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   myfile.txt`}
        />

        <Text>As we can see, Git has started tracking our files.</Text>

        <Content
          title=" git restore & gitignore – Untrack the Changes"
          description="Git allows removing files from the Index. If we moved our changes into it by mistake and want to temporarily disable tracking them, we use git restore:"
        />

        <Terminal
          code={`$ git restore -S myfile.txt
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	myfile.txt`}
        />

        <Text>
          We’ve just moved our file once again to the Working Area and excluded
          it from further commits until we stage it again. The -S (–staged) flag
          tells Git to restore only the repository’s Index.
          <br />
          <br />
          We can also permanently exclude files and disable tracking them. To do
          this, we need to create a .gitignore file. This file contains filename
          patterns and is applied to all the files in the current directory and
          its child directories. Any further add actions will ignore files
          matching those patterns.
        </Text>

        <Content
          title=" git commit – Save the Changes"
          description="Let’s revert the last changes and move our file once again to the Staging Area:"
        />

        <Terminal code={`$ git add myfile.txt`} />
        <Text>Now, it’s time to save our work, so we need to do a commit.</Text>
        <Text>
          <b className="text-zinc-200">
            The commit is a Git object, which is like a snapshot of our
            repository at a specific time.
          </b>
        </Text>

        <Text>
          To commit changes, let’s use the{" "}
          <span className="italic text-zinc-200 font-bold">git commit</span>{" "}
          command:
        </Text>

        <Terminal
          code={`$ git commit -m "My first commit"
[master 8451901] My first commit
 1 file changed, 1 insertion(+)
 create mode 100644 myfile.txt`}
        />
      </div>
    </motion.div>
  );
}

const Title = () => {
  return (
    <div className="w-full flex-col flex gap-4 justify-start items-center text-center mb-10">
      <h1 className="text-3xl md:text-5xl text-orange-600 font-Merriweather font-bold">
        GIT for Beginners
      </h1>
      <h1 className="text-lg text-center text-zinc-400 font-Merriweather">
        The Definitive Practical Guide
      </h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div className="w-full max-w-screen-md mx-auto p-5 bg-zinc-800 border border-zinc-700 rounded font-sans">
      <h1 className="font-semibold text-xl mb-5 text-white font-Merriweather">
        {props.title}
      </h1>
      <p className="text-md text-zinc-400">{props.description}</p>
    </div>
  );
};

const Terminal = ({ code }) => {
  return (
    <div className="border-l-4 border-orange-600/70 w-full max-w-screen-md mx-auto">
      <Code code={code} language="bash" />
    </div>
  );
};

const Text = ({ children }) => {
  return <p className="text-md text-zinc-400 font-sans">{children}</p>;
};

function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5, type: "spring", damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 py-2 px-3 grid place-content-center rounded-full bg-zinc-800 border border-zinc-700 cursor-pointer z-[80]"
          >
            <h1 className="text-xs font-medium">Scroll to top 👆</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
