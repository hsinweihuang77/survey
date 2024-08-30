<script>
import location from "../stores/location"
import color from '../stores/color'
import survey from '../stores/survey'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'

export default {
    data() {
        return {
            feedbackDetail: []
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        ...mapState(survey, ["survey", "feedbackPinia", "feedbackDetailId", "feedbackDetailIdMax"]),
    },
    methods: {
        ...mapActions(location, ["setPages"]),
        ...mapActions(survey, ["setFeedbackDetailId"]),
        autoResize() {
            const textarea = document.querySelectorAll("textarea")
            textarea.forEach(item => {
                item.style.height = '28px';
                item.style.height = `${item.scrollHeight}px`;
            })
        },
        findFeedback() {
            this.feedbackDetail = this.feedbackPinia.feedbacks.filter(item => item.id == this.feedbackDetailId);
            this.feedbackDetail.forEach(item => {
                item.ansTemp = item.ans.split(";");
            });
        },
        changeFeedback(number){
            this.setFeedbackDetailId(this.feedbackDetailId + number);
            this.findFeedback();
        }
    },
    created(){
        this.findFeedback();
    },
    mounted() {
        this.setPages("Back");
        // this.findFeedback();
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
            <div class="infos">
                <div class="infosTop">
                    <div class="infosItem">
                        <div>
                            <span style="color: red;">*</span>
                            <span>姓名</span>
                        </div>
                        <input type="text" class="shortQ" disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[0].name">
                    </div>
                    <div class="infosItem">
                        <div>
                            <span>手機</span>
                        </div>
                        <input type="text" class="shortQ" disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[0].phone">
                    </div>
                </div>
                <div class="infosBot">
                    <div class="infosItem">
                        <div>
                            <span style="color: red;">*</span>
                            <span>E-mail</span>
                        </div>
                        <input type="text" class="shortQ" disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[0].email">
                    </div>
                    <div class="infosItem">
                        <span>年齡</span>
                        <input type="text" class="shortQ" disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[0].age">
                    </div>
                </div>
            </div>
            <div class="questions" v-for="(question, index) in survey.quesList">
                <span v-if="question.necessary == true" style="color: red;">*</span>
                <span class="qTitle">{{ question.qu }}</span>
                <div class="question" v-if="question.type == 'ShortText'">
                    <input type="text" class="shortQ" disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[index].ans">
                </div>
                <div class="question" v-if="question.type == 'Text'">
                    <textarea @input="autoResize" type="text" class="textQ" disabled v-if="feedbackDetail.length > 0" 
                        v-model="feedbackDetail[index].ans" autocomplete="off"></textarea>
                </div>
                <div class="question" v-if="question.type == 'Single'">
                    <div class="option" v-for="(option, opIndex) in question.option" :key="opIndex">
                        <input type="radio" :name="question.id" :id="'radio' + question.qu + opIndex" :value="option.value" disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[index].ans">
                        <label :for="'radio' + question.qu + opIndex" v-if="feedbackDetail.length > 0" :class="{'selected': feedbackDetail[index].ans == option.value}">{{ option.value }}</label>
                    </div>
                </div>
                <div class="question" v-if="question.type == 'Multi'">
                    <div class="option" v-for="(option, opIndex) in question.option" :key="opIndex">
                        <input type="checkbox" :name="question.id" :id="'checkbox' + question.qu + opIndex" :value="option.value"
                            disabled v-if="feedbackDetail.length > 0" v-model="feedbackDetail[index].ansTemp">
                        <label :for="'checkbox' + question.qu + opIndex" v-if="feedbackDetail.length > 0" :class="{'selected': feedbackDetail[index].ansTemp.includes(option.value) }">{{ option.value }}</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="botArea">
            <RouterLink to="/Feedback" class="back">
                返回
            </RouterLink>
            <div class="botBTN1" :class="{'disabled': feedbackDetailId == 1}" @click="changeFeedback(-1)">前一張</div>
            <div class="blank"></div>
            <div class="botBTN2" :class="{'disabled': feedbackDetailId == feedbackDetailIdMax}" @click="changeFeedback(1)">下一張</div>
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

            .qTitle {
                font-size: 1.2em;
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

                    .selected{
                        color: aqua;
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

    .botBTN1{
        width: 10%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        border-radius: 20px;
        margin: 2% 0%;
        padding: 1%;
        text-align: center;
        transition: 0.3s;
        cursor: pointer;
    }

    .blank{
        width: 50%
    }

    .botBTN2{
        width: 10%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        border-radius: 20px;
        margin: 2% 0%;
        padding: 1%;
        text-align: center;
        transition: 0.3s;
        cursor: pointer;
    }

    .stat{
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

    .disabled{
        pointer-events: none;
        opacity: 0.5;
    }
}
</style>