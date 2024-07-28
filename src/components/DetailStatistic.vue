<script>
import SurveyChart from "@/components/SurveyChart.vue";

export default {
    components:{
        SurveyChart,
    },
    data() {
        return {
            
        }
    },
}
</script>

<template>
    <div class="contentArea">
        <SurveyChart/>
        <div class="row1">
            <button type="button" @click="this.$router.push(`/Back`)">回到列表</button>
            <button type="button" @click="$emit('update:contentIndex', 'DetailFeedback')">上一步</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contentArea {
    width: 80dvw;
    height: 70dvh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .feedbackList {
        width: 80%;
        height: 60dvh;
    }
}
</style>