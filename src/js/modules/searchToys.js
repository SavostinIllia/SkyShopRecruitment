import {
    renderToysCard,
    recomendedToysContainer,
    bestsellerToysContainer
} from './fetchShopProducts'

// SEARCH
export function searchToysHandler(shopToys) {
    const toySearchInput = document.getElementById('toy-search')
    toySearchInput.addEventListener('keyup', (event) => {
        searchHandler(shopToys, event)
    })
}

// SEARCH HANDLER BY TOY NAME
function searchHandler(globalToysArray, event) {
    const serachingToy = event.target.value.trim().toLocaleLowerCase()
    const searchingToy = globalToysArray.filter(toy => {
        return toy.name.trim().toLocaleLowerCase().includes(serachingToy)
    })
    recomendedToysContainer.innerHTML = ''
    bestsellerToysContainer.innerHTML = ''
    renderToysCard(searchingToy, serachingToy)

}
// END SEARCH