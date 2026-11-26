import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export default function FotoFrase({
  src,
  alt = '',
  lines = [],
  signature = '',
  overlayOpacity = 0.4,
  textColor = 'var(--dalia-cream, #F7F0E4)',
}) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh', 
        overflow: 'hidden',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(0,0,0,${overlayOpacity})`,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end', // Texto abajo
          textAlign: 'center',
          padding: '0 1.5rem 5rem', // Espacio inferior
          gap: 6,
          boxSizing: 'border-box',
        }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            variants={item}
            style={{
              color: textColor,
              fontSize: 17,
              lineHeight: 1.5,
              margin: 0,
              fontFamily: 'var(--font-body, inherit)',
              maxWidth: 600,
            }}
          >
            {line}
          </motion.p>
        ))}

        {signature && (
          <motion.p
            variants={item}
            style={{
              color: textColor,
              fontFamily: 'var(--font-script, var(--font-display, cursive))',
              fontSize: 30,
              fontWeight: 400,
              margin: '14px 0 0',
            }}
          >
            {signature}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}