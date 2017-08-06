'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isDropFrame = isDropFrame;
var getCueKeys = exports.getCueKeys = function getCueKeys(cues) {
	cues.map(function (o, i) {
		o.index = i;
	});
	return cues;
};
var getCues = exports.getCues = function getCues(url, callback) {
	var res = void 0;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			res = JSON.parse(xhttp.responseText);
			callback(res.res);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
};

var offset = exports.offset = function offset(el) {
	var rect = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};
var getPageX = exports.getPageX = function getPageX(e) {
	var x = void 0;
	if (e.originalEvent && e.originalEvent.changedTouches) {
		x = e.originalEvent.changedTouches[0].pageX;
	} else if (e.changedTouches) {
		// for Zepto
		x = e.changedTouches[0].pageX;
	} else {
		x = e.pageX;
	}
	return x;
};
var getCssMatrix = exports.getCssMatrix = function () {
	if ('WebKitCSSMatrix' in window) {
		return 'WebKitCSSMatrix';
	} else if ('MSCSSMatrix' in window) {
		return 'MSCSSMatrix';
	} else if ('CSSMatrix' in window) {
		return 'CSSMatrix';
	};
}();
function isDropFrame() {
	var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;

	return !(fps % 1 === 0);
}
var secondsToTimeCode = exports.secondsToTimeCode = function secondsToTimeCode(time) {
	var forceHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	var showFrameCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	var fps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 25;
	var secondsDecimalLength = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;


	time = !time || typeof time !== 'number' || time < 0 ? 0 : time;

	var dropFrames = Math.round(fps * 0.066666),
	    // Number of drop frames to drop on the minute marks (6%)
	timeBase = Math.round(fps),
	    framesPer24Hours = Math.round(fps * 3600) * 24,
	    framesPer10Minutes = Math.round(fps * 600),
	    frameSep = isDropFrame(fps) ? ';' : ':',
	    hours = void 0,
	    minutes = void 0,
	    seconds = void 0,
	    frames = void 0,
	    f = Math.round(time * fps);

	if (isDropFrame(fps)) {

		if (f < 0) {
			f = framesPer24Hours + f;
		}

		f = f % framesPer24Hours;

		var d = Math.floor(f / framesPer10Minutes);
		var m = f % framesPer10Minutes;
		f = f + dropFrames * 9 * d;
		if (m > dropFrames) {
			f = f + dropFrames * Math.floor((m - dropFrames) / Math.round(timeBase * 60 - dropFrames));
		}

		var timeBaseDivision = Math.floor(f / timeBase);

		hours = Math.floor(Math.floor(timeBaseDivision / 60) / 60);
		minutes = Math.floor(timeBaseDivision / 60) % 60;

		if (showFrameCount) {
			seconds = timeBaseDivision % 60;
		} else {
			seconds = (f / timeBase % 60).toFixed(secondsDecimalLength);
		}
	} else {
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

	var result = forceHours || hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '';
	result += (minutes < 10 ? '0' + minutes : minutes) + ':';
	result += '' + (seconds < 10 ? '0' + seconds : seconds);

	if (showFrameCount) {
		frames = (f % timeBase).toFixed(0);
		frames = frames <= 0 ? 0 : frames;
		result += frames < 10 ? frameSep + '0' + frames : '' + frameSep + frames;
	}

	return result;
};
var stToggle = exports.stToggle = function stToggle(e, VideoPlayerStore) {
	var _prefix = VideoPlayerStore._prefix;
	var newScreenType = VideoPlayerStore.screenType == 0 ? 1 : VideoPlayerStore.screenType == 1 ? 2 : 0;
	VideoPlayerStore.setValue({ screenType: newScreenType });
	var pc = e.target.closest('.' + _prefix + '-player-container');

	pc.classList.add('screen' + newScreenType);

	var x = [0, 1, 2];
	x.splice(newScreenType, 1);
	x.map(function (i) {
		pc.classList.remove('screen' + i);
	});

	switch (newScreenType) {
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
};