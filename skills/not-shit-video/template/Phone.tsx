import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Rich} from './Rich';

// Drawn, synthetic phone scene. Never a recording of a personal device.

export const K = 2.35; // px per iPhone point at 4K
const u = (pt: number) => pt * K;
export const PHONE_W = u(402);
export const PHONE_H = u(874);

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif';
const SF_DISPLAY = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif';
const BLUE_TOP = '#3d9bff';
const BLUE_BOT = '#0a7cff';
const GREY_BUBBLE = '#262628';
const MUTED = '#8e8e93';

export type PhoneEvent =
  | {kind: 'stamp'; at: number; text: string}
  // outgoing text: composes in the input field over `type` frames ending at `at`
  | {kind: 'out'; at: number; text: string; type?: number}
  // incoming text: typing bubble from `typingFrom` until `at`
  | {kind: 'in'; at: number; text: string; typingFrom?: number}
  // outgoing voice note: recording UI from `recordFrom` until `at`
  | {kind: 'voice'; at: number; seconds: number; transcript: string; recordFrom?: number}
  // incoming attachment (a document the channel sends back)
  | {kind: 'file'; at: number; name: string; meta: string; typingFrom?: number}
  | {kind: 'receipt'; at: number; text: string};

type Props = {events: PhoneEvent[]; clock: string; contact?: string};

// ------------------------------------------------------------------ chrome

const StatusBar: React.FC<{clock: string}> = ({clock}) => (
  <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: u(54), display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', padding: `0 ${u(34)}px 0 ${u(44)}px`, zIndex: 5}}>
    <span style={{fontFamily: SF, fontWeight: 600, fontSize: u(17), color: '#fff', letterSpacing: u(-0.2), marginTop: u(4)}}>{clock}</span>
    <div style={{display: 'flex', gap: u(6), alignItems: 'center', marginTop: u(4)}}>
      <svg width={u(18)} height={u(12)} viewBox="0 0 18 12">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 4.8} y={9 - i * 3} width={3.2} height={3 + i * 3} rx={0.8} fill="#fff" />)}
      </svg>
      <svg width={u(17)} height={u(12)} viewBox="0 0 17 12">
        <path d="M8.5 11.2l2.3-2.6a3.4 3.4 0 00-4.6 0z" fill="#fff" />
        <path d="M3.9 6.9l1.5 1.6a4.6 4.6 0 016.2 0l1.5-1.6a6.8 6.8 0 00-9.2 0z" fill="#fff" />
        <path d="M1.4 4.2l1.5 1.6a8.2 8.2 0 0111.2 0l1.5-1.6a10.4 10.4 0 00-14.2 0z" fill="#fff" />
      </svg>
      <svg width={u(27)} height={u(13)} viewBox="0 0 27 13">
        <rect x={0.5} y={0.5} width={23} height={12} rx={3.6} fill="none" stroke="rgba(255,255,255,0.45)" />
        <rect x={2.2} y={2.2} width={17.4} height={8.6} rx={2.2} fill="#fff" />
        <path d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1s-.6-1.8-1.4-2.1z" fill="rgba(255,255,255,0.45)" />
      </svg>
    </div>
  </div>
);

