<template>
    <div class="right-side__answers">
        <h4 class="answers__header">{{ answers.length > 0 ? 'Последние ответы' : 'Здесь будут отображаться последние ответы'}}</h4>
        <ul class="answers__list">
            <transition-group name="list" tag="p">
                <li class="list__item" v-for="answer in answers" :key="answer.text">
                    <div class="list-item__type" v-bind:class="{ user: answer.type === 102 }">{{ answer.type === 101 ? 'Компьютер' : 'Вы'}}</div>
                    <div class="list-item__answer">{{ answer.text }}</div> 
                    <div class="list-item__meta">
                        <div class="meta__text">{{ answer.meta }}</div>
                        <div class="meta__date">{{ answer.createdAt | date}}</div>
                    </div> 
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script lang="ts" src="./answers.ts"></script>
<style lang="scss" scoped src="./answers.scss"></style>
