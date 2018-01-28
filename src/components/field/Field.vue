<template>
  <div class="input-field">
      <h4 class="input-field__header">{{ text ? text : 'Введите название любого города'}}</h4>
      <div class="input-field__input">
        <form class="input__form" name="city" @submit.prevent="addCity()">   
            <input type="text" class="input input_theme_light" v-model.trim="city">
                <ul class="input__errors-list">
                    <transition-group name="slide-fade" tag="p">
                        <li :key="'length'" class="errors-list__item" v-if="city.length > 0 && !validation.length">Название должно быть более 2 символов</li>
                        <li :key="'letter'" class="errors-list__item" v-if="city.length > 0 && !validation.letter">Название должно начинаться на букву {{ letter }}</li>
                    </transition-group>
                </ul>
            <button type="button" class="button" :disabled="!validation.length || !validation.letter" @click="addCity()">Ответить</button>
            <span class="show-report" @click="finish()">Завершить игру и показать отчёт</span>
        </form>
      </div>
      <div class="input-field__speach speach_theme_small_icon"></div>
  </div> 
</template>

<script lang="ts" src="./field.ts"></script>
<style lang="scss" src="./field.scss" scoped></style>
