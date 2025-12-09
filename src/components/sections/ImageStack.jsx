import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const IMAGES = [
  {
    src: "/images/ai_art/cartoon.png",
    alt: "AI-generated cartoon",
  },
  {
    src: "/images/ai_art/duck.png",
    alt: "AI-generated cartoon duck",
  },
  {
    src: "/images/ai_art/joker.png",
    alt: "AI-generated Joker",
  },
  {
    src: "/images/ai_art/prince.png",
    alt: "AI-generated Prince",
  },
  {
    src: "/images/ai_art/simpson.png",
    alt: "AI-generated Simpson",
  },
  {
    src: "/images/ai_art/bugs_bunny.png",
    alt: "AI-generated Bugs Bunny",
  },
  {
    src: "/images/ai_art/mona_lisa.png",
    alt: "AI-generated Mona Lisa",
  },
  {
    src: "/images/ai_art/orange_hat.png",
    alt: "AI-generated Model In Orange Hat",
  },
  {
    src: "/images/ai_art/pearl_earrings.png",
    alt: "AI-generated Girl in Pearl Earring",
  },
  {
    src: "/images/ai_art/pope_orange_coat.png",
    alt: "AI-generated Pope in Orange Coat",
  },
  {
    src: "/images/ai_art/pope_white_coat.png",
    alt: "AI-generated Pope in White Coat",
  },
];


// layout tuning knobs
const BASE_ROTATION = 2;
const ROTATION_INCREMENT = 3;
const OFFSET_INCREMENT = -16;
const VERTICAL_OFFSET = -10;
const AUTO_SWITCH_MS = 2500;

function ImageStack({ style }) {
  // cards from IMAGES
  const initialCards = useMemo(
    () =>
      IMAGES.map((img, index) => ({
        id: index,
        src: img.src,
        alt: img.alt,
        zIndex: 50 - index * 10,
      })),
    []
  );

  const [cards, setCards] = useState(initialCards);
  const [grayscale, setGrayscale] = useState(0); // 0 = color, 1 = full B&W

  // auto-rotate top card to bottom
  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        if (prevCards.length <= 1) return prevCards;
        const [first, ...rest] = prevCards;
        const newCards = [...rest, first];

        return newCards.map((card, index) => ({
          ...card,
          zIndex: 50 - index * 10,
        }));
      });
    }, AUTO_SWITCH_MS);

    return () => clearInterval(interval);
  }, []);

  // scroll-based grayscale
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(
        Math.max(window.scrollY / viewportHeight, 0),
        1
      ); // clamp 0–1

      const intense = Math.pow(progress, 0.5);

      setGrayscale(intense);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardStyles = (index) => ({
    x: index * OFFSET_INCREMENT,
    y: index * VERTICAL_OFFSET,
    rotate: index === 0 ? 0 : -(BASE_ROTATION + index * ROTATION_INCREMENT),
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  });

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {cards.map((card, index) => {
        const cardStyles = getCardStyles(index);

        return (
          <motion.div
            key={card.id}
            style={{
              position: "absolute",
              width: "100%",          // 🟣 fill the parent container
              maxWidth: 360,          // cap size so it’s not huge on large screens
              aspectRatio: "5 / 7",
              transformOrigin: "bottom center",
              overflow: "hidden",
              borderRadius: 16,
              backgroundColor: "#050816",
              cursor: "default",
              zIndex: card.zIndex,
              border: "1px solid rgba(15,23,42,0.7)",
              boxShadow:
                "0 18px 30px -10px rgba(0,0,0,0.55), 0 8px 10px -6px rgba(0,0,0,0.4)",
            }}
            animate={cardStyles}
            whileHover={{
              scale: index === 0 ? 1.04 : 1.02,
              zIndex: 100,
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 16,
                pointerEvents: "none",
                userSelect: "none",
                filter: `grayscale(${grayscale})`, // 🔥 scroll → B&W
                transition: "filter 0.3s ease-out",
              }}
              draggable={false}
              loading="eager"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default ImageStack;
