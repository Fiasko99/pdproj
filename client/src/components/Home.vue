<template>
  <div>
    <h1>Home page</h1>

    
    <form @submit.prevent="onLog" v-if="show">
      <div class="form-group">
        <label for="Login">Login</label>
        <input type="text" class="form-control" id="Login" aria-describedby="LoginHelp" placeholder="Enter login" v-model="login" required>
        <small id="LoginHelp" class="form-text text-muted">We'll never share your login with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="Password">Password</label>
        <input type="password" class="form-control" id="Password" placeholder="Password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <div v-else-if="!show">
      <h2>{{msg}}</h2>

      <form @submit.prevent="newProduct" class="m-4 p-4 border rounded">
        <div class="form-group">
          <label for="Title">Title</label>
          <input type="text" class="form-control" id="Title" aria-describedby="titleHelp" placeholder="Enter title" v-model="title" required>
          <small id="titleHelp" class="form-text text-muted">Наименование для продукта</small>
        </div>
        <div class="form-group">
          <label for="Body">Body</label>
          <textarea class="form-control" id="Body" rows="3" v-model="body" required></textarea>
        </div>
        <div class="form-group">
          <label for="file" class="mr-4">File input</label>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" required>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="mark" v-model="marked">
          <label class="form-check-label" for="mark">Mark</label>
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>

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
          <button class="btn btn-primary rounded-0 w-100" @click="deleteProduct(product.id)">Delete in favorite</button>
        </div>
      </div>
      <h2 v-else>No products!</h2>
    </div>


      
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login: '',
      password: '',
      show: true,
      products: [],
      msg: '',
      loading: true,

      title: '',
      body: '',
      file: '',
      marked: false
    }
  },
  methods: {
    onLog() {
      const self = this;
      axios.get(
        `http://localhost:8081/user/${self.login}/${self.password}`,
        {
          mode: 'cors', 
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
      )
      .then(res => {
        self.msg = res.data.msg
        if (res.data.msg === 'Неверные данные') {
          self.login = self.password = ''
          alert(res.data.msg)
        } else {
          self.show = false
          self.getProducts()
        }
      })
    },
    getProducts() {
      axios.get('http://localhost:8081/products', 
      {
        mode: 'cors', 
        'Cache-Control': 'no-cache',
      }).then(res => {
        this.products = res.data
        this.loading = false
      })
    },
    deleteProduct(id) {
      axios.delete(
        `http://localhost:8081/products/${id}`, 
        {
          mode: 'cors', 
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        }, 
      ).then(res => {
        this.products = this.products.filter(p => p.id !== id)
        alert(res.data.msg)
      })
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    newProduct() {
      let self = this;
      let formData = new FormData();
      formData.append('file', this.file);
      axios.post( 'http://localhost:8081/products',
        formData,
        {
          headers: {
            title: self.title,
            body: self.body,
            mark: self.marked,
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        self.title = self.body = self.file = ''
        alert(res.data.msg)
      })
    }
  }
}
</script>

<style scoped>
  .position-load {
    text-align: center;
    margin-top: 50px;
  }
</style>