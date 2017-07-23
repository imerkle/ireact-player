import React from 'react';
import { render } from 'react-dom';

import { VideoPlayer } from 'utube';

import BundleStyles from '../../src/BundleStyles.js';
import { MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

render(
    <div>
      <div className="ut-player-container">
        <VideoPlayer autoQuality={false} style={{width:840,height:480}}
          src={[
            {
              src: 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd',
              src: 'https://www.youtube.com/watch?v=vZiUBoZ454E',
              src: 'https://www.youtube.com/watch?v=LCZ-cxfxzvk',
              src: 'assets/A real life emoji snake.mp4',
              value: 240,
              size: 20,
              duration: 6.08*60,
              default: true,
            },
            {
              src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
              value: 360,
              size: 30,
              duration: 3.04*60,
            },
            {
              src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4',
              value: 720,
              fps: 60,
              size: 30,
              duration: 2.51*60,
            }
          ]}
          annotation_url={'https://gist.githubusercontent.com/dsslimshaddy/ca3163ba1cb1d610f3b1aef3cb51eecf/raw?cache='+Math.random()}
          caption_url={'https://gist.githubusercontent.com/dsslimshaddy/ca3163ba1cb1d610f3b1aef3cb51eecf/raw?cache='+Math.random()}
          //src="https://www.youtube.com/watch?v=sLprVF6d7Ug"

/*
          extenstionLayers={
            [
              {
                "label" : "errortv",
                "store" : {},
                "component": <ErrorTv />,
                "settings": "",
              }
            ]
          }
*/
        />
      </div>
    </div>
  ,document.getElementById('app'));
  /*
  highres, hd1080, hd720, large, medium and small
  */
