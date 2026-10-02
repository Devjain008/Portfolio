import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const presets = {
  fadeUp:    { hidden: { opacity: 0, y: 36  }, visible: { opacity: 1, y: 0  } },
  fadeDown:  { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0  } },
  fadeLeft:  { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0  } },
  fadeRight: { hidden: { opacity: 0, x: 36  }, visible: { opacity: 1, x: 0  } },
  fadeIn:    { hidden: { opacity: 0          }, visible: { opacity: 1        } },
  scaleIn:   { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
};

export function ScrollReveal({
  children,
  preset    = "fadeUp",
  delay     = 0,
  duration  = 0.55,
  className = "",
  threshold = 0.12,
  once      = true,
}) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: once, threshold });
  const variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : presets[preset];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: reduce ? 0.15 : duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", gap = 0.09 }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", preset = "fadeUp" }) {
  const reduce = useReducedMotion();
  const v = reduce ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : presets[preset];
  return (
    <motion.div className={className} variants={v} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
