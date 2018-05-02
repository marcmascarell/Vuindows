import store from '../index';
import _ from 'lodash';

const fileTree = [
    {
        name: "OS (C:)",
        childs: [
            {
                name: "Program Files",
                childs: [
                    {
                        name: "Trasus",
                        childs: []
                    },
                    {
                        name: "RDP Wrapper",
                        childs: []
                    },
                    {
                        name: "Common Files",
                        childs: []
                    },
                    {
                        name: "Rekaltek",
                        childs: []
                    },
                    {
                        name: "VideoWAN",
                        childs: []
                    },
                    {
                        name: "Difender",
                        childs: []
                    },
                    {
                        name: "Media Player",
                        childs: []
                    },
                    {
                        name: "Photoviewer",
                        childs: []
                    },
                ]
            },
            {
                name: "Program Files (x86)",
                childs: [
                    {
                        name: "SyberLink",
                        childs: []
                    },
                    {
                        name: "Lava",
                        childs: []
                    },
                    {
                        name: "Gruguel",
                        childs: []
                    },
                    {
                        name: "Greentooth Suite",
                        childs: []
                    },
                    {
                        name: "Temp",
                        childs: [
                            {
                                name: "_244426424",
                                childs: []
                            },
                            {
                                name: "_483285061",
                                childs: []
                            },
                            {
                                name: "_512288121",
                                childs: []
                            },
                            {
                                name: "_725197233",
                                childs: []
                            },
                            {
                                name: "_1357846232",
                                childs: []
                            },
                            {
                                name: "_1388652875",
                                childs: []
                            },
                            {
                                name: "_1703231827",
                                childs: []
                            },
                            {
                                name: "_1999693828",
                                childs: []
                            },
                            {
                                name: "2AB88D16-6830-4C25-BE86-93DC0E9794AD",
                                childs: []
                            },
                            {
                                name: "3C5E68B2-4BD4-4D43-BC07-D7BE5EFE853E",
                                childs: []
                            },
                            {
                                name: "4DA39F52-EEE8-4CA7-9B46-88C3E7F0FBB5",
                                childs: []
                            },
                        ]
                    },
                    {
                        name: "ENVIDIA Corporation",
                        childs: []
                    },
                    {
                        name: "Steam",
                        childs: [
                            {
                                name: "appcache",
                                childs: []
                            },
                            {
                                name: "bin",
                                childs: []
                            },
                            {
                                name: "config",
                                childs: []
                            },
                            {
                                name: "controller_base",
                                childs: []
                            },
                            {
                                name: "steam",
                                childs: [
                                    {
                                        name: "games",
                                        childs: [
                                            {
                                                name: "HL2",
                                                childs: []
                                            },
                                            {
                                                name: "HL2 Episode 1",
                                                childs: []
                                            },
                                            {
                                                name: "HL2 Episode 2",
                                                childs: []
                                            },
                                            {
                                                name: "HL2 Episode 3",
                                                childs: []
                                            },
                                            {
                                                name: "HL3",
                                                childs: []
                                            },
                                            {
                                                name: "Unexpected End",
                                                childs: []
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                name: "steamapps",
                                childs: []
                            },
                        ]
                    },
                ]
            },
            {
                name: "Logs",
                childs: []
            },
            {
                name: "ENVIDIA",
                childs: []
            },
            {
                name: "ProgramData",
                childs: []
            },
        ]
    },
    {
        name: "Documents",
        childs: [
            {
                name: "background1",
                src: "images/backgrounds/background1.jpg",
                type: 'image'
            }
        ]
    },
    {
        name: "Downloads",
        childs: [
            {
                name: "background3",
                src: "images/backgrounds/background3.jpg",
                type: 'image'
            },
            {
                name: "The Grand Tour - Season 1 [HDTV 720p][Ep.101][AC3 5.1 ES-EN]",
                childs: [
                    {
                        name: "README.TXT",
                        type: 'text',
                        text: "¡¡THANK YOU FOR SUBSCRIBING TO AMAZON PRIME VIDEO!!<br><br>DOWNLOAD MORE CONTENT FOR OFFLINE VIEWING AT PRIMEVIDEO.COM"
                    },
                    {
                        name: "TheGrandTour720p1x01 [www.primevideo.com].mkv",
                        type: 'video',
                        action: () => {
                            alert("Unexpected Error");
                        }
                    }
                ]
            },
            {
                name: "The Grand Tour - Season 1 [HDTV 720p][Ep.107_108][AC3 5.1 ES-EN]",
                childs: [
                    {
                        name: "README.TXT",
                        type: 'text',
                        text: "¡¡THANK YOU FOR SUBSCRIBING TO AMAZON PRIME VIDEO!!<br><br>DOWNLOAD MORE CONTENT FOR OFFLINE VIEWING AT PRIMEVIDEO.COM"
                    },
                    {
                        name: "TheGrandTour720p1x07 [www.primevideo.com].mkv",
                        type: 'video',
                        action: () => {
                            alert("Unexpected Error");
                        }
                    },
                    {
                        name: "TheGrandTour720p1x08 [www.primevideo.com].mkv",
                        type: 'video',
                        action: () => {
                            alert("Unexpected Error");
                        }
                    }
                ]
            }
        ]
    },
    {
        name: "Music",
        childs: [
            {
                name: "Jahzzar - Siesta",
                src: "music/Jahzzar-Siesta.mp3",
                type: 'audio'
            }
        ]
    },
    {
        name: "Images",
        childs: [
            {
                name: "Australia",
                childs: [
                    {
                        name: "IMG243456545.jpg",
                        type: 'image',
                        src: "images/australia1.jpg"
                    },
                    {
                        name: "IMG243456567.jpg",
                        type: 'image',
                        src: "images/australia2.jpg"
                    },
                    {
                        name: "IMG243456589.jpg",
                        type: 'image',
                        src: "images/australia3.jpg"
                    },
                    {
                        name: "IMG243456590.jpg",
                        type: 'image',
                        src: "images/australia4.jpg"
                    }
                ]
            },
            {
                name: "emotional_1.jpg",
                type: 'image',
                src: "images/random1.jpg"
            },
            {
                name: "emotional_2.jpg",
                type: 'image',
                src: "images/random2.jpg"
            },
            {
                name: "emotional_3.jpg",
                type: 'image',
                src: "images/random3.jpg"
            }
        ]
    },
    {
        name: "Videos",
        childs: [
            {
                name: 'Cats',
                childs: [
                    {
                        name: "The Kitty Cat Dance.",
                        src: "https://www.youtube.com/embed/SaA_cs4WZHM",
                        type: 'video'
                    },
                    {
                        name: "Charlie Schmidt's Keyboard Cat!",
                        src: "https://www.youtube.com/embed/J---aiyznGQ",
                        type: 'video'
                    },
                ]
            },
            {
                name: 'Docus',
                childs: [
                    {
                        name: "HUMAN - Documentary",
                        src: "https://www.youtube.com/embed/vdb4XGVTHkE",
                        type: 'video'
                    },
                    {
                        name: "The Simulation Hypothesis",
                        src: "https://www.youtube.com/embed/VqULEE7eY8M",
                        type: 'video'
                    },
                ]
            },
            {
                name: 'Shorts',
                childs: [
                    {
                        name: "Deadpool - No Good Deed Clip",
                        src: "https://www.youtube.com/embed/RVJX7jTIPsc",
                        type: 'video'
                    },
                    {
                        name: "TUCK ME IN",
                        src: "https://www.youtube.com/embed/gNQIdEv-Emo",
                        type: 'video'
                    },
                    {
                        name: "I'm You, Dickhead",
                        src: "https://www.youtube.com/embed/iAUjt7KWp9A",
                        type: 'video'
                    },
                    {
                        name: "Night of stars",
                        src: "videos/a_sky_full_of_stars.mp4",
                        type: 'video'
                    },
                    {
                        name: "Michael Cera - Gregory Go Boom",
                        src: "https://www.youtube.com/embed/LE8kTPtLftI",
                        type: 'video'
                    },
                    {
                        name: "'Dawn' by Rose McGowan",
                        src: "https://www.youtube.com/embed/RQ41Y2Gp4io",
                        type: 'video'
                    },
                    {
                        name: "Rejected",
                        src: "https://www.youtube.com/embed/MuOvqeABHvQ",
                        type: 'video'
                    },
                    {
                        name: "The Horribly Slow Murderer with the Extremely Inefficient Weapon",
                        src: "https://www.youtube.com/embed/9VDvgL58h_Y",
                        type: 'video'
                    },
                ]
            },
            {
                name: "MrBean_EP01SE01.avi",
                src: "https://www.youtube.com/?autoplay=1&rel=0&list=PLd4rjD_RVZHEn0GxzchcjIdBBYTjsWv-X",
                type: 'video'
            }
        ]
    }
];

if (window.language && window.language === 'Spanish') {
    const index = _.findIndex(fileTree, item => item.name === 'Videos');

    if (index) {
        fileTree[index].childs.push(
            {
                name: "Ataque a los Titanes - T2",
                src: "https://www.youtube.com/embed?list=PLLz12MlNsBZrqO-x19YMbhN6djcGhofQC",
                type: 'video'
            },
            {
                name: "Vincent Finch",
                src: "https://www.youtube.com/embed?list=PLF--ctOzLtoInRpGATeCaQukQ2MR6kAsx",
                type: 'video'
            },
            {
                name: "VincentVlogs",
                src: "https://www.youtube.com/embed?list=PLF--ctOzLtoIyxGVzQb9O6CalHMk2oyjN",
                type: 'video'
            },
            {
                name: "Cálico electrónico - T1",
                src: "https://www.youtube.com/embed?list=PL2575AD427FAA913E",
                type: 'video'
            },
            {
                name: "Cálico electrónico - T2",
                src: "https://www.youtube.com/embed?list=PL1B526C83BD5B0A4E",
                type: 'video'
            },
            {
                name: "Cálico electrónico - T3",
                src: "https://www.youtube.com/embed?list=PLBF49E8F7C96F54B6",
                type: 'video'
            },
            {
                name: "Cálico electrónico - T4",
                src: "https://www.youtube.com/embed?list=PL1FYKbnKEKzqZFFNbDbIwo6rCltYOtS5T",
                type: 'video'
            },
            {
                name: "Cálico electrónico - T5",
                src: "https://www.youtube.com/embed?list=PL1FYKbnKEKzqY7XDC3oeOccoixBPmL5gO",
                type: 'video'
            },
            {
                name: "Dos Salaos en Modo Random",
                src: "https://www.youtube.com/embed?list=PLKXvPRV8Zq23ui41gk92lfdCshM5df5M2",
                type: 'video'
            }
        );
    }
}

// initial state
const state = fileTree;

// getters
const getters = {
    files: state => state,
    getFileType: () => file => {
        if (file.type) return file.type;

        if (file.childs) return 'folder';
    },
    getIcon: (state, getters) => file => {
        if (file.icon) return file.icon;

        const type = file.type || getters.getFileType(file);

        switch (type) {
            case 'audio':
                return 'images/filetypes/audio.png';
            case 'text':
                return 'images/filetypes/file.png';
            case 'image':
                return file.src;
            case 'video':
                return 'images/filetypes/video.png';
            case 'folder':
                return 'images/filetypes/folder.png';
            case 'exe':
                return 'images/filetypes/executable.png';
            default:
                return 'images/filetypes/file.png';
        }
    },
};

// actions
const actions = {

};

// mutations
const mutations = {

};

export default {
    state,
    getters,
    actions,
    mutations
};
