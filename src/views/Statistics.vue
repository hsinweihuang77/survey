<script>
import location from "../stores/location"
import color from '../stores/color'
import survey from '../stores/survey'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import axios from 'axios'
import * as echarts from 'echarts';

export default {
    data() {
        return {
            charts: [],
            chartIndex: 0,
            ansList: []
        }
    },
    computed: {
        ...mapState(location, ["location"]),
        ...mapState(color, ["maincolor", "blockcolor", "subcolor", "linkcolor", "textcolor"]),
        ...mapState(survey, ["survey", "feedbackId", "feedbackPinia"]),
    },
    methods: {
        ...mapActions(location, ["setPages"]),
        ...mapActions(survey, ["setFeedbackDetailId"]),
        autoResize() {
            const textarea = document.querySelector("textarea")
            textarea.style.height = '28px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        async statistics() {
            try {
                // 發送 POST 請求
                const response = await axios.post(`http://localhost:8080/quiz/statistics?quizId=${this.feedbackId}`);
                // 請求成功後的操作
                console.log('statistics:', response.data);
                response.data.statisticsList.forEach(item => {
                    this.charts.push(Object.entries(item.optionCountMap).map(([name, value]) => ({
                        name,
                        value
                    })));
                })
                this.survey.quesList.forEach((quItem, quIndex) => {
                    if (quItem.type == "Single") {
                        const chartDom = this.$refs[`chart${quIndex}`][0]; // 取得對應的 DOM 節點
                        const myChart = echarts.init(chartDom); // 初始化 ECharts
                        const option = {
                            title: {
                                show: false
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                textStyle: {
                                    color: this.textcolor
                                }
                            },
                            series: [
                                {
                                    name: quItem.qu,
                                    type: 'pie',
                                    radius: '50%',
                                    data: this.charts[this.chartIndex],
                                    label: {
                                        textStyle: {
                                            color: this.textcolor
                                        }
                                    },
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        };
                        myChart.setOption(option); // 設定圖表選項
                        this.chartIndex++;
                    }
                    if (quItem.type == "Multi") {
                        console.log(this.charts[this.chartIndex].map(item => item.name));

                        const chartDom = this.$refs[`chart${quIndex}`][0]; // 取得對應的 DOM 節點
                        const myChart = echarts.init(chartDom); // 初始化 ECharts
                        const option = {
                            title: {
                                show: false
                            },
                            tooltip: {
                                trigger: 'axis', // 更改為 'axis' 以便在軸上觸發提示
                                axisPointer: {
                                    type: 'shadow' // 指標類型為陰影
                                }
                            },
                            legend: {
                                show: false
                            },
                            xAxis: {
                                type: 'category', // X 軸為類別類型
                                data: this.charts[this.chartIndex].map(item => item.name), // 設定 X 軸數據為選項名稱
                                axisLabel: {
                                    color: this.textcolor,
                                    fontsize: 10,
                                    interval: 0, // 設為 0 顯示所有標籤
                                    rotate: 45,  // 將標籤旋轉 45 度
                                    formatter: function (value) {
                                        return value.length > 10 ? value.slice(0, 10) + '...' : value;
                                    }
                                }
                            },
                            yAxis: {
                                type: 'value', // Y 軸為數值類型
                                axisLabel: {
                                    color: this.textcolor
                                }
                            },
                            series: [
                                {
                                    name: quItem.qu,
                                    type: 'bar', // 設置為長條圖
                                    data: this.charts[this.chartIndex].map(item => item.value), // 設定數據為每個選項的數量
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        };
                        myChart.setOption(option); // 設定圖表選項
                        this.chartIndex++;
                    }
                })

            } catch (error) {
                // 請求失敗後的操作
                console.error('There was an error!', error);
            }
        },
        back() {
            if (this.location == "Back") {
                this.$router.push("Back")
            }
            if (this.location == "Front") {
                this.$router.push("Front")
            }
        }
    },
    mounted() {
        // this.setPages("Back");
        this.autoResize();

        this.statistics();
        // Step 1: 初始化一個物件來收集每個 quId 的答案
        const ansMap = {};

        // Step 2: 將相同 quId 的答案收集到一起
        this.feedbackPinia.feedbacks.forEach(item => {
            // 如果 ansMap 中沒有這個 quId，則初始化為空陣列
            if (!ansMap[item.quId]) {
                ansMap[item.quId] = [];
            }
            // 將答案添加到對應的 quId 陣列中
            ansMap[item.quId].push(item.ans);
        });

        // Step 3: 將每個 quId 的答案陣列整合成一個大的陣列
        this.ansList = Object.values(ansMap);

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
            <div class="questions" v-for="(question, index) in survey.quesList">
                <span v-if="question.necessary == true" style="color: red;">*</span>
                <span class="qTitle" :style="{ color: survey.styles[index + 2][0].color }">{{ question.qu }}</span>
                <div class="question" v-if="question.type == 'ShortText'">
                    <div v-for="ans in ansList[index]">{{ ans }}</div>
                </div>
                <div class="question" v-if="question.type == 'Text'">
                    <div v-for="ans in ansList[index]">{{ ans }}</div>
                </div>
                <div class="question" v-if="question.type == 'Single'">
                    <div :key="index" :ref="`chart${index}`" style="width: 600px; height: 400px;"></div>
                </div>
                <div class="question" v-if="question.type == 'Multi'">
                    <div :key="index" :ref="`chart${index}`" style="width: 600px; height: 400px;"></div>
                </div>

            </div>
            <!-- <div>
                <div v-for="(chart, index) in charts" :key="index" :ref="`chart${index}`"
                    style="width: 400px; height: 400px;"></div>
            </div> -->
        </div>
        <div class="botArea">
            <RouterLink to="/" class="back" @click="back">
                返回
            </RouterLink>
        </div>
    </div>

</template>

<style scoped lang="scss">
.chart {
    margin-bottom: 20px;
    /* 調整圖表之間的間距 */
}

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
            margin-top: 30px;

            .qTitle {
                font-size: 1.5em;
            }

        }
    }
}

.botArea {
    width: 100%;
    display: flex;
    justify-content: start;

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
}
</style>