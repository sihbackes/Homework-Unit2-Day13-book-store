const boxContent = document.getElementById("card-box");
const shoppingCart = document.getElementById("shopping-cart");

let outerBooks = [];
let shoppingCartList = [];
let filteredBooks = [];

async function getData() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/books"
    );
    const books = await response.json();
    displayBooks(books);
    outerBooks = books;
  } catch (err) {
    console.error(err.message);
  }
}

async function displayBooks(books) {
  books.forEach((book) => {
    boxContent.innerHTML += `
    <div class="col mb-4 card-box">
     <div class="card mb-3 ">
       <img src="${book.img}" class="card-img-top imagem" alt="${book.title}" />
       <div class="card-body">
         <h5 class="card-title truncate">${book.title}</h5>
         <button class="btn btn-primary" onclick="addToCart('${String(
           book.asin
         )}', this)">$${book.price}</button>
          <button class="btn btn-warning" onclick="this.closest('.card-box').remove()">
         Skip me
         </button>
       </div>
     </div>
    </div>`;
  });
}

function addToCart(asin, element) {
  console.log(asin);
  const book = outerBooks.find((book) => book.asin == asin);
  shoppingCartList.push(book);
  console.log(shoppingCartList);
  refreshShoppingCart();
  element.closest(".card").classList.add("selected");
}

function refreshShoppingCart() {
  shoppingCart.innerHTML = "";

  shoppingCartList.forEach((book) => {
    shoppingCart.innerHTML += `
  <div class="shopping-item">
    <div>
      ${book.title}
    </div>
    <div>
      ${book.price}
    </div>
    <div>
      <button class="btn btn-danger" onclick="deleteItem('${String(
        book.asin
      )}')">Delete </button>
    </div>
  </div>
`;
  });
}

function search(query) {
  if (query.length > 3) {
    filteredBooks = outerBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    displayBooks(filteredBooks);
  } else {
    displayBooks(outerBooks);
  }
}

function deleteItem(asin) {
  const index = shoppingCartList.findIndex((book) => book.asin === asin);

  if (index !== -1) {
    shoppingCartList.splice(index, 1);
  }

  refreshShoppingCart();
}

getData();
