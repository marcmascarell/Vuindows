<template>
    <div class="Cortana" v-on-clickaway="() => { $emit('close') }">
        <div class="Cortana__sidebar">
            <div class="Cortana__sidebar__button" id="1csb">
                <img src="images/menu.png">
            </div>
        </div>

        <div class="Cortana__main">
            <div class="Cortana__animation"></div>
            <h3>Just kidding,</h3>
            <h3>I'm useless!</h3>
        </div>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway';

    export default {
        mixins: [ clickaway ],
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Cortana {
        z-index: 200;
        position: fixed;
        display: flex;
        left:0;
        bottom:2.7em;
        height:100%;
        width:22.4em;
        max-height:40em;
        background:rgba(0,0,0,.8);
        animation: .4s fade-and-slide;

        &__sidebar {
            position: relative;
            height:100%;
            width:14%;
            background: black;

            &__button {
                height:3.5em;

                &:hover {
                    background: rgb(100,100,100);
                }

                img {
                    max-height:1.5em;
                    margin-top:1em;
                    margin-left:1em;
                }
            }
        }

        &__main {
            position: relative;
            width:80%;
            height: 100%;
            margin: auto;
            margin-right:0;
            text-align: center;
            color:white;
        }

        @keyframes cortana {
            0% {
                box-shadow: 0 0 0 10px #3e92d2, 0 0 0 40px #1f445f;
            }

            100% {
                box-shadow: 0 0 0 15px #3e92d2, 0 0 0 25px #1f445f;
            }
        }

        &__animation {
            margin: auto;
            margin-top:3em;
            margin-bottom:3em;
            width:75px;
            height:75px;
            border-radius:50%;
            box-shadow: 0 0 0 10px #3e92d2, 0 0 0 40px #1f445f;
            animation: cortana 1.5s infinite ease-in-out alternate;
        }
    }
</style>