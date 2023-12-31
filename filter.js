//http://localhost:3000/items

let apiProducts = [];

const filters = {
    searchItems: "",
}

const searchInput = document.querySelector(".search-products");
const itmes_product = document.querySelector('.pro-itmes');
const filterBtns = [...document.querySelectorAll('.filter_button')];
filterBtns.forEach((e)=> e.addEventListener('click' , clickBtn));

document.addEventListener('DOMContentLoaded' , ()=>{
    axios.get('http://localhost:3000/items')
    .then((e)=>{
        apiProducts = e.data;
        renderProducts(e.data);
    })
    .catch((err)=> console.log(err));
})

function renderProducts(_products){
    const filteredProduct = _products.filter((e)=>{
        return e.name.toLowerCase().includes(filters.searchItems.toLowerCase());
    })

    itmes_product.innerHTML = "";

    filteredProduct.forEach((elem)=> {
        const addItems = document.createElement('div');
        addItems.classList.add('pro-items__product');
        addItems.innerHTML=
        `        
        <figure>
            <img src="${elem.imgUrl}" alt="Watch-item">
        </figure>
        <div class="pro-items__product__info">
            <h4> ${elem.name} </h4>
            <span> ${elem.price} </span>
        </div>
        `
        itmes_product.appendChild(addItems);
    })
}

searchInput.addEventListener('input' , (e)=>{
    filters.searchItems = e.target.value;
    renderProducts(apiProducts);
})

function clickBtn(e){
   filters.searchItems = e.target.dataset.filter;
   renderProducts(apiProducts);
}
