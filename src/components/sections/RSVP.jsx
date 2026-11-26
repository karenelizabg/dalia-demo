import { motion } from 'framer-motion';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.508 3.58 1.395 5.062L2 22l5.062-1.379A9.94 9.94 0 0012.001 22C17.523 22 22 17.522 22 12S17.523 2 12.001 2zm0 18.163a8.13 8.13 0 01-4.152-1.14l-.298-.177-3.084.84.85-3.005-.194-.31A8.128 8.128 0 013.837 12c0-4.508 3.656-8.163 8.164-8.163S20.163 7.492 20.163 12 16.508 20.163 12.001 20.163z"/>
    </svg>
  );
}

const RSVP_BUTTON_STYLE = `
.rsvp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 0;
  font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: normal;
  text-transform: none;
  border-radius: 999px;
  border: none;
  background: #cb205c;
  color: #F7F0E4;
  text-decoration: none;
  box-shadow: 0 8px 18px rgba(0,0,0,0.18);
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}
.rsvp-btn:hover {
  background: #93313F;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.25);
}
.rsvp-btn:active {
  transform: translateY(0);
}
`;

export default function RSVP({
  title = '¿Nos acompañas?',
  subtitle = 'Será un honor compartir este día tan especial contigo',
  deadlineText = ' ¡Confirma tu asistencia!',
  novaWhatsapp = '',
  novioWhatsapp = '',
  novaLabel = 'Confirmar con Dalila',
  novioLabel = 'Confirmar con Pedro',
  goldColor = 'var(--dalia-oro, #B8935A)',
  greenColor = 'var(--dalia-pine, #1F3D2E)',
  maroonColor = 'var(--dalia-maroon, #8B1E3F)',
  titleColor = '#090909',
  textColor = '#141111',
  sectionBg = '#1F3D2E',
  cardBg = 'var(--dalia-cream, #F7F0E4)',
  // Background image for the whole section (behind the card), e.g. a photo
  // like the ones used between your other blocks.
  sectionImage = '',
  sectionOverlay = 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.18))',
  // Background image for the card itself (e.g. a paper/texture photo).
  cardImage = '',
  cardOverlay = 'rgba(0,0,0,0.05)',
  // Floral ornament image, e.g. your leaf/flower flourish asset.
  ornamentImage = '',
  ornamentWidth = 30,
}) {
  const mensaje = encodeURIComponent('¡Hola! Confirmo mi asistencia a la boda 🥰');

  const buildLink = (contacto) => {
    if (!contacto) return `https://wa.me/?text=${mensaje}`;

    if (contacto.includes('wa.me/')) {
      return `https://${contacto.replace(/^https?:\/\//, '')}?text=${mensaje}`;
    }

    return `https://wa.me/${contacto}?text=${mensaje}`;
  };
  const sectionStyle = sectionImage
    ? {
        backgroundColor: sectionBg,
        backgroundImage: `${sectionOverlay}, url(${sectionImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: sectionBg };

  const cardStyle = cardImage
    ? {
        backgroundColor: cardBg,
        backgroundImage: `${cardOverlay}, url(${cardImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: cardBg };

  return (
    <section style={{ width: '100%', padding: '4rem 1.25rem', ...sectionStyle }}>
      <style>{RSVP_BUTTON_STYLE}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          maxWidth: 440,
          margin: '0 auto',
          textAlign: 'center',
          borderRadius: 0,
          border: `1px solid ${goldColor}55`,
          boxShadow: '0 18px 40px rgba(0,0,0,0.25)',
          padding: '3rem 1.75rem 2.75rem',
          ...cardStyle,
        }}
      >
        {ornamentImage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <img src={ornamentImage} alt="" style={{ width: ornamentWidth, height: 'auto' }} />
          </div>
        )}

        <h2
          style={{
            fontFamily: 'var(--font-script, var(--font-display, cursive))',
            color: titleColor,
            fontSize: 38,
            fontWeight: 200,
            margin: '0 0 12px',
          }}
        >
          {title}
        </h2>

        <p style={{ color: textColor, fontSize: 20, opacity: 0.8, margin: '0 0 6px', lineHeight: 1.6 }}>
          {subtitle}
        </p>

        {deadlineText && (
          <p style={{ color: textColor, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '25px 0' }}>
            {deadlineText}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
          <a
            href={buildLink(novaWhatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="rsvp-btn"
          >
            <WhatsAppIcon />
            {novaLabel}
          </a>

          <a
            href={buildLink(novioWhatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="rsvp-btn"
          >
            <WhatsAppIcon />
            {novioLabel}
          </a>
        </div>

        {ornamentImage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <img
              src={ornamentImage}
              alt=""
              style={{ width: ornamentWidth * 1, height: 'auto', transform: 'rotate(180deg)' }}
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}