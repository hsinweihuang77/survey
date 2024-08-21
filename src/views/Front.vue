<script>
import location from "../stores/location"
import color from '../stores/color'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Search from "../components/Search.vue"
import SurveyList from "../components/SurveyList.vue"

export default {
    components: {
        SurveyList,
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "textcolor", "changemode"]),
    },
    methods: {
        ...mapActions(location, ["setPages"])
    },
    mounted() {
        this.setPages("Front")
    },
}
</script>

<template>
    <div class="survey">
        <SurveyList/>
    </div>
</template>

<style scoped lang="scss">
.survey {
    position: relative;
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>