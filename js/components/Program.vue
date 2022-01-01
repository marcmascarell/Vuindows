<template>
    <div v-show="! minimized"
         class="Program"
         :class="{
            'Program--maximized': maximized,
            'Program--minimized': minimized,
         }"
         :style="{
            zIndex
         }"
         draggable="false"
         @mousedown="bringProgramToTop(id)">
        <div class="Program__header" @dblclick="toggleMaximize">
            <div class="Program__title">
                <img class="Program__icon" :src="program.icon" alt="" width="18" height="18">

                {{ title }}
            </div>

            <div class="Program__windowControls">
                <div class="Program__windowControls__control" @click="minimize">
                    <i class="icon ion-ios-minus-empty"></i>
                </div>

                <div v-if="isMaximizable"
                     class="Program__windowControls__control"
                     @click="toggleMaximize">
                    <i v-if="maximized" class="icon ion-ios-photos-outline" style="font-size: .8em"></i>
                    <svg v-else
                         x="0px" y="0px" viewBox="0 0 10.2 10.1" data-radium="true" style="width: 10px; height: 10px;"><path  d="M0,0v10.1h10.2V0H0z M9.2,9.2H1.1V1h8.1V9.2z"></path></svg>
                </div>

                <div class="Program__windowControls__control Program__windowControls__control--danger" @click="terminateProgram(id)">
                    <svg x="0px" y="0px" viewBox="0 0 10.2 10.2" data-radium="true" style="width: 10px; height: 10px;"><polygon  points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 "></polygon></svg>
                </div>
            </div>
        </div>

        <nav v-if="$slots['menu']" class="Program__menu">
            <slot name="menu"></slot>
        </nav>

        <div class="Program__content" :class="{'Program__content--scrollable': options.scrollable}">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import interact from 'interactjs'

    export default {
        data() {
            return {
                defaultOptions: {
                    resizable: true,
                    draggable: true,
                    maximizable: true,
                    scrollable: true,
                    size: {
                        width: null,
                        height: null,
                    },
                    position: {
                        left: null,
                        top: null,
                    },
                    mode: 'normal', // 'normal', 'minimized', 'maximized'
                    previousMode: null // When recovering from minimized
                },
                id: null
            }
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
        beforeMount() {
            this.id = this.$parent.id;

            this.setProgramOptions({
                id: this.id,
                options: _.merge({}, this.defaultOptions, this.$parent.options)
            });
        },
        mounted() {
            const $vm = this;
            const $desktop = this.$parent.$el.parentElement;
            const $interact = this.options.draggable || this.options.resizable ? interact(this.$el) : null;

            if (this.options.draggable) {
                $interact
                .draggable({
                    allowFrom: ".Program__header",
                    modifiers: [
                        interact.modifiers.restrict({
                            restriction: $desktop,
                            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                            endOnly: true
                        })
                    ],
                    listeners: {
                        end: function (event) {
                            const target = event.target;

                            $vm.updateOptions({
                                position: {
                                    left: (parseFloat(target.getAttribute('data-x')) || 0) + 'px',
                                    top: (parseFloat(target.getAttribute('data-y')) || 0) + 'px',
                                }
                            });
                        }
                    },
                    autoScroll: false,
                    inertia: true
                })
                .on('dragmove', function (event) {
                    const target = event.target
                    // keep the dragged position in the data-x/data-y attributes
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                    // translate the element
                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

                    // update the posiion attributes
                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                });
            }

            if (this.options.resizable) {
                const MIN_WIDTH = 200;
                const MIN_HEIGHT = 300;

                $interact.resizable({
                    edges: { top: false, left: true, bottom: true, right: true },
                    listeners: {
                        end: function (event) {
                            $vm.updateOptions({
                                size: {
                                    width: event.rect.width + 'px',
                                    height: event.rect.height + 'px',
                                }
                            });
                        },
                        move: function (event) {
                            let { x, y } = event.target.dataset

                            x = (parseFloat(x) || 0) + event.deltaRect.left
                            y = (parseFloat(y) || 0) + event.deltaRect.top

                            if (event.rect.width <= MIN_WIDTH || event.rect.height <= MIN_HEIGHT) {
                                return;
                            }

                            Object.assign(event.target.style, {
                                width: `${event.rect.width}px`,
                                height: `${event.rect.height}px`,
                                transform: `translate(${x}px, ${y}px)`
                            })

                            Object.assign(event.target.dataset, { x, y })
                        }
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'getRunningProgram',
            ]),
            program() {
                return this.getRunningProgram(this.id)
            },
            options() {
                return this.program.options;
            },
            maximized() {
                return this.options.mode === 'maximized';
            },
            minimized() {
                return this.options.mode === 'minimized';
            },
            isMaximizable() {
                return this.options.maximizable;
            },
            zIndex() {
                return this.program.zIndex;
            },
            mode() {
                return this.options.mode;
            },
        },
        methods: {
            ...mapActions([
                'terminateProgram',
                'bringProgramToTop',
                'setProgramOptions',
            ]),
            updateOptions(options) {
                this.setProgramOptions({
                    id: this.id,
                    options: _.merge({}, this.options, options)
                });
            },
            toggleMaximize() {
                this.updateOptions({
                    mode: this.maximized ? 'normal' : 'maximized'
                });

                if (this.maximized) {
                    this.$el.style.left = 0;
                    this.$el.style.top = 0;
                    this.$el.style.right = 0;
                } else {
                    this.$el.style.left = this.options.position.left;
                    this.$el.style.top = this.options.position.top;
                    this.$el.style.right = null;
                }
            },
            minimize() {
                this.updateOptions({
                    mode: 'minimized',
                    previousMode: this.mode
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Program,
    .popupShell {
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 40em;
        width: 60%;
        z-index: 10;
        animation: fade-and-scale .2s;
        overflow: hidden;
        background-color: white;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 11px 3px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(170, 170, 170);
        user-select: none;
        cursor: default;

        &__header {
            position: relative; // Improves draggability
            display: flex;
            align-items: center;
            color: black;

            width: 100%;
            height: 31px;
            min-height: 31px;

            background-color: white;
            visibility: visible;

            user-select: none;
            -webkit-app-region: drag;
            cursor: default;
        }

        &__title {
            flex: 1;
            margin-left: 1em;
            font-size: .95em;
            display: flex;
            align-items: center;
        }

        &__icon {
            margin-right: .5em;
        }

        &__menu  {
            height: 1.5em;
            display: flex;
            border-bottom: 1px solid #ccc;

            div {
                width:4em;
                text-align: center;
                line-height: 1.5em;
            }

            div:nth-child(1) {
                background: dodgerblue;
                color:white;
            }
        }

        &__windowControls {
            display: flex;
            align-items: center;
            height: 31px;

            &__control {
                font-size: 1.3em;
                display: flex;
                height: 100%;
                align-items: center;
                justify-content: center;
                width: 46px;
                transition: background-color 0.1s;
                text-align: center;

                &:hover {
                    background-color: rgb(229, 229, 229);
                }

                &--danger {
                    &:hover {
                        background-color: red;

                        svg {
                            fill: white;
                        }
                    }
                }
            }
        }

        &__content {
            flex: 1;

            &--scrollable {
                overflow: auto;
            }
        }

        &--autoHeight {
            height: auto;

            .Program__content,
            .popupShell__content {
                height: auto;
            }
        }

        &--maximized {
            /*bottom: 2.7em;*/
            height: calc(100%) !important;
            width: 100% !important;
            /*width: calc(100% - .2em) !important;*/
            animation: .2s fade-and-slide;
        }

        &--minimized {
            display: none;
        }
    }

</style>
