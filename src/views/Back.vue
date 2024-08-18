<script>
import location from "../stores/location"
import color from '../stores/color'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Search from "../components/Search.vue"
import SurveyList from "../components/SurveyList.vue"

export default {
    components: {
        Search,
        SurveyList,
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
        <SurveyList :checkboxState="this.checkboxCon"/>
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