const NavHeader: React.FC<{contact: string}> = ({contact}) => (
  <div style={{position: 'absolute', top: u(54), left: 0, right: 0, height: u(92), zIndex: 4,
    background: 'linear-gradient(to bottom, rgba(18,18,20,0.97), rgba(18,18,20,0.88))',
    backdropFilter: 'blur(20px)', borderBottom: `${u(0.5)}px solid rgba(255,255,255,0.10)`}}>
    <svg width={u(13)} height={u(22)} viewBox="0 0 13 22" style={{position: 'absolute', left: u(16), top: u(26)}}>
      <path d="M11 2L3 11l8 9" stroke="#0a84ff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div style={{position: 'absolute', left: 0, right: 0, top: u(6), display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{width: u(54), height: u(54), borderRadius: u(27), background: '#2579e8', color: '#fff', display: 'grid', placeItems: 'center', fontSize: u(28)}}>{contact.slice(0, 1)}</div>
      <div style={{marginTop: u(5), display: 'flex', alignItems: 'center', gap: u(3)}}>
        <span style={{fontFamily: SF, fontSize: u(12), color: '#fff', fontWeight: 500}}>{contact}</span>
        <svg width={u(6)} height={u(10)} viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke={MUTED} strokeWidth={1.4} fill="none" /></svg>
      </div>
    </div>
    <svg width={u(26)} height={u(18)} viewBox="0 0 26 18" style={{position: 'absolute', right: u(18), top: u(28)}}>
      <rect x={1} y={2} width={16} height={14} rx={4} fill="none" stroke="#0a84ff" strokeWidth={1.8} />
      <path d="M18 7.5l6-3.5v10l-6-3.5z" fill="none" stroke="#0a84ff" strokeWidth={1.8} strokeLinejoin="round" />
    </svg>
  </div>
);

// --------------------------------------------------------------- bubbles

// The classic Messages tail: a bubble-coloured rounded block masked by a
// screen-coloured one. Works because the thread background is solid black.
const tailOut = (color: string) => (
  <>
    <div style={{position: 'absolute', bottom: 0, right: -u(7), width: u(20), height: u(20), background: color,
      borderBottomLeftRadius: `${u(16)}px ${u(14)}px`}} />
    <div style={{position: 'absolute', bottom: 0, right: -u(26), width: u(26), height: u(20), background: '#000',
      borderBottomLeftRadius: u(10)}} />
  </>
);
const tailIn = (
  <>
    <div style={{position: 'absolute', bottom: 0, left: -u(7), width: u(20), height: u(20), background: GREY_BUBBLE,
      borderBottomRightRadius: `${u(16)}px ${u(14)}px`}} />
    <div style={{position: 'absolute', bottom: 0, left: -u(26), width: u(26), height: u(20), background: '#000',
      borderBottomRightRadius: u(10)}} />
  </>
);

const Bubble: React.FC<{side: 'out' | 'in'; tail: boolean; children: React.ReactNode; enter: number; maxW?: number}> = ({side, tail, children, enter, maxW = 276}) => {
  // enter: 0..1 spring progress
  const out = side === 'out';
  const y = interpolate(enter, [0, 1], [out ? u(26) : u(10), 0]);
  const sc = interpolate(enter, [0, 1], [out ? 0.9 : 0.86, 1]);
  return (
    <div style={{display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start', padding: `0 ${u(14)}px`,
      opacity: interpolate(enter, [0, 0.35], [0, 1], {extrapolateRight: 'clamp'}),
      transform: `translateY(${y}px) scale(${sc})`, transformOrigin: out ? 'bottom right' : 'bottom left'}}>
      <div style={{position: 'relative', maxWidth: u(maxW), padding: `${u(7)}px ${u(12)}px ${u(8)}px`,
        borderRadius: u(19), background: out ? `linear-gradient(to bottom, ${BLUE_TOP}, ${BLUE_BOT})` : GREY_BUBBLE,
        color: '#fff', fontFamily: SF, fontSize: u(17), lineHeight: `${u(22)}px`, letterSpacing: u(-0.25)}}>
        {tail && (out ? tailOut(BLUE_BOT) : tailIn)}
        <div style={{position: 'relative'}}>{children}</div>
      </div>
    </div>
  );
};

const TypingBubble: React.FC<{local: number}> = ({local}) => {
  const enter = interpolate(local, [0, 8], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{display: 'flex', padding: `0 ${u(14)}px`, opacity: enter, transform: `scale(${0.8 + 0.2 * enter})`, transformOrigin: 'bottom left'}}>
      <div style={{position: 'relative', width: u(62), height: u(36), borderRadius: u(18), background: GREY_BUBBLE,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: u(5)}}>
        {tailIn}
        {[0, 1, 2].map((i) => {
          const ph = ((local - i * 6) % 36 + 36) % 36;
          const lift = interpolate(ph, [0, 9, 18, 36], [0.35, 1, 0.35, 0.35]);
          return <div key={i} style={{width: u(8), height: u(8), borderRadius: u(4), background: MUTED, opacity: lift,
            transform: `translateY(${-(lift - 0.35) * u(2.2)}px)`, position: 'relative'}} />;
        })}
      </div>
    </div>
  );
};

