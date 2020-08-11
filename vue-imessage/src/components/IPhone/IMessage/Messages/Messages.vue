<template>
  <div class="messages-wrapper" :class="{keyboard: elements.keyboard}" ref="messagesWrapper">
    <message v-for="(message, idx) in messages" :key="message.id" :message="message" :idx="idx" :last="detectLast(message, messages[idx + 1])">
    </message>
  </div>
</template>


<script src="./Messages.js"></script>

<style lang="scss" scoped>
  @import "./Messages";
</style>
