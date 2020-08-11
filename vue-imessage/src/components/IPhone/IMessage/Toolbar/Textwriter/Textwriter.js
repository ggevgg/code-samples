import { mapState } from 'vuex';

export default {
  data () {
    return {
      frameNumber: 0,
      curTime: 0,
      startTime: 0,
      val: '',
      length: 0,
      previousLength: 0
    };
  },
  props: {
  },
  mounted () {
    this.frameNumber = 0;
    this.curTime = 0;
    this.startTime = 0;
  },
  methods: {

    start () {
      if (!this.textWriter) {
        this.clear();
      }
      this.frameNumber = 0;
      this.curTime = 0;
      this.startTime = 0;
      window.requestAnimationFrame(this.playFrame.bind(this));
    },
  
    stop () {
    },
  
    clear () {
      this.val = '';
      this.keyboard.type !== 'uppercase' && this.$store.commit('keyboardChanged', 'uppercase');
      this.$store.commit('keyPressed', '');
      this.$store.commit('toolbarExpanded', false);
      this.length = 0;
    },
  
    playFrame () {
      if (!this.status.playing || !this.textWriter) {
        return;
      }

      const timestamp = + new Date();
  
      if (!this.startTime) {
        this.startTime = timestamp;
      }
  
      let frame = this.textWriter.val[this.frameNumber];
      while (frame && this.curTime + frame.time <= (timestamp - this.startTime) * this.status.speed) {
        this._applyFrame(frame);
        this.curTime += frame.time;
        frame = this.textWriter.val[++this.frameNumber];
      }
  
      if (frame) {
        window.requestAnimationFrame(this.playFrame.bind(this));
      }
    },
  
    _applyFrame (frame) {

      if (frame.event === 'up') {
        this.$store.commit('keyPressed', '');
        return;
      }
      
      this.val = frame.val;
      this.length = frame.length;
      const lastChar = frame.val && frame.val.substr(-1);

      // todo refactor && move to consts
      if (lastChar.charCodeAt() >= 97 && lastChar.charCodeAt() <= 122) {
        this.keyboard.type !== 'lowcase' && this.$store.commit('keyboardChanged', 'lowcase');
      } else if (lastChar.charCodeAt() >= 39 && lastChar.charCodeAt() <= 47) {
        this.keyboard.type !== 'symbols' && this.$store.commit('keyboardChanged', 'symbols');
      } else if (lastChar.charCodeAt() >= 48 && lastChar.charCodeAt() <= 57) {
        this.keyboard.type !== 'numbers' && this.$store.commit('keyboardChanged', 'numbers');
      } else if (lastChar.charCodeAt() >= 1072 && lastChar.charCodeAt() <= 1103) {
        this.keyboard.type !== 'numbers' && this.$store.commit('keyboardChanged', 'lowcase_ru');
      } else if (lastChar.charCodeAt() >= 1040 && lastChar.charCodeAt() <= 1071) {
        this.keyboard.type !== 'numbers' && this.$store.commit('keyboardChanged', 'uppercase_ru');
      } else if (lastChar.charCodeAt() === 32) {
        // this.keyboard.type !== 'numbers' && this.$store.commit('keyboardChanged', 'numbers');
      } else {
        this.keyboard.type !== 'uppercase' && this.$store.commit('keyboardChanged', 'uppercase');
      }

      if (lastChar && this.previousLength <= frame.val.length) {
        this.$store.commit('keyPressed', lastChar);
      } else if (this.previousLength > frame.val.length) {
        this.$store.commit('keyPressed', '⌫');
      }
      this.previousLength = frame.val.length;

      
      if (frame.val.length > 20 && !this.elements.toolbarExpanded) {
        this.$store.commit('toolbarExpanded', true);
      } else 
      if (frame.val.length <= 20 && this.elements.toolbarExpanded) {
        this.$store.commit('toolbarExpanded', false);
      }

    },
  
    _setCursorPosition (position) {
      if (!this.$refs.input.childNodes[0]) {
        return;
      }
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(this.$refs.input.childNodes[0], position);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      this.$refs.input.focus();
    }
  },
  directives: {},
  components: {
  },
  computed: {
    ...mapState([
      'elements',
      'textWriter',
      'status',
      'keyboard',
      'iMessageData'
    ]),
    getExternalStyles () {
      return `font-size:${this.iMessageData.styles.writerFontSize}px;`;
    }
  },
  watch: {
    textWriter() {
      this.start();
    },
  },
  updated () {
    this._setCursorPosition(this.$refs.input.textContent.length);
  }
};
