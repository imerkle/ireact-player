[Live Demo](https://dsslimshaddy.github.io/utube/)

IReactPlayer
===========

[![Latest npm version](https://img.shields.io/npm/v/ireact-player.svg)](https://www.npmjs.com/package/ireact-player)
[![Build Status](https://img.shields.io/circleci/project/github/dsslimshaddy/utube/master.svg)](https://circleci.com/dsslimshaddy/utube)
[![Dependency Status](https://img.shields.io/david/dsslimshaddy/utube.svg)](https://david-dm.org/dsslimshaddy/utube)
[![devDependency Status](https://img.shields.io/david/dev/dsslimshaddy/utube.svg)](https://david-dm.org/dsslimshaddy/utube?type=dev)

A react component for playing a variety of URLs, including file paths, YouTube.

The component parses a URL and loads in the appropriate markup and external SDKs to play media from [various sources](#supported-media). [Props](#props) can be passed in to control playback and react to events such as buffering or media ending.

### Usage

```bash
yarn add ireact-player
```

```js
import React, { Component } from 'react'
import { VideoPlayer: IReactPlayer } from 'ireact-player'

class App extends Component {
  render () {
    return <IReactPlayer src='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
  }
}
```

See [the demo source](https://github.com/dsslimshaddy/utube/blob/master/docs/src/index.js) for a full example.

For platforms like [Meteor](https://www.meteor.com) without direct use of `yarn` modules, a minified version of `IReactPlayer` is located in `build` after installing. To generate this file yourself, checkout the repo and run `yarn run build`

### Demo

See a [live demo](https://dsslimshaddy.github.io/utube/), or run:

```bash
git clone https://github.com/dsslimshaddy/utube.git
cd utube
yarn install
yarn run start
open http://localhost:3000
```
# Peer Dependency
It is based on [`material-ui`](https://github.com/callemall/material-ui/tree/v1-beta) and a tiny [`material-son`](https://github.com/dsslimshaddy/material-son) wrapper to extend some features of `material-ui`.

It uses [`mobx`](https://github.com/mobxjs/mobx) to manage store.


### Props

Prop | Description | Default
---- | ----------- | -------
`src` | The url of a video or song to play. Can also be a array see demo
`markers` | To create markers `[{start: 23,end: 35,color: 'green'}...]` | `[]`
`stats` | An array of `[{label:"",value: ""}...]` to show dev stats | `false`
`holdToDisplay` | Seconds of delay before context menu appear( for mobile )  | `-1`
`separator` | The separator of timecode | `/`
`bounds` | Bounds of which you can drag the player (only on dragmode) | `body`
`isAutoQuality` | Sets the Auto Quality playback | `false`
`style` | Add [inline styles](https://facebook.github.io/react/tips/inline-styles.html) to the root element
`autoplay` | The player plays automatically | `false`
`poster` | A image url to show as poster of video | `""`
`caption_url` | Sets the url of caption source file | `""`
`thumbnail_url` | Sets the url of thumbnail source file | `""`
`annotation_url` | Sets the url of annotation source file | `""`
`extenstionLayers` | To add extension/plugin layers on top of video. This also gets the whole `VideoPlayerStore` (mobx) therefore you will be fully able to control the player. | `[]`
### Mobile considerations

Due to various restrictions, `iReactPlayer` is not guaranteed to function properly on mobile devices. The [YouTube player documentation](https://developers.google.com/youtube/iframe_api_reference), for example, explains that [certain mobile browsers require user interaction](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations) before playing:

> The HTML5 `<video>` element, in certain mobile browsers (such as Chrome and Safari), only allows playback to take place if it's initiated by a user interaction (such as tapping on the player).


#### Multiple Sources and Tracks

When playing file paths, an array of sources can be passed to the `url` prop to render multiple `<source>` tags.

```jsx
<IReactPlayer src={[src: 'foo_720.mp4',src: 'foo_480.mp4']} />
```


```jsx
<IReactPlayer
  src={[
    {src: 'foo_720.mp4', value: 720},
    {src: 'foo_480.mp4', value: 480}
  ]}
/>
```

`caption_url` elements for subtitles can be added using `props`:

```jsx
<IReactPlayer
  src='foo.webm'
  caption_url="https://gist.githubusercontent.com/dsslimshaddy/ca3163ba1cb1d610f3b1aef3cb51eecf/raw"
/>
```


### Methods

Use [`ref`](https://facebook.github.io/react/docs/refs-and-the-dom.html) to call methods on the player. See [the demo app](docs/src/index.js) for an example of this.



### Supported media

* YouTube videos use the [YouTube iFrame Player API](https://developers.google.com/youtube/iframe_api_reference)
* [Supported file types](https://github.com/dsslimshaddy/utube/blob/master/src/players/FilePlayer.js#L5-L6) are playing using [`<video>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/video) or [`<audio>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) elements
  * HLS streams are played using [hls.js](https://github.com/video-dev/hls.js)
  * DASH streams are played using [dash.js](https://github.com/Dash-Industry-Forum/dash.js)

### ROADMAP
- [ ] fix youtube quality change
- [ ] smoothen the quality change transition
- [ ] add more playback ( facebook , Soundcloud etc ) 
- [ ] add tests
- [ ] Improve docs and props
### Thanks

* Anyone who has [contributed](https://github.com/dsslimshaddy/utube/graphs/contributors)

# Bugs
- *Thumbnails are are from youtube and not with proper timing/position(only in demo)*
- *Youtube quality change not working for some bug*
