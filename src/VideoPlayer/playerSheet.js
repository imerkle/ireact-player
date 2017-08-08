const secondaryColor = '#f8f8f8';
const black = 'rgba(0, 0, 0, 0.8)';

export const primaryPalette = {
    50: '#fde6e7',
    100: '#fbc0c2',
    200: '#f8969a',
    300: '#f56b72',
    400: '#f34c53',
    500: '#f12c35',
    600: '#ef2730',
    700: '#ed2128',
    800: '#eb1b22',
    900: '#e71016',
    A100: '#ffffff',
    A200: '#ffe0e1',
    A400: '#ffadaf',
    A700: '#ff9496',
    'contrastDefaultColor': 'light',
};

export const vplayer = {
  primaryColor: '#f12c35',
  primaryColorLight: '#fb3942',
  secondaryColor: secondaryColor,
  disabledPrimary: '#bdbdbd',
  disabledSecondary: '#5e5e5e',
  black: black,

  themePrimary: '#FFF',
  searchBarWidthClosed: '150px',
  searchBarWidthOpened: '250px',

  loadedColor: 'rgba(255, 255, 255, .3)',
  hoveredColor: 'rgba(255,255,255,.5)',
  negativehoveredColor: 'rgba(0,0,0,.2)',
  totalColor: 'rgba(255, 255, 255, 0.3)',

  primaryColorVolume: '#f8f8f8',
  primaryColorLightVolume: '#ffffff',

  totalheight: '5px',
  totalheightCompressed: '3px',
  handleDimension: '5px',
  handleTop: '-4px',

  totalheightVolume: '3px',
  handleBorder: '4px',
  handleBorderVolume: '3px',

  widthVolume: '80px',
  compressedWidthVolume: '30px',
  volumeTransitionTime: '.05s',

  markerColor: '#d9c01a',
}
const hideBottom = {
  bottom: '-15%',
  transition: '.15s linear bottom',
};
export const styleProps = {
  unhinder: {},
  player: {
    background: '#141414',
  },
  fullHW: {
    width: '100%',
  	height: '100%',
  },
  layers: {
    '& > div': {
      position: 'absolute',
    }
  },
  layer_root: {
    position: 'relative',
    overflow: 'hidden',
  },
  context_root: {
    backgroundColor: black,
    zIndex: 10,
    minWidth: '250px',
  },
  nerdPaper: {
    backgroundColor: black,
    margin: '15px',
  },
  nerdUL: {
    listStyle: 'none',
    padding: '5px',
    color: secondaryColor,
    fontSize: '12px',
    padding: '10px 20px',
    '& li': {
      padding: '2px',
      '& label': {
        fontWeight: 'bold',
        marginRight: '5px',
        '&:after': {
          content: ":"
        }
      }
    }
  },
  videoLayer: {
    '& video': {
      height: '100%',
      width: '100%',
    }
  },
  controlsLayer: {
    width: '100%',
    zIndex: '10',
    color: secondaryColor,
    fontSize: '13px',
    ...hideBottom
  },
  controlBg: {
    position: 'absolute',
  	bottom: '0',
  	height: '100px',
  	width: '100%',
  	backgroundImage: 'url(https://i.imgur.com/uMopswI.png)',
  	backgroundRepeat: 'repeat-x',
  	pointerEvents: 'none',
  	backgroundPosition: 'bottom',
    ...hideBottom
  },
  playpauseLayer: {
    top: '0',
    position: 'absolute',
    zIndex: '1',
  	display: 'flex',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  playpauseanimate: {
  	opacity: '0',
  	transformOrigin: 'bottom',
    transition: '1s linear all',
    pointerEvents: 'none',
    zIndex: '10',
  	background: 'hsla(0, 0%, 0%, .3)',
    borderRadius: '50%',
    color: secondaryColor,
    '&.beginanimate': {
      animation: 'playpauseFadeAnimate 1s ease-out',
    }
  },
  iconButton: {
    height: 24,
    padding: 0,
    color: secondaryColor,
  },
  buffer: {
    pointerEvents: 'none',
  },
  midIcon: {
    fontSize: '80px',
    opacity: '.7',
    transition: '.15s linear opacity',
    color: secondaryColor,
  },
  midIconContainer: {
    cursor: 'pointer',
    '&:hover $midIcon':{
      opacity: '1',
    }
  },
  dragger: {
    background: black,
  	flexDirection: 'row-reverse',
    padding: '6px 0px',
  	cursor: 'pointer',
    visibility: 'hidden',
  },
  screen_0: {},
  screen_1:{
    width: '100%',
  	position: 'relative',
  },
  screen_2: {},
  rndfix: {
    transform: 'none!important',
    position: 'inherit!important',
  },
  rnd: {
    cursor : 'default!important',
    '&$screen_2':{
      '& > div':{
        display: 'flex',
        flexDirection: 'row',
      },
      '& $dragger': {
        visibility: 'visible',
      },
    },
    '&$screen_1': {
      extend: 'rndfix',
      width: '100%!important',
      '& > div':{
        width: '100%!important',
      },
    },
    '&$screen_1': {
      extend: 'rndfix',
    },
  },
  isFullScreen: {
    height: '100%!important',
  	width: '100%!important',
  },
  showControls: {
    '& $controlsLayer':{
      bottom: '0',
    }
  }
};
