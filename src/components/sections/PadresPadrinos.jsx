import { motion } from 'framer-motion';

const defaultFeatured = {
  label: 'Padrinos de velación',
  names: [],
};

const defaultNovia = {
  label: 'Padres de la novia',
  names: [],
};

const defaultNovio = {
  label: 'Padres del novio',
  names: [],
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/* SVG de la Dalia decorativa */
function DaliaDivider() {
  return (
    <svg width="26" height="26" viewBox="0 0 100 100" style={{ color: 'var(--dalia-oro, #d4af37)', flexShrink: 0 }}>
      <g fill="none" stroke="currentColor" strokeWidth="3">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse key={deg} cx="50" cy="30" rx="9" ry="20" transform={`rotate(${deg} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="6" fill="currentColor" />
      </g>
    </svg>
  );
}

/* Banda de ornamento (igual patrón que MandalaBand de Bendicion.jsx) */
function OrnamentBand({ src, height, objectFit = 'contain' }) {
  if (!src) return null;

  return (
    <div
      style={{
        width: '100%',
        padding: '0.5rem 0.75rem',
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
            width: '80%',
            height: '100%',
            objectFit,
            objectPosition: 'center',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>
    </div>
  );
}

/* Flor pequeña + líneas a los lados del título/labels, igual que la referencia */
function Flourish({ src, flip = false }) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        objectFit: 'contain',
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
    />
  );
}

/* Separador tipo "línea — Dalia SVG — línea" */
function GroupDivider({ width = 220 }) {
  return (
    <motion.div
      variants={item}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width,
        maxWidth: '100%',
        margin: '1.1rem auto',
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: ' #d4af37',
        }}
      />
      <DaliaDivider />
      <div
        style={{
          flex: 1,
          height: 1,
          background: ' #d4af37',
        }}
      />
    </motion.div>
  );
}

function GroupBlock({ label, names, flourishSrc, showDivider }) {
  return (
    <>
      <motion.div
        variants={item}
        style={{
          textAlign: 'center',
          padding: '0.5rem 0.5rem 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            margin: '0 0 0.85rem',
          }}
        >
          <Flourish src={flourishSrc} />
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--dalia-vino, #a3123a)',
              margin: 0,
            }}
          >
            {label}
          </p>
          <Flourish src={flourishSrc} flip />
        </div>

        {names.map((name, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-script, "Snell Roundhand", cursive)',
              fontStyle: 'italic',
              fontSize: 22,
              lineHeight: 1.5,
              color: 'var(--dalia-ink)',
              margin: 0,
            }}
          >
            {name}
          </p>
        ))}
      </motion.div>

      {showDivider && <GroupDivider />}
    </>
  );
}

export default function PadresPadrinos({
  featured = defaultFeatured,
  novia = defaultNovia,
  novio = defaultNovio,
  title = 'Con la bendición de nuestros padres',
  padrinosTitle = 'Y el acompañamiento de nuestros padrinos',

  backgroundSrc,     // fondo de toda la sección
  paperTextureSrc,   // textura de papel de la tarjeta

  topOrnamentSrc,    // motivo floral superior
  bottomOrnamentSrc, // motivo floral + corazón inferior

  titleFlourishSrc,  // florecita pequeña a los lados de los títulos
  groupFlourishSrc,  // florecita pequeña a los lados de cada label
}) {
  return (
    <section
      style={{
        width: '100%',
        padding: '2rem 1.25rem',
        backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          backgroundImage: paperTextureSrc
            ? `url(${paperTextureSrc}), linear-gradient(180deg, #fbfaf8 0%, #f8f7f3 100%)`
            : undefined,
          backgroundColor: paperTextureSrc ? undefined : 'rgb(252,252,252)',
          backgroundSize: paperTextureSrc ? '700px auto, cover' : undefined,
          backgroundRepeat: paperTextureSrc ? 'repeat, no-repeat' : undefined,
          backgroundPosition: 'center',
          backgroundBlendMode: paperTextureSrc ? 'multiply' : undefined,
          overflow: 'hidden',
          boxShadow: '0 18px 35px rgba(33,29,24,0.08)',
          position: 'relative',
        }}
      >
        <OrnamentBand src={topOrnamentSrc} height="auto" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            padding: '0.5rem 2rem 2.25rem',
          }}
        >
          {/* Título 1: Bendición de nuestros padres */}
          <motion.div
            variants={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              margin: '0 0 1.5rem',
            }}
          >
            <Flourish src={titleFlourishSrc} />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textAlign: 'center',
                color: '#161616',
                margin: 0,
              }}
            >
              {title}
            </h3>
            <Flourish src={titleFlourishSrc} flip />
          </motion.div>

          <GroupBlock
            label={novia.label}
            names={novia.names}
            flourishSrc={groupFlourishSrc}
            showDivider={false}
          />

          <GroupBlock
            label={novio.label}
            names={novio.names}
            flourishSrc={groupFlourishSrc}
            showDivider
          />

          {/* Título 2: Y nuestros padrinos */}
          <motion.div
            variants={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              margin: '1.5rem 0 1rem',
            }}
          >
            <Flourish src={titleFlourishSrc} />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18,
                fontWeight: 400,
                letterSpacing: '0.12em',
                textAlign: 'center',
                color: '#161616',
                margin: 0,
              }}
            >
              {padrinosTitle}
            </h3>
            <Flourish src={titleFlourishSrc} flip />
          </motion.div>

          <GroupBlock
            label={featured.label}
            names={featured.names}
            flourishSrc={groupFlourishSrc}
            showDivider={false}
          />
        </motion.div>

        <OrnamentBand src={bottomOrnamentSrc} height="auto" />
      </div>
    </section>
  );
}