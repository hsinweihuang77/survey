import { defineStore } from 'pinia';

export default defineStore("survey", {

    state(){ //data
        return {
            formData:{
                name:"",
                phone:"",
                age:"",
                email:""
            },
            survey: {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                questions: []
            }
        }
    },

    getters:{ //computed

    },

    actions:{ //methods

    }
})