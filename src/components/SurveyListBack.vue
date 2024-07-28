<script>
export default{
    data(){
        return{
            test:[
                {
                    number:1,
                    title:"title01",
                    state:"state01",
                    startTime:"startTime01",
                    endTime:"endTime01",
                    go:"前往"
                },
                {
                    number:2,
                    title:"title02",
                    state:"state02",
                    startTime:"startTime02",
                    endTime:"endTime02",
                    go:"前往"
                },
                {
                    number:3,
                    title:"title03",
                    state:"state03",
                    startTime:"startTime03",
                    endTime:"endTime03",
                    go:"前往"
                },
                {
                    number:4,
                    title:"title04",
                    state:"state04",
                    startTime:"startTime04",
                    endTime:"endTime04",
                    go:"前往"
                },
                {
                    number:5,
                    title:"title05",
                    state:"state05",
                    startTime:"startTime05",
                    endTime:"endTime05",
                    go:"前往"
                },
            ]
        }
    },
}
</script>

<template>
    <table class="surveyList">
        <tr>
            <td></td>
            <td>編號</td>
            <td>名稱</td>
            <td>狀態</td>
            <td>開始時間</td>
            <td>結束時間</td>
            <td>結果</td>
        </tr>
        <tr v-for="item in test" :key="item.title">
            <td>
                <input type="checkbox" name="" id="">
            </td>
            <td>{{ item.number }}</td>
            <td>
                <RouterLink :to="`/SurveyDetailBack/${item.number}`">
                    {{ item.title }}
                </RouterLink>
            </td>
            <td>{{ item.state }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>
                <RouterLink :to="`/SurveyDetailBack/${item.number}`">
                    {{ item.go }}
                </RouterLink>
            </td>
        </tr>
    </table>
</template>

<style scoped lang="scss">
.surveyList{
    width: 80%;
    height: 60dvh;
}
</style>