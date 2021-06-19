<template>
  <div>
      <head-app></head-app>
      <roat-detale/>
      <roat-operation></roat-operation>
  </div>
</template>

<script>
import headApp from './headApp.vue'
import RoatDetale from './roatDetale.vue'
import RoatOperation from './roatOperation.vue'
export default {
    components: { headApp, RoatDetale, RoatOperation },

}
</script>

<style>

</style>