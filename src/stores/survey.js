import { defineStore } from 'pinia';

export default defineStore("survey", {

    state() { //data
        return {
            formData: {
                feedbackList: []
            }
            ,
            survey: {
                id: 0,
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                published: false,
                quesList: []
            },
            feedbackId: undefined
        }
    },

    getters: { //computed

    },

    actions: { //methods
        setFeedbackId(id){
            this.feedbackId = id;
        }
    }
})