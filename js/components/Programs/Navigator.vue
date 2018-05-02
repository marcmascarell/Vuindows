<template>
    <program class="Navigator"
             :class="{'Navigator--noControls': !controls}"
             :title="pageTitle">
        <template slot="content">
            <div v-if="controls" class="Navigator__navBar">
                <div class="Navigator__navBar__controls">
                    <div class="Navigator__navBar__control" @click="home">
                        <i class="icon ion-ios-home-outline"></i>
                    </div>

                    <div class="Navigator__navBar__control" @click="home">
                        <i class="icon ion-ios-arrow-left"></i>
                    </div>
                    <!--<div class="navbar-control" id="nav2">-->
                    <!--<i class="fa fa-arrow-right"></i>-->
                    <!--</div>-->
                    <!--<div class="navbar-control" id="nav3">-->
                    <!--<i class="fa fa-refresh"></i>-->
                    <!--</div>-->
                </div>

                <input class="Navigator__navBar__search"
                       type="text"
                       v-model="searchBar"
                       @keyup.enter="search">
            </div>

            <iframe class="Navigator__content"
                    @load="onIframeLoad"
                    id="Navigator-iframe"
                    :src="iframe"
                    ref="iframe"
                    frameborder="0"
                    :allowfullscreen="false"
                    target="_self">
            </iframe>
        </template>
    </program>
</template>

<script>
    import _ from 'lodash';

    import { isEmbed, getEmbedUrl } from '../../services/video';
    import programMixin from '../../mixins/program';

    export default {
        data() {
            return {
                searchBar: null,
                iframe: null,
                notFoundPage: 'apps/chromium/bong/index.html'
            }
        },
        props: {
            startPage: {
                type: String,
                'default': 'apps/chromium/index.html'
            },
            controls: {
                type: Boolean,
                'default': true
            },
            title: {
                type: String
            }
        },
        mixins: [programMixin],
        mounted() {
            if (this.startPage) {
                this.iframe = this.startPage;
                this.searchBar = this.startPage;
            }
        },
        computed: {
            pageTitle() {
                if (! this.controls && this.title) {
                    return this.title;
                }

                return this.title ? this.title + ' - Navigator' : 'Navigator'
            }
        },
        methods: {
            isValidUrl(string) {
                try {
                    new URL(string);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            onIframeLoad() {
                // Will only work with domains that we control
                try {
                    this.searchBar = this.$refs.iframe.contentWindow.location.href;
                } catch (e) {
//                    this.searchBar = null;
                }
            },
            search() {
                if (isEmbed(this.searchBar)) {
                    this.navigateTo(getEmbedUrl(this.searchBar));

                    return;
                }

                if (this.isValidUrl(this.searchBar)) {
                    this.navigateTo(this.searchBar);

                    return;
                }

                this.navigateTo(`${this.notFoundPage}?search=${encodeURIComponent(this.searchBar)}`);
            },
            home() {
                return this.navigateTo(this.startPage);
            },
            back() {
                this.searchBar = '';

                this.navigateTo(sessionStorage.getItem("prevWebsite"));
            },
            navigateTo(url) {
                // Force the iframe element to "reload"
                this.iframe = null;
                this.searchBar = null;

                this.$nextTick(() => {
                    // Force same protocol usage
                    if (_.startsWith(url, 'https://') || _.startsWith(url, 'http://')) {
                        url = '//' + url.replace('https://', '').replace('http://', '');
                    }

                    this.searchBar = url;
                    this.iframe = url;
                });

                sessionStorage.setItem("nextWebsite", url);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .Navigator {
        &__navBar {
            display: flex;
            background: #F2F2F2;
            align-items: center;
            justify-content: center;
            height: 55px;
        }

        &__navBar__controls {
            flex-shrink: 1;
            flex-grow: 0;
            display: flex;
            align-items: center;
            margin: 0 .5em;
        }

        &__navBar__control {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            width: 55px;
            height: 55px;

            &:hover {
                background: #CCCCCC;
            }
        }

        &__navBar input {
            margin-left: 10px;
            margin-right: 15px;
            height: 42px;
            flex: 1;
            flex-basis: 60%;
            color: darkgray;
            outline: none;

            background: white;
            padding: .1em .5em 0 1em;
            border: 1px solid darkgray;
            font-size: 1em;

            &:hover, &:focus {
                color: black;

                /*background: rgb(230,230,230);*/
            }
        }

        .Program__content {
            display: flex;
            flex-direction: column;
        }

        &__content {
            flex-grow: 1;
        }

        &--noControls {
            .Navigator__content {
            }
        }
    }

</style>
