<script>
import location from "../stores/location"
import color from '../stores/color'
import survey from '../stores/survey'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
    props:["id"],
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(location, ["setPages"]),
        testlog(){
            console.log(this.formData);
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        ...mapState(survey, ["formData"]),
    },
    mounted() {
        this.setPages("Front")
    }
}
</script>

<template>
    <div class="mainArea">
        <div class="content" v-if="id == 19">
            <div class="syoukai">
                <h2>大好きな季節と言えば</h2>
                <p>春になり、万物が寒冬から蘇るようになっています。</p>
                <p>花が咲き、木の芽が出て、命の力を感じられますよね。</p>
                <p>秋って春と反対になり、爽やかな空気を、植物が枯れて、</p>
                <p>すべてがゆっくりしていくように、人生を考え始めます。</p>
                <p>春と秋、しいと言えばやはり秋かな。</p>
            </div>
            <div class="info">
                <label for="name">名前：</label>
                <input type="text" class="infoText" id="name" v-model="formData.name">
            </div>
            <div class="info">
                <label for="phone">手機：</label>
                <input type="text" class="infoText" id="phone" v-model="formData.phone">
            </div>
            <div class="info">
                <label for="age">年齡：</label>
                <input type="text" class="infoText" id="age" v-model="formData.age">
            </div>
            <div class="info">
                <label for="email">E-mail：</label>
                <input type="email" name="" id="email" class="infoText" v-model="formData.email">
            </div>
            <b>1.一番好きな季節は？</b>
            <div class="select">
                <input type="radio" name="season" id="">
                <label for="">春</label>
                <input type="radio" name="season" id="">
                <label for="">夏</label>
                <input type="radio" name="season" id="">
                <label for="">秋</label>
                <input type="radio" name="season" id="">
                <label for="">冬</label>
            </div>
            <b>2.選んだ理由は？ 2点ぐらい書いてください。</b>
            <div>
                <input type="text" class="freeAns">
            </div>
            <div class="end">
                <button type="button" class="btn">回前頁</button>
                <button type="submit" @click="this.testlog">送出</button>
            </div>
        </div>
    </div>
    <h1>這頁填資料: {{ this.id }}</h1>
    <RouterLink class="routeItem" to="/Front">取消</RouterLink>
    <RouterLink class="routeItem" :to="`/SurveyCheckFront/${this.$route.params.id}`">送出</RouterLink>
</template>

<style scoped lang="scss">
.mainArea {
    width: 800px;
    background-color: v-bind(blockcolor);
    border-radius: 20px;
    margin: 5% 0;
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s;
}

.content{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: v-bind(textcolor);
    
    .syoukai{
        text-align: center;
    }    

    .info{
        display: flex;
        justify-content: space-between;

        .infoText{
            width: 85%;
        }
    }

    .select label{
        padding-right: 25px;
        padding-left: 5px;
    }

    .freeAns{
        width: 100%;
        height: 100px;
    }

    .end{
        text-align: end;

        .btn{
            margin: 0 20px;
        }
    }
}


.routeItem {
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
}
</style>