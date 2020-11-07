const productsList = document.querySelector('#productsList');
const productInput = document.querySelector('#productInput');
const priceInput = document.querySelector('#priceInput');
const button = document.querySelector('#addProductBtn');

axios.defaults.baseURL = 'http://localhost:3000';

//get all products from api
function getAllProducts() {
    return axios.get('/products')
        .then(res => res.data)
        .catch(error => error);
}

//initialize the list with the products from the api
async function showList() {
    try {
        productsList.innerHTML = "";
        products = await getAllProducts();
        products.map((product) => {
            addProductFromObj(product);
        })
    } catch (error) {
        alert("there was a problem while getting the products");
        console.log(error.message);
    }

}

function addProductFromObj(productObj) {
    productInput.value = '';
    // creating all li elements
    const productLi = document.createElement('li');
    const productTextSpan = document.createElement('span');
    const productPriceSpan = document.createElement('span');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    //product name span
    productLi.appendChild(productTextSpan);
    productTextSpan.textContent = productObj.productName;;
    productTextSpan.classList.add('textSpan');
    //product price span
    productLi.appendChild(productPriceSpan);
    productPriceSpan.textContent = productObj.price + ' ₪';
    productPriceSpan.classList.add('priceSpan');
    //delete button
    productLi.appendChild(deleteButton);
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteBtn');
    deleteButton.addEventListener('click', () => {
        deleteProduct(productObj.id);
        productsList.removeChild(productLi);
    });
    //edit button
    productLi.appendChild(editButton);
    editButton.textContent = 'Edit';
    editButton.classList.add('editBtn');
    editButton.addEventListener('click', () => {
        editProduct(productObj);
    });
    //adding li to ul
    productsList.appendChild(productLi);
    productLi.classList.add('productLi');
    productInput.focus();
}

//POST
async function postProduct() {
    try {
        const newProductObj = await axios.post('/products', {
                productName: productInput.value,
                price: priceInput.value
            }).then(res => res.data)
            .catch(error => error);
        addProductFromObj(newProductObj);
    } catch (error) {
        alert("there was a problem while adding the product");
        console.log(error.message);
    }

}

//DELETE
function deleteProduct(id) {
    axios.delete(`/products/${id}`).catch(error => {
        console.log(error);
        alert('there was a problem deleting the product');
    });
}

//UPDATE 
async function editProduct(productObj) {
    try {
        const editedProduct = {
            id: productObj.id,
            productName: prompt('Edit product name:'),
            price: prompt('Edit product price:')
        }
        await axios.put(`/products/${productObj.id}`, editedProduct);
        showList();
    } catch (error) {
        alert("there was a problem while updating the product");
        console.log(error.message);
    }

}

window.addEventListener('load', showList);
button.addEventListener('click', (event) => {
    if (productInput.value !== "") {
        postProduct();
    }
});