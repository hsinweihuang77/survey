<script>
import location from "../stores/location"
import { mapActions } from 'pinia'

export default{
    data(){
        return{

        }
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
    <h1>這頁填資料: {{ this.$route.params.id }}</h1>
    <RouterLink class="routeItem" to="/Front">取消</RouterLink>
    <RouterLink class="routeItem" :to="`/SurveyCheckFront/${this.$route.params.id}`">送出</RouterLink>
</template>

<style scoped lang="scss">
.routeItem{
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}
</style>