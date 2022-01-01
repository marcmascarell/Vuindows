<template>
    <div class="Desktop desktop" :style="{backgroundImage: `url('${background}')`}">
        <component
                v-for="runningProgram in runningPrograms"
                :key="runningProgram.id"
                :is="runningProgram.component"
                v-bind="runningProgram.props"
                @close="terminateProgram">
        </component>

        <div class="Desktop__shortcuts" ref="shortcuts">
            <shortcut v-for="program in programsInDesktop"
                      :key="program.name"
                      :image="program.icon"
                      :name="program.name"
                      @open="runProgram({
                        name: program.name,
                        props: program.props
                      })">
            </shortcut>

            <shortcut image="images/filetypes/text.png"
                      name="Untitled"
                      @open="runProgram({
                          name: 'Notepad',
                          props: {
                              name: 'Untitled',
                              content: 'This is an untitled document... why do you open it?'
                          }
                      })">
            </shortcut>
        </div>

        <!--<command-prompt></command-prompt>-->
    </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { inArray } from '../utils';

    import Shortcut from './Shortcut.vue';

    import Navigator from './Programs/Navigator.vue';
    import VideoPlayer from './Programs/VideoPlayer.vue';
    import AudioPlayer from './Programs/AudioPlayer.vue';
    import Notepad from './Programs/Notepad.vue';
    import PhotoViewer from './Programs/PhotoViewer.vue';
    import FileExplorer from './Programs/FileExplorer.vue';
    import Terminal from './Programs/Terminal.vue';
    import Settings from './Programs/Settings.vue';
    import interact from 'interactjs'

    export default {
        components: {
            Shortcut,
            Navigator,
            AudioPlayer,
            VideoPlayer,
            Notepad,
            PhotoViewer,
            FileExplorer,
            Settings,
            Terminal,
        },
        mounted() {
            // interactjs does not always detect mouse up when snap modifier is present :S
            let ignoreEvents = true;
            document.body.addEventListener("mouseup", () => {
                ignoreEvents = true;
            });

            this.$refs.shortcuts.querySelectorAll('.Shortcut').forEach(el => {
                interact(el)
                .draggable({
                    modifiers: [
                        interact.modifiers.snap({
                            targets: [
                                interact.snappers.grid({ x: 112, y: 106 })
                            ],
                            range: Infinity,
                            relativePoints: [ { x: 0, y: 0 } ]
                        }),
                        interact.modifiers.restrict({
                            restriction: this.$refs.shortcuts,
                            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                            endOnly: true
                        })
                    ],
                    listeners: {
                        start: function (event) {
                            ignoreEvents = false;
                        },
                        end: function (event) {
                            ignoreEvents = true;
                        }
                    },
                    inertia: true
                })
                .on('dragmove', function (event) {
                    if (ignoreEvents) {
                        return;
                    }
                    const x = (parseFloat(event.target.dataset.x) || 0) + event.dx;
                    const y = (parseFloat(event.target.dataset.y) || 0) + event.dy;

                    event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    event.target.dataset.x = x;
                    event.target.dataset.y = y;
                });
            });
            
        },
        computed: {
            ...mapGetters([
                'programs',
                'runningPrograms',
                'background',
                'files'
            ]),
            programsInDesktop() {
                return this.programs.filter(program => {
                    return inArray(program.name, [
                        'Navigator',
                        'Settings',
                        'Files',
                        'Notepad',
                        'Tower',
                        'The House',
                        '2048',
                        'Hextris',
                        'Bemuse',
                        'Swap',
                        'A Dark Room',
                        '2048',
                        'Hexahedral',
                        'Terminal',
                        'Newbie God',
                    ]);
                });
            }
        },
        methods: {

            ...mapActions([
               'runProgram',
               'terminateProgram',
               'bringProgramToTop',
            ]),
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Desktop {
        display: flex;
        position: absolute;
        height: calc(100% - 2.7em);
        width:100%;
        top:0;
        bottom:0;
        left:0;
        right:0;
        overflow: hidden;
        transition: background 1s ease-in-out;
        background: no-repeat center center fixed;
        background-size: cover;

        &__shortcuts {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            flex-grow: 0;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 1em;
        }

        .Shortcut {
            text-shadow: black 0 0 10px;
        }
    }
</style>