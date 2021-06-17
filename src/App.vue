<template>
  <div id="app" class = "wrapper">
    <head-app></head-app>
    <router-view></router-view>
  
  </div>
</template>

<script>
import headApp from './components/headApp'

export default {
    components: { headApp },
  name: 'App',
}
</script>

<style>

</style>
