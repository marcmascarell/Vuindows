<template>
    <program class="Terminal Program--autoHeight" title="Terminal">
        <template slot="content">
            <div :id="terminalId" class="Terminal__content"></div>
        </template>
    </program>
</template>

<script>
    import programMixin from '../../mixins/program'

    export default {
        mixins: [programMixin],
        mounted() {
            const terminal = new Terminal(this.terminalId, {}, {
                execute: (cmd, args) => {
                    this.removePlaceholder();

                    switch (cmd) {
                        case 'say':
                        case 'echo':
                        case 'print':
                            if (args.length) {
                                return args.join(' ');
                            }

                            return 'Missing arguments, give me something to type!' +
                                    '\n' + 'Example: say This game is awesome!';
                        case 'clear':
                            terminal.clear();
                            return '';
                        case 'hints':
                            return 'Did you think it would be so easy?';
                        case 'help':
                            return 'Commands: clear, say, help, hints, cow, version, who';
                        case 'who':
                            return 'Terminal originally created by Sasa Djolic.';
                        case 'cow':
                            return ' ___________________________\n' +
                                '( I\'m a cow. And you aren\'t! )\n' +
                                ' ---------------------------\n' +
                                '        o   ^__^\n' +
                                '         o  (oO)\\_______\n' +
                                '            (__)\\       )\\/\\\n' +
                                '             U  ||----w |\n' +
                                '                ||     ||'
                        // case 'theme':
                        //     if (args && args[0]) {
                        //         if (args.length > 1) return 'Too many arguments';
                        //         else if (args[0].match(/^interlaced|modern|white$/)) { terminal.setTheme(args[0]); return ''; }
                        //         else return 'Invalid theme';
                        //     }
                        //     return terminal.getTheme();

                        case 'ver':
                        case 'version':
                            return '1.0.0';
                        default:
                            // Unknown command.
                            return false;
                    }
                }
            });

            this.getElement()
                .attr('autocomplete', 'off')
                .attr('autocorrect', 'off')
                .attr('autocapitalize', 'off')
                .attr('spellcheck', 'false')
                .attr('placeholder', "Type 'help' to list commands")
                .focus();
        },
        computed: {
            terminalId() {
                return `terminal-${this.id}`;
            }
        },
        methods: {
            getElement() {
                return $(`#${this.terminalId}`).find('input.cmdline');
            },
            removePlaceholder() {
                this.getElement().attr('placeholder', '');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @font-face {
        font-family: 'Inconsolata', 'monospace';
        font-style: normal;
        font-weight: normal;
        src: local('Inconsolata');
    }

    .Terminal {

        &__content {
            display: flex;
            min-height: 400px !important;
        }

        // Fix for jquery resize
        .ui-resizable-s {
            bottom: 0 !important;
        }

        .terminal ::selection {
            background: #0080ff;
            text-shadow: none !important;
        }

        .terminal {
            position: relative;
            width: 100%;

            .container {
                background: rgba(0, 0, 0, 0.9);
                padding: 1em 1.5em 1em 1em;
                position: relative;
                text-shadow: 0 0 5px #C8C8C8;
            }

            .container output {
                clear: both;
                width: 100%;
                white-space: pre;
            }

            .container output pre {
                margin: 0;
            }

            .cmdline {
                background-color: transparent;
                border: none;
                color: inherit;
                font: inherit;
                margin: 0;
                outline: none;
                width: 100%;
            }

            .hidden {
                display: none;
            }

            output table.input-line td:last-child {
                padding-left: 1px;
            }

            .prompt {
                line-height: 20px;
                margin-right: 7px;
                white-space: nowrap;
            }

            table.input-line {
                border-collapse: collapse;
                border-spacing: 0;
                margin: 0;
                padding: 0;
                width: 100%;
            }

            table.input-line td {
                margin: 0;
                padding: 0;
            }
        }

        /* Interlaced theme */
        .terminal-interlaced {
            color: white;
            font-family: Inconsolata, monospace;

            .prompt {
                color: #fc0;
            }

            a {
                color: #fff;

                &.external {
                    padding-right: 13px;
                    outline: none;
                }
            }

            .background {
                display: none;
                /*background: rgba(0, 0, 0, 0.9);*/
                /*height: 100%;*/
                /*left: 0;*/
                /*pointer-events: none;*/
                /*position: absolute;*/
                /*top: 0;*/
                /*width: 100%;*/
            }

            .container output pre {
                color: white;
                font-family: Inconsolata, monospace;
            }

            .background .interlace {
                height: 100%;
                left: 0;
                opacity: 0.15;
                pointer-events: none;
                position: absolute;
                top: 0;
                width: 100%;
                z-index: 10;
            }
        }
    }
</style>