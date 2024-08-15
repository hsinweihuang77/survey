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
    },
    mounted() {
        this.setPages("Back");
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
                {{ survey.description }}
            </div>
            <div class="questions" v-for="question in survey.questions">
                <div class="question" v-if="question.type == 0">
                    <span>{{ question.title }}</span>
                    <input type="text">
                </div>
                <div class="question" v-if="question.type == 1">
                    <p>{{ question.title }}</p>
                    <textarea name="" id=""></textarea>
                </div>
                <div class="question" v-if="question.type == 2">
                    <p>{{ question.title }}</p>
                    <div class="option" v-for="option in question.option">
                        <input type="radio" name="" id="">
                        <label for="">{{ option.value }}</label>
                    </div>
                </div>
                <div class="question" v-if="question.type == 3">
                    <p>{{ question.title }}</p>
                    <div class="option" v-for="option in question.option">
                        <input type="checkbox" name="" id="">
                        <label for="">{{ option.value }}</label>
                    </div>
                </div>

            </div>
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
            font-size: 1em;
        }
    }
}
</style>