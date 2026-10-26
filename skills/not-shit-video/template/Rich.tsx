import React from 'react';
// Plain text and line breaks only. Match the real channel's text contract.
export const Rich: React.FC<{text: string}> = ({text}) => <span style={{whiteSpace: 'pre-wrap'}}>{text}</span>;
