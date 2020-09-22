import {
    shopCartContainer
} from './cartItems'
// STICKY HEADER

export default function pageScrollHandler() {
    const pageHeader = document.querySelector('header')
    window.addEventListener('scroll', () => {
        const scrolledY = window.scrollY
        if (scrolledY >= 20) {
            pageHeader.classList.add('header-scrolled')
        } else {
            pageHeader.classList.remove('header-scrolled')
        }
        if (pageHeader.classList.contains('header-scrolled')) {
            shopCartContainer.classList.add('sticked')
        } else {
            shopCartContainer.classList.remove('sticked')
        }
    })
}
// END STICKY HEADER