import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Envelope
 * Pantalla "hero" con un sobre. Al hacer click SOBRE LA IMAGEN DEL SOBRE:
 *  - se reproduce la canción
 *  - el sobre se abre / desaparece con una transición
 *  - se revela el contenido (children) — ej. tu <Hero />
 *
 * Props:
 *  - envelopeImage: ruta de la imagen del sobre (ya incluye el texto/nombres)
 *  - envelopeWidth: ancho del sobre en px (default 280)
 *  - songSrc: ruta del mp3
 *  - children: lo que se muestra después de abrir (tu Hero, invitación, etc.)
 */
export default function Envelope({
  envelopeImage,
  envelopeWidth = 700,
  songSrc,
  topContent,
  children,
}) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
  if (!opened) {
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }
}, [opened]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      audioRef.current.play().catch(() => {
        // autoplay bloqueado por el navegador; el usuario ya interactuó (click),
        // así que normalmente esto sí se reproduce.
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {songSrc && <audio ref={audioRef} src={songSrc} loop />}

      {/* Contenido real, debajo del sobre */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>

      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope-hero"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: 'blur(6px)',
              transition: { duration: 0.9, ease: 'easeInOut' },
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#901a59',
            }}
          >
            {/* Imagen del sobre: aquí se controla el tamaño y aquí va el click */}
            {topContent}
            {envelopeImage && (
              <motion.img
                src={envelopeImage}
                alt="Sobre de invitación"
                onClick={handleOpen}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: envelopeWidth,
                  maxWidth: '94vw',      // antes 85% → ahora casi todo el ancho de pantalla
                  maxHeight: '80vh', 
                  height: 'auto',
                  cursor: 'pointer',
                  display: 'block',
                }}
              />
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}