import React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { VideoPlayer } from 'utube';

import BundleStyles from '../../src/BundleStyles.js';
import { MuiThemeProvider } from 'material-ui/styles';
import { Icon } from 'material-ui';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class Header extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div style={{
        height: '500px',
        color: 'white',
      }} >
        <div style={{
          position: 'absolute',
          left: '0',
          top: '20%',
          right: '0',
          transform: 'skewY(-12deg)',
          zIndex: '-1',
        }}>
          <div style={{
            background: 'radial-gradient(farthest-corner at 0px 6000px, #61045f 0%, #282d4c 100%)',
            height: '2000px',
            position: 'absolute',
            top: 'auto',
            left: '0',
            right: '0',
            bottom: '-340px',
          }}>
          </div>
        </div>

        <div style={{
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '50px',
        }}>
          {this.props.logo}
          <div style={{
            marginLeft: '20px',
          }}>
            {this.props.logohead}
          </div>
        </div>
        <div style={{
          fontSize: '30px',
          textAlign: 'center',
        }}>
          {this.props.tagline}
        </div>
        <div style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}


const LivePlayer = (`
    <div className="ut-player-container" style={{textAlign: 'left',width: '100%',height: '480px'}}>
            <VideoPlayer isAutoQuality={false} style={{width:640,height:360,textAlign: 'left'}}
              poster={'https://img.youtube.com/vi/iRZ2Sh5-XuM/hqdefault.jpg'}
              src={[
                {
                  src: "assets/store_720.mp4",
                  value: 720,
                  size: 12.9,
                  duration: 0.48,
                  fps: 60,
                  default: true,
                },
                {
                  src: 'assets/store_480.mp4',
                  value: 480,
                  size: 4.3,
                  duration: 0.48,
                },
                {
                  src: 'assets/store_144.webm',
                  value: 144,
                  size: 0.4822,
                  duration: 0.48,
                }
              ]}
              annotation_url={'https://gist.githubusercontent.com/imerkle/ca3163ba1cb1d610f3b1aef3cb51eecf/raw?cache='+Math.random()}
              caption_url={'https://gist.githubusercontent.com/imerkle/ca3163ba1cb1d610f3b1aef3cb51eecf/raw?cache='+Math.random()}
              thumbnail_url={'https://gist.githubusercontent.com/imerkle/573ac377a38666c97dcb96b0c02610b1/raw?cache='+Math.random()}
              markers={[
                {start: 10},
                {start: 23,end: 35,color: 'green'},
              ]}
            />
          </div>
`).trim();
const createApp = (VideoPlayer) => (
  <Header
    logo={
      <Icon color="inherit" style={{fontSize: '80px'}}>{'play_arrow'}</Icon>
    }
    logohead="iReact Player"
    tagline="Modern Sleek Extensible React Player"
    >
    <LiveProvider code={LivePlayer} scope={{VideoPlayer}} >
      <LivePreview />
      <LiveEditor />
      <LiveError />
   </LiveProvider>
  </Header>
);
const App = () => (
  createApp(VideoPlayer)
)
  /*

  src: 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd',
  src: 'https://www.youtube.com/watch?v=LCZ-cxfxzvk',
  src: 'https://www.youtube.com/watch?v=vZiUBoZ454E',
  src: 'assets/Kurzweil-K2000-Dual-Bass-C1.wav',
  src: 'assets/You found Me.mp3',
  src: 'assets/Dogs Just Don\'t Want to Bath 2015 [HD].mp4',

  highres, hd1080, hd720, large, medium and small
  extenstionLayers={
    [
      {
        'label' : 'errortv',
        'store' : {},
        'component': <ErrorTv />,
        'settings': '',
      }
    ]
  }
  */

  const rootEl = document.querySelector('#app');

  render(
    <AppContainer
      errorReporter={({ error }) => {
        throw error;
      }}
    >
        <App />
    </AppContainer>,
    rootEl,
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('utube', () => {
      const NextVideoPlayer = require('utube/VideoPlayer').default; // eslint-disable-line global-require
      const NextApp = () => (createApp(NextVideoPlayer))
      render(
        <AppContainer
          errorReporter={({ error }) => {
            throw error;
          }}
        >
          <NextApp />
        </AppContainer>,
        rootEl,
      );
    });
  }
