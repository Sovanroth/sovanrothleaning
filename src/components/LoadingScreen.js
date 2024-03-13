import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const TRANSITION = {
  ease: "linear",
  duration: 3.2,
  loop: Infinity,
};

function LoadingScreen({ className, ...other }) {
  return (
    <div className={`h-full relative ${className}`} {...other}>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          flip: Infinity,
          repeatDelay: 1,
          repeat: Infinity
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/sovanroth.png" className="h-20 mt-80" alt="Sovanroth" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={TRANSITION}
        className="absolute box-inner"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          loop: Infinity,
        }}
        className="absolute box-outside"
      />
    </div>
  );
}

LoadingScreen.propTypes = {
  className: PropTypes.string,
};

export default LoadingScreen;
