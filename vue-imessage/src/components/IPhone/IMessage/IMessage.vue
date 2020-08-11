<template>
  <div>
    <div class="i-message-wrapper">
      <navbar v-if="elements.navbar" :info="iMessageData.info"></navbar>
      <messages v-if="elements.messages"></messages>
      <toolbar v-if="elements.toolbar"></toolbar>
      <keyboard v-if="elements.keyboard"></keyboard>
    </div>
    <div class="controls">
      
    </div>
  </div>
</template>


<script src="./IMessage.js"></script>

<style lang="scss" scoped>
  @import "./IMessage";
</style>
