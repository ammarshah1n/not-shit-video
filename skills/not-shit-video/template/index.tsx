import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Film} from './Film';
const Root: React.FC = () => <Composition id="Film" component={Film} width={3840} height={2160} fps={60} durationInFrames={1800} />;
registerRoot(Root);
