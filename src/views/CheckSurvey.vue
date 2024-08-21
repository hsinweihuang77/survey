<script>
import location from "../stores/location"
import color from '../stores/color'
import survey from '../stores/survey'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'

export default {
    data() {
        return {
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
    },
    mounted() {
        this.setPages("Back");
        this.autoResize();
    }
}
</script>

<template>
    <div class="mainArea">
        <div class="survey">
            <div class="title">
                {{ survey.title }}
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
            <div class="questions" v-for="question in survey.questions">
                <p class="qTitle">{{ question.title }}</p>
                <div class="question" v-if="question.type == 0">
                    <input type="text" class="shortQ" disabled>
                </div>
                <div class="question" v-if="question.type == 1">
                    <input type="text" class="shortQ" disabled>
                </div>
                <div class="question" v-if="question.type == 2">
                    <div class="option" v-for="option in question.option">
                        <input type="radio" name="" id="" disabled>
                        <label for="">{{ option.value }}</label>
                    </div>
                </div>
                <div class="question" v-if="question.type == 3">
                    <div class="option" v-for="option in question.option">
                        <input type="checkbox" name="" id="" disabled>
                        <label for="">{{ option.value }}</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="botArea">
            <RouterLink to="/CreateSurvey" class="back">
                修改
            </RouterLink>
            <div class="save">僅儲存</div>
            <div class="saveAndRelease">儲存並發布</div>
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

        .questions {
            .qTitle{
                margin-top: 30px;
                font-size: 1.2em;
            }
            .question{
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
                .option{
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

    .back{
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