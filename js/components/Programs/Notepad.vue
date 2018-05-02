<template>
    <program class="Notepad" :title="`${fileName} - Notepad`">
        <template slot="menu">
            <div>
                File
            </div>
            <div>
                Edit
            </div>
            <div>
                Format
            </div>
            <div>
                View
            </div>
            <div>
                Help
            </div>
        </template>

        <template slot="content">
            <div class="Notepad__content"
                 contenteditable="true">{{ content }}</div>
        </template>

    </program>
</template>

<script>
    import programMixin from '../../mixins/program'

    export default {
        props: {
            'name': {
                type: String,
            },
            'content': {
                type: String
            }
        },
        mixins: [programMixin],
        computed: {
            fileName() {
                return this.name || this.$t('Sin título')
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Notepad {
        &.Program {
            .Program__content {
                display: flex;
            }
        }

        &__content {
            white-space: pre;
            padding: .2em;
            flex: 1;
            outline: none;
            cursor: text;
        }
    }
</style>