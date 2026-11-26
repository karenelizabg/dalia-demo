import { motion } from 'framer-motion';

function MandalaBand({ src, height }) {
  return (
    <div
      style={{
        width: '100%',
        padding: '0.75rem',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height,
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}

export default function Bendicion({
  mandalaTopSrc,
  mandalaBottomSrc,
  backgroundSrc,
  paperTextureSrc,
  paragraph1,
  paragraph2,
  title,
  weekday,
  day,
  month,
  year,
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      style={{
        width: '100%',
        padding: '2rem 1.25rem',
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
        >
      <div
      style={{
        backgroundImage: `
          url(${paperTextureSrc}),
          linear-gradient(180deg, #fbfaf8 0%, #f8f7f3 100%)
        `,
        backgroundSize: '700px auto, cover',
        backgroundRepeat: 'repeat, no-repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
        overflow: 'hidden',
        boxShadow: '0 18px 35px rgba(33,29,24,0.08)',
        position: 'relative',
      }}
      >
        <MandalaBand src={mandalaTopSrc} height="15%" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          style={{
            padding: '0.75rem 3rem 1rem',
            textAlign: 'center',
          }}
        >
          <motion.p
            variants={item}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18,
              lineHeight: 1.5,
              color: 'var(--dalia-ink)',
              margin: '0 0 1.5rem',
            }}
          >
            {paragraph1}
          </motion.p>

          <motion.p
            variants={item}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18,
              lineHeight: 1.5,
              color: 'var(--dalia-ink)',
              margin: '0 0 1.75rem',
            }}
          >
            {paragraph2}
          </motion.p>

          <motion.h2
            variants={item}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 42,
              fontWeight: 400,
              color: 'var(--dalia-ink)',
              margin: 0,
            }}
          >
            {title}
          </motion.h2>

          <motion.div
            variants={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18,
              marginTop: '2rem',
              marginBottom: 6,
            }}
          >
            <div style={{ flex: 1, maxWidth: 120 }}>
              <div
                style={{
                  height: 1,
                  background: 'rgba(33,29,24,0.25)',
                  marginBottom: 10,
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: 'var(--dalia-ink)',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {weekday}
              </p>
              <div
                style={{
                  height: 1,
                  background: 'rgba(33,29,24,0.25)',
                  marginTop: 10,
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 76,
                fontWeight: 400,
                color: 'var(--dalia-ink)',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {day}
            </h2>

            <div style={{ flex: 1, maxWidth: 120 }}>
              <div
                style={{
                  height: 1,
                  background: 'rgba(33,29,24,0.25)',
                  marginBottom: 10,
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: 'var(--dalia-ink)',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {month}
              </p>
              <div
                style={{
                  height: 1,
                  background: 'rgba(33,29,24,0.25)',
                  marginTop: 10,
                }}
              />
            </div>
          </motion.div>

          <motion.p
            variants={item}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.28em',
              color: 'rgba(33, 29, 24, 0.96)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {year}
          </motion.p>
        </motion.div>

        <MandalaBand src={mandalaBottomSrc} height="15%" />
      </div>
    </section>
  );
}