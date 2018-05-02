<template>
    <div class="StartMenu" v-on-clickaway="() => { $emit('close') }">
        <div class="StartMenu__sidebar">
            <div>
                <div class="StartMenu__sidebar__menuEntry" id="3profile">
                    <img src="images/profile.png">
                    <p>Add Profile</p>
                </div>
            </div>

            <div>
                <div class="StartMenu__sidebar__menuEntry" @click="runProgram('Files');">
                    <img src="images/programs/fileExplorer.png">
                    <p>File Explorer</p>
                </div>
                <div class="StartMenu__sidebar__menuEntry" @click="runProgram('Settings');">
                    <img src="images/programs/settings.png">
                    <p>Settings</p>
                </div>
                <div class="StartMenu__sidebar__menuEntry" @click="reloadPage">
                    <img src="images/power.png">
                    <p>Power</p>
                </div>
            </div>
        </div>

        <!--This is the housing for the app icons in the Start Menu.
            Each cluster of apps is inside the "appSection" class -->
        <div class="StartMenu__apps">
            <!--<shortcut image="images/spotify.png"-->
                      <!--name="Spotify"-->
                      <!--class="StartMenu__shortcut">-->
            <!--</shortcut>-->

            <!--<shortcut image=""-->
                      <!--name="Terminal"-->
                      <!--class="StartMenu__shortcut"></shortcut>-->

            <!--<shortcut image=""-->
                      <!--name="Notepad"-->
                      <!--class="StartMenu__shortcut">-->
            <!--</shortcut>-->

            <shortcut v-for="program in programsInStartMenu"
                      :key="program.name"
                      class="StartMenu__shortcut"
                      :style="`background-color: ${preferredColor}`"
                      :image="program.icon"
                      :name="program.name"
                      @click="runProgram({
                        name: program.name,
                        props: program.props
                      })">
            </shortcut>
        </div>
    </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import { mixin as clickaway } from 'vue-clickaway';
    import { inArray } from '../utils';

    import Shortcut from './Shortcut.vue';

    export default {
        mixins: [ clickaway ],
        components: {
            Shortcut
        },
        computed: {
            ...mapGetters([
                'programs',
                'preferredColor',
            ]),
            programsInStartMenu() {
                return this.programs.filter(program => {
                    return inArray(program.name, [
                        'Files',
                        'Navigator',
                        'Settings',
                        'The House',
                        '2048',
                        'Tower',
                    ]);
                });
            }
        },
        methods: {
            ...mapActions({
                // Override behaviour to transparently close the start menu component (this)
                'runProgramAction': 'runProgram'
            }),
            runProgram(...params) {
                this.runProgramAction(...params);

                this.$emit('close');
            },
            reloadPage() {
                window.location.reload();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .StartMenu {
        z-index: 200;
        display: flex;
        flex-direction: row;
        position: fixed;
        bottom: 2.7em;
        left: 0;
        height: 100%;
        width: 37.5em;
        max-height: 40em;
        background: rgba(0,0,0,.8);
        animation: .3s fade-and-slide;
        user-select: none;

        &__sidebar {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 10em;
            margin: 1em 0;
            color: white;
            animation: .4s fade-and-slide;
            margin-right: 5em;

            img {
                max-height: 1.8em;
                padding:.5em;
            }

            &__menuEntry {
                flex-shrink: 1;
                display: flex;
            }
        }

        &__apps {
            width: 100%;
            margin-top: 1em;
        }

        &__shortcut {
            display: inline-block;
            animation: .3s fade-and-slide;
            margin: 3px;

            &:hover {
            }

        }
    }

</style>
