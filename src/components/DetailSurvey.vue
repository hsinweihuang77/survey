<script>
export default{
    data(){
        return{
        }
    },
    props:[
        "contentIndex",
    ],
    // mounted(){
    //     console.log(this.contentIndex);
    // }
}
</script>

<template>
    <div class="contentArea">
        <div class="row1">
            <span>問卷名稱：</span>
            <input type="text">
        </div>
        <div class="row2">
            <span>問卷說明：</span>
            <input type="text">
        </div>
        <div class="row3">
            <span>開始時間：</span>
            <input type="date">
        </div>
        <div class="row4">
            <span>結束時間：</span>
            <input type="date">
        </div>
        <div class="row5">
            <button type="button" @click="this.$router.push(`/Back`)">回到列表</button>
            <button type="button" @click="$emit('update:contentIndex', 'DetailQuestion')">下一步</button>
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
}
</style>