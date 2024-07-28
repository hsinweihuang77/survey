<script>
export default {
    data() {
        return {
            test: [
                {
                    number: 1,
                    name: "name01",
                    time: "time01",
                },
                {
                    number: 2,
                    name: "name02",
                    time: "time02",
                },
                {
                    number: 3,
                    name: "name03",
                    time: "time03",
                },
                {
                    number: 4,
                    name: "name04",
                    time: "time04",
                },
                {
                    number: 5,
                    name: "name05",
                    time: "time05",
                },
            ],
            feedbackIndex: 0
        }
    },
}
</script>

<template>
    <div class="contentArea" v-if="this.feedbackIndex == 0">
        <table class="feedbackList">
            <tr>
                <td>編號</td>
                <td>姓名</td>
                <td>填寫時間</td>
                <td>觀看回覆</td>
            </tr>
            <tr v-for="item in test" :key="item.content">
                <td>{{ item.number }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.time }}</td>
                <td>
                    <button type="button" @click="this.feedbackIndex = item.number">前往</button>
                </td>
            </tr>
        </table>
        <div class="row1">
            <button type="button" @click="this.$router.push(`/Back`)">回到列表</button>
            <button type="button" @click="$emit('update:contentIndex', 'DetailQuestion')">上一步</button>
            <button type="button" @click="$emit('update:contentIndex', 'DetailStatistic')">下一步</button>
        </div>
    </div>
    <div v-for="item in test" :key="item.name">
        <div v-if="feedbackIndex == item.number" class="feedbackContent">
            <p>{{ item.number }}的回答內容</p>
            <div class="feedbackBTN">
                <button type="button" @click="feedbackIndex = 0">回到列表</button>
                <button type="button" @click="feedbackIndex--" v-if="feedbackIndex > 1">上一個</button>
                <button type="button" @click="feedbackIndex++" v-if="feedbackIndex < this.test.length">下一個</button>
            </div>
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

.feedbackContent{
    width: 80dvw;
    height: 70dvh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>