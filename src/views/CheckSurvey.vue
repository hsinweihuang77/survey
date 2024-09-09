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
        ...mapState(survey, ["survey"]),
    },
    methods: {
        ...mapActions(location, ["setPages"]),
        autoResize() {
            const textarea = document.querySelector("textarea")
            textarea.style.height = '28px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        async createSurvey() {
            this.survey.quesList.forEach((question, index) => {
                question.options = question.option.map(option => option.value).join(";");
                question.id = index + 1;
            });
            this.survey.style = JSON.stringify(this.survey.styles);
            try {
                // 發送 POST 請求
                if (this.survey.id == 0) {
                    const response = await axios.post('http://localhost:8080/quiz/create', this.survey);
                    this.$router.push("/Back");
                    console.log('Survey created:', response.data);
                } else {
                    const response = await axios.post('http://localhost:8080/quiz/update', this.survey);
                    this.$router.push("/Back");
                    console.log('Survey created:', response.data);
                }
            } catch (error) {
                // 請求失敗後的操作
                console.log(this.survey);
                console.error('There was an error!', error);
            }
        },
        createSurveyAndPublish() {
            this.survey.published = true;
            this.createSurvey();
        }
    },
    mounted() {
        console.log(this.survey);
        this.setPages("Back");
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
                        <input type="text" class="shortQ" disabled>
                    </div>
                    <div class="infosItem">
                        <div>
                            <span>手機</span>
                        </div>
                        <input type="text" class="shortQ" disabled>
                    </div>
                </div>
                <div class="infosBot">
                    <div class="infosItem">
                        <div>
                            <span style="color: red;">*</span>
                            <span>E-mail</span>
                        </div>
                        <input type="text" class="shortQ" disabled>
                    </div>
                    <div class="infosItem">
                        <span>年齡</span>
                        <input type="text" class="shortQ" disabled>
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
                    <input type="text" class="shortQ" disabled>
                </div>
                <div class="question" v-if="question.type == 'Text'">
                    <input type="text" class="shortQ" disabled>
                </div>
                <div class="question" v-if="question.type == 'Single'">
                    <div class="option" v-for="(option, optionIndex) in question.option">
                        <input type="radio" name="" id="" disabled>
                        <label for="" :style="{ color: survey.styles[index + 2][optionIndex + 1].color }">{{
                            option.value }}</label>
                    </div>
                </div>
                <div class="question" v-if="question.type == 'Multi'">
                    <div class="option" v-for="(option, optionIndex) in question.option">
                        <input type="checkbox" name="" id="" disabled>
                        <label for="" :style="{ color: survey.styles[index + 2][optionIndex + 1].color }">{{
                            option.value }}</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="botArea">
            <RouterLink to="/CreateSurvey" class="back">
                修改
            </RouterLink>
            <div class="save" @click="createSurvey" :class="{ 'disable': this.survey.published == true }">僅儲存</div>
            <div class="saveAndRelease" @click="createSurveyAndPublish">儲存並發布</div>
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

                .option {
                    margin-top: 5px;
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

    .save {
        width: 20%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        border-radius: 20px;
        margin: 2% 0%;
        margin-left: 45%;
        padding: 1%;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

    .disable {
        pointer-events: none;
        opacity: 0.5;
    }

    .saveAndRelease {
        width: 20%;
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