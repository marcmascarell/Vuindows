<template>
    <div class="Taskbar">
        <div class="Taskbar__startButton" @click="$emit('toggleStartMenu')">
            <img draggable="false" src="images/Vuindows-white.png" alt="">

        </div>

        <div class="Taskbar__searchbar">
            <input placeholder="Ask me anything"
                   v-model="cortanaSearch"
                   @click.stop="$emit('openCortana')"
                   @input="$emit('openCortana')"
                   @keyup.esc="closeCortana"
                   @blur="closeCortana">
        </div>

        <div v-for="programsGroup, name in groupedRunningPrograms"
             class="Taskbar__icon Taskbar__icon--active" @click="bringGroupToTop(programsGroup)">
            <img :src="getProgramIcon(name)">
        </div>

        <!--Clock and Date-->
        <div class="Clock">
            <div>
                {{ time }}
            </div>
            <div>
                {{ date }}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import fecha from 'fecha';

    export default {
        data() {
            return {
                date: null,
                time: null,
                cortanaSearch: null
            }
        },
        mounted() {
            this.updateClock();

            setInterval(() => {
                this.updateClock();
            }, 30000)
        },
        computed: {
            ...mapGetters([
                'groupedRunningPrograms',
                'getProgram',
                'getProgramIcon',
            ])
        },
        methods: {
            ...mapActions([
                'unminimize',
                'bringProgramToTop',
            ]),
            closeCortana() {
                this.cortanaSearch = null;

                this.$emit('closeCortana');
            },
            bringGroupToTop(programsGroup) {
                programsGroup.forEach(program => {
                    this.bringProgramToTop(program.id);
                    this.unminimize(program.id);
                });
            },
            updateClock() {
                const date = new Date();

                this.date = fecha.format(date, 'MM/DD/YYYY');
                this.time = fecha.format(date, 'shortTime');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Taskbar {
        z-index: 300;
        position:fixed;
        flex-wrap: nowrap;
        display: flex;
        align-content: flex-start;
        align-items: flex-start;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        background:rgba(0,0,0,1);
        user-select: none;
        height: 2.7em;
        
        &__startButton {
            display: flex;
            justify-content: center;
            position: relative;
            height:100%;
            width:3.2em;

            img {
                height:1.6em;
                margin: auto;

                &:hover {
                    background:rgb(20,20,20);
                }
            }

            &:active {
                background:black;
            }
        }

        &__icon {
            display: flex;
            height:100%;
            width:3em;
            justify-content: center;
            color:white;
            box-sizing: border-box;
            margin-left:.2em;
            user-select: none;

            &:hover {
                background-color: rgb(100,100,100);
            }

            &:active {
                background: black;
            }

            img {
                height: 60%;
                margin: auto;
            }

            &--active {
                border-bottom: .2em solid rgb(50,120,200);
            }
        }

        &__searchbar {
            display: flex;
            flex-wrap: nowrap;
            height:100%;
            width:19.2em;
            line-height: .7em;
            background:rgb(40,40,40);
            color:rgba(70,70,70,1);

            &:hover{
                background:rgb(50,50,50)
            }

            input {
                flex: 1;
                background: transparent;
                border: 0;
                padding-left:1em;
                padding-right: 1em;
                color:rgb(100,100,120);
                user-select: none;

                &:focus {
                    background: white;
                }
            }
        }

        &__apps {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: flex-start;
            margin: auto;
            padding-top:.9em;
            padding-bottom:1em;
            padding-left:1em;
            height:90%;
            width:100%;
            overflow: auto;
            animation: .4s fade-and-slide;
            user-select: none;
        }
    }

    .Clock {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        right: .6em;
        font-size: .85em;

        color: white;
        text-align: center;
    }
</style>