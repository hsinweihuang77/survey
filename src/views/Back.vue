<script>
import location from "../stores/location"
import color from '../stores/color'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Search from "../components/Search.vue"
import SurveyListBack from "../components/SurveyListBack.vue"

export default {
    components: {
        Search,
        SurveyListBack,
    },
    data() {
        return {
            checkboxCon:[true, true, true, true]
        }
    },
    computed: {
        ...mapState(color, ["maincolor", "blockcolor", "textcolor", "changemode"]),
    },
    methods: {
        ...mapActions(location, ["setPages"])
    },
    mounted() {
        this.setPages("Back")
    },
}
</script>

<template>
    <div class="survey">
        <SurveyListBack :checkboxState="this.checkboxCon"/>
        <div class="search">
            <Search :checkboxState="this.checkboxCon"/>
        </div>
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

    .search {
        position: absolute;
        top: 75px;
        left: 0px;
    }
}
</style>