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
        ...mapState(survey, ["survey", "formData", "feedbackId"]),
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
{{ feedbackId }}
</template>

<style scoped lang="scss">

</style>