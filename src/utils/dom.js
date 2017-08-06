export const limitBetween = (n, min, max) => {
  if(n < min) n = min;
  if(n > max) n = max;
  return n;
}
export const getCueKeys = (cues) => {
  cues.map((o,i)=>{
        o.index = i;
    }
  );
  return cues;
}
export const getCues = (url, callback) => {
  let res;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        res =  JSON.parse(xhttp.responseText);
        callback(res.res);
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

export const offset = (el) => {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}
export const getPageX = (e) => {
	let x;
	if (e.originalEvent && e.originalEvent.changedTouches) {
		x = e.originalEvent.changedTouches[0].pageX;
	} else if (e.changedTouches) { // for Zepto
		x = e.changedTouches[0].pageX;
	} else {
		x = e.pageX;
	}
	return x;
}
export const getCssMatrix = (() => {
			if ('WebKitCSSMatrix' in window) {
				return 'WebKitCSSMatrix';
			} else if ('MSCSSMatrix' in window) {
				return 'MSCSSMatrix';
			} else if ('CSSMatrix' in window) {
				return 'CSSMatrix';
			};
})();
export function isDropFrame(fps = 25) {
	return !(fps % 1 === 0);
}
export const secondsToTimeCode = (time, forceHours = false, showFrameCount = false, fps = 25, secondsDecimalLength = 0) => {

	time = !time || typeof time !== 'number' || time < 0 ? 0 : time;

	let
		dropFrames = Math.round(fps * 0.066666), // Number of drop frames to drop on the minute marks (6%)
		timeBase = Math.round(fps),
		framesPer24Hours = Math.round(fps * 3600) * 24,
		framesPer10Minutes = Math.round(fps * 600),
		frameSep = isDropFrame(fps) ? ';' : ':',
		hours,
		minutes,
		seconds,
		frames,
		f = Math.round(time * fps)
	;

	if (isDropFrame(fps)) {

		if (f < 0) {
			f = framesPer24Hours + f;
		}

		f = f % framesPer24Hours;

		const d = Math.floor(f / framesPer10Minutes);
		const m = f % framesPer10Minutes;
		f = f + dropFrames * 9 * d;
		if (m > dropFrames) {
			f = f + dropFrames * (Math.floor((m - dropFrames) / (Math.round(timeBase * 60 - dropFrames))));
		}

		const timeBaseDivision = Math.floor(f / timeBase);

		hours = Math.floor(Math.floor(timeBaseDivision / 60) / 60);
		minutes = Math.floor(timeBaseDivision / 60) % 60;

		if (showFrameCount) {
			seconds = timeBaseDivision % 60;
		} else {
			seconds = ((f / timeBase) % 60).toFixed(secondsDecimalLength);
		}
	}
	else {
		hours = Math.floor(time / 3600) % 24;
		minutes = Math.floor(time / 60) % 60;
		if (showFrameCount) {
			seconds = Math.floor(time % 60);
		} else {
			seconds = (time % 60).toFixed(secondsDecimalLength);
		}
	}
	hours = hours <= 0 ? 0 : hours;
	minutes = minutes <= 0 ? 0 : minutes;
	seconds = seconds <= 0 ? 0 : seconds;

	let result = (forceHours || hours > 0) ? `${(hours < 10 ? `0${hours}` : hours)}:` : '';
	result += `${(minutes < 10 ? `0${minutes}` : minutes)}:`;
	result += `${(seconds < 10 ? `0${seconds}` : seconds)}`;

	if (showFrameCount) {
		frames = (f % timeBase).toFixed(0);
		frames = frames <= 0 ? 0 : frames;
		result += (frames < 10) ? `${frameSep}0${frames}` : `${frameSep}${frames}`;
	}

	return result;
}
export const stToggle = (e,VideoPlayerStore) => {
	let _prefix = VideoPlayerStore._prefix;
	let newScreenType = (VideoPlayerStore.screenType == 0) ? 1 : ((VideoPlayerStore.screenType == 1)  ?  2 : 0);
	VideoPlayerStore.setValue({screenType: newScreenType});
	let pc = e.target.closest(`.${_prefix}-player-container`);

	pc.classList.add(`screen${newScreenType}`);

	let x = [0,1,2];
	x.splice(newScreenType,1)
	x.map((i) => {
		pc.classList.remove(`screen${i}`);
	});

	switch(newScreenType){
		case 0:
			pc.classList.remove("isWide");
		break;
		case 1:
			pc.classList.add("isWide");
		break;
		case 2:
			pc.classList.remove("isWide");
		break;
	}
}
