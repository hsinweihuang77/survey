<script>
import location from "../stores/location"
import color from '../stores/color'
import survey from '../stores/survey'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import axios from "axios";

export default {
    data() {
        return {
            isPreview: false,
            formTemp: {
                name: "",
                phone: "",
                email: "",
                age: undefined
            },
            stateMap: {
                "Single": "單選題",
                "Multi": "複選題",
                "Text": "詳答題",
                "ShortText": "簡答題"
            }
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        ...mapState(survey, ["survey", "formData"]),
    },
    methods: {
        ...mapActions(location, ["setPages"]),
        autoResize() {
            const textarea = document.querySelector("textarea")
            textarea.style.height = '28px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        preview() {
            if (!this.formTemp.name.trim() || !this.formTemp.email.trim()) {
                alert('請輸入姓名及Email');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.formTemp.email)) {
                alert('請輸入正確的Email');
                return;
            }

            for (let i = 0; i < this.survey.quesList.length; i++) {
                if (this.survey.quesList[i].necessary) {
                    if (!this.formData.feedbackList[i].ans.trim() && this.formData.feedbackList[i].ansTemp.length == 0) {
                        alert('有必填問題未填寫');
                        return;
                    }
                }
            }

            this.isPreview = true;
            console.log(this.formData.feedbackList);

        },
        edit() {
            this.isPreview = false;
        },
        async fillin() {
            this.formData.feedbackList.forEach(item => {
                item.name = this.formTemp.name;
                item.phone = this.formTemp.phone;
                item.email = this.formTemp.email;
                item.age = this.formTemp.age;
                if (item.ans.length == 0 && item.ansTemp.length != 0) {
                    item.ans = item.ansTemp.join(";");
                }
                // 1. 獲取當前時間
                let now = new Date();

                // 2. 將當前時間轉換為 GMT+8 時區
                let gmt8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);

                // 3. 格式化為 LocalDateTime 格式 (yyyy-MM-ddTHH:mm:ss)
                let year = gmt8.getUTCFullYear();
                let month = String(gmt8.getUTCMonth() + 1).padStart(2, '0'); // 月份從0開始，所以要+1
                let day = String(gmt8.getUTCDate()).padStart(2, '0');
                let hours = String(gmt8.getUTCHours()).padStart(2, '0');
                let minutes = String(gmt8.getUTCMinutes()).padStart(2, '0');
                let seconds = String(gmt8.getUTCSeconds()).padStart(2, '0');

                // 組裝成 LocalDateTime 格式
                item.fillinDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            })
            try {
                // 發送 POST 請求
                const response = await axios.post('http://localhost:8080/quiz/fillin', this.formData);
                // 請求成功後的操作
                console.log('Survey filled:', response.data);
                this.$router.push("/Front");
            } catch (error) {
                // 請求失敗後的操作
                console.error('There was an error!', error);
            }
        },
        autoResize() {
            const textarea = document.querySelectorAll("textarea")
            textarea.forEach(item => {
                item.style.height = '28px';
                item.style.height = `${item.scrollHeight}px`;
            })
        },
    },
    watch: {
        'survey.quesList': {
            handler(newVal) {
                if (newVal && newVal.length > 0) {
                    this.formData.feedbackList = newVal.map(item => ({
                        quizId: this.survey.id,
                        quId: item.id,
                        name: "",
                        phone: "",
                        email: "",
                        age: undefined,
                        ans: "",
                        ansTemp: [],
                        fillinDateTime: ""
                    }));
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.setPages("Front");
        this.autoResize();
    }
}
</script>

<template>
    <div class="mainArea">
        <div class="survey">
            <div class="title" :style="{ color: survey.styles[0].color }">
                {{ survey.name }}
            </div>
            <div class="description">
                <textarea name="" id="description" @input="autoResize" disabled
                    :style="{ color: survey.styles[1].color }">{{ survey.description }}</textarea>
            </div>
            <div class="date">
                <span class="dateItem">開始時間</span>
                <span class="dateItem">{{ survey.startDate }}</span>
                <span class="dateItem">結束時間</span>
                <span class="dateItem">{{ survey.endDate }}</span>
            </div>
            <div class="infos">
                <div class="infosTop">
                    <div class="infosItem">
                        <div>
                            <span style="color: red;">*</span>
                            <span>姓名</span>
                        </div>
                        <input type="text" class="shortQ" v-model="formTemp.name" :disabled="isPreview"
                            autocomplete="off">
                    </div>
                    <div class="infosItem">
                        <div>
                            <span>手機</span>
                        </div>
                        <input type="text" class="shortQ" v-model="formTemp.phone" :disabled="isPreview"
                            autocomplete="off">
                    </div>
                </div>
                <div class="infosBot">
                    <div class="infosItem">
                        <div>
                            <span style="color: red;">*</span>
                            <span>E-mail</span>
                        </div>
                        <input type="text" class="shortQ" v-model="formTemp.email" :disabled="isPreview"
                            autocomplete="off">
                    </div>
                    <div class="infosItem">
                        <span>年齡</span>
                        <input type="text" class="shortQ" v-model="formTemp.age" :disabled="isPreview"
                            autocomplete="off">
                    </div>
                </div>
            </div>
            <div class="questions" v-for="(question, index) in survey.quesList">
                <div class="quesTitle">
                    <div>
                        <span v-if="question.necessary == true" style="color: red;">*</span>
                        <span class="qTitle" :style="{ color: survey.styles[index + 2][0].color }">{{ question.qu
                            }}</span>
                    </div>
                    <span>{{ stateMap[question.type] }}</span>
                </div>
                <div class="question" v-if="question.type == 'ShortText'">
                    <input type="text" class="shortQ" :disabled="isPreview" v-model="formData.feedbackList[index].ans"
                        autocomplete="off">
                </div>
                <div class="question" v-if="question.type == 'Text'">
                    <textarea @input="autoResize" type="text" class="textQ" :disabled="isPreview"
                        v-model="formData.feedbackList[index].ans" autocomplete="off"></textarea>
                </div>
                <div class="question" v-if="question.type == 'Single'">
                    <div class="option" v-for="(option, opIndex) in question.option" :key="opIndex">
                        <input type="radio" :name="question.id" :id="'radio' + question.qu + opIndex"
                            :value="option.value" :disabled="isPreview" v-model="formData.feedbackList[index].ans">
                        <label :for="'radio' + question.qu + opIndex"
                            :class="{ 'selected': formData.feedbackList[index].ans == option.value }"
                            :style="{ color: survey.styles[index + 2][opIndex + 1].color }">{{ option.value
                            }}</label>
                    </div>
                </div>
                <div class="question" v-if="question.type == 'Multi'">
                    <div class="option" v-for="(option, opIndex) in question.option" :key="opIndex">
                        <input type="checkbox" :name="question.id" :id="'checkbox' + question.qu + opIndex"
                            :value="option.value" :disabled="isPreview" v-model="formData.feedbackList[index].ansTemp">
                        <label :for="'checkbox' + question.qu + opIndex"
                            :class="{ 'selected': formData.feedbackList[index].ansTemp.includes(option.value) }"
                            :style="{ color: survey.styles[index + 2][opIndex + 1].color }">{{
                                option.value }}</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="botArea">
            <RouterLink to="/Front" class="back" v-if="!isPreview">
                返回
            </RouterLink>
            <div class="back" @click="edit" v-if="isPreview">修改</div>
            <div class="preview" @click="preview" v-if="!isPreview">預覽</div>
            <div class="preview" @click="fillin" v-if="isPreview">送出</div>
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: 0.3s;

        .title {
            width: 100%;
            text-align: center;
            font-size: 2em;
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

            .dateItem {
                margin-left: 5px;
            }
        }

        .infos {
            width: 100%;
            height: 80px;
            background-color: transparent;
            color: v-bind(textcolor);
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .infosTop,
            .infosBot {
                width: 100%;
                display: flex;

                .infosItem {
                    width: 50%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 5%;

                    .shortQ {
                        width: 82%;
                        font-size: 1em;
                        background-color: transparent;
                        outline: none;
                        border: none;
                        border-bottom: 1px solid v-bind(textcolor);
                        // margin-top: 10px;
                        // caret-color: v-bind(textcolor);
                        color: v-bind(textcolor);
                    }


                }

            }


        }

        .questions {
            margin-top: 30px;

            .quesTitle {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .qTitle {
                    font-size: 1.2em;
                }
            }

            .question {
                .shortQ {
                    width: 100%;
                    font-size: 1em;
                    background-color: transparent;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid v-bind(textcolor);
                    margin-top: 10px;
                    caret-color: v-bind(textcolor);
                    color: v-bind(textcolor);
                }

                .textQ {
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

                .option {
                    margin-top: 5px;

                    .selected {
                        font-weight: bold;
                        text-decoration: underline;
                    }
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
        cursor: pointer;
    }

    .preview {
        width: 10%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        border-radius: 20px;
        margin: 2% 0%;
        padding: 1%;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }
}
</style>