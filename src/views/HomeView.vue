<script>
import location from "../stores/location"
import { mapActions } from 'pinia'

export default{
    data(){
        return{

        }
    },
    methods:{
        ...mapActions(location, ["setPages"])
    },
    mounted(){
        this.setPages("Home")
    }
}
</script>

<template>
  <div class="body">

  </div>
</template>

<style scoped lang="scss">
.body{
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>