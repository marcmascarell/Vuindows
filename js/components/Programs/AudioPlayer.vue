<template>
    <program class="MusicPlayer Program--autoHeight" :title="`${name} - Music Player`">
        <template slot="content">
            <audio class="MusicPlayer__audio" controls autoplay>
                <source :src="`${source}`">
            </audio>
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
    .MusicPlayer {
        max-height: 300px;
        display: flex;
        /*align-items: flex-end;*/

        &__audio {
            width: 100%;
        }

        // It does not work nicely with old Chromium
        audio::-internal-media-controls-download-button {
            display:none;
        }

        audio::-webkit-media-controls-enclosure {
            overflow:hidden;
        }

        audio::-webkit-media-controls-panel {
            width: calc(100% + 30px); /* Adjust as needed */
        }
    }
</style>
