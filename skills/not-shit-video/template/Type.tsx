import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';

export const FPS = 60;
export const S = (sec: number) => Math.round(sec * FPS);
export const BLUE = '#2f8bff';

/** Type that types itself (grammar #14). Nothing in this film fades in as finished copy. */
export const Typed: React.FC<{text: string; start: number; cps?: number; style?: React.CSSProperties; caret?: boolean}> = ({text, start, cps = 26, style, caret = true}) => {
  const f = useCurrentFrame();
  if (f < start) return null;
  const shown = Math.max(0, Math.min(text.length, Math.floor(((f - start) / FPS) * cps)));
  const done = shown >= text.length;
  const blink = Math.floor((f - start) / 18) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, shown)}
      {caret && (!done || blink) && <span style={{opacity: 0.85, fontWeight: 300}}>▏</span>}
    </span>
  );
};

/**
 * A chapter marker (grammar #13): two or three words in mono caps, typed,
 * held, then gone. Lives on the void or the wallpaper, never on product pixels.
 */
export const Chapter: React.FC<{text: string; start: number; dur: number; align?: 'center' | 'left'; top?: number; left?: number; size?: number}> = ({text, start, dur, align = 'center', top, left = 240, size = 58}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [start, start + 10, start + dur - 14, start + dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0) return null;
  const drift = interpolate(f, [start, start + dur], [10, -10]);
  const pos: React.CSSProperties = align === 'center'
    ? {alignItems: 'center', justifyContent: top == null ? 'center' : 'flex-start', paddingTop: top}
    : {alignItems: 'flex-start', justifyContent: top == null ? 'center' : 'flex-start', paddingTop: top, paddingLeft: left};
  return (
    <AbsoluteFill style={{...pos, opacity: o, zIndex: 40}}>
      <div style={{transform: `translateY(${drift}px)`}}>
        <Typed text={text} start={start + 3} cps={18}
          style={{fontFamily: 'monospace', fontSize: size, letterSpacing: '0.32em', color: '#fff', textShadow: '0 6px 50px rgba(0,0,0,0.9)'}} />
      </div>
    </AbsoluteFill>
  );
};

/** Big display line for title and close cards. */
export const DisplayLine: React.FC<{text: string; start: number; size?: number; color?: string; mode?: 'fade' | 'type'}> = ({text, start, size = 150, color = '#fff', mode = 'fade'}) => {
  const f = useCurrentFrame();
  if (mode === 'type') {
    return <div style={{fontFamily: 'Arial, sans-serif', fontSize: size, color, letterSpacing: '-0.02em', lineHeight: 1.06}}>
      <Typed text={text} start={start} cps={30} caret={false} />
    </div>;
  }
  const o = interpolate(f, [start, start + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [start, start + 30], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <div style={{fontFamily: 'Arial, sans-serif', fontSize: size, color, letterSpacing: '-0.02em', lineHeight: 1.06, opacity: o, transform: `translateY(${y}px)`}}>{text}</div>;
};

/** Side caption that sits on the void beside a phone or window (never over product pixels). */
export const SideNote: React.FC<{kicker: string; line: string; start: number; dur: number; x: number; y: number; w?: number; alignRight?: boolean}> = ({kicker, line, start, dur, x, y, w = 1100, alignRight}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [start, start + 14, start + dur - 16, start + dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, opacity: o, zIndex: 40, textAlign: alignRight ? 'right' : 'left'}}>
      <Typed text={kicker} start={start} cps={22} caret={false}
        style={{display: 'block', fontFamily: 'monospace', fontSize: 34, letterSpacing: '0.28em', color: BLUE, marginBottom: 26}} />
      <Typed text={line} start={start + 10} cps={30} caret={false}
        style={{display: 'block', fontFamily: 'Arial, sans-serif', fontSize: 92, lineHeight: 1.08, letterSpacing: '-0.015em', color: '#fff'}} />
    </div>
  );
};
