<script>
import location from "../stores/location"
import { mapActions } from 'pinia'
import Search from "../components/Search.vue"
import SurveyListBack from "../components/SurveyListBack.vue"

export default{
    components:{
        Search,
        SurveyListBack,
    },
    data(){
        return{

        }
    },
    methods:{
        ...mapActions(location, ["setPages"])
    },
    mounted(){
        this.setPages("Back")
    }
}
</script>

<template>
    <Search/>
    <SurveyListBack/>
</template>

<style scoped>

</style>