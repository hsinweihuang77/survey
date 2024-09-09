<script>
import color from '../stores/color'
import survey from '../stores/survey'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import axios from 'axios'

export default {
    data() {
        return {
            test: [
                {
                    id: 19,
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
            surveyList: [],
            currentPage: 1,
            qShowed: 5, //顯示問卷數量
            qShowedArr: [5, 10, 20, 50],
            sortCon: [true, false, false],//編號，開始時間，結束時間
            sortIcon: [1, 0, 0],//排序icon 0不顯示 1降序 2升序
            showType: "list", //預設為清單顯示
            stateMapping: {
                "未發布": 0,
                "未開始": 1,
                "進行中": 2,
                "已結束": 3
            },
            selectedSurvey: [],//勾選問卷
            checkAll: false,//全選按鈕
            forceUpdateTrigger: false,//強迫computed重新計算
            searchItem: {//搜尋欄
                quizName: "",
                startDate: "",
                endDate: ""
            },
            checkboxState: [true, true, true, true],
            searchOn: false
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        ...mapState(survey, ["survey"]),
        surveyListArr() {
            this.forceUpdateTrigger;
            return this.surveyListTemp.slice((this.currentPage - 1) * this.qShowed, this.currentPage * this.qShowed);
        },
        totalPage() {
            return Math.ceil(this.surveyListTemp.length / this.qShowed);
        },
        surveyListTemp() {//清單頁面的全部問卷
            // return this.surveyList;
            if (this.$route.path == '/Back') {
                return this.surveyList.filter(item => this.checkboxState[this.stateMapping[item.state]]);
            }
            if (this.$route.path == '/Front') {
                return this.surveyList.filter(item => this.checkboxState[this.stateMapping[item.state]]).filter(item => item.state !== '未發布');
            }
        },
        today() {
            const date = new Date();

            // 調整時間到 GMT+8 (從 UTC 時間增加 8 小時)
            const gmt8Date = new Date(date.getTime() + 8 * 60 * 60 * 1000);

            // 取得年、月、日，並格式化為 yyyy-mm-dd
            const year = gmt8Date.getUTCFullYear();
            const month = String(gmt8Date.getUTCMonth() + 1).padStart(2, '0'); // 月份從 0 開始計算，需要加 1
            const day = String(gmt8Date.getUTCDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        }

    },
    methods: {
        ...mapActions(survey, ["setFeedbackId"]),
        changePage(page) { //換頁
            this.currentPage = page;
        },
        sortChange(item) { //排序
            this.checkAll = false;
            switch (item) {
                case 0:
                    if (this.sortCon[0]) {
                        this.surveyListTemp.sort((a, b) => a.id - b.id);
                        this.sortCon.fill(false);
                        this.sortIcon.fill(0);
                        this.sortIcon[0] = 2;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger; //強迫surveyListArr重新計算
                        return;
                    }
                    if (!this.sortCon[0]) {
                        this.surveyListTemp.sort((a, b) => b.id - a.id);
                        this.sortCon.fill(false);
                        this.sortCon[0] = true;
                        this.sortIcon.fill(0);
                        this.sortIcon[0] = 1;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                case 1:
                    if (this.sortCon[1]) {
                        this.surveyListTemp.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                        this.sortCon.fill(false);
                        this.sortIcon.fill(0);
                        this.sortIcon[1] = 2;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                    if (!this.sortCon[1]) {
                        this.surveyListTemp.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                        this.sortCon.fill(false);
                        this.sortCon[1] = true;
                        this.sortIcon.fill(0);
                        this.sortIcon[1] = 1;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                case 2:
                    if (this.sortCon[2]) {
                        this.surveyListTemp.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                        this.sortCon.fill(false);
                        this.sortIcon.fill(0);
                        this.sortIcon[2] = 2;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
                    if (!this.sortCon[2]) {
                        this.surveyListTemp.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
                        this.sortCon.fill(false);
                        this.sortCon[2] = true;
                        this.sortIcon.fill(0);
                        this.sortIcon[2] = 1;
                        this.forceUpdateTrigger = !this.forceUpdateTrigger
                        return;
                    }
            }
        },
        createSurvey() {
            this.survey.id = 0;
            this.survey.name = "";
            this.survey.description = "";
            this.survey.startDate = this.today;
            this.survey.endDate = "";
            this.survey.published = false;
            this.survey.quesList = [];
            this.survey.styles = [{color:'#eeeeee'},{color:'#eeeeee'}];
            this.$router.push("/CreateSurvey");
        },
        async deleteSurvey() { //刪除
            this.checkAll = false;
            // this.surveyList = this.surveyList.filter(item => !this.selectedSurvey.includes(item.id));
            const deleteReq = { quizIdList: this.selectedSurvey }
            try {
                // 發送 POST 請求
                const response = await axios.post('http://localhost:8080/quiz/delete', deleteReq);
                // 請求成功後的操作
                console.log('Survey deleted:', response.data);
                this.search();
            } catch (error) {
                // 請求失敗後的操作
                console.error('There was an error!', error);
            }
        },
        toggleSelectAll() { //全選按鈕
            if (this.checkAll) {
                // 全選
                this.selectedSurvey = this.surveyListArr.filter(item => item.state !== '進行中').map(item => item.id);
            } else {
                // 全不選
                this.selectedSurvey = [];
            }
        },
        surveyLink(number) {

            this.surveyList.forEach(item => {
                if (item.id == number) {
                    this.survey.id = item.id;
                    this.survey.name = item.name;
                    this.survey.description = item.description;
                    this.survey.startDate = item.startDate;
                    this.survey.endDate = item.endDate;
                    this.survey.published = item.published;
                    this.survey.styles = item.style;
                    this.survey.quesList = item.quesList.map(question => {
                        const newQuestion = { ...question };
                        newQuestion.option = newQuestion.options.split(";").map(value => ({ value }));
                        return newQuestion;
                    })
                        .sort((a, b) => a.id - b.id);
                }
            })
            if (this.$route.path == '/Back') {
                this.$router.push(`/CreateSurvey`)
            }
            if (this.$route.path == '/Front') {
                this.$router.push(`/FillinSurvey`)
            }
        },
        async search() {
            try {
                // 發送 POST 請求
                const response = await axios.post('http://localhost:8080/quiz/search', this.searchItem);
                // 請求成功後的操作
                console.log('Survey created:', response.data);
                this.surveyList = JSON.parse(JSON.stringify(response.data.quizResList.reverse())); //深拷貝
                this.surveyList.forEach(item => {
                    item.style = JSON.parse(item.style);
                    const startTime = item.startDate + "T00:00:00"; //設置為午夜
                    const endTime = item.endDate + "T23:59:59";
                    if (!item.published) {
                        item.state = "未發布";
                    } else {
                        if (new Date() < new Date(startTime)) {
                            item.state = "未開始";
                        } else if (new Date() > new Date(endTime)) {
                            item.state = "已結束";
                        } else {
                            item.state = "進行中";
                        }
                    }
                })

            } catch (error) {
                // 請求失敗後的操作
                console.log(this.searchItem);
                console.error('There was an error!', error);
            }
        },
        feedback(number) {
            this.setFeedbackId(number);
            this.surveyList.forEach(item => {
                if (item.id == number) {
                    this.survey.id = item.id;
                    this.survey.name = item.name;
                    this.survey.description = item.description;
                    this.survey.startDate = item.startDate;
                    this.survey.endDate = item.endDate;
                    this.survey.published = item.published;
                    this.survey.styles = item.style;
                    this.survey.quesList = item.quesList.map(question => {
                        const newQuestion = { ...question };
                        newQuestion.option = newQuestion.options.split(";").map(value => ({ value }));
                        return newQuestion;
                    });
                }
            })
            this.$router.push(`/Feedback`)
        },
        searchOnOff() {
            this.searchOn = !this.searchOn;
        }
    },
    watch: {
        qShowed() { //更改顯示數量
            this.currentPage = 1;
        },
        currentPage(){
            if(this.currentPage == 0){
                this.currentPage = 1;
            }
        },
        totalPage() {
            if (this.currentPage > this.totalPage) {
                this.changePage(this.totalPage);
            }
            // if (this.totalPage == 0) {
            //     this.currentPage = 0;
            // }
        },
        surveyListArr() { //顯示有改變就重製全選按鈕
            this.checkAll = false;
            this.toggleSelectAll();
        },
        searchItem: {
            handler() {
                // this.changePage(this.currentPage == 0 ? 1 : this.currentPage); //如果是0就設成1，如果不是就設成當前頁數
                this.search();
            },
            deep: true, // 深度監聽，監聽 search 對象中的所有屬性
        }
    },
    mounted() {
        this.search();
    }
}
</script>

<template>
    <div class="mainArea">
        <div class="qShowed">
            <div class="qShowedLeft">
                <i class="fa-solid fa-magnifying-glass" @click="searchOnOff"></i>
                <i class="fa-solid fa-trash" @click="deleteSurvey()" v-if="this.$route.path == '/Back'"></i>
                <RouterLink to="/" @click="createSurvey()" v-if="this.$route.path == '/Back'">
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
                <!-- <label for="radio1" class="radio" :class="{ 'radioSelected': this.showType == 'list' }">
                    <i class="fa-solid fa-list"></i>
                </label>
                <input type="radio" id="radio1" name="radio" value="list" v-model="this.showType"
                    style="display: none;">
                <label for="radio2" class="radio" :class="{ 'radioSelected': this.showType == 'block' }">
                    <i class="fa-solid fa-grip-vertical"></i>
                </label>
                <input type="radio" id="radio2" name="radio" value="block" v-model="this.showType"
                    style="display: none;"> -->
            </div>
        </div>

        <!-- 搜尋欄 -->
        <div class="searchBox" :class="{ 'searchOn': searchOn == true }">
            <div class="searchBoxTop">
                <span class="searchSpan">問卷名稱</span>
                <input type="text" class="searchText" v-model="this.searchItem.quizName">
                <span class="searchSpan">統計時間</span>
                <input type="date" class="searchDate" v-model="this.searchItem.startDate"
                    :max="this.searchItem.endDate">
                <span class="searchSpan">到</span>
                <input type="date" class="searchDate" v-model="this.searchItem.endDate"
                    :min="this.searchItem.startDate">
            </div>
            <div class="stateCon">
                <input type="checkbox" id="stateCon1" v-model="this.checkboxState[0]"
                    v-if="this.$route.path == '/Back'">
                <label for="stateCon1" v-if="this.$route.path == '/Back'">未發布</label>
                <input type="checkbox" id="stateCon2" v-model="this.checkboxState[1]">
                <label for="stateCon2">未開始</label>
                <input type="checkbox" id="stateCon3" v-model="this.checkboxState[2]">
                <label for="stateCon3">進行中</label>
                <input type="checkbox" id="stateCon4" v-model="this.checkboxState[3]">
                <label for="stateCon4">已結束</label>
            </div>
        </div>

        <table class="surveyList" v-if="this.showType == 'list'">

            <!-- 標題 排序 -->
            <tr class="surveyRowTitle">
                <td v-if="this.$route.path == '/Back'"><input type="checkbox" v-model="this.checkAll"
                        @change="toggleSelectAll"></td>
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
            <tr v-for="item in surveyListArr" :key="item.id" class="surveyRow">
                <td v-if="this.$route.path == '/Back'">
                    <input type="checkbox" v-model="selectedSurvey" :value="item.id"
                        :style="{ 'display': item.state === '進行中' ? 'none' : 'initial' }">
                </td>
                <td style="width:10%">{{ item.id }}</td>
                <td style="width:40%" v-if="this.$route.path == '/Back'">
                    <RouterLink @click="surveyLink(item.id)" to="/" v-if="item.state == '未發布' || item.state == '未開始'">
                        {{ item.name }}
                    </RouterLink>
                    <p v-if="item.state == '進行中' || item.state == '已結束'">{{ item.name }}</p>
                </td>
                <td style="width:40%" v-if="this.$route.path == '/Front'">
                    <RouterLink @click="surveyLink(item.id)" to="/" v-if="item.state == '進行中'">
                        {{ item.name }}
                    </RouterLink>
                    <p v-if="!(item.state == '進行中')">{{ item.name }}</p>
                </td>
                <td style="width:10%">{{ item.state }}</td>
                <td style="width:15%">{{ item.startDate }}</td>
                <td style="width:15%">{{ item.endDate }}</td>
                <td style="width:10%">
                    <RouterLink @click="feedback(item.id)" to="/" v-if="item.state == '進行中' || item.state == '已結束'">
                        查看回覆
                    </RouterLink>
                    <p v-if="item.state == '未發布' || item.state == '未開始'">未開放</p>
                </td>
            </tr>
        </table>

        <div class="surveyBlock" v-if="this.showType == 'block'">
            <div class="blockItem" v-for="item in surveyListArr" :key="item.id">
                <div class="blockItemTop">
                    <span>{{ item.state }}</span>
                    <RouterLink :to="`/SurveyChartFront/`">
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
        <ul class="pagination1">
            <li class="page-item1" :class="{ 'disableditem': this.currentPage <= 1 }"
                @click.prevent="this.changePage(this.currentPage - 1)">
                <a class="page-link1" href>&lt;</a>
            </li>
            <li class="page-item1" v-for="page in this.totalPage" :class="{ 'pageSelected': this.currentPage == page }"
                @click.prevent="this.changePage(page)">
                <a class="page-link1" href>{{ page }}</a>
            </li>
            <li class="page-item1" :class="{ 'disableditem': this.currentPage == this.totalPage }"
                @click.prevent="this.changePage(this.currentPage + 1)">
                <a class="page-link1" href>&gt;</a>
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
    padding-right: 15px;

    .qShowedLeft {
        display: flex;
        align-items: center;

        .fa-magnifying-glass {
            padding-top: 3px;
        }

        .fa-trash {
            margin: 0 20px;
            padding-top: 3px;
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
            margin-left: 20px;
            margin-right: 10px;

        }

        .radio {
            margin-left: 15px;
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
        }

        .fa-solid {
            font-size: 20px;
            cursor: pointer;
        }
    }

}

.searchBox {
    width: 100%;
    height: 0;
    overflow: hidden;
    // border: 1px solid white;
    background-color: v-bind(blockcolor);
    color: v-bind(textcolor);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    transition: 0.3s;

    .searchBoxTop {
        width: 100%;

        .searchSpan {
            margin-right: 10px;
        }

        .searchText {
            height: 25px;
            border-radius: 8px;
            padding: 0 5px;
            margin-right: 10px;
            outline: none;
        }

        .searchDate {
            width: 140px;
            border-radius: 8px;
            margin-right: 10px;
            padding: 0 5px;
        }
    }

    .stateCon {
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        margin: 0 5%;

        input {
            width: 15px;
            height: 15px;
            margin-right: 1%;
        }

        label {
            margin-right: 3%;
        }
    }
}

.searchOn {
    height: 100px;
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

            p {
                margin: 0;
            }
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

.pagination1 {
    display: block;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 2%;

    .page-item1 {
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