let shopCart = []

export function toyItemAddHandler({
    name,
    price,
    id,
    img
}) {
    document.querySelector('.cart-image').disabled = false

    /**
     * TOY ITEM OBJECT{
     * @param price
     * @param name
     * @param toyId
     * @param inCart - counter
     * @param img -img url
     */

    const cartItem = {
        price: price,
        name: name,
        toyId: id,
        inCart: 1,
        img: img
    }

    //** CHECK IF CURRENT TOY ITEM IS ALREADY EXIST */ 
    if (shopCart.some((toyItem) => toyItem.toyId === id)) {
        toyItemExistInShopCart(id)
    } else {
        shopCart.push(cartItem)
    }
    shopCartProperties()
    renderShopCartItems()
    cartPopup(cartItem, {
        popupType: 'add'
    })
}

function toyItemExistInShopCart(id) {
    const cartItemIndexToIncrease = shopCart.findIndex(toyItem => toyItem.toyId === id)
    shopCart[cartItemIndexToIncrease].inCart = shopCart[cartItemIndexToIncrease].inCart + 1
}

// SHOP CART
// SHOP CART DISABLED
const shopCartHandler = document.querySelector('.cart-image')
export const shopCartContainer = document.querySelector('.cart-block')
shopCartHandler.addEventListener('click', () => {
    shopCartContainer.classList.toggle('show')
})

function emptyCart() {
    if (!shopCart.length) {
        shopCartHandler.disabled = true
        shopCartContainer.classList.remove('show')
    }
}
// END SHOP CART DISABLED

// RENDER SHOP CART TOTAL PRICE AND ITEMS
export function shopCartProperties() {

    const shopCartCounter = document.querySelector('.cart-items-counter')
    let inCartTotalItems = shopCart.reduce((inCart, toy) => {
        return inCart + toy.inCart
    }, 0)
    shopCartCounter.textContent = inCartTotalItems

    let shopCartTotalPrice = shopCart.reduce((total, toy) => {
        return total + (toy.price * toy.inCart)
    }, 0)
    const shopCartPrice = document.querySelector('.cart-items-total-price')
    shopCartPrice.textContent = `${shopCartTotalPrice.toFixed(2)} zł`

}
// END RENDER SHOP CART TOTAL PRICE AND ITEMS


function renderShopCartItems() {

    shopCartContainer.innerHTML = ''

    if (!shopCart.length) {
        emptyCart()
    } else {
        shopCart.map(toyItem => {
            // CART TOY ITEM BODY
            const cartToyItem = document.createElement('div')
            cartToyItem.classList.add('cart__item')

            // CART TOY ITEM IMG
            const cartToyItemImg = document.createElement('img')
            cartToyItemImg.classList.add('cart__item-img')
            cartToyItemImg.src = `${toyItem.img}`
            //END CART TOY ITEM  IMG

            // CART TOY ITEM PRICE
            const cartToyItemPrice = document.createElement('p')
            cartToyItemPrice.classList.add('cart__item-price')
            cartToyItemPrice.textContent = `${(toyItem.price * toyItem.inCart).toFixed(2)}`
            //END CART TOY ITEM PRICE

            // CART TOY ITEM NAME
            const cartToyItemName = document.createElement('p')
            cartToyItemName.classList.add('cart__item-name')
            cartToyItemName.textContent = toyItem.name
            //END CART TOY ITEM NAME

            // CART TOY ITEM INCART COUNTER
            const toyCartItemInCart = document.createElement('p')
            toyCartItemInCart.classList.add('cart__item-incart')
            toyCartItemInCart.textContent = toyItem.inCart
            // END CART TOY ITEM INCART COUNTER

            // CART TOY ITEM DELETE BUTTON
            const toyItemCartDeleteButton = document.createElement('button')
            toyItemCartDeleteButton.classList.add('cart__item-delete')
            toyItemCartDeleteButton.innerHTML = `<img src="img/icons/delete.png">`
            toyItemCartDeleteButton.addEventListener('click', () => {
                deleteItemFromCartHandler(toyItem)
            })
            // END CART TOY ITEM DELETE BUTTON/
            // END TOY CART ITEM BODY

            // RENDER TOY ITEM IN CART
            cartToyItem.append(cartToyItemImg, cartToyItemName, cartToyItemPrice, toyCartItemInCart, toyItemCartDeleteButton)
            shopCartContainer.appendChild(cartToyItem)
        })
    }

}
// END SHOP CART

