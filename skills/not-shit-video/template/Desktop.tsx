import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';

/** Original CSS light-ribbon stage; no wallpaper or proprietary font assets. */
export const WallpaperArt: React.FC = () => (
  <AbsoluteFill style={{background: '#05070c', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -600, top: -500, width: 2600, height: 1500, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(56,128,255,0.65), rgba(36,90,210,0.25) 55%, transparent)', filter: 'blur(120px)', transform: 'rotate(-18deg)'}} />
    <div style={{position: 'absolute', left: 1500, top: 1100, width: 2900, height: 1400, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(70,140,220,0.5), transparent)', filter: 'blur(140px)', transform: 'rotate(-12deg)'}} />
    <div style={{position: 'absolute', left: -400, top: 820, width: 4800, height: 260, borderRadius: '50%', background: 'linear-gradient(90deg, transparent, rgba(120,180,255,0.25) 30%, rgba(160,210,255,0.4) 52%, transparent)', filter: 'blur(60px)', transform: 'rotate(-9deg)'}} />
    <AbsoluteFill style={{background: 'radial-gradient(120% 95% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)'}} />
  </AbsoluteFill>
);

/** Frame sequence wins over a decoder when retiming heavy captured UI. */
export const FrameSequence: React.FC<{folder: string; count: number; startFrom?: number; map?: (frame: number) => number}> = ({folder, count, startFrom = 0, map}) => {
  const frame = useCurrentFrame();
  if (!Number.isInteger(count) || count < 1) throw new Error('FrameSequence needs a positive frame count.');
  const i = Math.max(0, Math.min(count - 1, Math.round(map ? map(frame) : frame + startFrom)));
  return <Img src={staticFile(`${folder}/f-${String(i).padStart(5, '0')}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />;
};

/** The container stays stable. Cross-dissolve content, not separate windows. */
export const GlassWindow: React.FC<{children: React.ReactNode; duration?: number}> = ({children, duration = 840}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const enter = interpolate(f, [0, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{perspective: 5200, perspectiveOrigin: '50% 500px', paddingTop: 500, alignItems: 'center'}}>
    <div style={{width: 3000, height: 1450, position: 'relative', borderRadius: 32, overflow: 'hidden', opacity: enter,
      background: 'linear-gradient(150deg, rgba(28,40,63,0.94), rgba(9,14,24,0.98))',
      transformOrigin: 'top center', transform: `rotateX(${3 - 2 * p}deg) rotateY(${-4 + 4 * p}deg) scale(${0.94 + 0.06 * p})`,
      boxShadow: '0 90px 180px #0009, 0 0 0 2px #ffffff25, inset 0 2px 0 #ffffff30'}}>
      {children}
      <div style={{position: 'absolute', top: 28, left: 32, display: 'flex', gap: 14}}>{['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{width: 20, height: 20, borderRadius: '50%', background: c}} />)}</div>
    </div>
  </AbsoluteFill>;
};
