import React from "react";

/* ============================================================
   Envelope (interno) — antes era Envelope.jsx
   ============================================================ */
function Envelope({ image, alt = "Sobre de la invitación", style, containerStyle }) {
  return (
    <div
      style={{
        width: "600px",
        maxWidth: "100%",
        margin: "0 auto",
        ...containerStyle,
      }}
    >
      <img
        src={image}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          ...style,
        }}
      />
    </div>
  );
}

/* ============================================================
   Card (interno) — antes era Card.jsx
   ============================================================ */
const CLIP_ID = "cardCutCornerClip";

function buildClipPathD(r = 0.08) {
  return `
    M ${r},0
    L ${1 - r},0
    A ${r},${r} 0 0 0 1,${r}
    L 1,${1 - r}
    A ${r},${r} 0 0 0 ${1 - r},1
    L ${r},1
    A ${r},${r} 0 0 0 0,${1 - r}
    L 0,${r}
    A ${r},${r} 0 0 0 ${r},0
    Z
  `;
}

function Card({
  paperTexture,
  decorationSvg,
  decorationWidth = "300%",
  decorationTop = 0,
  decorationSvgBottom,
  decorationBottomWidth,
  decorationBottom = 0,
  padding = 40,
  paddingTop,
  paddingBottom,
  minHeight,
  cornerCut = 0.08,
  outlineColor = "#9c1d4a",
  outlineWidth = 1.5,
  outlineInset = 16,
  outlineCornerCut = 0.1,
  children,
}) {
  const paperClipD = buildClipPathD(cornerCut);
  const outlineD = buildClipPathD(outlineCornerCut);

  const resolvedPaddingTop = paddingTop ?? padding;
  const resolvedPaddingBottom = paddingBottom ?? padding;

  const bottomSvgSrc =
    decorationSvgBottom === true ? decorationSvg : decorationSvgBottom;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          clipPath: `url(#${CLIP_ID})`,
          WebkitClipPath: `url(#${CLIP_ID})`,
          backgroundColor: "#FFFFFF",
          backgroundImage: paperTexture ? `url(${paperTexture})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxSizing: "border-box",
          filter: "drop-shadow(0 20px 45px rgba(0,0,0,.14))",
        }}
      >
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
              <path d={paperClipD} />
            </clipPath>
          </defs>
        </svg>

        {decorationSvg && (
          <img
            src={decorationSvg}
            alt=""
            style={{
              position: "absolute",
              top: decorationTop,
              left: "50%",
              transform: "translateX(-50%)",
              width: decorationWidth,
              height: "auto",
              objectFit: "contain",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

        {bottomSvgSrc && (
          <img
            src={bottomSvgSrc}
            alt=""
            style={{
              position: "absolute",
              bottom: decorationBottom,
              left: "50%",
              transform: "translateX(-50%) rotate(180deg)",
              width: decorationBottomWidth ?? decorationWidth,
              height: "auto",
              objectFit: "contain",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

        <svg
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: outlineInset,
            left: outlineInset,
            right: outlineInset,
            bottom: outlineInset,
            width: `calc(100% - ${outlineInset * 2}px)`,
            height: `calc(100% - ${outlineInset * 2}px)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path
            d={outlineD}
            fill="none"
            stroke={outlineColor}
            strokeWidth={outlineWidth}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className="card-content"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: `${resolvedPaddingTop}px`,
            paddingBottom: `${resolvedPaddingBottom}px`,
            paddingLeft: `${padding}px`,
            paddingRight: `${padding}px`,
            minHeight,
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Invitation (público) — arma Envelope + Card
   ============================================================ */
export default function Invitation({
  envelopeImage,
  envelopeAlt,
  paperTexture,
  decorationSvg,
  decorationWidth = "80%",
  decorationTop = 0,

  decorationSvgBottom,
  decorationBottomWidth,
  decorationBottom = 0,
  paddingTop,
  paddingBottom,

  minHeight,
  padding,
  maxWidth = 600,
  cardWidth = "48%",
  cardTop = "30%",

  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat",

  children,
}) {
  return (
    <div
      style={{
        width: "100%",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize,
        backgroundPosition,
        backgroundRepeat,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: `${maxWidth}px`,
          margin: "0 auto",
          paddingTop: "40px",
          paddingBottom: "200px",
        }}
      >
        <Envelope image={envelopeImage} alt={envelopeAlt} />

        <div
          style={{
            position: "absolute",
            top: cardTop,
            left: "50%",
            transform: "translateX(-50%)",
            width: cardWidth,
            zIndex: 1,
          }}
        >
          <Card
            paperTexture={paperTexture}
            decorationSvg={decorationSvg}
            decorationWidth={decorationWidth}
            decorationTop={decorationTop}
            decorationSvgBottom={decorationSvgBottom}
            decorationBottomWidth={decorationBottomWidth}
            decorationBottom={decorationBottom}
            padding={padding}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            minHeight={minHeight}
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}