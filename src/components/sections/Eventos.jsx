import { motion } from 'framer-motion';
import Invitation from './Invitation';

/* ---------- Ornamento decorativo (interno) ---------- */
function PetalOrnament({ color = '#cb205c', flip = false }) {
  return (
    <svg
      width="18"
      height="27"
      viewBox="0 0 458 677"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <g transform="translate(0,677) scale(0.1,-0.1)" fill={color} stroke="none">
        <path d="M2060 6249 c-73 -29 -104 -51 -171 -119 -135 -140 -166 -310 -103
-557 74 -289 291 -589 629 -868 147 -122 438 -323 620 -430 93 -54 427 -225
440 -225 4 0 36 -14 73 -31 70 -32 72 -33 164 -73 87 -37 224 -69 278 -64 27
3 56 13 68 24 12 10 32 28 44 40 37 32 54 96 39 142 -17 51 -48 85 -385 432
-229 235 -309 324 -407 454 -92 124 -239 346 -334 506 -307 519 -429 664 -631
753 -59 26 -84 31 -169 34 -84 3 -109 0 -155 -18z"/>
        <path d="M1235 3824 c-69 -17 -208 -82 -246 -116 -95 -84 -152 -235 -130 -344
34 -174 181 -299 454 -389 212 -69 428 -86 1102 -88 490 -1 504 -1 705 26 289
38 415 64 431 89 4 6 17 15 30 22 55 27 88 144 57 198 -45 78 -202 158 -488
249 -52 17 -120 39 -150 49 -416 143 -908 272 -1164 306 -147 19 -518 18 -601
-2z"/>
        <path d="M3685 2320 c-296 -55 -765 -193 -1025 -303 -250 -105 -645 -316 -742
-396 -7 -6 -47 -37 -88 -69 -88 -69 -223 -200 -265 -257 -17 -22 -33 -42 -36
-45 -15 -12 -83 -127 -106 -178 -42 -95 -55 -174 -44 -255 15 -106 36 -168 81
-234 52 -78 82 -108 160 -158 101 -64 141 -77 266 -82 158 -8 240 19 374 122
76 59 275 265 452 468 122 140 552 578 663 677 226 201 320 264 515 346 129
54 186 93 206 139 16 40 19 121 3 130 -5 4 -14 18 -19 31 -5 13 -20 29 -32 35
-13 6 -39 19 -58 30 -45 25 -165 24 -305 -1z"/>
      </g>
    </svg>
  );
}

/* ---------- Label con ornamentos + línea punteada (interno) ---------- */
function DetailLabel({ children, color = '#cb205c' }) {
  return (
    <div style={{ marginTop: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem' }}>
        <PetalOrnament color={color} />
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '14px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          {children}
        </p>
        <PetalOrnament color={color} flip />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          maxWidth: 220,
          margin: '0.6rem auto 0',
        }}
      >
        <span style={{ flex: 1, borderTop: `1.5px dotted ${color}` }} />
        <span style={{ fontSize: 11, color, lineHeight: 1 }}>✿</span>
        <span style={{ flex: 1, borderTop: `1.5px dotted ${color}` }} />
      </div>
    </div>
  );
}

/* ---------- Botón "¿Cómo llegar?" (interno) ---------- */
function MapsButton({ href, children, accentColor }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#026d54',
        textDecoration: 'none',
        border: 'none',
        borderRadius: '999px',
        padding: '12px 32px',
        marginTop: '12px',
        marginBottom: '10px',
        transition: 'transform 0.25s ease, background-color 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#065743';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#026d54';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
}

/* ============================================================
   Eventos — componente público, solo recibe DATOS desde App.jsx
   ============================================================ */
export default function Eventos({
  // Contenido
  eventos = [],
  // Personalización visual (con defaults, opcional sobreescribir desde App)
  envelopeImage = 'images/sobrelargo.webp',
  paperTexture = 'images/texturapapel.webp',
  decorationSvg = 'images/arriba.svg',
  decorationWidth = '60%',
  decorationTop = 30,
  decorationBottomWidth = '60%',
  decorationBottom = 30,
  paddingTop = 110,
  paddingBottom = 110,
  cardWidth = '90%',
  cardTop = '10%',
  maxWidth = 380,
  backgroundImage = 'images/fondobeige.webp',
  accentColor = 'var(--dalia-fucsia)',
  mapsLabel = '¿CÓMO LLEGAR?',
  eventGap = 50, // NUEVO: espacio entre cada evento
}) {
  return (
    <Invitation
      envelopeImage={envelopeImage}
      paperTexture={paperTexture}
      decorationSvg={decorationSvg}
      decorationWidth={decorationWidth}
      decorationTop={decorationTop}
      decorationSvgBottom={true}
      decorationBottomWidth={decorationBottomWidth}
      decorationBottom={decorationBottom}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      cardWidth={cardWidth}
      cardTop={cardTop}
      maxWidth={maxWidth}
      backgroundImage={backgroundImage}
    >
      {eventos.map((evento, i) => {
        const lines = Array.isArray(evento.address) ? evento.address : [evento.address];
        return (
          <motion.div
            key={i}
            style={{ marginTop: i === 0 ? 0 : eventGap }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <DetailLabel color={evento.color}>{evento.label}</DetailLabel>

            <h3
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '32px',
                color: '#1a1a1a',
                margin: '8px 0 16px',
                fontWeight: 400,
              }}
            >
              {evento.title}
            </h3>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: '12px',
                color: '#1a1a1a',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {lines.map((line, li) => (
                <span key={li}>
                  {line}
                  {li < lines.length - 1 && <br />}
                </span>
              ))}
            </p>

            {evento.mapsUrl && (
              <MapsButton href={evento.mapsUrl} accentColor={accentColor}>
                {evento.mapsLabel || mapsLabel}
              </MapsButton>
            )}
          </motion.div>
        );
      })}
    </Invitation>
  );
}