[Live Demo](https://dsslimshaddy.github.io/utube/)

IReactPlayer
===========

[![Latest npm version](https://img.shields.io/npm/v/ireact-player.svg)](https://www.npmjs.com/package/ireact-player)
[![Build Status](https://img.shields.io/circleci/dsslimshaddy/utube/master.svg)](https://circleci.com/dsslimshaddy/utube)
[![Dependency Status](https://img.shields.io/david/dsslimshaddy/utube.svg)](https://david-dm.org/dsslimshaddy/utube)
[![devDependency Status](https://img.shields.io/david/dev/dsslimshaddy/utube.svg)](https://david-dm.org/dsslimshaddy/utube?type=dev)

A react component for playing a variety of URLs, including file paths, YouTube.

The component parses a URL and loads in the appropriate markup and external SDKs to play media from [various sources](#supported-media). [Props](#props) can be passed in to control playback and react to events such as buffering or media ending.

### Usage

```bash
npm install ireact-player --save
```

```js
import React, { Component } from 'react'
import IReactPlayer from 'ireact-player'

class App extends Component {
  render () {
    return <IReactPlayer src='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
  }
}
```

See [the demo source](https://github.com/dsslimshaddy/utube/blob/master/docs/src/index.js) for a full example.

For platforms like [Meteor](https://www.meteor.com) without direct use of `npm` modules, a minified version of `IReactPlayer` is located in `build` after installing. To generate this file yourself, checkout the repo and run `npm run build`

### Demo

See a [live demo](http://dsslimshaddy.com/ireact-player), or run:

```bash
git clone https://github.com/dsslimshaddy/utube.git
cd ireact-player
npm install
npm start
open http://localhost:3000
```

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

### Contributing

See the [contribution guidelines](https://github.com/dsslimshaddy/utube/blob/master/CONTRIBUTING.md) before creating a pull request.

### Thanks

* Anyone who has [contributed](https://github.com/dsslimshaddy/utube/graphs/contributors)

- *Thumbnails are are from youtube and not with proper timing/position in demo*
- *Youtube quality change not working for some bug*
