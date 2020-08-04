const express = require('express');
const app = express();
app.use(express.json());
app.use(logger);
//app.use(express.urlencoded({ extended: true }));

function logger(req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method)
    next();
}

let products = [{
        id: "1",
        auther: "david",
        content: "hey you"
    },
    {
        id: "2",
        auther: "diamant",
        content: "yes i am"
    }
];


app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:id', (req, res) => {
    for (let product of products) {
        if (product.id === req.params.id) {
            res.send(product);
        }
    }
})

let idCounter = products.length + 1;

app.post('/products', (req, res) => {
    products.forEach((product) => {
      if(product.id === idCounter.toString()) {
           idCounter += 1 
        }
        })
    req.body.id = idCounter.toString() ;
    products.push(req.body);
    res.send(req.body);
});

app.put('/products/:id', (req, res) => {
    products.forEach((product, i) => {
        if (product.id === req.params.id) {
            products[i] = req.body;
            res.send(products[i]);
        }
    });
});


app.delete('/products/:id', (req, res) => {
    products.forEach((product, index) => {
        if (product.id === req.params.id) {
            products.splice(index, 1)
            res.send(req.params.id + ' deleted');
        }
    });
});










app.listen(3000);