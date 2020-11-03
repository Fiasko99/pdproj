const express = require('express')
var multer  =   require('multer');
var cors = require('cors');
const {v4} = require('uuid')
const PORT = process.env.PORT || 8081

const app = express()

app.use(express.static('assets'));

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./assets");
    },
    filename: (req, file, cb) =>{
        cb(null, v4()+"_"+file.originalname);
    }
});

const admin = [
    {
        id: v4(), 
        name: 'Nikita', 
        surname: 'Glazkov', 
        login: 'IMNEKIT',
        password: "123"
    }
]

const links = [
    {
        id: 1,
        link: 'Home',
        to: '/'
    },
    {
        id: 2,
        link: 'Shop',
        to: '/shop'
    },
    {
        id: 3,
        link: 'Favorite',
        to: '/favorite'
    },
]

let ProductList = [
    {
        id: v4(), 
        title: 'Гречка', 
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        img: `http://localhost:${PORT}/test.jpg`,
        marked: false
    },
    {
        id: v4(), 
        title: 'Молоко', 
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        img: `http://localhost:${PORT}/test.jpg`,
        marked: false
    },
    {
        id: v4(), 
        title: 'Соль', 
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        img: `http://localhost:${PORT}/test.jpg`,
        marked: false
    },
    {
        id: v4(), 
        title: 'Вода', 
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        img: `http://localhost:${PORT}/test.jpg`,
        marked: false
    },
    {
        id: v4(), 
        title: 'Огурцы', 
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        img: `http://localhost:${PORT}/test.jpg`,
        marked: false
    },
]

app.use(express.json())
app.use(cors());

app.get('/products', (req, res) => {
    setTimeout(() => {
        res.status(200).json(ProductList)
    }, 1500)
})

app.get('/links', (req, res) => {
    res.status(200).json(links)
})

app.put('/products/:id', (req, res) => {
    const idx = ProductList.findIndex(c => c.id === req.params.id)
    ProductList[idx] = req.body.body
    res.json(ProductList[idx])
})

app.get('/user/:login/:password', (req, res) => {
    let user = admin.find(u => u.login === req.params.login && u.password === req.params.password)
    if (user) {
        res.json({msg: `Приветствую ${user.name} ${user.surname}`})
    } else {
        res.json({msg: 'Неверные данные'})
    }
})

app.delete('/products/:id', (req, res) => {
    ProductList = ProductList.filter(p => p.id !== req.params.id)
    res.status(200).json({msg: 'Product deleted'})
})

let multerUpload = multer({storage: storageConfig})

app.post("/products", multerUpload.single('file'), (req, res) => {
    const file = req.file
    const data = {
        id: v4(), 
        title: req.headers.title, 
        body: req.headers.body,
        img: `http://localhost:${PORT}/${file.filename}`,
        marked: req.headers.marked
    }
    if(file) {
        ProductList.push(data)
        res.json({msg: 'Uploaded'})
    }
});

app.listen(PORT, '0.0.0.0', async () => {
    console.log(`http://localhost:${PORT}`)
})