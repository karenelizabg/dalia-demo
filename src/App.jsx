import Sobre from './components/sections/Sobre';
import Hero from './components/sections/Hero';
import Bendicion from './components/sections/Bendicion';
import PadresPadrinos from './components/sections/PadresPadrinos';
import Foto from './components/sections/Foto';
import Programa from './components/sections/Programa';
import Galeria from './components/sections/Galeria';
import Fotofrase from './components/sections/Fotofrase';
import RSVP from './components/sections/RSVP';
import Eventos from './components/sections/Eventos';
import './App.css';

function App() {
  return (
    <div className="app-frame">
      <div className="app-card">
        <Sobre
          envelopeImage="images/sobre.webp"
          songSrc="cancion.mp3"
          topContent={(
            <div style={{ textAlign: 'center', color: '#fff', marginBottom: 8 }}>
              <div style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(14px, 3.4vw, 22px)', letterSpacing: 4 }}>NOS CASAMOS</div>
              <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(40px, 9vw, 72px)', lineHeight: 1.1 }}>Dara &amp; Andro</div>
            </div>
          )}
        >
          <Hero
            groomName="Dara"
            brideName="Andro"
            weddingDate="2027-03-30T14:30:00"
            backgroundImage='images/PedroyDalila-18.webp'
            dividerSrc="images/hero.svg"
            dividerWidth={250}
            dividerHeight={80}
          />
          <Bendicion
            backgroundSrc="images/fondorosa.webp"
            paperTextureSrc="images/texturapapel.webp"
            mandalaTopSrc="images/superior.svg"
            mandalaBottomSrc="images/mandala.svg"
            paragraph1="Con enorme ilusión y el corazón lleno de gratitud, queremos compartir con ustedes uno de los momentos más importantes de nuestras vidas."
            paragraph2="Con la bendición de Dios y en compañía de nuestras familias tenemos el honor de invitarles a la celebración de"
            title="Nuestra Boda"
            weekday="MARTES"
            day="30"
            month="MARZO"
            year="2027"
          />
          <Foto src="images/PedroyDalila-64.webp" alt="Descripción de la foto" />
          <PadresPadrinos
            topOrnamentSrc="images/captusarriba.svg"
            bottomOrnamentSrc="images/captus.svg"
            cardImage="images/picado.svg"
            separatorIcon="images/separacion.svg"
            paperTextureSrc="images/texturapapel.webp"
            backgroundSrc="images/fondoturquesa.webp"
            separatorText="Y"
            featured={{
              label: 'Padrinos de velación',
              names: ['Dalia Yazmín Silva Ibarra', 'Ángel Francisco Becerra García'],
            }}
            novia={{
              label: 'Padres de la novia',
              names: ['Dalila Ibarra Bautista', 'Celso Silva López'],
            }}
            novio={{
              label: 'Padres del novio',
              names: ['María Silvia Olmedo García', 'Pedro González Licón'],
            }}
          />
          <Foto src="images/PedroyDalila-50.webp" alt="Descripción de la foto" />

          <Eventos
            eventos={[
              {
                label: 'Ceremonia Religiosa',
                title: 'Parroquia Santa María de Guadalupe',
                address: ['Calle Álvaro Obregón 16,', 'Centro, El Grullo.'],
                mapsUrl: 'https://maps.app.goo.gl/hA71VsNcxdr3m3qJ6',
              },
              {
                label: 'Celebración',
                title: 'Hacienda Primavera',
                address: ['Calle Dr Gabriel Gómez 101,', 'Colonia Primavera, El Grullo.'],
                mapsUrl: 'https://maps.app.goo.gl/YDAh5kKtWMW3FDNP9',
              },
            ]}
          />

          <Foto src="images/PedroyDalila-54.webp" alt="Descripción de la foto" />

          <Programa
            title="El gran día"
            cornerImage="images/esquina.svg"
            centerOrnamentImage="images/central.svg"
            textureImage="images/texturapapel.webp"
            textureOpacity={0.6}
            textureBlendMode="normal"
            items={[
              { time: '14:30 hrs', label: 'Ceremonia', icon: 'images/Iglesia.svg' },
              { time: '16:00 hrs', label: 'Recepción con Mariachi', icon: 'images/Mariachi.svg'  },
              { time: '18:00 hrs', label: 'Civil', icon: 'images/Civil.svg'  },
              { time: '18:30 hrs', label: 'Brindis', icon: 'images/Brindis.svg'  },
              { time: '20:00 hrs', label: 'Cena', icon: 'images/Cena.svg' },
              { time: '21:30 hrs', label: '¡A bailar!', icon: 'images/Baile.svg' },
            ]}
          />
          <Galeria
            mainImages={[
              { src: 'images/PedroyDalila-83.webp', alt: 'Foto 1' },
              { src: 'images/PedroyDalila-5.webp', alt: 'Foto 2' },
              { src: 'images/PedroyDalila-87.webp', alt: 'Foto 3' },
              { src: 'images/PedroyDalila-90.webp', alt: 'Foto 4' },
              { src: 'images/PedroyDalila-67.webp', alt: 'Foto 5' },
              { src: 'images/PedroyDalila-94.webp', alt: 'Foto 6' },
            ]}
            bottomImages={[
              { src: 'images/PedroyDalila-70.webp', alt: 'Foto 3' },
              { src: 'images/PedroyDalila-30.webp', alt: 'Foto 4' },
            ]}
          />
          <RSVP
            cardImage="images/texturapapel.webp"
            cardOverlay="linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1))"
            sectionImage="images/fondoturquesa.webp"   // reemplaza el verde         // reemplaza el beige
            ornamentImage="images/central.svg"
            novaWhatsapp="https://wa.me/17203240550"
            novioWhatsapp="https://wa.me/523211007800"
          />
          <Fotofrase
            src="images/PedroyDalila-45.webp"
            alt="Pareja abrazados"
            signature="¡Gracias por acompañarnos!"
          />
    
        </Sobre>
      </div>
    </div>
  );
}

export default App;