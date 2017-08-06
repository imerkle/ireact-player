import React from 'react';
import { render } from 'react-dom';

import { VideoPlayer } from 'utube';

import BundleStyles from '../../src/BundleStyles.js';
import { MuiThemeProvider } from 'material-ui/styles';
import { Icon } from 'material-ui';


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
          textAlign: 'center',
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

render(
    <Header
      logo={
        <Icon color="inherit" style={{fontSize: '80px'}}>{'play_arrow'}</Icon>
      }
      logohead="iReact Player"
      tagline="Modern Sleek Extensible React Player"
      >
      <div className="ut-player-container">
        <VideoPlayer autoQuality={false} style={{width:640,height:360,textAlign: 'left'}}
          src={[
            {
              src: 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd',
              src: 'https://www.youtube.com/watch?v=LCZ-cxfxzvk',
              src: 'https://www.youtube.com/watch?v=vZiUBoZ454E',
              src: 'assets/Kurzweil-K2000-Dual-Bass-C1.wav',
              src: 'assets/You found Me.mp3',
              src: 'assets/Dogs Just Don\'t Want to Bath 2015 [HD].mp4',
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
    </Header>
  ,document.getElementById('app'));
  /*
  highres, hd1080, hd720, large, medium and small
  */
