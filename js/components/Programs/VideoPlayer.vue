<template>
    <program class="VideoPlayer" :title="`${name} - Video Player`">
        <template slot="content">
            <iframe v-if="iframe" class="VideoPlayer__video VideoPlayer__video--iframe" :src="iframe"
                    frameborder="0"
                    target="_self"
                    allowfullscreen="allowfullscreen">
            </iframe>
            <video v-else class="VideoPlayer__video" controls autoplay>
                <source :src="`${source}`">
            </video>
        </template>
    </program>
</template>

<script>
    import programMixin from '../../mixins/program'
    import { isEmbed, getEmbedUrl } from '../../services/video';

    export default {
        props: ['name', 'source'],
        mixins: [programMixin],
        computed: {
            iframe() {
                if (isEmbed(this.source)) {
                    return getEmbedUrl(this.source)
                }

                return false;
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .VideoPlayer {
        display: flex;
        /*align-items: flex-end;*/

        &.Program {
            background: black;

            .Program__content {
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
            }
        }

        &__video {
            flex-grow: 1;
            flex-basis: 100%;
            width: 100%;
            height: auto;
        }

        // It does not work nicely with old Chromium
        video::-internal-media-controls-download-button {
            display:none;
        }

        video::-webkit-media-controls-enclosure {
            overflow:hidden;
        }

        video::-webkit-media-controls-panel {
            width: calc(100% + 30px); /* Adjust as needed */
        }
    }
</style>