const Waveform: React.FC<{seconds: number; progress: number; color: string; dim: string; seed?: number; live?: number}> = ({seconds, progress, color, dim, seed = 3, live}) => {
  const n = 30;
  const bars = Array.from({length: n}, (_, i) => {
    const v = Math.abs(Math.sin(i * 1.7 + seed) * 0.55 + Math.sin(i * 0.43 + seed * 2) * 0.45);
    return 0.22 + 0.78 * v;
  });
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: u(2.2), height: u(26)}}>
      {bars.map((h, i) => {
        const on = i / n <= progress;
        const wob = live != null ? 0.55 + 0.45 * Math.abs(Math.sin(live / 4 + i * 1.3)) : 1;
        return <div key={i} style={{width: u(2.6), height: u(26) * h * wob, borderRadius: u(1.3), background: on ? color : dim}} />;
      })}
    </div>
  );
};

const VoiceBubble: React.FC<{seconds: number; transcript: string; enter: number; tail: boolean}> = ({seconds, transcript, enter, tail}) => (
  <Bubble side="out" tail={tail} enter={enter} maxW={286}>
    <div style={{display: 'flex', alignItems: 'center', gap: u(9), padding: `${u(2)}px 0`}}>
      <svg width={u(16)} height={u(18)} viewBox="0 0 16 18"><path d="M2 1.5v15l13-7.5z" fill="#fff" /></svg>
      <Waveform seconds={seconds} progress={0} color="#fff" dim="rgba(255,255,255,0.55)" />
      <span style={{fontFamily: SF, fontSize: u(14), fontVariantNumeric: 'tabular-nums', opacity: 0.9}}>0:{String(seconds).padStart(2, '0')}</span>
    </div>
    <div style={{marginTop: u(6), paddingTop: u(6), borderTop: `${u(0.5)}px solid rgba(255,255,255,0.28)`,
      fontSize: u(15), lineHeight: `${u(20)}px`, opacity: 0.95}}>{transcript}</div>
  </Bubble>
);

const FileBubble: React.FC<{name: string; meta: string; enter: number; tail: boolean}> = ({name, meta, enter, tail}) => (
  <Bubble side="in" tail={tail} enter={enter} maxW={286}>
    <div style={{display: 'flex', alignItems: 'center', gap: u(10), padding: `${u(3)}px 0`}}>
      <div style={{width: u(34), height: u(42), borderRadius: u(5), background: '#2f6fe0', position: 'relative', flexShrink: 0}}>
        <div style={{position: 'absolute', right: 0, top: 0, width: u(10), height: u(10), background: 'rgba(255,255,255,0.35)', borderBottomLeftRadius: u(3)}} />
        <span style={{position: 'absolute', bottom: u(5), left: 0, right: 0, textAlign: 'center', fontFamily: SF, fontWeight: 700, fontSize: u(9), color: '#fff'}}>DOCX</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span style={{fontWeight: 600, fontSize: u(15), lineHeight: `${u(19)}px`}}>{name}</span>
        <span style={{fontSize: u(13), color: 'rgba(255,255,255,0.6)', lineHeight: `${u(17)}px`}}>{meta}</span>
      </div>
    </div>
  </Bubble>
);

// ------------------------------------------------------------ input bar

