<script>
import color from '../stores/color'
import { mapState } from 'pinia'

export default{
    data(){
        return{
            startTime:"",
            endTime:""
        }
    },
    computed: {
        ...mapState(color, ["subcolor", "textcolor"]),
    },
    props:[
        "checkboxState"
    ]
}
</script>

<template>
    <label for="searchIcon" class="searchIcon">
        <i class="fa-solid fa-magnifying-glass"></i>
    </label>
    <input type="checkbox" id="searchIcon">
    <div class="block"></div>
    <div class="searchBox">
        <div class="searchBoxTop">
            <span>問卷名稱：</span>
            <input type="text" class="searchText">
        </div>
        <div class="searchBoxBot">
            <p>統計時間：</p>
            <input type="date" class="searchDate" v-model="this.startTime" :max="this.endTime">
            <span>到</span>
            <input type="date" class="searchDate" v-model="this.endTime" :min="this.startTime">
            <button type="button">搜尋</button>
        </div>
        <div class="stateCon">
            <div class="stateCon1">
                <input type="checkbox" id="stateCon1" v-model="this.checkboxState[0]">
                <label for="stateCon1">尚未開始</label>
                <input type="checkbox" id="stateCon2" v-model="this.checkboxState[1]">
                <label for="stateCon2">進行中</label>
            </div>
            <div class="stateCon1">
                <input type="checkbox" id="stateCon3" v-model="this.checkboxState[2]">
                <label for="stateCon3">即將結束</label>
                <input type="checkbox" id="stateCon4" v-model="this.checkboxState[3]">
                <label for="stateCon4">已結束</label>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.searchIcon{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: v-bind(subcolor);
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &::after{
        content: "";
        position: absolute;
        top: 0;
        left: -15px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        width: 15px;
        height: 40px;
        background-color: v-bind(subcolor);
    }
    &:hover{
        cursor: pointer;
    }
    i{
        color: v-bind(textcolor);
    }
}

#searchIcon{
    display: none;

    &:checked ~ .searchBox{
        width: 300px;
        height: 250px;
    }

}

.searchBox{
    position: absolute;
    top: 0;
    right: 115%;
    width: 0;
    height: 0;
    border-radius: 20px;
    border-top-right-radius: 0;
    background-color: v-bind(subcolor);
    color: v-bind(textcolor);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    transition: 0.3s;

    .searchBoxTop{
        width: 90%;
        margin: 0 5%;

        .searchText{
            width: 100%;
            height: 25px;
            margin-top: 10px;
            border-radius: 8px;
        }
    }
    
    .searchBoxBot{
        width: 90%;
        margin: 0 5%;

        .searchDate{
            border-radius: 8px;
            margin-top: 10px;
            margin-right: 10px;
            padding: 0 5px;
        }
    }

    .stateCon{
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin: 0 5%;
        .stateCon1{
            display: flex;
            align-items: center;
            width: 100%;
            margin: 1% 0;
        }
        input{
            width: 15px;
            height: 15px;
            margin-right: 1%;
        }
        label{
            margin-right: 15%;
        }
    }
}
</style>