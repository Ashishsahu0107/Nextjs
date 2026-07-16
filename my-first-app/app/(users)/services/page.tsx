"use client";

import Image from "next/image";
import image from "../../../public/file.svg";
import photo from "../../../public/image.png";
import { motion } from "motion/react";


const page = () => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <div className="flex gap-3 justify-center items-center h-[100vh] scroll-auto">
        <motion.div
          whileInView={{ opacity: 1, y: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileTap={{ y: 0 }}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="w-70 h-80 bg-amber-300 flex flex-col justify-around items-center p-4 rounded hover:-translate-y-1.5 transition-all duration-300"
        >
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="w-20 h-20 relative bg-black rounded-full flex justify-center items-center text-white"
          >
            <Image
              src={image}
              alt="Ashish"
              fill={true}
              quality={100}
              priority={false}
              placeholder="blur"
              blurDataURL="retr"
              className="w-full h-full rounded-full "
            />
          </motion.div>
          <div className="text-center grid gap-2">
            <h3 className="text-2xl font-bold">Ashish Youtuber</h3>
            <p>Frontend Developer</p>
            <p>React & TypeScript</p>
          </div>
        </motion.div>
        <div className="w-70 h-80 relative bg-amber-300 flex flex-col justify-around items-center p-4 rounded hover:-translate-y-1.5 transition-all duration-300">
          <Image
            src={photo}
            alt="Ashish"
            fill={true}
            quality={100}
            priority={false}
            placeholder="blur"
            blurDataURL=""
          />
        </div>
      </div>
    </>
  );
};

export default page;
