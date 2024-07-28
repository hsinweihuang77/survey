<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import color from './stores/color'
import { mapState } from 'pinia'
</script>

<script>
export default {
    computed: {
        ...mapState(color, ["maincolor"]),
    },
}
</script>

<template>
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <RouterView />
    </div>
    <div class="background"></div>
</template>

<style scoped>
.header{
  width: 100dvw;
  height: 15dvh;
}

.content{
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.background{
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: v-bind(maincolor);
  transition: 0.3s;
}
</style>