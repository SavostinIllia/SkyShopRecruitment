import { toyItemAddHandler } from "./cartItems";
import { searchToysHandler } from "./searchToys";

const DATA_URL = "https://skyshoprecruitmentproject.firebaseio.com/";
export const recomendedToysContainer = document.querySelector(
  ".recommended-toys"
);
export const bestsellerToysContainer = document.querySelector(
  ".bestseller-toys"
);

export function fetchShopProducts() {
  axios
    .get(`${DATA_URL}/toys.json`)
    .then((result) => {
      renderToysCard(result.data);
      searchToysHandler(result.data);
    })
    .catch((error) => console.log("error", error));
}

export function renderToysCard(toys, serachingToy) {
  const bestsellerToys = toys.filter(
    (toyItem) => toyItem.option === "bestseller"
  );
  if (!bestsellerToys.length) {
    searchResultEmpty(bestsellerToysContainer, serachingToy);
  } else {
    bestsellerToys.map((toy) => {
      toyCardTemplate(toy);
    });
  }

  const recommendedToys = toys.filter(
    (toyItem) => toyItem.option === "polecamy"
  );
  if (!recommendedToys.length) {
    searchResultEmpty(recomendedToysContainer, serachingToy);
  } else {
    recommendedToys.map((toy) => {
      toyCardTemplate(toy);
    });
  }
}

// TOY CARD TEMPLATE
function toyCardTemplate(toy) {
  // TOY BOYD
  const toyCard = document.createElement("div");
  toyCard.classList.add("toy__card");
  // TOY HEADER
  const toyCardHeader = document.createElement("div");
  toyCardHeader.classList.add("toy__card-header");

  const toyCardHeaderOption = document.createElement("p");
  toyCardHeaderOption.classList.add("toy__card-header-option");
  toyCardHeaderOption.textContent = toy.option;

  const toyCardOptionDiscount = document.createElement("span");
  toyCardOptionDiscount.classList.add("toy__card-header-discount");
  toy.discount
    ? (toyCardOptionDiscount.textContent = toy.discount)
    : (toyCardOptionDiscount.style.display = "none");
  // END TOY HEADER

  // TOY CARD IMG
  const toyCardImg = document.createElement("img");
  toyCardImg.classList.add("toy__card-img");
  toyCardImg.src = `${toy.img}`;
  // END TOY CARD IMG

  // TOY CARD NAME
  const toyCardName = document.createElement("p");
  toyCardName.classList.add("toy__card-name");
  toyCardName.textContent = toy.name;
  // END TOY CARD NAME
  const toyCardPrice = document.createElement("span");
  toyCardPrice.classList.add("toy__card-price");
  toyCardPrice.textContent = `${toy.price.toFixed(2)} zł`;

  // TOY CARD OLD PRICE
  const toyCardOldPrice = document.createElement("span");
  toyCardOldPrice.classList.add("toy__card-price-old");
  toy.oldPrice
    ? (toyCardOldPrice.textContent = `${toy.oldPrice.toFixed(2)} zł`)
    : (toyCardOldPrice.style.display = "none");
  // END TOY CARD OLD PRICE

  // TOY CARD BUTTON CONTAINER
  const toyCartButtonWrapper = document.createElement("div");
  toyCartButtonWrapper.classList.add("toy__card-option-wrapper");
  // END TOY CARD CONTAINER

  // TOY CARD BUTTON OPTIONS
  const toyCardButtonAddItem = document.createElement("button");
  toyCardButtonAddItem.classList.add("toy__card-option-wrapper-button", "add");
  toyCardButtonAddItem.innerHTML = `<img src="img/icons/shopping-cart.png"> do koszyka`;
  toyCardButtonAddItem.addEventListener("click", () => {
    toyItemAddHandler(toy);
  });

  const toyCardButtonSeeItem = document.createElement("button");
  toyCardButtonSeeItem.classList.add("toy__card-option-wrapper-button", "see");
  toyCardButtonSeeItem.innerHTML = `<img src="img/icons/eye.png">`;

  const toyCardButtonLikeItem = document.createElement("button");
  toyCardButtonLikeItem.classList.add(
    "toy__card-option-wrapper-button",
    "like"
  );
  toyCardButtonLikeItem.innerHTML = `<img src="img/icons/like.png">`;
  toyCardButtonLikeItem.addEventListener("click", ({ currentTarget }) => {
    currentTarget.classList.toggle("active");
  });
  // END TOY CARD BOTTUN OPTIONS
  // END TOY BODY

  // RENDERING TOY CARD
  toyCartButtonWrapper.append(
    toyCardButtonAddItem,
    toyCardButtonSeeItem,
    toyCardButtonLikeItem
  );
  toyCardHeader.append(toyCardHeaderOption, toyCardOptionDiscount);
  toyCard.append(
    toyCardHeader,
    toyCardImg,
    toyCartButtonWrapper,
    toyCardName,
    toyCardPrice,
    toyCardOldPrice
  );

  if (toy.option === "bestseller") {
    bestsellerToysContainer.append(toyCard);
  } else if (toy.option === "polecamy") {
    recomendedToysContainer.append(toyCard);
  }
  // END RENDERING TOY CARD
}
// END TOY CARD TEMPLATE

// SEARCH RESULT
function searchResultEmpty(containerToRender, serachingToy) {
  const emptySearchResultMessage = document.createElement("p");
  emptySearchResultMessage.classList.add("search-result");
  emptySearchResultMessage.innerHTML = `nie znaleziono zabawki pod takim tytułem <span>'${serachingToy}'</span></>`;
  containerToRender.append(emptySearchResultMessage);
}
// END SEARCH RESULT
