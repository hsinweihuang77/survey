<script>
import location from "../stores/location"
import color from '../stores/color'
import survey from '../stores/survey'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import axios from 'axios'

export default {
    data() {
        return {
            feedbackList: []
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        ...mapState(survey, ["survey", "formData", "feedbackId", "feedbackPinia"]),
    },
    methods: {
        ...mapActions(location, ["setPages"]),
        ...mapActions(survey, ["setFeedbackDetailId", "setFeedbackDetailIdMax"]),
        async feedback() {
            try {
                // 發送 POST 請求
                const response = await axios.post(`http://localhost:8080/quiz/feedback?quizId=${this.feedbackId}`);
                // 請求成功後的操作
                console.log('Feedback:', response.data);
                // 使用 Map 來合併具有相同 email 的資料
                const map = new Map();

                // 儲存填答清單並照填寫時間排序
                this.feedbackPinia.feedbacks = JSON.parse(JSON.stringify(response.data.feedbackList.sort((a, b) => new Date(b.fillinDateTime) - new Date(a.fillinDateTime))));

                // 根據填寫者加上id
                let emailTemp = this.feedbackPinia.feedbacks[0].email;
                let idCount = 1;
                for(let i = 0; i < this.feedbackPinia.feedbacks.length; i++){
                    if(emailTemp != this.feedbackPinia.feedbacks[i].email){
                        emailTemp = this.feedbackPinia.feedbacks[i].email;
                        idCount++;
                    }
                    this.feedbackPinia.feedbacks[i].id = idCount;
                }

                // 製作顯示清單用陣列
                this.feedbackPinia.feedbacks.forEach(item => {
                    // 使用 email 作為鍵，如果鍵不存在於 Map 中，則新增
                    if (!map.has(item.email)) {
                        map.set(item.email, {
                            id: item.id,
                            quizId: item.quizId,
                            name: item.name,
                            fillinDateTime: item.fillinDateTime.replace("T", " ")
                        });
                    }
                });
                // 將 Map 轉換為陣列
                this.feedbackList = Array.from(map.values());

                console.log(this.feedbackList);
                console.log(this.feedbackPinia.feedbacks);
                

            } catch (error) {
                // 請求失敗後的操作
                console.error('There was an error!', error);
            }
        },
        autoResize() {
            const textarea = document.querySelector("textarea")
            textarea.style.height = '28px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        feedbackDetail(id){
            this.setFeedbackDetailId(id);
            this.setFeedbackDetailIdMax(this.feedbackList.length);
            this.$router.push("/FeedbackDetail")
        }
    },
    mounted() {
        this.setPages("Back");
        this.feedback();
        this.autoResize();
    }
}
</script>

<template>
    <div class="mainArea">
        <div class="survey">
            <div class="title">
                {{ survey.name }}
            </div>
            <div class="description">
                <textarea name="" id="description" @input="autoResize" disabled>{{ survey.description }}</textarea>
            </div>
            <div class="date">
                <span class="dateItem">開始時間</span>
                <span class="dateItem">{{ survey.startDate }}</span>
                <span class="dateItem">結束時間</span>
                <span class="dateItem">{{ survey.endDate }}</span>
            </div>
            <table class="surveyList">
                <tr class="surveyRowTitle">
                    <td style="width: 30%;">姓名</td>
                    <td style="width: 30%;">回覆時間</td>
                    <td style="width: 30%;">詳細</td>
                </tr>

                <tr v-for="item in feedbackList" :key="item.fillinDateTime" class="surveyRow">
                    <td style="width: 30%;">{{ item.name }}</td>
                    <td style="width: 30%;">{{ item.fillinDateTime }}</td>
                    <td style="width: 30%;">
                        <RouterLink to="/" @click="feedbackDetail(item.id)">
                            前往
                        </RouterLink>
                    </td>
                </tr>
            </table>
        </div>
        <div class="botArea">
            <RouterLink to="/Back" class="back">
                返回
            </RouterLink>
            <RouterLink to="/Statistics" class="stat">
                統計
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mainArea {
    width: 800px;

    .survey {
        width: 100%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        border-radius: 20px;
        margin-top: 5%;
        padding: 3% 5%;
        transition: 0.3s;

        .title {
            width: 100%;
            font-size: 2em;
            text-align: center;
        }

        .description {
            width: 100%;

            #description {
                width: 100%;
                font-size: 1em;
                background-color: transparent;
                outline: none;
                border: none;
                border-bottom: 2px solid v-bind(textcolor);
                line-height: 1.8;
                caret-color: v-bind(textcolor);
                color: v-bind(textcolor);
                resize: none;
                overflow: hidden;
            }
        }

        .date {
            display: flex;
            justify-content: end;
            margin-bottom: 5%;

            .dateItem {
                margin-left: 5px;
            }
        }

        .surveyList {
            width: 100%;

            .surveyRowTitle {
                width: 100%;
                height: 50px;

                td {
                    text-align: center;
                }
            }

            .surveyRow {
                width: 100%;
                height: 50px;

                td {
                    text-align: center;
                }
            }

        }
    }

}

.botArea {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .back {
        width: 10%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        text-decoration: none;
        border-radius: 20px;
        margin: 2% 0%;
        padding: 1%;
        text-align: center;
        transition: 0.3s;
    }

    .stat {
        width: 10%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        text-decoration: none;
        border-radius: 20px;
        margin: 2% 0%;
        padding: 1%;
        text-align: center;
        transition: 0.3s;
    }
}

a {
    color: v-bind(linkcolor);
    text-decoration: none;
}
</style>