import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ================================================================== */
/*  Ornamentos                                                        */
/* ================================================================== */

function CornerLeaves({ flip = false, rotation = 0, src }) {
  return (
    <img
      src={src}
      alt=""
      width={58}
      height={36}
      style={{
        display: 'block',
        transform: `${flip ? 'scaleX(-1)' : ''} rotate(${rotation}deg)`,
        transformOrigin: 'center',
      }}
    />
  );
}

/* Ornamento pequeño que vive ENCIMA de la línea del marco (arriba o abajo) */
function FrameOrnament({ src }) {
  return (
    <img
      src={src}
      alt=""
      style={{
        display: 'block',
        maxWidth: 34,
      }}
    />
  );
}

/* ================================================================== */
/*  Marcador circular con corazón                                     */
/* ================================================================== */

function Marker({ color, background }) {
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        background,
        border: `1.6px solid ${color}`,
        boxShadow: `0 2px 6px ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 2,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill={color}
      >
        <path d="M12 21s-7.5-4.6-10.1-9.1C.4 9 1.4 5.6 4.4 4.4c2.1-.8 4.3 0 5.6 1.9.4.6 1.4.6 1.8 0 1.3-1.9 3.5-2.7 5.6-1.9 3 1.2 4 4.6 2.5 7.5C19.5 16.4 12 21 12 21z" />
      </svg>
    </span>
  );
}

/* ================================================================== */
/*  Una fila del itinerario                                           */
/* ================================================================== */

function Row({
  item,
  index,
  accentColor,
  textColor,
  background,
}) {
  const iconOnRight = index % 2 === 0;

  const textBlock = (
    <motion.div
      initial={{
        opacity: 0,
        x: iconOnRight ? -16 : 16,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.6,
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      style={{
        textAlign: iconOnRight ? 'right' : 'left'
      }}
    >
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          color: accentColor,
          opacity: 0.9,
          marginBottom: 8,
        }}
      >
        {item.time}
      </div>

      <div
        style={{
          fontFamily:
            'var(--font-serif, Georgia, serif)',
          fontSize: 18,
          color: textColor,
          lineHeight: 1.3,
        }}
      >
        {item.label}
      </div>
    </motion.div>
  );

  const iconBlock = item.icon ? (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.6,
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.1 + index * 0.05,
      }}
      style={{
        display: 'flex',
        justifyContent: iconOnRight
          ? 'flex-start'
          : 'flex-end',
      }}
    >
      <img
        src={item.icon}
        alt=""
        width={65}
        height={65}
        style={{
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </motion.div>
  ) : (
    <div />
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 30px 1fr',
        alignItems: 'center',
        columnGap: 16,
        padding: '18px 0',
      }}
    >
      {iconOnRight ? textBlock : iconBlock}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.8,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Marker
          color={accentColor}
          background={background}
        />
      </motion.div>

      {iconOnRight ? iconBlock : textBlock}
    </div>
  );
}

/* ================================================================== */
/*  Datos por defecto                                                 */
/* ================================================================== */

const defaultItems = [
  {
    time: '14:30 hrs',
    label: 'Ceremonia',
    icon: 'images/Iglesia.svg',
  },
  {
    time: '16:00 hrs',
    label: 'Recepción con Mariachi',
    icon: 'images/Mariachi.svg',
  },
  {
    time: '18:00 hrs',
    label: 'Civil',
    icon: 'images/Civil.svg',
  },
  {
    time: '18:30 hrs',
    label: 'Brindis',
    icon: 'images/Brindis.svg',
  },
  {
    time: '20:00 hrs',
    label: 'Cena',
    icon: 'images/Cena.svg',
  },
  {
    time: '21:30 hrs',
    label: '¡A bailar!',
    icon: 'images/Baile.svg',
  },
];

/* ================================================================== */
/*  Componente principal                                              */
/* ================================================================== */

export default function Programa({
  title = 'Programa',
  items = defaultItems,
  accentColor = 'var(--dalia-oro, #B08A57)',
  textColor = '#121312',
  backgroundColor = 'var(--dalia-cream, #F3EEE4)',
  cornerImage = 'images/Esquina.svg',
  centerOrnamentImage = 'images/Ornamento.svg',
  textureImage = 'images/Textura-Papel.png',
  textureOpacity = 0.15,
  textureBlendMode = 'multiply',
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  const tipOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      style={{
        width: '100%',
        background: backgroundColor,
        padding: '2.5rem 1.25rem',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ========================================================== */}
      {/* TEXTURA DE PAPEL — capa de fondo, detrás de todo lo demás   */}
      {/* ========================================================== */}

      {textureImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${textureImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
            mixBlendMode: textureBlendMode,
            opacity: textureOpacity,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* ========================================================== */}
      {/* MARCO                                                        */}
      {/* ========================================================== */}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 560,
        }}
      >
        {/* ======================================================== */}
        {/* ESQUINAS — fuera del clip-path del marco, no se recortan  */}
        {/* ======================================================== */}

        <div
          style={{
            position: 'absolute',
            top: -12,
            left: -25,
            zIndex: 3,
          }}
        >
          <CornerLeaves
            src={cornerImage}
            rotation={38}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: -12,
            right: -25,
            zIndex: 3,
          }}
        >
          <CornerLeaves
            src={cornerImage}
            flip
            rotation={38}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -12,
            left: -25,
            zIndex: 3,
          }}
        >
          <CornerLeaves
            src={cornerImage}
            rotation={-38}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -12,
            right: -25,
            zIndex: 3,
          }}
        >
          <CornerLeaves
            src={cornerImage}
            flip
            rotation={-38}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 4,
          }}
        >
          <FrameOrnament src={centerOrnamentImage} />
        </div>

        <div
          style={{
            position: 'relative',
            borderLeft: `1.4px solid ${accentColor}`,
            borderRight: `1.4px solid ${accentColor}`,
            borderRadius: 2,
            padding: '3rem 1.75rem 2.75rem',

            clipPath:
              'polygon(0 33px, 33px 0, calc(100% - 33px) 0, 100% 33px, 100% calc(100% - 33px), calc(100% - 33px) 100%, 33px 100%, 0 calc(100% - 33px))',
          }}
        >
        {/* ======================================================== */}
        {/* LÍNEA SUPERIOR — partida en dos, con hueco para el ornamento */}
        {/* ======================================================== */}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 33,
            right: 'calc(50% + 34px)',
            height: 1.4,
            background: accentColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 'calc(50% + 34px)',
            right: 33,
            height: 1.4,
            background: accentColor,
          }}
        />

        {/* ======================================================== */}
        {/* LÍNEA INFERIOR — partida en dos, con hueco para el ornamento */}
        {/* ======================================================== */}

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 33,
            right: 'calc(50% + 34px)',
            height: 1.4,
            background: accentColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 'calc(50% + 34px)',
            right: 33,
            height: 1.4,
            background: accentColor,
          }}
        />

        {/* ======================================================== */}
        {/* TITULO — limpio, protagonista, con espacio propio        */}
        {/* ======================================================== */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 0.7,
            ease: 'easeOut',
          }}
          style={{
            fontFamily:
              'var(--font-script, var(--font-display, cursive))',
            color: textColor,
            fontSize: 52,
            textAlign: 'center',
            margin: '0.5rem 0 2.75rem',
            fontWeight: 400,
          }}
        >
          {title}
        </motion.h2>

        {/* ======================================================== */}
        {/* ITINERARIO                                                */}
        {/* ======================================================== */}

        <div
          ref={containerRef}
          style={{
            position: 'relative',
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          {/* Línea base — punteada, muy sutil */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 15,
              bottom: 15,
              width: 0,
              transform: 'translateX(-50%)',
              borderLeft: `1.4px dotted ${accentColor}`,
              opacity: 0.35,
            }}
          />

          {/* Línea animada — el trazo que se dibuja al hacer scroll */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: 15,
              bottom: 15,
              width: 1.4,
              transform: 'translateX(-50%)',
              background: accentColor,
              transformOrigin: 'top',
              scaleY: lineScale,
            }}
          />

          {items.map((item, i) => (
            <Row
              key={i}
              item={item}
              index={i}
              accentColor={accentColor}
              textColor={textColor}
              background={backgroundColor}
            />
          ))}
        </div>

        {/* ======================================================== */}
        {/* ORNAMENTO DEL MARCO — centrado sobre la línea inferior    */}
        {/* ======================================================== */}

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 50%)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FrameOrnament src={centerOrnamentImage} />
        </div>
        </div>
      </div>
    </section>
  );
}