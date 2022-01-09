<template>
    <program class="Settings" title="Settings">
        <template slot="content">

            <div class="settingsPane">
                <h3 v-if="! section" class="Settings__mainTitle">Vuindows Settings</h3>

                <img v-if="section" class="backArrow" src="images/arrow.png" @click="section = null">

                <div v-if="! section" class="settingsPaneSelector">
                    <div class="settingsPaneSection" @click="section = 'system'">
                        <i class="icon ion-laptop"></i>
                        <p>System</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'apps'">
                        <i class="icon ion-android-apps"></i>

                        <p>Apps</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'internet'">
                        <i class="icon ion-ios-world-outline"></i>
                        <p>Internet</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'personalization'">
                        <i class="icon ion-android-color-palette"></i>

                        <p>Personalization</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'accounts'">
                        <i class="icon ion-person-stalker"></i>

                        <p>Accounts</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'time'">
                        <i class="icon ion-android-time"></i>

                        <p>Time</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'privacy'">
                        <i class="icon ion-ios-locked-outline"></i>

                        <p>Privacy</p>
                    </div>

                    <div class="settingsPaneSection" @click="section = 'update'">
                        <i class="icon ion-ios-loop-strong"></i>

                        <p>Update and Security</p>
                    </div>
                </div>

                <div class="Settings__section Settings__section--centered" v-if="section === 'system'">
                    <div>
                        <h1>System Settings</h1>
                        <h2>Vuindows 10 Edition</h2>
                        <h5>DISCLAIMER: Not affiliated with Microsoft in any way, shape or form.</h5>
                    </div>
                </div>

                <div class="Settings__section" v-if="section === 'apps'">
                    <h1>Apps</h1>
                </div>

                <div class="Settings__section" v-if="section === 'internet'">
                    <div class="settingsPane-3-Sidebar">
                        <p>Internet settings</p>
                        <div class="settingsPane-3-Sidebar-Options">
                            <p id="1settingsPaneSidebar" data-section="3">Cable</p>
                            <p id="2settingsPaneSidebar" data-section="3">Wifi</p>
                        </div>
                    </div>
                    <div class="settingsPane-3-Main">
                        <div class="settingsPane-3-Main-Group" id="settingsPane-3-1">
                            <p>Cable connection</p>
                            Status: <input type="checkbox" checked disabled>
                        </div>
                    </div>
                </div>

                <div class="Settings__section" v-if="section === 'personalization'">
                    <div class="settingsPane-4-Sidebar">
                        <h2>Personalization</h2>

                        <div class="settingsPane-4-Sidebar-Options">
                            <p @click="personalizationSection = 'Background'">Background</p>
                            <p @click="personalizationSection = 'Colors'">Colors</p>
                            <!--<p @click="personalizationSection = 'Lock'">Lock Screen</p>-->
                            <!--<p @click="personalizationSection = 'Themes'">Themes</p>-->
                            <!--<p @click="personalizationSection = 'Start'">Start</p>-->
                            <!--<p @click="personalizationSection = 'Taskbar'">Taskbar</p>-->
                        </div>
                    </div>
                    <div class="settingsPane-4-Main">
                        <p>Preview</p>
                        <div class="preview" :style="`background-image: url(${background})`">
                            <div class="previewStart">
                                <div class="previewApp">
                                    <p>Aa</p>
                                </div>
                                <div id="previewApp2-hold">
                                    <div class="previewApp2"></div>
                                    <div class="previewApp2"></div>
                                </div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                                <div class="previewApp2"></div>
                            </div>
                            <div class="previewTaskbar">

                            </div>
                            <div class="previewWindow">

                            </div>
                        </div>

                        <div v-if="personalizationSection === 'Background'"
                             class="settingsPane-4-Main-Group">
                            <p>Background</p>

                            <p>Choose your picture</p>

                            <div class="wallpaperChooser">
                                <div>
                                    <div class="wallpaper"
                                         v-for="bg in backgrounds"
                                         @click="changeBackground(bg)">
                                        <img :src="bg">
                                    </div>
                                </div>
                                <div class="customWallpaper">
                                    <p>Browse</p>
                                </div>
                            </div>

                        </div>
                        <div v-if="personalizationSection === 'Colors'"
                             class="settingsPane-4-Main-Group" id="settingsPane-4-2">
                            <p>Accent color</p>

                            <div class="colorSelector">
                                <div v-for="color in colors"
                                     class="color"
                                     :class="{'selectedColor': color === selectedColor}"
                                     @click="changeColor(color)"
                                     :style="color === 'none' ? 'border:.1em solid black; box-sizing:border-box; background-color: ${color}`' : `background-color: ${color}`"></div>
                            </div>
                        </div>

                        <div v-if="personalizationSection === 'Lock'" class="settingsPane-4-Main-Group">
                            <p>No Lock Screen settings yet</p>
                        </div>

                        <div v-if="personalizationSection === 'Themes'" class="settingsPane-4-Main-Group">
                            <p>No Theme settings yet</p>
                        </div>

                        <div v-if="personalizationSection === 'Start'" class="settingsPane-4-Main-Group">
                            <p>No Start Menu settings yet</p>
                        </div>

                        <div v-if="personalizationSection === 'Taskbar'" class="settingsPane-4-Main-Group">
                            <p>No Taskbar settings yet</p>
                        </div>
                    </div>
                </div>

                <div class="Settings__section" v-if="section === 'accounts'">
                    <h1>Accounts</h1>
                </div>

                <div class="Settings__section" v-if="section === 'time'">
                    <h1>Date and Time</h1>
                </div>

                <div class="Settings__section" v-if="section === 'privacy'">

                    <h1>
                        Privacy
                        <small>(lol)</small>
                    </h1>
                </div>

                <div class="Settings__section"  v-if="section === 'update'">
                    <p>Update and Security</p>
                </div>
            </div>
        </template>
    </program>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';

    import programMixin from '../../mixins/program'

    export default {
        data() {
            return {
                section: null,
                personalizationSection: null,
                selectedColor: null,
                colors: [
                    '#1e90ff',
                    '#ff0000',
                    '#008000',
                    '#800080',
                    '#4b0082'
                ],
                backgrounds: [
                    'images/backgrounds/background1.jpg',
                    'images/backgrounds/background2.jpg',
                    'images/backgrounds/background3.jpg',
                    'images/backgrounds/background4.jpg',
                    'images/backgrounds/background5.jpg',
                    'images/backgrounds/background6.jpg',
                    'images/backgrounds/background7.jpg',
                    'images/backgrounds/background8.jpg',
                    'images/backgrounds/background9.jpg',
                ]
            }
        },
        mixins: [programMixin],
        computed: {
            ...mapGetters([
                'background',
                'isWiFiConnected'
            ]),
        },
        methods: {
            ...mapMutations([
               'changeBackground',
               'changePreferredColor',
            ]),
            ...mapMutations({
                '_toggleWiFiConnection': 'toggleWiFiConnection'
            }),
            changeColor(color) {
                this.selectedColor = color;

                document.querySelectorAll(".colorScheme, .previewApp, .previewApp2").forEach(el => {
                    el.style.backgroundColor = color;
                });

                this.changePreferredColor(color);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Settings {
        &__section {
            display: flex;
            height: 100%;
            overflow: auto;
            animation: .2s fade-and-scale;

            &--centered {
                align-items: center;
                justify-content: center;
            }
        }

        &__mainTitle {
            font-size: 2em;
            font-weight: 100;
        }
    }

    .color {
        width: 30px;
        height: 30px;
    }

    // Todo: refactor

    .settingsPane{
        display:flex;
        flex-direction: column;
        text-align: center;
        height:100%;
        overflow: auto;
        animation: .2s fade-and-scale;
    }

    .settingsPane h1, .settingsPane h2{
        font-weight: 300;
    }
    .settingsPane ul{
        padding:.5em;
    }

    .settingsPaneSelector{
        margin: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width:100%;
        max-width: 48em;
        animation: .4s fade-and-shrink;
    }
    .settingsPaneSection{
        height:10em;
        width:10em;
        margin: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        .icon {
            font-size: 4em;
            color: #3399d2;
        }
    }
    .settingsPaneSection img{
        max-height: 2.5em;
        max-width: 2.5em;
        margin: 0 auto;
    }
    .settingsPaneSection:hover{
        outline: 2px solid #ececec;
    }

    .settingsSection{
        display: flex;
        height: 10em;
        overflow: auto;
        animation: .2s fade-and-scale;
    }
    #settingsSection1{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        flex-direction: column;
    }
    #settingsPane-1{
        margin: auto;
        height: 100%;
        width: 20em;
        flex-direction: column;
    }
    #settingsPane-1 .windowsLogo{
        position: relative;
        margin: 0 auto;
    }
    #settingsPane-1 .windowsLogo div{
        position: relative;
        border: .2em solid white;
    }
    #settingsPane-4{
        display: flex;
        flex-direction: row;
        text-align: left;
        margin: .5em;
        margin-left: 0;
        height: 100%;
    }
    .settingsPane-4-Sidebar{
        width: 20em;
    }
    .settingsPane-4-Sidebar-Options{
        height: 19em;
        display: flex;

        flex-direction: column;
    }
    .settingsPane-4-Sidebar-Options p{
        padding-left: 1em;
        margin: 0 auto;
        margin-left: 0;
        height: 3em;
        width: 90%;
        line-height: 3em;
    }
    .settingsPane-4-Sidebar-Options p:hover{
        background:lightgray;
    }
    .settingsPane-4-Main{
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 30em;
    }
    .settingsPane-4-Main-Group{
        display: flex;
        flex-direction: column;
        text-align: left;
        margin:.5em;
        animation: .3s fade-and-slide;
    }
    .preview{
        height: 9em;
        width: 16em;
        background-size: cover;
        transition: .5s background ease-in-out;
    }
    .previewStart{
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 0;
        justify-content: flex-end;
        height: 7.4em;
        width: 5em;
        padding: .5em;
        background: rgba(0,0,0,.8);
    }
    .previewTaskbar{
        height: .75em;
        width: 100%;
        background: rgba(0,0,0,.8);
    }
    .previewApp, .previewApp2{
        height: 3em;
        width: 3em;
        background: dodgerblue;
        border: .1em solid black;
        box-sizing: border-box;
        text-align: center;
        color: white;
    }
    #previewApp2-hold{
        display: flex;
        flex-direction: column;
        height: 3em;
    }
    .previewApp2{
        height: 1.5em;
        width: 1.5em;
    }
    .wallpaperChooser {
    }
    .wallpaperChooser div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .wallpaper, .customWallpaper{
        height: 100%;
        overflow: hidden;
        margin: .1em;
    }
    .customWallpaper{
        display: flex;
        justify-content: center;
        margin: .5em auto;
        margin-left: 0;
        height: 2.5em;
        line-height: .6em;
        width: 5em;
        text-align: center;
        background: lightgray;
    }
    .customWallpaper:hover{
        outline: .2em solid darkgray;
    }
    .wallpaper img, .customWallpaper img{
        max-height: 5em;
    }
    .colorSelector{
        display: flex;
    }
    .selectedColor{
        border: .2em solid black;
        box-sizing: border-box;
    }
    #settingsSection2{
        height: 5em;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;
    }
    #settingsSection2 div{
        height: 3em;
        width: 3em;
        margin: .5em;
    }
    #settingsSection2 div:hover{
        border: .2em solid black;
        box-sizing: border-box;
    }
    #settingsSection3{
        display: flex;
        flex-direction: column;
        height: 15em;
    }
</style>
