const boxContent = document.getElementById("card-box");
const cartList = document.getElementById("cart-list");

// const getData = () => {
//   fetch("https://striveschool-api.herokuapp.com/books")
//     .then((response) => response.json())
//     .then((listOfBooks) => {
//       listOfBooks.forEach((book) => {
//         boxContent.innerHTML += `
// <div class="col mb-4">
//   <div class="card mb-3 ">
//     <img src="${book.img}" class="card-img-top imagem" alt="..." />
//     <div class="card-body">
//       <h5 class="card-title truncate">${book.title}</h5>
//       <p class="card-text">Price</p>
//       <a href="#" class="btn btn-primary">Cart</a>
//       <a href="#" class="btn btn-primary">Skip</a>
//     </div>
//   </div>
// </div>`;
//       });
//     })
//     .catch(() => (err) => console.error(err));
// };

async function getData() {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const listOfBooks = await response.json();
  return listOfBooks;
}

async function displayBooks() {
  const listOfBooks = await getData();
  listOfBooks.forEach((book) => {
    boxContent.innerHTML += `
    <div class="col mb-4">
     <div class="card mb-3 ">
       <img src="${book.img}" class="card-img-top imagem" alt="..." />
       <div class="card-body">
         <h5 class="card-title truncate">${book.title}</h5>
         <a href="#" class="btn btn-primary cart">Cart</a>
         <a href="#" class="btn btn-primary">Skip</a>
       </div>
     </div>
    </div>`;
  });
}

getData();
displayBooks();
