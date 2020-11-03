<template>
  <div>
      <div class="position-load" v-if="loading">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    
      <div class="card-columns" v-else-if="products.length">
        <div class="card" v-for="product in products" :key="product.id">
          <img class="card-img-top" :src="product.img" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title" :style="{color: product.marked ? 'red' : 'black'}">{{product.title}}</h5>
            <p class="card-text">{{product.body}}</p>
          </div>
          <button class="btn btn-primary rounded-0 w-100" @click="markProduct(product.id)">Mark in favorite</button>
        </div>
      </div>
      <h2 v-else>No products!</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      loading: true
    }
  },
  mounted() {
    axios.get('http://localhost:8081/products', 
      {
        mode: 'cors', 
        'Cache-Control': 'no-cache',
      }).then(res => {
        this.products = res.data.filter(p => p.marked === true)
        this.loading = false
      })
  },
}
</script>

<style scoped>
  .position-load {
    text-align: center;
    margin-top: 50px;
  }
</style>