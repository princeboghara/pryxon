"use client";

import VelourBolsterBase from "./velour-bolster-base";
import type { VelourBolsterProps } from "./velour-bolster-base";

/**
 * Titanium Velour Bolster Button (Pryxon Studio Edition)
 * A plush, domed 3D cushion pill button with aerospace titanium metallic sheen,
 * reactive cursor swell, elastic spring bounce, and micro-rolled hem.
 */
export default function VelourBolster({
  text = "START YOUR PROJECT",
  fabric = "#243042",
  textColor = "#F8FAFC",
  background = "transparent",
  buttonWidth = 440,
  buttonHeight = 130,
  radius = 65,
  link = "#contact",
  ...props
}: Partial<VelourBolsterProps>) {
  return (
    <VelourBolsterBase
      text={text}
      fabric={fabric}
      textColor={textColor}
      background={background}
      buttonWidth={buttonWidth}
      buttonHeight={buttonHeight}
      radius={radius}
      link={link}
      response={{
        puff: 6,
        bulge: 5,
        press: 6,
        wobble: 6,
        drag: 5,
        ripple: 6,
        release: 0.6,
      }}
      advanced={{
        nap: 90,
        pile: 85,
        wrinkles: 80,
        sheen: 100,
        fuzz: 0.35,
        hem: 6,
        lightAngle: 38,
        lightHeight: 45,
        shadow: 42,
        glow: 25,
      }}
      {...props}
    />
  );
}

export type { VelourBolsterProps };

