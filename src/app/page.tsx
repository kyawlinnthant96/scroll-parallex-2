"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import {useEffect, useRef, useState} from "react";
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";
import Lenis from "@studio-freight/lenis";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];
export default function Home() {
  const container = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { height } = dimension;
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

   const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])


  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time:any) => {
      lenis.raf(time);
      requestAnimationFrame(raf)
    }
    const resize = () => {
      setDimension({width: window.innerWidth,height: window.innerHeight})
    }
    window.addEventListener('resize',resize);
    requestAnimationFrame(raf)
    resize();
    return () => {
      window.removeEventListener('resize', resize)
    }

  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={container} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[9]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={styles.spacer}></div>

    </main>
  );
}

const Column = ({ images,y }: { images: string[],y?:MotionValue<number> }) => {
  return (
    <div className={styles.column}>
      {images.map((src) => {
        return (
          <motion.div key={src} style={{y}} className={styles.imageContainer}>
            <Image src={`/images/${src}`} fill alt="image" />
          </motion.div>
        );
      })}
    </div>
  );
};
