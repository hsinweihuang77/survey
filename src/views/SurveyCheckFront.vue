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
    <h1>這頁確認資料: {{ this.$route.params.id }}</h1>
    <RouterLink class="routeItem" :to="`/SurveyDetailFront/${this.$route.params.id}`">取消</RouterLink>
</template>

<style scoped lang="scss">
.routeItem{
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}
</style>