// POPUP TEMPLATE
function cartPopup({
    img,
    name,
    price,
    toyId,
    inCart
}, {
    popupType
}) {
    // POPUP BODY
    const popup = document.createElement('div')
    popup.classList.add('popup')
    if (popup.classList.contains('popup')) {
        document.body.style.overflowY = 'hidden'
    }

    popup.addEventListener('click', ({
        target
    }) => {
        if (target.classList.contains('popup')) {
            target.parentNode.removeChild(popup);
            document.body.style.overflowY = 'auto'
        }

    })
    // END POPUP BODY

    const popupWrapper = document.createElement('div')
    popupWrapper.classList.add('popup__wrapper')

    // POPUP STATUS
    const popupText = document.createElement('p')
    popupType === 'add' ? popupText.classList.add('popup__wrapper-status') : popupText.classList.add('popup__wrapper-status', 'delete')
    popupType === 'add' ? popupText.textContent = 'Dodano do koszyka ' : popupText.textContent = 'Usunąć z kosza? '
    // POPUP STATUS

    // POPUP ITEM IMG
    const popupItemImg = document.createElement('img')
    popupItemImg.src = `${img}`
    //END POPUP ITEM IMG

    // POPUP ITEM NAME
    const popupItemName = document.createElement('p')
    popupItemName.classList.add('popup__wrapper-name')
    popupItemName.textContent = `${name}`
    // END POPUP ITEM NAME
    // POPUP ITEM PRICE
    const popupItemPrice = document.createElement('p')
    popupItemPrice.classList.add('popup__wrapper-price')
    popupItemPrice.textContent = `${(price * inCart).toFixed(2)} zł`
    //END POPUP ITEM PRICE

    //END POPUP ITEM PRICE
    // POPUP CLOSE BUTTON
    const popupCloseButton = document.createElement('button')
    popupCloseButton.classList.add('popup__wrapper-close')
    popupCloseButton.textContent = 'X'
    popupCloseButton.addEventListener('click', ({
        currentTarget
    }) => {
        currentTarget.parentNode.parentNode.remove();
        document.body.style.overflowY = 'auto'
    })
    // POPUP CLOSE BUTTON

    // POPUP BOTTOM BUTTON WRAPPER
    const popupButtonWrapper = document.createElement('div')

    if (popupType === 'add') {

        const popupCartButton = document.createElement('button')
        popupCartButton.classList.add('popup__wrapper-cart', 'btn')
        popupCartButton.textContent = 'Wyśwetl koszyk'
        popupCartButton.addEventListener('click', ({
            currentTarget
        }) => {
            currentTarget.parentNode.parentNode.parentNode.remove();
            document.body.style.overflowY = 'auto'
            shopCartContainer.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
            shopCartContainer.classList.add('show')

        })
        popupButtonWrapper.append(popupCartButton)
    } else {
        const popupCartButtonDelete = document.createElement('button')
        popupCartButtonDelete.classList.add('popup__wrapper-cart', 'btn', 'error')
        popupCartButtonDelete.textContent = 'Usunąć'
        popupCartButtonDelete.addEventListener('click', function (event) {
            cartItemToDelete({
                toyId
            }, event)
        })
        const popupCartButtonSave = document.createElement('button')
        popupCartButtonSave.classList.add('popup__wrapper-cart', 'btn', 'save')
        popupCartButtonSave.textContent = 'Zostawić'
        popupCartButtonSave.addEventListener('click', ({
            currentTarget
        }) => {
            currentTarget.parentNode.parentNode.parentNode.remove();
            document.body.style.overflowY = 'auto'
        })

        popupButtonWrapper.append(popupCartButtonSave, popupCartButtonDelete)
    }
    // END POPUP BOTTOM BUTTON WRAPPER
    popupWrapper.append(popupText, popupItemImg, popupItemName, popupItemPrice, popupButtonWrapper, popupCloseButton)
    popup.appendChild(popupWrapper)
    document.body.appendChild(popup)

}
// END POPUP TEMPALTE

// DELETE ITEM
function deleteItemFromCartHandler(cartItem) {
    cartPopup(cartItem, {
        popupType: 'delete',
    })
}

function cartItemToDelete({
    toyId
}, {
    currentTarget
}) {
    currentTarget.parentNode.parentNode.parentNode.remove();
    document.body.style.overflowY = 'auto'
    const cartItemToDelete = shopCart.findIndex(item => item.toyId === toyId)
    shopCart.splice(cartItemToDelete, 1);
    renderShopCartItems()
    shopCartProperties()
}
// END DELETE ITEM