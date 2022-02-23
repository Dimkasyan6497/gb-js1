document.querySelector('.cartIcon').addEventListener('click', (event) => {
  document.querySelector('.basket').classList.toggle('hidden');
})

const basket = {};
/**
 * Изменение количества добавленных товаров у значка корзины и изменение общей суммы товаров
 */
function changeTotal() {
  const spanTotalElsInBasket = document.querySelector(
    `.cartIconWrap span`);
  let totalElsInBasket = 0;
  const basketTotalEl = document.querySelector(
    `.basketTotalValue`);
  let totalSumm = 0;

  for (const key in basket) {
    totalElsInBasket +=  basket[key].count;
    totalSumm += basket[key].total;
  }
  spanTotalElsInBasket.textContent = `${totalElsInBasket}`;
  basketTotalEl.textContent = `${totalSumm.toFixed(2)}`;
}

function addToCard(elWithInfo) {
  if (elWithInfo.dataset.id in basket) {
    // Изменяю строку с товаром
    const basketProductCount = document.querySelector(
            `#basketID${elWithInfo.dataset.id} div:nth-child(2)`),
          basketProductTotal = document.querySelector(
            `#basketID${elWithInfo.dataset.id} div:nth-child(4)`);

    basket[elWithInfo.dataset.id].count += 1;
    basketProductCount.textContent = basket[elWithInfo.dataset.id].count;

    basket[elWithInfo.dataset.id].total = basket[elWithInfo.dataset.id].
      count * basket[elWithInfo.dataset.id].price;
    basketProductTotal.textContent = `${basket[elWithInfo.dataset.id].total.toFixed(2)}$`;
    
    changeTotal();

  } else {
    basket[elWithInfo.dataset.id] = {
      id: elWithInfo.dataset.id,
      name: elWithInfo.dataset.name,
      price: elWithInfo.dataset.price,
      count: 1,
      total: +elWithInfo.dataset.price,
    }
    changeTotal()

    document.querySelector('.basketHeader').insertAdjacentHTML('afterend',
      `<div class="basketRow basketElement" id="basketID${elWithInfo.dataset.id}">
        <div>${basket[elWithInfo.dataset.id].name}</div>
        <div>${basket[elWithInfo.dataset.id].count}</div>
        <div>${(+basket[elWithInfo.dataset.id].price).toFixed(2)}$</div>
        <div>${(+basket[elWithInfo.dataset.id].total).toFixed(2)}$</div>
      </div>`
    );
                
  }
  
  console.log(basket);
  console.log(basket[elWithInfo.dataset.id].id);
}

document.querySelector('.featuredItems').addEventListener('click', (event) => {
  const el = event.target;
  if (el.tagName !== 'BUTTON') return;

  const parentEl = el.closest('.featuredItem');
  addToCard(parentEl);
})

