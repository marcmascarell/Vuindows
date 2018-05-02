<template>
    <div class="Shortcut"
         @dblclick="$emit('open')"
         @click="$emit('click')">

        <div class="Shortcut__image">
            <img :src="image">
        </div>

        <span>{{ name }}</span>

    </div>
</template>

<script>
    export default {
        props: ['image', 'name']
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Shortcut {
        display: flex;
        flex-direction: column;
        width: 6em;
        color: white;
        text-align: center;
        user-select: none;
        padding: .5em;
        margin-bottom: .8em;
        cursor: default;

        &:hover {
            background: rgba(255,255,255,.1);
        }

        &__image {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            margin: 0 auto;
            margin-bottom: .8em;
        }

        img {
            width: 60px;
            height: auto;
        }
    }
</style>