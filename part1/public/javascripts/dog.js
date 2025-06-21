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
                response = await fetch("https://dog.ceo/api/breeds/image/random");
            } catch (error) {
                console.error(error);
            }
        }
    }

})