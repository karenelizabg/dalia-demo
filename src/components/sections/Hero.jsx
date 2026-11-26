import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function getTimeLeft(targetDate) {
  const diff = Math.max(0, new Date(targetDate) - new Date());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero({
  groomName = 'Novio',
  brideName = 'Novia',
  weddingDate = '2026-12-12T17:00:00',
  backgroundImage,
  dividerSrc,
  dividerWidth = 26,
  dividerHeight = 26,
}) {
  const [time, setTime] = useState(getTimeLeft(weddingDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(weddingDate)), 1000);
    return () => clearInterval(id);
  }, [weddingDate]);

  const pad = (n) => String(n).padStart(2, '0');

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 640,
        overflow: 'hidden',
        backgroundColor: 'var(--dalia-pine)',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(20,22,14,0.55) 0%, rgba(20,22,14,0.15) 30%, rgba(20,22,14,0.25) 55%, rgba(20,22,14,0.88) 100%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          textAlign: 'center',
          padding: '0 1.5rem 3rem',
        }}
      >
        <motion.p
          variants={item}
          style={{
            color: '#ffffff',
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: '0.32em',
            marginBottom: 16,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
          }}
        >
          NOS CASAMOS
        </motion.p>

        <motion.h1
          variants={item}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            color: '#ffffff',
            fontSize: 80,
            lineHeight: 1.10,
            margin: 0,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
          }}
        >
          {groomName}
          <br />
          &amp; {brideName}
        </motion.h1>

        {dividerSrc && (
          <motion.div
            variants={item}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 4px' }}
          >
            <img
              src={dividerSrc}
              alt=""
              style={{
                width: dividerWidth,
                height: dividerHeight,
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
          </motion.div>
        )}
    <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {[
        { value: time.days, label: 'DÍAS' },
        { value: time.hours, label: 'HORAS' },
        { value: time.minutes, label: 'MIN' },
        { value: time.seconds, label: 'SEG' },
      ].map(({ value, label }) => (
        <div
          key={label}
          style={{
            width: 66,
            textAlign: 'center',
            padding: '10px 2px',
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.30)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 30,
              lineHeight: 1,
              color: '#FFFFFF',
              letterSpacing: '0.03em',
            }}
          >
            {pad(value)}
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.2rem',
              color: 'rgba(255, 255, 255, 0.81)',
              fontWeight: 400,
              marginTop: 4,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </motion.div>
      </motion.div>
    </section>
  );
}