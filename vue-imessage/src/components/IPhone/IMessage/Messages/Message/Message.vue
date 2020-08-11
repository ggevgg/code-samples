<template>
  <p :class="classes" class="message-wrapper" :style="getExternalStyles">
    {{message.val}}
    <img class="message-image" v-if="message.img" :src="message.img">
    <waiting v-if="message.event === 'waiting'"></waiting>
    <transition name="fade" appear>
      <span class="message-status" v-if="message.status">{{message.status}}</span>
    </transition>
  </p>

</template>


<script src="./Message.js"></script>

<style lang="scss" scoped>
  @import "./Message";
</style>