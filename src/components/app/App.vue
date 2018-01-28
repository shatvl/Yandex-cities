<template>
  <div id="app" class="container">
      <div class="container__header">
          <div class="header__text">YandexCities Game</div>
      </div>
      <div class="container__main-content" v-bind:class="{ report: showReport }">
          <div class="main-content__left-side">
            <ymap></ymap>
            <field></field>
          </div>
          <div class="main-content__right-side">
              <answers></answers>
              <bot></bot>
          </div>
      </div>
      <div class="container__report">
        <report v-if="showReport"></report>
      </div>
      <div class="container__notifications">
          <notify v-show="showNotify" 
                  :type="notificationOptions.type"
                  :message="notificationOptions.message"
                  :title="notificationOptions.title">
          </notify>
      </div>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>
<style lang="scss" src="./app.scss"></style>
