// vue script for fetching dog names from /users/dogs route

const { createApp } = Vue;

createApp({

    data() {
        return {
            // these variables are used for v-if
            // loading just shows 'Loading...' text if true, otherwise image if false
            // imageSrc is the url provided by the dog api
            imageSrc: '',
            loading: false
        };
    },

    // waits until #dog is mounted to run fetchDogImage
    async mounted() {
        await this.fetchDogImage();
    },

    methods: {
        async fetchDogImage() {
            try {
                // loading is true until dog retrieved
                this.loading = true;
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                this.imageSrc = data.message;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        }
    }

}).mount('#app');
