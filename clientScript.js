const productsList = document.querySelector('#productsList');
const productInput = document.querySelector('#productInput');
const priceInput = document.querySelector('#priceInput');
const button = document.querySelector('#addProductBtn');

const API_URL = 'http://localhost:3000'
axios.defaults.baseURL = API_URL;

function getAllProducts() {
    return axios.get('/products').then(res => res.data)
}
async function showList() {
    productsList.innerHTML = "";
    products = await getAllProducts();
    products.map((product) => {
        console.log(product);
        addProductFromObj(product);
    })
}





function addProductFromObj(productObj) {
    const productName = productObj.productName;
    const productPrice = productObj.price;
    const productId = productObj.id;
    productInput.value = '';

    const productLi = document.createElement('li');
    const productTextSpan = document.createElement('span');
    const productPriceSpan = document.createElement('span');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    productLi.appendChild(productTextSpan);
    productTextSpan.textContent = productName;

    productLi.appendChild(productPriceSpan);
    productPriceSpan.textContent = productPrice;

    productLi.appendChild(deleteButton);
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteProduct(productId);
        productsList.removeChild(productLi);
    });

    productLi.appendChild(editButton);
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        editProduct(productObj);
        // showList();
    });

    productsList.appendChild(productLi);
    productInput.focus();
}
//POST
async function postProduct() {
    const newProductObj = await axios.post('/products', {
        productName: productInput.value,
        price: priceInput.value
    }).then(res => res.data);
    addProductFromObj(newProductObj);
}

//DELETE
function deleteProduct(id) {
    axios.delete(`/products/${id}`);
}

//UPDATE 
async function editProduct(productObj) {
    const editedProduct = {
        productName: prompt('Edit product name:'),
        price: prompt('Edit product price:')
    }
    await axios.put(`/products/${productObj.id}`, editedProduct);
    showList();
}





window.addEventListener('load', showList);
button.addEventListener('click', postProduct);