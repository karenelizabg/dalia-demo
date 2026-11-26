import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function ArrowIcon({ direction = 'right', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
      {...props}
    >
      <path d="M9 6 L16 12 L9 18" />
    </svg>
  );
}

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Foto grande superior — con carrusel (drag, flechas, dots)         */
/* ------------------------------------------------------------------ */

function MainCarousel({ images, accentColor, radius }) {
  const [[index, dir], setIndex] = useState([0, 0]);

  if (!images.length) return null;

  const go = (delta) => {
    setIndex(([i]) => {
      const next = (i + delta + images.length) % images.length;
      return [next, delta];
    });
  };

  const onDragEnd = (_, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold) go(1);
    else if (info.offset.x > threshold) go(-1);
  };

  const current = images[index];

  // Estilo base de alta visibilidad para ambos botones
  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(2px)',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: radius,
        background: 'var(--dalia-pine, #1a1c12)',
      }}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={index}
          src={current.src}
          alt={current.alt || ''}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: 'easeOut' }}
          drag={images.length > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={onDragEnd}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            cursor: images.length > 1 ? 'grab' : 'default',
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            style={{
              ...navButtonStyle,
              left: 12,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ArrowIcon direction="left" />
          </button>

          <button
            onClick={() => go(1)}
            aria-label="Foto siguiente"
            style={{
              ...navButtonStyle,
              right: 12,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ArrowIcon direction="right" />
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
              zIndex: 10,
              padding: '4px 8px',
            }}
          >
            {images.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === index ? 18 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === index ? accentColor : '#FFFFFF',
                  opacity: i === index ? 1 : 0.4,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Galería en cuadrícula de 3                                        */
/*  - mainImages: fotos del carrusel grande (arriba)                  */
/*  - bottomImages: exactamente 2 fotos estáticas (abajo)             */
/* ------------------------------------------------------------------ */
export default function Galeria({
  mainImages = [],
  bottomImages = [],
  mainAspectRatio = '3 / 4',
  bottomAspectRatio = '1 / 1',
  gap = 6,
  padding = 10, // nuevo: padding blanco alrededor
  accentColor = 'var(--dalia-cream, #EFEAE0)',
}) {
  if (!mainImages.length && !bottomImages.length) return null;

  const radius = 0; // sin esquinas redondeadas, siempre
  const [left, right] = bottomImages;

  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap,
        padding,
        background: '#FFFFFF',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', aspectRatio: mainAspectRatio }}>
        <MainCarousel
          images={mainImages}
          accentColor={accentColor}
          radius={radius}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap,
        }}
      >
        {left && (
          <img
            src={left.src}
            alt={left.alt || ''}
            style={{
              width: '100%',
              aspectRatio: bottomAspectRatio,
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              borderRadius: radius,
            }}
          />
        )}
        {right && (
          <img
            src={right.src}
            alt={right.alt || ''}
            style={{
              width: '100%',
              aspectRatio: bottomAspectRatio,
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              borderRadius: radius,
            }}
          />
        )}
      </div>
    </section>
  );
}