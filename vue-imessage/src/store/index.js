import Vue from 'vue'
import Vuex from 'vuex'

import iMessageData from '../consts/iMessageSample2.js'
iMessageData.events = iMessageData.events.map(e => {e.id = Math.random(); return e});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iMessageData,
    messages: [
      //    {
      //   time: 50,
      //   event: 'message',
      //   type: 'to-me',
      //   val: 'I will call the police on you and you better return my phone.'
      // }, {
      //   time: 50,
      //   event: 'message',
      //   type: 'to-me',
      //   val: 'I will call the police on you and you better return my phone.'
      // }, {
      //   time: 50,
      //   event: 'message',
      //   type: 'from-me',
      //   img: 'https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314__340.jpg'
      // }, {
      //   time: 50,
      //   event: 'message',
      //   type: 'from-me',
      //   val: 'I will call the police on you and you better return my phone.'
      // }, {
      //   time: 50,
      //   event: 'message',
      //   type: 'to-me',
      //   val: 'I will call the police on you and you better return my phone.'
      // }, {
      //   time: 50,
      //   event: 'message',
      //   type: 'from-me',
      //   val: 'I will call the police on you and you better return my phone.'
      // }, {
      //   time: 50,
      //   event: 'waiting',
      //   type: 'add'
      // }
    ],
    elements: {
      keyboard: true,
      toolbar: true,
      navbar: true,
      messages: true,
      toolbarExpanded: false
    },
    status: {
      playing: false,
      curTime: 0,
      startTime: 0,
      frameNumber: 0,
      speed: iMessageData.speed
    },
    keyboard: {
      type: 'uppercase',
      key: ''
    },
    textWriter: ''
  },
  mutations: {
    messageAdd (state, msg) {
      if (msg.val || msg.img) {
        state.messages.push(msg);
      }
    },
    statusAdd (state, msg) {
      state.messages = state.messages.filter(msg => msg.event !== 'status');
      state.messages.push(msg);
    },
    waitingAdd (state, msg) {
      state.messages.push(msg);
    },
    waitingRemove (state) {
      state.messages.splice(-1);
    },
    start (state) {
      state.status.playing = true;
    },
    stop (state) {
      state.status.playing = false;
    },
    messageWriter (state, payload) {
      state.textWriter = payload;
    },
    clearWriter (state) {
      state.textWriter = '';
    },
    keyPressed (state, key) {
      state.keyboard.key = key;
    },
    keyboardChanged (state, type) {
      state.keyboard.type = type;
    },
    toolbarExpanded (state, val) {
      state.elements.toolbarExpanded = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
