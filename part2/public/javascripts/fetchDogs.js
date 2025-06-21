// vue script for fetching dog names from /users/dogs route

const { createApp } = Vue;

createApp({

    data() {
        return {
            // this variable is used for v-for
            // names array stores dog names
            names: []
        };
    },

    // waits until #app is mounted to run fetchDogs
    async mounted() {
        await this.fetchDogs();
    },

    methods: {
        async fetchDogs() {
            try {
                // receive simple JSON
                const response = await fetch('/users/dogs');
                if (response.ok) {
                    const data = await response.json();
                    this.names = data.names;
                } else {
                    console.error('Fetch failed');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}).mount('#app');
