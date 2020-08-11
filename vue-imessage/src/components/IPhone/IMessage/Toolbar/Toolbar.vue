<template>
  <div class="toolbar-wrapper" :class="{keyboard: elements.keyboard}">

    <transition name="slide">
      <div class="toolbar-buttons-main" :class="{expanded: elements.toolbarExpanded}">
        <img src="@/assets/b1.svg">
        <img src="@/assets/b2.svg">
        <img src="@/assets/b3.svg">
      </div>
    </transition>

    <textwriter></textwriter>

  </div>
</template>


<script src="./Toolbar.js"></script>

<style lang="scss" scoped>
  @import "./Toolbar";
</style>
