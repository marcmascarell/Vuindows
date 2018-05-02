<template>
    <div class="App">
        <windows-loader></windows-loader>

        <desktop></desktop>

        <!--<context-menu></context-menu>-->

        <start-menu v-if="showStartMenu" @close="showStartMenu = false"></start-menu>
        <cortana v-if="showCortana" @close="showCortana = false"></cortana>

        <taskbar @toggleStartMenu="toggleStartMenu"
                 @openCortana="openCortana"
                 @closeCortana="closeCortana">
        </taskbar>
    </div>
</template>

<script>
    import WindowsLoader from './components/WindowsLoader.vue';
    import Taskbar from './components/Taskbar.vue';
    import Desktop from './components/Desktop.vue';
    import ContextMenu from './components/ContextMenu.vue';
    import Cortana from './components/Cortana.vue';
    import StartMenu from './components/StartMenu.vue';

    export default {
        data() {
            return {
                showStartMenu: false,
                showCortana: false,
            }
        },
        components: {
            WindowsLoader,
            Taskbar,
            Desktop,
            Cortana,
            ContextMenu,
            StartMenu
        },
        mounted() {
            $(document).bind("contextmenu", function (event) {
                // Avoid the real right click
                event.preventDefault();
            });
        },
        methods: {
            toggleStartMenu() {
                this.showStartMenu = ! this.showStartMenu;
            },
            openCortana() {
                this.showCortana = true;
            },
            closeCortana() {
                this.showCortana = false;
            },
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    html {
        font-family: "Segoe UI","Segoe UI Light","Selawik Light",Tahoma,Verdana,Arial,sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
    }
</style>

