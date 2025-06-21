// vue script for fetching dog names from /users/dogs route

const { createApp } = Vue;

createApp({

    data() {
        return {
            // these variables are used for v-for
            //
            names: [],
            selected: ''
        };
    },

    methods: {
        async fetchDogs() {
            try {
);
                this.imageSrc = data.message;
            } catch (error) {
                console.error(error);
            }
        }
    }

}).mount('#app');
