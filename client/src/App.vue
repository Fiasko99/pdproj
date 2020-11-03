<template>
  <div id="app">
    
    <Header />

    <div class="container pt-4">
      <transition name="myanime" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>


  </div>
</template>

<script>
import Header from "./components/structure/header";
export default {
  name: 'App',
  components: {
    Header
  },
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}
.myanime-enter-active, .myanime-leave-active {
  transition: all .3s cubic-bezier(0.65, 0.05, 0.36, 1);
}
.myanime-enter, .myanime-leave-to {
  opacity: 0;
}
</style>
