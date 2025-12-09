// src/components/ActorAvatar.jsx
import React from "react";
import { motion } from "framer-motion";

function ActorAvatar({ actor, size = "md", className = "" }) {
  if (!actor) return null;

  const sizeClasses =
    size === "sm"
      ? "w-10 h-10"
      : size === "lg"
      ? "w-16 h-16"
      : "w-12 h-12";

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center rounded-full 
                  bg-night-soft border border-card-border/80 shadow-sm 
                  overflow-hidden ${sizeClasses} ${className}`}
    >
      {/* soft gradient ring */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${
          actor.accentClass
        } opacity-40`}
      />
      <div className="absolute inset-[2px] rounded-full bg-night-soft" />

      {/* icon */}
      {actor.iconSrc ? (
        <img
          src={actor.iconSrc}
          alt={actor.label}
          className="relative z-10 w-[70%] h-[70%] object-contain"
          loading="lazy"
        />
      ) : (
        <span className="relative z-10 text-[11px] font-medium text-ink">
          {actor.shortLabel}
        </span>
      )}
    </motion.div>
  );
}

export default ActorAvatar;
