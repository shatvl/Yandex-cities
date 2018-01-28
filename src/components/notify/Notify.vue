<template>
    <div class="notification" @click="hide()" v-bind:class="[type === 'success' ? 'notification_success' : 'notification_error']">
        <h5 class="notification__header">
            {{ title }}
        </h5>
        <div class="notification__content">
            {{ message }}
        </div>
    </div>
</template>

<script src="./notify.ts" lang="ts"></script>
<style src="./notify.scss" lang="scss" scoped></style>
