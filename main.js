// Selectors
const productsContainer = document.querySelector('.products');
const filterContainer = document.querySelector('.companies');
const searchInput = document.querySelector('.search-input');
const mode = document.querySelector('.slider');

// Settings

mode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
});

// Get the Product from JSON File
getProducts();
function getProducts() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let pObj = [...JSON.parse(this.responseText)];
      createProducts(pObj);
      createFilters(pObj);
      handleSearchEvent(pObj);
    }
  }

  xhr.open('GET', './products.json', true);
  xhr.send();
}

function createProducts(obj) {
  if (obj.length < 1) {
    productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }
  productsContainer.innerHTML = '';
  obj.forEach((pr) => {
    let article = document.createElement('articel');
    article.className = 'product';
    article.innerHTML = `
    <img
      src="${pr.image}"
      class="product-img img"
    />
    <footer>
      <h5 class="product-name">${pr.title}</h5>
      <span class="product-price">${pr.price}</span>
    </footer>`;

    productsContainer.appendChild(article)
  });
}

function createFilters(obj) {
  let companies = obj.map((pr) => {
    return pr.company;
  })

  let uniqCompanies = [...new Set(companies)];

  uniqCompanies.forEach((comp) => {
    let filterBtn = document.createElement('button');
    filterBtn.className = 'company-btn';
    filterBtn.textContent = comp;

    filterContainer.appendChild(filterBtn);

    filterBtn.addEventListener('click', function() {
      let filtered = obj.filter((prod) => {
        return prod.company === comp;
      });
      createProducts(filtered);
    });
    document.getElementById('all').addEventListener('click', () => {
      createProducts(obj);
    })
  })
}


function handleSearchEvent(obj) {
  searchInput.addEventListener('input', (e) => {
    let searching = e.target.value;
    let re = new RegExp(searching, 'ig');
    let results = obj.filter((pr) => {
      return re.test(pr.title)
    })
    createProducts(results);
  })
}