const InputBar: React.FC<{draft: string; caret: boolean; recording: number | null; frame: number}> = ({draft, caret, recording, frame}) => {
  const hasDraft = draft.length > 0;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: u(92), zIndex: 4,
      background: 'linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0.85))', padding: `${u(8)}px ${u(12)}px 0`}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: u(9)}}>
        <div style={{width: u(36), height: u(36), borderRadius: u(18), background: '#2c2c2e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <svg width={u(16)} height={u(16)} viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" stroke="#aeaeb2" strokeWidth={2} strokeLinecap="round" /></svg>
        </div>
        <div style={{flex: 1, minHeight: u(36), borderRadius: u(18), border: `${u(1)}px solid #3a3a3c`, display: 'flex',
          alignItems: 'center', padding: `${u(6)}px ${u(6)}px ${u(6)}px ${u(13)}px`, fontFamily: SF, fontSize: u(17), lineHeight: `${u(22)}px`}}>
          {recording != null ? (
            <div style={{display: 'flex', alignItems: 'center', gap: u(10), flex: 1}}>
              <div style={{width: u(9), height: u(9), borderRadius: u(5), background: '#ff453a', opacity: 0.6 + 0.4 * Math.abs(Math.sin(frame / 9))}} />
              <Waveform seconds={0} progress={1} color="#ff6b62" dim="#ff6b62" live={frame} seed={7} />
              <span style={{color: '#fff', fontSize: u(15), fontVariantNumeric: 'tabular-nums', marginLeft: 'auto'}}>0:{String(Math.min(59, Math.floor(recording))).padStart(2, '0')}</span>
            </div>
          ) : hasDraft ? (
            <span style={{color: '#fff', flex: 1}}>{draft}{caret && <span style={{display: 'inline-block', width: u(2), height: u(21), background: '#0a84ff', marginLeft: u(1), verticalAlign: 'text-bottom'}} />}</span>
          ) : (
            <span style={{color: '#636366', flex: 1}}>iMessage</span>
          )}
          {hasDraft || recording != null ? (
            <div style={{width: u(28), height: u(28), borderRadius: u(14), background: recording != null ? '#ff453a' : '#0a84ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              {recording != null
                ? <div style={{width: u(10), height: u(10), borderRadius: u(2), background: '#fff'}} />
                : <svg width={u(14)} height={u(16)} viewBox="0 0 14 16"><path d="M7 14V2M2 7l5-5 5 5" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
          ) : (
            <svg width={u(16)} height={u(22)} viewBox="0 0 16 22" style={{marginRight: u(6)}}>
              <rect x={4.5} y={1} width={7} height={13} rx={3.5} fill="#8e8e93" />
              <path d="M1.5 10a6.5 6.5 0 0013 0M8 16.5V20" stroke="#8e8e93" strokeWidth={1.6} fill="none" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
      <div style={{position: 'absolute', bottom: u(8), left: '50%', width: u(140), height: u(5), marginLeft: -u(70), borderRadius: u(3), background: '#fff', opacity: 0.85}} />
    </div>
  );
};

// ------------------------------------------------------------- the screen

export const MessagesScreen: React.FC<Props> = ({events, clock, contact = 'Example'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // input field state: the latest outgoing text being composed, or a voice note recording
  let draft = '';
  let caret = false;
  let recording: number | null = null;
  for (const e of events) {
    if (e.kind === 'out') {
      const t = e.type ?? Math.max(18, Math.round(e.text.length * 1.6));
      const start = e.at - t - 8;
      if (f >= start && f < e.at) {
        const n = Math.floor(interpolate(f, [start, e.at - 8], [0, e.text.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
        draft = e.text.slice(0, n);
        caret = true;
      }
    }
    if (e.kind === 'voice' && e.recordFrom != null && f >= e.recordFrom && f < e.at) {
      recording = ((f - e.recordFrom) / fps) * (e.seconds / Math.max(0.5, (e.at - e.recordFrom) / fps));
    }
  }

  const shown = events.filter((e) => e.kind !== 'receipt' && f >= e.at);
  const typing = events.find((e) => (e.kind === 'in' || e.kind === 'file') && e.typingFrom != null && f >= e.typingFrom && f < e.at);
  const receipt = [...events].reverse().find((e) => e.kind === 'receipt' && f >= e.at) as Extract<PhoneEvent, {kind: 'receipt'}> | undefined;
  const lastOutIdx = (() => {for (let i = shown.length - 1; i >= 0; i--) if (shown[i].kind === 'out' || shown[i].kind === 'voice') return i; return -1;})();

  const side = (e: PhoneEvent) => (e.kind === 'out' || e.kind === 'voice' ? 'out' : e.kind === 'stamp' || e.kind === 'receipt' ? 'none' : 'in');

  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <StatusBar clock={clock} />
      <NavHeader contact={contact} />
      {/* thread: anchored to the bottom, new messages push older ones up (as iOS does) */}
      <div style={{position: 'absolute', left: 0, right: 0, top: u(146), bottom: u(92), display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', paddingBottom: u(10), overflow: 'hidden'}}>
        {shown.map((e, i) => {
          const next = shown[i + 1];
          const tail = !next || side(next) !== side(e);
          const gapAfter = next && side(next) === side(e) ? u(2.5) : u(10);
          const enter = spring({frame: f - e.at, fps, config: {damping: 17, mass: 0.6, stiffness: 170}});
          let node: React.ReactNode = null;
          if (e.kind === 'stamp') node = (
            <div style={{textAlign: 'center', fontFamily: SF, fontSize: u(12), lineHeight: `${u(16)}px`, color: MUTED, padding: `${u(4)}px 0 ${u(6)}px`}}>
              {e.text.split('\n').map((l, j) => <div key={j} style={{fontWeight: j === 0 ? 600 : 400}}>{l}</div>)}
            </div>);
          if (e.kind === 'out' || e.kind === 'in') node = <Bubble side={e.kind} tail={tail} enter={enter}><Rich text={e.text} /></Bubble>;
          if (e.kind === 'voice') node = <VoiceBubble seconds={e.seconds} transcript={e.transcript} enter={enter} tail={tail} />;
          if (e.kind === 'file') node = <FileBubble name={e.name} meta={e.meta} enter={enter} tail={tail} />;
          return (
            <div key={i} style={{marginBottom: gapAfter}}>
              {node}
              {i === lastOutIdx && receipt && receipt.at >= e.at && (
                <div style={{textAlign: 'right', padding: `${u(3)}px ${u(18)}px 0`, fontFamily: SF, fontSize: u(11.5), color: MUTED,
                  opacity: interpolate(f - receipt.at, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
                  <Rich text={receipt.text} />
                </div>
              )}
            </div>
          );
        })}
        {typing && <TypingBubble local={f - (typing as any).typingFrom} />}
      </div>
      <InputBar draft={draft} caret={caret && Math.floor(f / 16) % 2 === 0} recording={recording} frame={f} />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------- the device

export const PhoneDevice: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'relative', width: PHONE_W + u(24), height: PHONE_H + u(24), borderRadius: u(66),
    background: 'linear-gradient(145deg, #4a4c52 0%, #1d1e21 22%, #0d0d0f 50%, #26272b 78%, #55575d 100%)',
    padding: u(12), boxShadow: `0 ${u(40)}px ${u(120)}px rgba(0,0,0,0.65), 0 0 0 ${u(1)}px rgba(255,255,255,0.08) inset`}}>
    <div style={{position: 'relative', width: PHONE_W, height: PHONE_H, borderRadius: u(55), overflow: 'hidden', background: '#000',
      boxShadow: `0 0 0 ${u(1.5)}px #000`}}>
      {children}
      {/* dynamic island */}
      <div style={{position: 'absolute', top: u(11), left: '50%', width: u(124), height: u(36), marginLeft: -u(62), borderRadius: u(18), background: '#000', zIndex: 10}} />
      {/* glass sheen */}
      <AbsoluteFill style={{background: 'linear-gradient(115deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.04) 100%)', pointerEvents: 'none', zIndex: 11}} />
    </div>
    {/* side buttons */}
    <div style={{position: 'absolute', left: -u(3), top: u(190), width: u(4), height: u(62), borderRadius: u(2), background: '#3a3b40'}} />
    <div style={{position: 'absolute', left: -u(3), top: u(270), width: u(4), height: u(62), borderRadius: u(2), background: '#3a3b40'}} />
    <div style={{position: 'absolute', right: -u(3), top: u(230), width: u(4), height: u(98), borderRadius: u(2), background: '#3a3b40'}} />
  </div>
);
