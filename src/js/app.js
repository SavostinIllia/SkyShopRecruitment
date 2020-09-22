import slidersInit from "./modules/sliders";
import {
	fetchShopProducts
} from "./modules/fetchShopProducts";
import {
	shopCartProperties
} from "./modules/cartItems";
import pageScrollHandler from './modules/pageScrollHandler'

document.addEventListener("DOMContentLoaded", function () {
	fetchShopProducts();
	slidersInit();
	shopCartProperties();
	pageScrollHandler()
});