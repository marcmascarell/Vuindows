import Vue from 'vue'
import _ from 'lodash'

const updateProgram = (state, id, program) => {
    const arrayIndex = _.findIndex(state.runningPrograms, runningProgram => runningProgram.id === id);

    Vue.set(state.runningPrograms, arrayIndex, program);
};

const throwProgramNotFound = (programName) => {
    throw `Program is not listed: ${programName}`;
};

// initial state. For all `Program options` available go to `Program.vue`
const state = {
    programs: [
        {
            name: 'Navigator',
            shortcutName: 'Navigator',
            icon: 'images/programs/navigator.png',
            component: 'Navigator',
            props: {
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Settings',
            icon: 'images/programs/settings-bg.png',
            component: 'Settings',
            props: {
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Files',
            icon: 'images/programs/file-explorer.png',
            component: 'FileExplorer'
        },
        {
            name: 'Swap',
            icon: 'images/programs/swap.png',
            component: 'Navigator',
            props: {
                title: 'Swap',
                startPage: 'apps/games/swap/index.html',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Hextris',
            icon: 'images/programs/hextris.png',
            component: 'Navigator',
            props: {
                title: 'Hextris',
                startPage: 'apps/games/hextris/index.html',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Bemuse',
            icon: 'images/programs/bemuse.png',
            component: 'Navigator',
            props: {
                title: 'Bemuse',
                startPage: 'https://bemuse.ninja//index.html',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'A Dark Room',
            icon: 'images/programs/adarkroom.png',
            component: 'Navigator',
            props: {
                title: 'A Dark Room',
                startPage: 'http://adarkroom.doublespeakgames.com/',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Tower',
            icon: 'images/programs/tower.png',
            component: 'Navigator',
            props: {
                title: 'Tower',
                startPage: 'apps/games/tower/index.html',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'The House',
            icon: 'images/programs/thehouse-transparent.png',
            component: 'Navigator',
            props: {
                title: 'The House',
                startPage: 'https://the-house.arturkot.pl',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Newbie God',
            icon: 'images/programs/newbie-god2.png',
            component: 'Navigator',
            props: {
                title: 'Newbie God',
                startPage: 'apps/games/newbie-god/index.html',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: '2048',
            icon: 'images/programs/2048.jpg',
            component: 'Navigator',
            props: {
                title: '2048',
                startPage: 'apps/games/2048/index.html',
                controls: false,
                options: {
                    mode: 'maximized'
                }
            }
        },
        {
            name: 'Terminal',
            icon: 'images/programs/terminal.png',
            component: 'Terminal',
        },
        {
            name: 'VideoPlayer',
            icon: 'images/programs/vlc.png',
            component: 'VideoPlayer'
        },
        {
            name: 'AudioPlayer',
            icon: 'images/programs/song.png',
            component: 'AudioPlayer',
            props: {
                options: {
                    scrollable: false
                }
            }
        },
        {
            name: 'PhotoViewer',
            icon: 'images/programs/file.png',
            component: 'PhotoViewer'
        },
        {
            name: 'Notepad',
            icon: 'images/programs/notepad.png',
            component: 'Notepad'
        },
    ],
    runningPrograms: [],
    nextId: 1,
    highestZindex: 100
};

// getters
const getters = {
    programs: state => state.programs,
    runningPrograms: state => state.runningPrograms,
    getRunningProgram: state => id => state.runningPrograms.find(program => program.id === id),
    getProgram: state => name => state.programs.find(program => program.name === name),
    getProgramIcon: (state, getters) => name => {
        const program = getters.getProgram(name);

        if (! program) {
            throwProgramNotFound(name);
        }

        return program.icon || 'images/filetypes/executable.png';
    },
    upfrontProgram: state => _.maxBy(state.runningPrograms, 'zIndex'),
    groupedRunningPrograms: state => _.groupBy(state.runningPrograms, 'name')
};

// actions
const actions = {
    runProgram({ commit, getters }, program) {
        if (! _.isObject(program)) {
            program = {name: program};
        }

        const defaultProgram = getters.getProgram(program.name);

        if (! defaultProgram) {
            throwProgramNotFound(program.name);
        }

        // Todo
        // if (! defaultProgram.position) {
        //     defaultProgram.position = {
        //         left: '200px',
        //         top: '200px'
        //     };
        // }

        const finalProgram = _.merge({}, defaultProgram, {
            props: program.props || {},
            options: {} // Will be filled by Program.vue merging specific program options with generic program options
        });

        commit('runProgram', finalProgram);
    },
    terminateProgram({ commit }, id) {
        commit('terminateProgram', id);
    },
    bringProgramToTop({ commit, state, getters }, id) {
        // If the program is already upfront don't do anything
        if (getters.upfrontProgram && getters.upfrontProgram.id === id) {
            return;
        }

        const program = getters.getRunningProgram(id);

        // Maybe the click was too close the window
        if (! program) {
            return;
        }

        commit('bringProgramToTop', program);
    },
    setProgramOptions({ commit, getters }, { id, options }) {
        const program = getters.getRunningProgram(id);

        commit('setProgramOptions', { program, options });
    },
    unminimize({ commit, getters }, id) {
        const program = getters.getRunningProgram(id);

        commit('unminimize', program);
    },
};

// mutations
const mutations = {
    runProgram(state, program) {
        const id = state.nextId++;

        if (program.props === undefined) {
            program.props = {};
        }

        program.props.id = id;

        state.runningPrograms.push(Object.assign({}, program, {
            id,
            zIndex: state.highestZindex++
        }));
    },
    terminateProgram(state, id) {
        const arrayIndex = _.findIndex(state.runningPrograms, program => program.id === id);

        Vue.delete(state.runningPrograms, arrayIndex);
    },

    bringProgramToTop(state, program) {
        program.zIndex = state.highestZindex++;

        updateProgram(state, program.id, program);
    },
    setProgramOptions(state, { program, options }) {
        program.options = options;

        updateProgram(state, program.id, program);
    },
    unminimize(state, program) {
        program.options.mode = program.options.previousMode || 'normal';

        updateProgram(state, program.id, program);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
