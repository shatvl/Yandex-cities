<template>
  <div class="report">
        <h3 class="report__header">
            Игра завершена {{ groupedAnswers ? '(выиграл ' + (groupedAnswers[102] >= groupedAnswers[101] || !groupedAnswers[102] ? 'компьютер)' : 'пользователь)') : '' }}. Результаты игры.
        </h3>
        <div class="report__container">
            <div class="report-container__user">
                <h4 class="report-user__header">Ваши ответы ({{ groupedAnswers[102] ? groupedAnswers[102].length : 0 }})</h4>
                <ul class="report-user__list">
                    <li class="list__item" v-for="answer in groupedAnswers[102]" :key="answer.text" v-if="answer.type">
                        <div class="list-item__answer">{{ answer.text }}</div> 
                        <div class="list-item__meta">
                            <div class="meta__text">{{ answer.meta }}</div>
                            <div class="meta__date">{{ answer.createdAt | date}}</div>
                        </div> 
                    </li>
                </ul>
            </div>
            <div class="report-container__computer">
                <h4 class="report-computer__header">Ответы компьютера ({{ groupedAnswers[101] ? groupedAnswers[101].length : 0 }})</h4>
                <ul class="report-computer__list">
                    <li class="list__item" v-for="answer in groupedAnswers[101]" :key="answer.text" v-if="answer.type">
                        <div class="list-item__answer">{{ answer.text }}</div> 
                        <div class="list-item__meta">
                            <div class="meta__text">{{ answer.meta }}</div>
                            <div class="meta__date">{{ answer.createdAt | date}}</div>
                        </div> 
                    </li>
                </ul>
            </div>
        </div>
        <div class="button-container">
            <button class="button" @click="tryAgain()">Начать заново</button>
        </div>
  </div>
</template>

<style src="./report.scss" lang="scss" scoped></style>
<script src="./report.ts" lang="ts"></script>
