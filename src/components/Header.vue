<script>
import { RouterLink } from 'vue-router'
import location from '../stores/location'
import color from '../stores/color'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
    components: {
        RouterLink
    },
    data() {
        return {
            isActive: true,
        }
    },
    computed: {
        ...mapState(location, ["location", "pageLocation"]),
        ...mapState(color, ["maincolor", "blockcolor", "textcolor"]),
    },
    methods: {
        ...mapActions(color, ["changemode"]),
        toggleClass() {
            this.isActive = !this.isActive;
            this.changemode();
        }
    }
}
</script>

<template>
    <div class="headerArea">
        <RouterLink class="routeItem" :class="{ 'selected': this.location === 'Home' }" to="/">
            <i class="fa-solid fa-child-combatant"></i>
        </RouterLink>
        <RouterLink class="routeItem" :class="{ 'selected': this.location === 'Front' }" to="/Front">填寫問卷</RouterLink>
        <RouterLink class="routeItem" :class="{ 'selected': this.location === 'Back' }" to="/Back">問卷管理</RouterLink>
        <!-- <button type="button" @click="this.changemode">changemode</button> -->
        <button class="theme-toggle" :class="{ 'theme-toggle--toggled': this.isActive }" type="button"
            title="Toggle theme" aria-label="Toggle theme" @click="this.toggleClass">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" fill="currentColor"
                stroke-linecap="round" class="theme-toggle__classic" viewBox="0 0 32 32">
                <clipPath id="theme-toggle__classic__cutout">
                    <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
                </clipPath>
                <g clip-path="url(#theme-toggle__classic__cutout)">
                    <circle cx="16" cy="16" r="9.34" />
                    <g stroke="currentColor" stroke-width="1.5">
                        <path d="M16 5.5v-4" />
                        <path d="M16 30.5v-4" />
                        <path d="M1.5 16h4" />
                        <path d="M26.5 16h4" />
                        <path d="m23.4 8.6 2.8-2.8" />
                        <path d="m5.7 26.3 2.9-2.9" />
                        <path d="m5.8 5.8 2.8 2.8" />
                        <path d="m23.4 23.4 2.9 2.9" />
                    </g>
                </g>
            </svg>
        </button>
    </div>
</template>

<style scoped lang="scss">
.headerArea {
    width: 100%;
    height: 100%;
    background-color: v-bind(blockcolor);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    transition: 0.3s;

    .routeItem {
        margin: 3%;
        font-size: 20px;
        color: v-bind(textcolor);
        text-decoration: none;
        cursor: pointer;
        transition: 0.3s;
    }

    .selected {
        font-size: 30px;
        border-bottom: 3px solid v-bind(textcolor);
    }
}

.theme-toggle__classic {
    width: 30px;
    height: 30px;
}

.theme-toggle--toggled{
    color: v-bind(textcolor);
}
</style>