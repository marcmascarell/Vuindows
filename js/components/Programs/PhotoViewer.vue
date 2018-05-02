<template>
    <program class="PhotoViewer Program--autoHeight" :title="`${name} - PhotoViewer`">
        <template slot="content">
            <img class="PhotoViewer__image" :src="source">
        </template>

    </program>
</template>

<script>
    import programMixin from '../../mixins/program'

    export default {
        props: ['name', 'source'],
        mixins: [programMixin],
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .PhotoViewer {
        display: flex;
        align-items: center;

        &.Program {
            background: black;

            .Program__content {
                display: flex;
                align-items: center;
            }
        }

        &__image {
            display: block;
            max-width: 100%;
            height: auto;
        }
    }
</style>