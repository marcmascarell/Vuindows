// initial state
const state = {
    background: 'images/backgrounds/background2.jpg',
    preferredColor: '#1e90ff',
    isWiFiConnected: false
};

// getters
const getters = {
    background: state => state.background,
    preferredColor: state => state.preferredColor,
    isWiFiConnected: state => state.isWiFiConnected,
};

// actions
const actions = {

};

// mutations
const mutations = {
    changePreferredColor(state, color) {
        state.preferredColor = color;
    },
    changeBackground(state, background) {
        state.background = background;
    },
    toggleWiFiConnection(state) {
        state.isWiFiConnected = ! state.isWiFiConnected;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}