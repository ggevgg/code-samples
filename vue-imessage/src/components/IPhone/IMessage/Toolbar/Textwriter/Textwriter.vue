<template>
  <div class="textwriter-wrapper">
    <div ref="input" class="textwriter" :class="{expanded: elements.toolbarExpanded, empty: length === 0}" contenteditable="true" :style="getExternalStyles">
      {{val}}
    </div>
    <img class="textwriter-send" :src="require(elements.toolbarExpanded ? '@/assets/send.svg' : '@/assets/mic.svg')">
  </div>
</template>


<script src="./Textwriter.js"></script>

<style lang="scss" scoped>
  @import "./Textwriter";
</style>
