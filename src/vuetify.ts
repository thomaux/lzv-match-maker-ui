import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export const vuetify = new Vuetify({
    icons: {
        iconfont: 'md'
    },
    theme: {
        themes: {
            light: {
                primary: '#3A5795',
                secondary: '#C2C1C2',
                accent: '#BD4089',
                error: '#F2542D',
                success: '#0E9594',
                
            }
        }
    }
});