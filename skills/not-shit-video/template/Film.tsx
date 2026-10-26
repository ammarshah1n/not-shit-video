import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {GlassWindow, WallpaperArt} from './Desktop';
import {MessagesScreen, PhoneDevice, PhoneEvent} from './Phone';
import {Chapter, Typed} from './Type';

const events: PhoneEvent[] = [
  {kind: 'stamp', at: 0, text: 'Tuesday\n09:41'},
  {kind: 'out', at: 100, type: 65, text: 'What needs my attention?'},
  {kind: 'receipt', at: 115, text: 'Delivered'},
  {kind: 'in', at: 175, typingFrom: 125, text: 'The launch review is ready. One decision remains: choose the opening shot.'},
];

const PhoneScene: React.FC = () => {
  const f = useCurrentFrame();
  const enter = interpolate(f, [0, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
    <div style={{position: 'absolute', left: 440, top: 790, width: 1350, color: '#fff'}}>
      <div style={{font: '34px monospace', letterSpacing: 10, color: '#7db6ff', marginBottom: 40}}>ONE CLEAR MOMENT</div>
      <Typed text="Start with a reason to care." start={30} cps={18} caret={false} style={{font: '104px Arial', lineHeight: 1.1, letterSpacing: -3}} />
    </div>
    <div style={{position: 'absolute', left: 2350, top: 100, opacity: enter, transform: `translateY(${(1 - enter) * 130}px) scale(${0.89 + f * 0.00005})`, transformOrigin: 'top center'}}>
      <PhoneDevice><MessagesScreen events={events} clock="9:41" contact="Example" /></PhoneDevice>
    </div>
  </AbsoluteFill>;
};

/** Synthetic example UI. Replace with fixture captures of the actual product. */
const ProofPanel: React.FC<{index: number}> = ({index}) => {
  const f = useCurrentFrame();
  const titles = ['Find the one thing.', 'Make the next move.', 'Hold the result.'];
  const copy = ['Opening shot selected', 'Review notes collected', 'Ready for a clear next step'];
  return <AbsoluteFill style={{padding: '150px 150px 100px 530px', color: '#f3f7ff', fontFamily: 'Arial, sans-serif'}}>
    <div style={{position: 'absolute', left: 0, top: 85, bottom: 0, width: 420, padding: '80px 55px', background: '#060c1670', borderRight: '1px solid #ffffff12'}}>
      <div style={{fontSize: 34, letterSpacing: 7, color: '#b0bfda', marginBottom: 100}}>EXAMPLE</div>
      {['Overview', 'Work', 'Results'].map((label, i) => <div key={label} style={{fontSize: 38, padding: '30px 24px', marginBottom: 12, borderRadius: 16, color: i === index ? '#fff' : '#8290a8', background: i === index ? '#2c76cf35' : 'transparent'}}>{label}</div>)}
    </div>
    <div style={{fontSize: 32, letterSpacing: 7, color: '#7caee8'}}>YOUR PROJECT / DEMONSTRATION</div>
    <h1 style={{fontSize: 108, letterSpacing: -4, fontWeight: 500, margin: '55px 0 65px'}}>{titles[index]}</h1>
    <div style={{border: '2px solid #ffffff16', borderRadius: 30, padding: 65, background: '#ffffff04'}}>
      <div style={{fontSize: 28, color: '#96a6c0', letterSpacing: 5, marginBottom: 35}}>A RESULT YOU CAN READ</div>
      <Typed text={copy[index]} start={28} cps={17} caret={false} style={{fontSize: 66}} />
      <div style={{height: 5, background: '#14233a', marginTop: 65, borderRadius: 5}}><div style={{height: '100%', width: `${Math.min(100, f / 2)}%`, background: '#65a9ff', borderRadius: 5}} /></div>
    </div>
    <div style={{fontSize: 37, color: '#9ba9bd', marginTop: 70}}>One story. Real proof. Enough time to read.</div>
    <div style={{position: 'absolute', bottom: 55, right: 100, fontSize: 24, color: '#75849b'}}>Synthetic fixture · not a shipped product</div>
  </AbsoluteFill>;
};

const DesktopScene: React.FC = () => {
  const f = useCurrentFrame();
  const starts = [0, 275, 550];
  return <AbsoluteFill>
    <Chapter text="SHOW THE PROOF" start={0} dur={840} top={280} size={48} />
    <GlassWindow>{starts.map((start, i) => {
      const opacity = i === 0 ? 1 : interpolate(f, [start, start + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      return <AbsoluteFill key={start} style={{opacity}}><Sequence from={start} layout="none"><ProofPanel index={i} /></Sequence></AbsoluteFill>;
    })}</GlassWindow>
  </AbsoluteFill>;
};

const Card: React.FC<{close?: boolean}> = ({close = false}) => <AbsoluteFill style={{background: '#05070c', color: '#fff', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif'}}>
  <div style={{fontSize: close ? 180 : 220, fontWeight: 600, letterSpacing: -8}}>Not Shit Video.</div>
  {close && <><div style={{fontSize: 58, color: '#b2bfd1', marginTop: 65}}>Make something worth watching.</div><div style={{font: '28px monospace', color: '#61728c', marginTop: 130}}>SYNTHETIC EXAMPLE / NO PAID ASSETS</div></>}
</AbsoluteFill>;

export const Film: React.FC = () => <AbsoluteFill style={{background: '#05070c'}}>
  <WallpaperArt />
  <Sequence durationInFrames={480}><PhoneScene /></Sequence>
  <Sequence from={480} durationInFrames={120}><Card /></Sequence>
  <Sequence from={600} durationInFrames={840}><DesktopScene /></Sequence>
  <Sequence from={1440} durationInFrames={360}><Card close /></Sequence>
</AbsoluteFill>;
