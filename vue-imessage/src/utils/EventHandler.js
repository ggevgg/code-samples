class EventHandler {
  constructor({
    // el,
    // events,
    // textWriter,
    speed
  } = {}) {
    this._playing = false;
    this._curTime = 0;
    this._startTime = 0;
    this._frameNumber = 0;
    
    // this._el = el;
    // this._events = events;
    // this._textWriter = textWriter;
    this._speed = speed || 1;
  }

  start (events) {
    if (!this.events) {
      return;
    }
    this._frameNumber = 0;
    this._curTime = 0;
    this._startTime = 0;
    this._events = events;
    this._playing = true;
    window.requestAnimationFrame(this._playFrame.bind(this));
  }

  stop () {
    this._playing = false;
    this._textWriter.stop();
  }

  _playFrame () {
    if (!this._playing) {
      return;
    }

    const timestamp = + new Date();

    if (!this._startTime) {
      this._startTime = timestamp;
    }

    let frame = this._events[this._frameNumber];
    
    while (frame && this._curTime + frame.time <= (timestamp - this._startTime) * this._speed) {
      this._applyFrame(frame);
      this._curTime += frame.time;
      frame = this._events[++this._frameNumber];
    }

    if (frame) {
      window.requestAnimationFrame(this._playFrame.bind(this));
    }

  }

  _applyFrame (frame) {
    // console.log(frame, this._curTime);
    if (frame.event === 'messageWriter') {
      frame.type === 'clear'
        ? this._textWriter.clear()
        : this._textWriter.start(frame.val);
    } else
    if (frame.event === 'message') {
      message.apply(frame);
    } else 
    if (frame.event === 'waiting') {
      waiting.apply(frame);
    }
  }
}

export default EventHandler;
