import { HTML5, Youtube } from '../renderers'

import React from 'react';
export default function getVendor({src, vendor,props}) {
  src = src || ''

  if (vendor === 'youtube' || /youtube.com|youtu.be/.test(src)) {
    return { vendor: 'youtube', component: <Youtube {...props} /> }
  }
  else if (vendor === 'vimeo' || /vimeo.com/.test(src)) {
    return { vendor: 'vimeo', component: <Vimeo {...props}/> }
  }
  else {
    const isAudio = (vendor === 'audio' || /\.(mp3|wav|m4a)($|\?)/i.test(src))
    return { vendor: isAudio ? 'audio' : 'video', component: <HTML5 {...props}/> }
  }
}
