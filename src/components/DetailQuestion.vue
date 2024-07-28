<script>
export default{
    data(){
        return{
            test:[
                {
                    number:1,
                    content:"content01",
                    type:"type01",
                    check:true,
                    edit:"編輯"
                },
                {
                    number:2,
                    content:"content02",
                    type:"type02",
                    check:true,
                    edit:"編輯"
                },
                {
                    number:3,
                    content:"content03",
                    type:"type03",
                    check:false,
                    edit:"編輯"
                },
                {
                    number:4,
                    content:"content04",
                    type:"type04",
                    check:true,
                    edit:"編輯"
                },
                {
                    number:5,
                    content:"content05",
                    type:"type05",
                    check:false,
                    edit:"編輯"
                },
            ]
        }
    },
}
</script>

<template>
    <div class="contentArea">
        <div class="row1">
            <span>問題：</span>
            <input type="text">
            <select name="" id="">單選題</select>
            <input type="checkbox" name="" id="">
            <span>必填</span>
        </div>
        <div class="row2">
            <span>選項：</span>
            <input type="text">
            <button type="button">加入</button>
        </div>
        <table class="questionList">
        <tr>
            <td></td>
            <td>編號</td>
            <td>內容</td>
            <td>問題種類</td>
            <td>必填</td>
            <td>編輯</td>
        </tr>
        <tr v-for="item in test" :key="item.content">
            <td>
                <input type="checkbox">
            </td>
            <td>{{ item.number }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.type }}</td>
            <td>
                <input type="checkbox" name="" id="" :checked="item.check" disabled="true">
            </td>
            <td>{{ item.edit }}</td>
        </tr>
    </table>
        <div class="row3">
            <button type="button" @click="this.$router.push(`/Back`)">回到列表</button>
            <button type="button" @click="$emit('update:contentIndex', 'DetailSurvey')">上一步</button>
            <button type="button" @click="$emit('update:contentIndex', 'DetailFeedback')">下一步</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contentArea{
    width: 80dvw;
    height: 70dvh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .questionList{
    width: 80%;
    height: 60dvh;
}
}
</style>