<script>
import location from "../stores/location"
import color from '../stores/color'
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import Search from "../components/Search.vue"
import SurveyListFront from "../components/SurveyListFront.vue"

export default {
    components: {
        Search,
        SurveyListFront,
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
        this.setPages("Front")
    },
}
</script>

<template>
    <div class="survey">
        <SurveyListFront :checkboxState="this.checkboxCon"/>
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