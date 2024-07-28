<script>
import location from "../stores/location"
import { mapActions } from 'pinia'
import DetailSurvey from "../components/DetailSurvey.vue"
import DetailQuestion from "../components/DetailQuestion.vue"
import DetailFeedback from "../components/DetailFeedback.vue"
import DetailStatistic from "../components/DetailStatistic.vue"

export default{
    components:{
        DetailSurvey,
        DetailQuestion,
        DetailFeedback,
        DetailStatistic
    },
    data(){
        return{
            contentIndex: "DetailSurvey"
        }
    },
    methods:{
        ...mapActions(location, ["setPages"]),
    },
    mounted(){
        this.setPages("Back")
    }
}
</script>

<template>
    <div class="indexButton">
        <button type="button" @click="this.contentIndex = 'DetailSurvey'">問卷</button>
        <button type="button" @click="this.contentIndex = 'DetailQuestion'">題目</button>
        <button type="button" @click="this.contentIndex = 'DetailFeedback'">問卷回饋</button>
        <button type="button" @click="this.contentIndex = 'DetailStatistic'">統計</button>
    </div>
    <div class="detailContent">
        <component :is="this.contentIndex" v-model:contentIndex="this.contentIndex"></component>
    </div>
</template>

<style scoped lang="scss">
.routeItem{
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}
</style>