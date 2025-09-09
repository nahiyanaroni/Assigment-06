const LoadCatagori = () => {

    fetch('https://openapi.programming-hero.com/api/categories')
        .then(response => response.json())
        .then(json => displayTrees(json));
}

const emtyClick=(id)=>{
 
 LoadCard (`https://openapi.programming-hero.com/api/category/${id}`)
 } 
const displayTrees = (Trees) => {

    Trees.categories.forEach(tree => {
        const allCetagori = document.getElementById("catagori-button");
        const div = document.createElement("div");
        div.setAttribute("class", "w-full")
        div.innerHTML = ` <button onclick="emtyClick(${tree.id})" class="hover:bg-green-700 w-full rounded-md text-left">
                 ${tree.category_name}
                </button>`;
        allCetagori.appendChild(div);
    });

}
LoadCatagori();


const LoadCard = (api) => {
document.getElementById('card-item').innerHTML='';
    fetch(api)
        .then(response => response.json())
        .then(json => displayCard(json));
}

const displayCard = (Card) => {
    console.log(Card);
    Card.plants.forEach(card => {
        const allCard = document.getElementById("card-item");
        const div = document.createElement("div");
        div.setAttribute("class", "bg-white rounded-3xl flex flex-col justify-center p-3 gap-4 ")
        div.innerHTML = ` <img src="${card.image}" class="rounded-3xl h-50" alt="" />
                <h1  class="text-lg font-semibold Click-name">${card.name}</h1>
                <p class="text-gray-600">
                  ${card.description}
                </p>
                <div class="flex flex-row justify-between">
                  <button
                    class="bg-green-100 rounded-2xl text-lg font-semibold text-green-700 p-2"
                  >
                   ${card.category}
                  </button>
                  <h1 class="text-lg font-semibold">৳${card.price}</h1>
                </div>
                <button class="bg-green-700 rounded-full h-10 text-white">
                  Add to Cart
                </button>`;
        allCard.appendChild(div);
    });
    
    const treeNames = document.querySelectorAll(".Click-name");
treeNames.forEach((el, index) => {
    el.addEventListener("click", () => {
        const cardData = Card.plants[index]; // Get the correct plant object

        // Populate modal with dynamic content
        document.getElementById("modal-name").innerText = cardData.name;
        document.getElementById("modal-image").src = cardData.image;
        document.getElementById("modal-category").innerText = cardData.category;
        document.getElementById("modal-price").innerText = cardData.price;
        document.getElementById("modal-description").innerText = cardData.description;

        // Show the modal
        document.getElementById("tree-modal").classList.remove("hidden");
    });
});


}

LoadCard('https://openapi.programming-hero.com/api/plants');

