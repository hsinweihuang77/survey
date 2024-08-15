<script>
import color from '../stores/color'
import { mapState } from 'pinia'

export default {
    props: [
        "checkboxState"
    ],
    data() {
        return {
            test: [
                {
                    number: 19,
                    title: "一番好きな季節は？",
                    state: "已結束",
                    startTime: "2024/07/01",
                    endTime: "2024/07/07",
                    go: "前往"
                },
                {
                    number: 18,
                    title: "都会？田舎？",
                    state: "已結束",
                    startTime: "2024/07/11",
                    endTime: "2024/07/20",
                    go: "前往"
                },
                {
                    number: 17,
                    title: "格安航空(LCC)だったら、Tiger？Peach？Jetstar？",
                    state: "進行中",
                    startTime: "2024/07/21",
                    endTime: "2024/07/30",
                    go: "前往"
                },
                {
                    number: 16,
                    title: "従来からある航空(FSC)JAL？ANA？EVA？",
                    state: "進行中",
                    startTime: "2024/07/21",
                    endTime: "2024/07/30",
                    go: "前往"
                },
                {
                    number: 15,
                    title: "ユニバ（Universal）？ディズニーランド（Disneyland）？",
                    state: "進行中",
                    startTime: "2024/07/17",
                    endTime: "2024/07/21",
                    go: "前往"
                },
                {
                    number: 14,
                    title: "一生の内にやりたい事",
                    state: "即將結束",
                    startTime: "2024/08/01",
                    endTime: "2024/08/06",
                    go: "前往"
                },
                {
                    number: 13,
                    title: "これまで行けずに後悔するところ",
                    state: "即將結束",
                    startTime: "2024/08/06",
                    endTime: "2024/08/12",
                    go: "前往"
                },
                {
                    number: 12,
                    title: "これまで達成できて一番良かったことは？",
                    state: "即將結束",
                    startTime: "2024/08/15",
                    endTime: "2024/08/20",
                    go: "前往"
                },
                {
                    number: 11,
                    title: "もしあと1年で、人生が終わるとしたら？",
                    state: "即將結束",
                    startTime: "2024/08/16",
                    endTime: "2024/08/25",
                    go: "前往"
                },
                {
                    number: 10,
                    title: "ペットを飼うなら",
                    state: "即將結束",
                    startTime: "2024/08/20",
                    endTime: "2024/08/23",
                    go: "前往"
                },
                {
                    number: 9,
                    title: "E312購買傾向市調",
                    state: "尚未開始",
                    startTime: "2023/11/12",
                    endTime: "2023/12/31",
                    go: "前往"
                },
                {
                    number: 8,
                    title: "青春洋溢高中生人氣投票戰",
                    state: "進行中",
                    startTime: "2023/08/12",
                    endTime: "2023/11/01",
                    go: "前往"
                },
                {
                    number: 7,
                    title: "尾牙餐廳預選",
                    state: "已結束",
                    startTime: "2023/08/01",
                    endTime: "2023/10/12",
                    go: "前往"
                },
                {
                    number: 6,
                    title: "中秋禮盒預選",
                    state: "已結束",
                    startTime: "2023/07/15",
                    endTime: "2023/09/20",
                    go: "前往"
                },
                {
                    number: 5,
                    title: "E300購買傾向市調",
                    state: "已結束",
                    startTime: "2023/07/14",
                    endTime: "2023/08/31",
                    go: "前往"
                },
                {
                    number: 4,
                    title: "Q2最佳員工",
                    state: "已結束",
                    startTime: "2023/06/18",
                    endTime: "2023/07/05",
                    go: "前往"
                },
                {
                    number: 3,
                    title: "07/03大會參加統計",
                    state: "已結束",
                    startTime: "2023/06/03",
                    endTime: "2023/06/30",
                    go: "前往"
                },
                {
                    number: 2,
                    title: "第6期好員工票選大賽",
                    state: "已結束",
                    startTime: "2023/05/15",
                    endTime: "2023/06/20",
                    go: "前往"
                },
                {
                    number: 1,
                    title: "05/20會議參加統計",
                    state: "已結束",
                    startTime: "2023/04/08",
                    endTime: "2023/05/18",
                    go: "前往"
                },
            ],
            currentPage: 1,
            qShowed: 5, //顯示問卷數量
            sortCon: [true, false, false],//編號，開始時間，結束時間
            sortIcon: [1, 0, 0],//排序icon 0不顯示 1降序 2升序
            showType: "list", //預設為清單顯示
            stateMapping: {
                "尚未開始": 0,
                "進行中": 1,
                "即將結束": 2,
                "已結束": 3
            },
            selectedSurvey: [],//勾選問卷
            checkAll: false,//全選按鈕
            forceUpdateTrigger: false,//強迫computed重新計算
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        testArr() {
            this.forceUpdateTrigger;
            return this.testTemp.slice((this.currentPage - 1) * this.qShowed, this.currentPage * this.qShowed);
        },
        totalPage() {
            return Math.ceil(this.testTemp.length / this.qShowed);
        },
        testTemp() {//清單頁面的全部問卷
            return this.test.filter(item => this.checkboxState[this.stateMapping[item.state]]);
        }

    },
    methods: {
        changePage(page) {  //換頁
            this.currentPage = page;
        },
        sortChange(item) {
            this.checkAll = false;
            switch (item) {
                case 0:
                    if (this.sortCon[0]) {
                        this.testTemp.sort((a, b) => a.number - b.number);
                        this.sortCon.fill(false);
                        this.sortIcon.fill(0);
                        this.sortIcon[0] = 2;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger; //強迫testArr重新計算
                        return;
                    }
                    if (!this.sortCon[0]) {
                        this.testTemp.sort((a, b) => b.number - a.number);
                        this.sortCon.fill(false);
                        this.sortCon[0] = true;
                        this.sortIcon.fill(0);
                        this.sortIcon[0] = 1;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                case 1:
                    if (this.sortCon[1]) {
                        this.testTemp.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                        this.sortCon.fill(false);
                        this.sortIcon.fill(0);
                        this.sortIcon[1] = 2;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                    if (!this.sortCon[1]) {
                        this.testTemp.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                        this.sortCon.fill(false);
                        this.sortCon[1] = true;
                        this.sortIcon.fill(0);
                        this.sortIcon[1] = 1;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                case 2:
                    if (this.sortCon[2]) {
                        this.testTemp.sort((a, b) => new Date(a.endTime) - new Date(b.endTime))
                        this.sortCon.fill(false);
                        this.sortIcon.fill(0);
                        this.sortIcon[2] = 2;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                    if (!this.sortCon[2]) {
                        this.testTemp.sort((a, b) => new Date(b.endTime) - new Date(a.endTime))
                        this.sortCon.fill(false);
                        this.sortCon[2] = true;
                        this.sortIcon.fill(0);
                        this.sortIcon[2] = 1;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
            }
        },
        deleteSurvey() {
            this.checkAll = false;
            this.test = this.test.filter(item => !this.selectedSurvey.includes(item.number));
        },
        toggleSelectAll() {
            if (this.checkAll) {
                // 全選
                this.selectedSurvey = this.testArr.map(item => item.number);
            } else {
                // 全不選
                this.selectedSurvey = [];
            }
        },
    },
        watch: {
        qShowed() { //更改顯示數量
            this.currentPage = 1;
        },
        totalPage() {
            if (this.currentPage > this.totalPage) {
                this.changePage(this.totalPage);
            }
        },
        testArr(){ //顯示有改變就重製全選按鈕
            this.checkAll = false;
            this.toggleSelectAll();
        }
    },
}
</script>

<template>
    <div class="mainArea">
        <div class="qShowed">
            <div class="qShowedLeft">
                <i class="fa-solid fa-trash" @click="deleteSurvey()"></i>
                <RouterLink to="/CreateSurvey">
                    <i class="fa-solid fa-plus"></i>
                </RouterLink>
            </div>

            <div class="qShowedRight">
                <!-- 選擇顯示數量 -->
                <span>顯示數量</span>
                <select name="" id="amountSelect" v-model.number="this.qShowed">
                    <option v-for="index in 10" :value="index" :key="index">{{ index }}</option>
                </select>

                <!-- 控制顯示方式 -->
                <label for="radio1" class="radio" :class="{ 'radioSelected': this.showType == 'list' }">
                    <i class="fa-solid fa-list"></i>
                </label>
                <input type="radio" id="radio1" name="radio" value="list" v-model="this.showType"
                    style="display: none;">
                <label for="radio2" class="radio" :class="{ 'radioSelected': this.showType == 'block' }">
                    <i class="fa-solid fa-grip-vertical"></i>
                </label>
                <input type="radio" id="radio2" name="radio" value="block" v-model="this.showType"
                    style="display: none;">
            </div>
        </div>

        <table class="surveyList" v-if="this.showType == 'list'">

            <!-- 標題 排序 -->
            <tr class="surveyRowTitle">
                <td><input type="checkbox" v-model="this.checkAll" @change="toggleSelectAll"></td>
                <td><a href @click.prevent="this.sortChange(0)">
                        編號
                        <i class="fa-solid fa-sort-up" v-if="this.sortIcon[0] == 2"></i>
                        <i class="fa-solid fa-sort-down" v-if="this.sortIcon[0] == 1"></i>
                    </a></td>
                <td>名稱</td>
                <td>狀態</td>
                <td><a href @click.prevent="this.sortChange(1)">
                        開始時間
                        <i class="fa-solid fa-sort-up" v-if="this.sortIcon[1] == 2"></i>
                        <i class="fa-solid fa-sort-down" v-if="this.sortIcon[1] == 1"></i>
                    </a></td>
                <td><a href @click.prevent="this.sortChange(2)">
                        結束時間
                        <i class="fa-solid fa-sort-up" v-if="this.sortIcon[2] == 2"></i>
                        <i class="fa-solid fa-sort-down" v-if="this.sortIcon[2] == 1"></i>
                    </a></td>
                <td>結果</td>
            </tr>

            <!-- 問卷清單 -->
            <tr v-for="item in testArr" :key="item.number" class="surveyRow">
                <td><input type="checkbox" v-model="selectedSurvey" :value="item.number"></td>
                <td style="width:10%">{{ item.number }}</td>
                <td style="width:40%">
                    <RouterLink :to="`/SurveyDetailBack/${item.number}`">
                        {{ item.title }}
                    </RouterLink>
                </td>
                <td style="width:10%">{{ item.state }}</td>
                <td style="width:15%">{{ item.startTime }}</td>
                <td style="width:15%">{{ item.endTime }}</td>
                <td style="width:10%">
                    <RouterLink :to="`/SurveyDetailBack/${item.number}`">
                        {{ item.go }}
                    </RouterLink>
                </td>
            </tr>
        </table>

        <div class="surveyBlock" v-if="this.showType == 'block'">
            <div class="blockItem" v-for="item in testArr" :key="item.number">
                <div class="blockItemTop">
                    <span>{{ item.state }}</span>
                    <RouterLink :to="`/SurveyChartFront/${item.number}`">
                        <i class="fa-solid fa-chart-pie"></i>
                    </RouterLink>
                </div>
                <div class="blockItemImg">
                    <span>{{ item.title }}</span>
                </div>
                <div class="blockItemBot">
                    <span>{{ item.title }}</span>
                </div>

            </div>

        </div>

        <!-- 頁碼 -->
        <ul class="pagination">
            <li class="page-item" :class="{ 'disableditem': this.currentPage == 1 }"
                @click.prevent="this.changePage(this.currentPage - 1)">
                <a class="page-link" href>&lt;</a>
            </li>
            <li class="page-item" v-for="page in this.totalPage" :class="{ 'pageSelected': this.currentPage == page }"
                @click.prevent="this.changePage(page)">
                <a class="page-link" href>{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disableditem': this.currentPage == this.totalPage }"
                @click.prevent="this.changePage(this.currentPage + 1)">
                <a class="page-link" href>&gt;</a>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.mainArea {
    width: 100%;
    background-color: v-bind(blockcolor);
    border-radius: 20px;
    margin: 5% 0;
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s;
}

.qShowed {
    width: 100%;
    margin-bottom: 3%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: v-bind(textcolor);
    padding: 0 15px;

    .qShowedLeft {
        display: flex;
        align-items: center;

        .fa-trash {
            margin: 0 15px;
        }

        .fa-solid {
            color: v-bind(linkcolor);
            cursor: pointer;
        }
    }

    .qShowedRight {
        display: flex;

        #amountSelect {
            height: 25px;
            border-radius: 3px;
            margin: 0 15px;
        }

        .radio {
            margin: 0 10px;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .radioSelected {
            background-color: v-bind(textcolor);
            color: v-bind(maincolor);
            border-radius: 3px;
            transition: 0.3s;
        }

        .fa-solid {
            font-size: 20px;
            cursor: pointer;
        }
    }

}

.surveyList {
    width: 100%;
    color: v-bind(textcolor);

    .surveyRowTitle {
        height: 50px;

        a {
            color: v-bind(textcolor);
        }

        td {
            text-align: center;
        }
    }

    .surveyRow {
        height: 50px;

        td {
            text-align: center;
        }
    }
}

.surveyBlock {
    display: flex;
    flex-wrap: wrap;

    .blockItem {
        width: 30%;
        height: 280px;
        border-radius: 20px;
        color: v-bind(textcolor);
        background-color: v-bind(subcolor);
        margin-bottom: 36px;
        padding: 1% 2%;

        &:not(:nth-child(3n)) {
            margin-right: 5%;
        }

        .blockItemTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .blockItemImg {
            width: 100%;
            height: 140.4px;
            margin: 5% 0;
            padding: 5%;
            background-color: rgb(238, 238, 238, 0.8);
            color: v-bind(maincolor);
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.pagination {
    display: block;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 2%;

    .page-item {
        cursor: pointer;
        // font-size: 1rem;
        list-style: none;
        // display: block;
        width: 40px;
        // height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid v-bind(textcolor);
        color: v-bind(linkcolor);
        float: left;
        margin: 0;
        // margin-right: -1px;

        &:hover {
            background-color: v-bind(textcolor);
        }
    }

    .pageSelected {
        background-color: v-bind(textcolor);
    }

    .disableditem {
        pointer-events: none;
    }
}

a {
    color: v-bind(linkcolor);
    text-decoration: none;
}
</style>