<template>
  <header>
    <button v-on:click="show = !show" class="btn-set">
        <img src="./menu-ico.svg" alt="no img" class="icon-set">
    </button>

    <span class="logo-span">Shopping with us!!</span>

    <transition name="myslide">
      <aside v-if="show">
        <ul v-for="link in links" :key="link.id">
          <li @click="show = !show"><router-link :to="link.to">{{link.link}}</router-link></li>
        </ul>
      </aside>
    </transition>
  </header>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            show: false,
            links: []
        }
    },
    mounted() {
      axios.get('http://localhost:8081/links', 
      {
        mode: 'cors', 
        'Cache-Control': 'no-cache',
      }).then(res => this.links = res.data)
    }
}
</script>

<style scoped>
header {
  width: 100%;
  background-color: #fff;
  height: 56px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.btn-set {
  padding: 6px;
  margin: 4px;
  background-color: transparent;
  border: none;
  outline: none;
  transition: all .3s ease-in-out;
  border-radius: 50%;
}
.btn-set:active {
  background-color: rgba(0, 0, 0, .1);
}
.icon-set {
  height: 36px;
}
.logo-span {
  font-size: 28px;
  margin-left: calc(50vw - 168px);
}
aside {
  background-color: #fff;
  width: 20vw;
  height: 150px;
  min-width: 100px;
  max-width: 200px;
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 1;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23);
}
aside ul {
  list-style: none;
  padding: 0;
  margin: 10px;
}
aside ul li {
  margin: 5px;
  padding: 5px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
}
aside ul li:hover {
  font-weight: bolder;
}
a {
  text-decoration: none;
}
.myslide-enter-active, .myslide-leave-active {
  transition: all .3s cubic-bezier(0.65, 0.05, 0.36, 1);
}
.myslide-enter, .myslide-leave-to {
  left: -100%;
}
</style>