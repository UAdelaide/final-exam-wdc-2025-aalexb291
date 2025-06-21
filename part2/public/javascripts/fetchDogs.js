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
                const response = await fetch('/users/dogs');
                if (response.ok) {
                    const data = await response.json();
                    this.names = data.names;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}).mount('#app');
