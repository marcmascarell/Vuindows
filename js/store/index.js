import Vue from 'vue'
import Vuex from 'vuex'

import programs from './modules/programs'
import preferences from './modules/preferences'
import filesystem from './modules/filesystem'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        programs,
        preferences,
        filesystem
    },
    strict: debug
})