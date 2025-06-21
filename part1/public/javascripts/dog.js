// vue script for fetching image

const { createApp } = Vue;

createApp({

    data() {
        return {
            imageSrc: ''
        };
    },

    methods: {
        async fetchDogImage() {
            try {
                const response = await fetch("https://dog.ceo/api/breeds/image/random");
                const data = response.json();
            } catch (error) {
                console.error(error);
            }
        }
    }

})