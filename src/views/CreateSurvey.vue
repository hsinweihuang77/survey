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
        ...mapActions(location, ["setPages"]),
        autoResize() {
            const textarea = document.querySelector("textarea")
            textarea.style.height = '28px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        addQuestion() {
            const newQuestion = {
                quizId: this.survey.id,
                id: 0,
                qu: "",
                type: "ShortText",
                necessary: false,
                option: [{ value: '' }],
                options: ""
            };
            this.survey.quesList.push(newQuestion);
        },
        addOption(option) {
            option.push({ value: '' });
        },
        deleteQuestion(index) {
            this.survey.quesList.splice(index, 1);
        },
        deleteOption(index, optionIndex) {
            this.survey.quesList[index].option.splice(optionIndex, 1);
        },
        backToBack() {
            this.$router.push('/Back');
        }
    },
    mounted() {
        this.setPages("Back");
        this.autoResize();

        if (this.survey.startDate < this.today) {
            this.survey.startDate = this.today;
        }
        if (this.survey.endDate < this.today) {
            this.survey.endDate = "";
        }
    }
}
</script>

<template>
    <div class="mainArea">

        <!-- 問卷標題與敘述 -->
        <div class="title">
            <input type="text" id="title" v-model="survey.name" placeholder="請輸入標題" autocomplete="off">
            <textarea id="description" @input="autoResize" v-model="survey.description" placeholder="請敘述問卷內容"
                autocomplete="off"></textarea>
            <div class="date">
                <span class="dateItem">開始時間</span>
                <input type="date" class="dateItem inputDate" v-model="survey.startDate"
                    :min="today" :max="survey.endDate">
                <span class="dateItem">結束時間</span>
                <input type="date" class="dateItem inputDate" v-model="survey.endDate" :min="survey.startDate">
            </div>
        </div>

        <!-- 問卷內容 -->
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

            <div class="questionTOP">

                <!-- 題目 -->
                <input type="text" class="qTitle" placeholder="請輸入問題" v-model="question.qu" autocomplete="off">

                <!-- 選擇題型 -->
                <select id="" class="typeSelector" v-model.number="question.type">
                    <option value="ShortText">簡答題</option>
                    <option value="Text">詳答題</option>
                    <option value="Single">單選題</option>
                    <option value="Multi">複選題</option>
                </select>
            </div>

            <div class="questionBOT">

                <!-- 簡答 -->
                <div class="short" v-if="question.type == 'ShortText'">簡答內容</div>

                <!-- 詳答 -->
                <div class="long" v-if="question.type == 'Text'">詳答內容</div>

                <!-- 單選 -->
                <div class="option" v-if="question.type == 'Single'">
                    <div class="optionItem" v-for="(option, optionIndex) in question.option">
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
                <div class="option" v-if="question.type == 'Multi'">
                    <div class="optionItem" v-for="(option, optionIndex) in question.option">
                        <i class="fa-regular fa-square-check"></i>
                        <input type="text" name="" id="" v-model="option.value" autocomplete="off">
                        <i class="fa-solid fa-xmark" @click="deleteOption(index, optionIndex)"></i>
                    </div>
                    <div class="optionItem">
                        <i class="fa-regular fa-square-check"></i>
                        <span @click="addOption(question.option)">新增選項</span>
                    </div>
                </div>

                <!-- 必填按鈕 -->
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault' + index"
                        v-model="question.necessary">
                    <label class="form-check-label" :for="'flexSwitchCheckDefault' + index">必填</label>
                </div>

                <!-- 刪除按鈕 -->
                <i class="fa-solid fa-trash" @click="deleteQuestion(index)"></i>
            </div>
        </div>
        <div class="botArea">
            <div class="back" @click="backToBack">返回</div>
            <div class="addQuestion" @click="addQuestion">新增問題</div>
            <RouterLink to="/CheckSurvey" class="preview" :class="{ 'previewDisabled': survey.quesList.length == 0 }">
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

    .date {
        color: v-bind(textcolor);
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: end;
        align-items: end;

        .dateItem {
            margin-left: 20px;
            border-radius: 8px;
            padding: 0 5px;
        }

        .inputDate {
            width: 120px;
            color: black;
        }
    }
}

.infos {
    width: 100%;
    height: 120px;
    background-color: v-bind(blockcolor);
    color: v-bind(textcolor);
    border-radius: 20px;
    margin-top: 2%;
    padding: 3% 5%;
    // text-align: start;
    transition: 0.3s;
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

                .fa-xmark {
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

    .form-check {
        width: 80px;
        position: absolute;
        display: flex;
        right: 10%;
        bottom: 25px;
        align-items: center;

        .form-check-input {
            cursor: pointer;
            border: none;

            &:focus {
                outline: none;
                box-shadow: none;
            }
        }

        .form-check-label {
            margin-left: 10px;
            cursor: pointer;
        }
    }

    .fa-trash {
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

    .back {
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

    .addQuestion {
        width: 70%;
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

    .previewDisabled {
        opacity: 0.5;
        pointer-events: none;
    }
}
</style>