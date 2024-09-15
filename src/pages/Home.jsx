import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import Hero_Image from "../assets/Hero_Image.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-200 via-white to-white h-screen w-full space-y-16 text-zinc-900 pb-10">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
}

const Hero = () => {
  return (
    <section className="space-y-2 flex  w-full max-w-screen-xl mx-auto  justify-between items-center p-8">
      <div className="w-full max-w-screen-md mx-auto flex flex-col gap-2 justify-center items-center text-center sm:p-5 md:p-5 lg:p-0">
        {/* <div className="self-start gap-2 mb-3 rounded-full text-emerald-600 text-sm flex items-center">
          <HiLightningBolt size={20} />
          <h1 className="font-semibold">Codecian</h1>
        </div> */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none z-10 whitespace-pre-wrap text-zinc-950 text-4xl md:text-[62px] font-medium leading-none text-transparent font-Merriweather"
        >
          Fast-Track Your IT Journey to Web Mastery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-md font-medium text-zinc-900"
        >
          Enhance your expertise with comprehensive and interactive learning
          materials and resources.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8"
        >
          <Link
            to="/explore"
            className="mt-8 flex items-center gap-2 font-semibold text-sm underline underline-offset-8  decoration-zinc-700 text-black"
          >
            Begin Your Web Development Journey
            <MdOutlineArrowOutward size={16} />
          </Link>
        </motion.div>
      </div>

      {/* <div className="hidden md:flex basis-1/2 justify-end items-end">
        <motion.img
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          src={Hero_Image}
          alt="image"
          className="w-[500px]"
        />
      </div> */}
    </section>
  );
};

// const Content = () => {
//   return (
//     <section className="w-full space-y-6 max-w-screen-lg mx-auto">
//       <div className="max-w-2xl w-full flex flex-col gap-2">
//         <motion.h3
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-xl font-semibold text-zinc-700"
//         >
//           {"{ For OMSC IT Developers 👨🏻‍💻}"}
//         </motion.h3>
//         <motion.h1
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="text-5xl text-zinc-900 font-semibold leading-snug"
//         >
//           Discover what suits you best.
//         </motion.h1>
//       </div>
//     </section>
//   );
// };
