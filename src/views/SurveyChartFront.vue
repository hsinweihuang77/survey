<script>
import location from "../stores/location"
import { mapActions } from 'pinia'
import SurveyChart from "@/components/SurveyChart.vue";

export default{
    components:{
        SurveyChart,
    },
    methods:{
        ...mapActions(location, ["setPages"])
    },
    mounted(){
        this.setPages("Front")
    }
}
</script>

<template>
    <SurveyChart/>
    <RouterLink class="routeItem" to="/Front">取消</RouterLink>
</template>

<style scoped lang="scss">
.routeItem{
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}
</style>