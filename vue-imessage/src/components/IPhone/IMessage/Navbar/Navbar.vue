<template>
  <div class="navbar-wrapper">
    <div class="navbar-back-btn">
      <img src="@/assets/back-button.svg">
    </div>
    <img class="navbar-avatar" :src="info.avatar || require('@/assets/empty-avatar.jpg')">
    <p class="navbar-text">{{info.text}}</p>
  </div>
</template>


<script src="./Navbar.js"></script>

<style lang="scss" scoped>
  @import "./Navbar";
</style>


