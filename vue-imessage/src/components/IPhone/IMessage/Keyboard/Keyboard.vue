<template>
  <div class="keyboard-wrapper">

      <div id="lowcase">
        <div class="row" v-for="(row, idx) in layouts[keyboard.type]" :key="idx">
          <div class="key" v-for="button in row" :key="button.key" :class="getClass(button)">
            <span :class="{transparent: showPopout(button)}">{{button.key}}</span>
            <div class="popout" v-if="showPopout(button)">
              <div class="head">{{button.key}}</div>
              <div class="neck"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>


<script src="./Keyboard.js"></script>

<style lang="scss" scoped>
  @import "./Keyboard";
</style>