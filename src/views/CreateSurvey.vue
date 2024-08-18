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
        addQuestion() {
            const newQuestion = {
                number: this.survey.questions.length + 1,
                title: "",
                type: 0,
                option: [{ value: '' }]
            };
            this.survey.questions.push(newQuestion);
            console.log(this.survey);
        },
        addOption(option) {
            option.push({ value: '' });
        },
        deleteQuestion(index){
            this.survey.questions.splice(index, 1);
        },
        deleteOption(index, optionIndex){
            this.survey.questions[index].option.splice(optionIndex, 1);
        }
    },
    mounted() {
        this.setPages("Back");
        this.autoResize();
    }
}
</script>

<template>
    <div class="mainArea">

        <!-- 問卷標題與敘述 -->
        <div class="title">
            <input type="text" id="title" v-model="survey.title" placeholder="請輸入標題" autocomplete="off">
            <textarea id="description" @input="autoResize" v-model="survey.description"
                placeholder="請敘述問卷內容" autocomplete="off"></textarea>
            <div class="date">
                <span class="dateItem">開始時間</span>
                <input type="date" class="dateItem" v-model="survey.startDate">
                <span class="dateItem">結束時間</span>
                <input type="date" class="dateItem" v-model="survey.endDate">
            </div>
        </div>

        <!-- 問卷內容 -->
        <div class="questions" v-for="(question, index) in survey.questions">

            <div class="questionTOP">

                <!-- 題目 -->
                <input type="text" class="qTitle" placeholder="請輸入問題" v-model="question.title" autocomplete="off">

                <!-- 選擇題型 -->
                <select id="" class="typeSelector" v-model.number="question.type">
                    <option value="0">簡答題</option>
                    <option value="1">詳答題</option>
                    <option value="2">單選題</option>
                    <option value="3">複選題</option>
                </select>
            </div>

            <div class="questionBOT">

                <!-- 簡答 -->
                <div class="short" v-if="question.type == 0">簡答內容</div>

                <!-- 詳答 -->
                <div class="long" v-if="question.type == 1">詳答內容</div>

                <!-- 單選 -->
                <div class="option" v-if="question.type == 2">
                    <div class="optionItem" v-for="(option,optionIndex) in question.option">
                        <i class="fa-regular fa-circle-dot"></i>
                        <input type="text" name="" id="" v-model="option.value" autocomplete="off">
                        <i class="fa-solid fa-xmark" @click="deleteOption(index, optionIndex)"></i>
                    </div>
                    <div class="optionItem">
                        <i class="fa-regular fa-circle-dot"></i>
                        <span @click="addOption(question.option)">新增選項</span>
                    </div>
                </div>

                <!-- 複選 -->
                <div class="option" v-if="question.type == 3">
                    <div class="optionItem" v-for="(option,optionIndex) in question.option">
                        <i class="fa-regular fa-square-check"></i>
                        <input type="text" name="" id="" v-model="option.value" autocomplete="off">
                        <i class="fa-solid fa-xmark" @click="deleteOption(index, optionIndex)"></i>
                    </div>
                    <div class="optionItem">
                        <i class="fa-regular fa-square-check"></i>
                        <span @click="addOption(question.option)">新增選項</span>
                    </div>
                </div>
                <i class="fa-solid fa-trash" @click="deleteQuestion(index)"></i>
            </div>
        </div>
        <div class="botArea">
            <div class="addQuestion" @click="addQuestion">新增問題</div>
            <RouterLink to="/CheckSurvey" class="preview">
                預覽
            </RouterLink>
        </div>
    </div>

</template>

<style scoped lang="scss">
.mainArea {
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    width: 100%;
    background-color: v-bind(blockcolor);
    border-radius: 20px;
    margin-top: 5%;
    padding: 3% 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s;

    #title {
        font-size: 2em;
        text-align: center;
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 2px solid v-bind(textcolor);
        caret-color: v-bind(textcolor);
        color: v-bind(textcolor);
        margin-bottom: 5%;
    }

    #description {
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

    .date{
        color: v-bind(textcolor);
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: end;
        align-items: end;

        .dateItem{
            margin-left: 20px;
            border-radius: 8px;
            padding: 0 5px;
        }
    }
}

.questions {
    width: 100%;
    background-color: v-bind(blockcolor);
    color: v-bind(textcolor);
    border-radius: 20px;
    margin-top: 2%;
    padding: 3% 5%;
    text-align: center;
    transition: 0.3s;
    position: relative;

    .questionTOP {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5%;

        .qTitle {
            width: 85%;
            font-size: 1.2em;
            background-color: transparent;
            outline: none;
            border: none;
            border-bottom: 2px solid v-bind(textcolor);
            caret-color: v-bind(textcolor);
            color: v-bind(textcolor);
        }

        .typeSelector {
            color: v-bind(textcolor);
            font-size: 1em;
            background-color: transparent;
            outline: none;
            border: none;

            option {
                background-color: v-bind(blockcolor);
            }
        }
    }

    .questionBOT {
        display: flex;
        flex-direction: column;
        align-items: baseline;

        .option {
            width: 100%;
            display: flex;
            flex-direction: column;

            .optionItem {
                margin-bottom: 5%;
                display: flex;
                justify-content: start;
                align-items: center;
                position: relative;

                .fa-circle-dot {
                    width: 16px;
                    margin-right: 15px;
                }

                .fa-square-check {
                    width: 16px;
                    margin-right: 15px;
                }

                .fa-xmark{
                    position: absolute;
                    right: 0;
                    cursor: pointer;
                }

                input {
                    width: 100%;
                    font-size: 1em;
                    background-color: transparent;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid v-bind(textcolor);
                    caret-color: v-bind(textcolor);
                    color: v-bind(textcolor);
                    padding-right: 20px;
                }

                span {
                    cursor: pointer;
                }


            }
        }
    }

    .fa-trash{
        position: absolute;
        right: 5%;
        bottom: 30px;
        cursor: pointer;
    }
}

.botArea {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .addQuestion {
        width: 85%;
        background-color: v-bind(blockcolor);
        color: v-bind(textcolor);
        border-radius: 20px;
        margin: 2% 0%;
        padding: 1%;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
    }

    .preview {
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
</style>