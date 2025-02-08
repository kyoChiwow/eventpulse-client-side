import Lottie from "lottie-react";
import bannerAnimation from "../assets/animation/bannerAnimation.json";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1.5, duration: 1 } },
};

const Banner = () => {
  const title = "Welcome to EventPulse".split(" ");
  const subTitle = "Plan, Organize & Experience Seamless Events".split(" ");

  return (
    <div className="bg-[url('/src/assets/pics/bannerBg.jpg')] h-[800px] bg-cover bg-no-repeat bg-fixed relative">
      {/* Black overlay here */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      {/* Black overlay here */}

      {/* Texts and animation wrappin div */}
      <div className="pt-[100px] lg:pt-[150px] max-w-[88%] mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Animation div */}
        <div className="w-[300px] lg:w-[400px] xl:w-[500px]">
          <Lottie animationData={bannerAnimation}></Lottie>
        </div>
        {/* Animation div */}

        {/* Texts div */}
        <div className="lg:max-w-[50%] z-10 text-center">
          <h1 className="text-2xl font-bold text-white">
            {title.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <h2 className="text-xl font-bold text-white mt-8">
            {subTitle.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="text-lg text-white mt-8"
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
          >
            From intimate gatherings to large-scale conferences, managing events
            has never been easier. Create, customize, and track events in real
            time. Elevate your experience with a platform designed for
            effortless planning.
          </motion.p>
        </div>
        {/* Texts div */}
      </div>
      {/* Texts and animation wrappin div */}
    </div>
  );
};

export default Banner;
