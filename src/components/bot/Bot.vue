<template>
    <div class="right-side__bot">
        <div class="bot__action-text">{{ !text ? 'Компьютер в ожидании вашего ответа' : text }}</div>
        <sync-loader :loading="true" :color="'#ffdb4d'" :size="'20px'"></sync-loader>
    </div>
</template>

<script lang="ts" src="./bot.ts"></script>
<style lang="scss" scoped src="./bot.scss"></style>
