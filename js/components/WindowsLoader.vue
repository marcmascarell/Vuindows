<template>
    <div class="WindowsLoader">
        <div>
            <div class="WindowsLoader__logo">
                <img src="images/Vuindows-blue.png" alt="" width="150">
            </div>

            <div class="WindowsLoader__loader">
                <div class="wBall" id="wBall_1">
                    <div class="wInnerBall">
                    </div>
                </div>
                <div class="wBall" id="wBall_2">
                    <div class="wInnerBall">
                    </div>
                </div>
                <div class="wBall" id="wBall_3">
                    <div class="wInnerBall">
                    </div>
                </div>
                <div class="wBall" id="wBall_4">
                    <div class="wInnerBall">
                    </div>
                </div>
                <div class="wBall" id="wBall_5">
                    <div class="wInnerBall">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        mounted() {
            setTimeout(() => {
                this.$el.classList.add("fade-out");

            }, 1000);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .fade-out {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 2s, opacity 2s linear;
    }
    .WindowsLoader {
        z-index: 999;
        position: fixed;
        background:black;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        &__logo {
            margin-bottom: 1em;
        }

        &__loader {
            margin: auto;
            margin-top: 5em;
            width: 90px;
            height: 90px;

            .wBall {
                position: absolute;
                width: 86px;
                height: 86px;
                opacity: 0;

                -moz-transform: rotate(225deg);
                -moz-animation: orbit 7.15s infinite;

                -webkit-transform: rotate(225deg);
                -webkit-animation: orbit 7.15s infinite;

                -ms-transform: rotate(225deg);
                -ms-animation: orbit 7.15s infinite;

                -o-transform: rotate(225deg);
                -o-animation: orbit 7.15s infinite;

                transform: rotate(225deg);
                animation: orbit 7.15s infinite;
            }

            .wBall .wInnerBall{
                position: absolute;
                width: 11px;
                height: 11px;
                background: #FFFFFF;
                left:0px;
                top:0px;

                -moz-border-radius: 11px;
                -webkit-border-radius: 11px;
                -ms-border-radius: 11px;
                -o-border-radius: 11px;
                border-radius: 11px;
            }

            #wBall_1 {
                -moz-animation-delay: 1.56s;
                -webkit-animation-delay: 1.56s;
                -ms-animation-delay: 1.56s;
                -o-animation-delay: 1.56s;
                animation-delay: 1.56s;
            }

            #wBall_2 {
                -moz-animation-delay: 0.31s;
                -webkit-animation-delay: 0.31s;
                -ms-animation-delay: 0.31s;
                -o-animation-delay: 0.31s;
                animation-delay: 0.31s;
            }

            #wBall_3 {
                -moz-animation-delay: 0.62s;
                -webkit-animation-delay: 0.62s;
                -ms-animation-delay: 0.62s;
                -o-animation-delay: 0.62s;
                animation-delay: 0.62s;
            }

            #wBall_4 {
                -moz-animation-delay: 0.94s;
                -webkit-animation-delay: 0.94s;
                -ms-animation-delay: 0.94s;
                -o-animation-delay: 0.94s;
                animation-delay: 0.94s;
            }

            #wBall_5 {
                -moz-animation-delay: 1.25s;
                -webkit-animation-delay: 1.25s;
                -ms-animation-delay: 1.25s;
                -o-animation-delay: 1.25s;
                animation-delay: 1.25s;
            }
        }

        @keyframes orbit {
            0% {
                opacity: 1;
                z-index:99;
                transform: rotate(180deg);
                animation-timing-function: ease-out;
            }

            7% {
                opacity: 1;
                transform: rotate(300deg);
                animation-timing-function: linear;
                origin:0%;
            }

            30% {
                opacity: 1;
                transform:rotate(410deg);
                animation-timing-function: ease-in-out;
                origin:7%;
            }

            39% {
                opacity: 1;
                transform: rotate(645deg);
                animation-timing-function: linear;
                origin:30%;
            }

            70% {
                opacity: 1;
                transform: rotate(770deg);
                animation-timing-function: ease-out;
                origin:39%;
            }

            75% {
                opacity: 1;
                transform: rotate(900deg);
                animation-timing-function: ease-out;
                origin:70%;
            }

            76% {
                opacity: 0;
                transform:rotate(900deg);
            }

            100% {
                opacity: 0;
                transform: rotate(900deg);
            }
        }

    }


</style>