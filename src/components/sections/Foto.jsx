import { motion } from 'framer-motion';

export default function Foto({ src, alt = '' }) {
  return (
    <section
      style={{
        width: '100%',
        aspectRatio: '3 / 4',
        overflow: 'hidden',
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </section>
  );
}