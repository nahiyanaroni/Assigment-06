const cart = [];

const LoadCatagori = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(response => response.json())
        .then(json => displayTrees(json));
}

const emtyClick = (id) => {
    LoadCard(`https://openapi.programming-hero.com/api/category/${id}`);
}

const displayTrees = (Trees) => {
    const allCetagori = document.getElementById("catagori-button");
    allCetagori.innerHTML = ''; // clear previous categories
    Trees.categories.forEach(tree => {
        const div = document.createElement("div");
        div.setAttribute("class", "w-full");
        div.innerHTML = `<button onclick="emtyClick('${tree.id}')" class="hover:bg-green-700 w-full rounded-md text-left">
                 ${tree.category_name}
                </button>`;
        allCetagori.appendChild(div);
    });
}

LoadCatagori();

const LoadCard = (api) => {
    document.getElementById('card-item').innerHTML = '';
    fetch(api)
        .then(response => response.json())
        .then(json => displayCard(json));
}

const displayCard = (Card) => {
    const allCard = document.getElementById("card-item");
    allCard.innerHTML = ''; // clear previous cards

    Card.plants.forEach((card, index) => {
        const div = document.createElement("div");
        div.setAttribute("class", "bg-white rounded-3xl flex flex-col justify-center p-3 gap-4 ");
        div.innerHTML = `
            <img src="${card.image}" class="rounded-3xl h-50" alt="" />
            <h1 class="text-lg font-semibold Click-name">${card.name}</h1>
            <p class="text-gray-600">${card.description}</p>
            <div class="flex flex-row justify-between">
                <button class="bg-green-100 rounded-2xl text-lg font-semibold text-green-700 p-2">${card.category}</button>
                <h1 class="text-lg font-semibold">৳${card.price}</h1>
            </div>
            <button class="bg-green-700 rounded-full h-10 text-white add-to-cart-btn" data-index="${index}">
                Add to Cart
            </button>`;

        allCard.appendChild(div);
    });

    // Modal click handler (same as before)
    const treeNames = document.querySelectorAll(".Click-name");
    treeNames.forEach((el, index) => {
        el.addEventListener("click", () => {
            const cardData = Card.plants[index];

            document.getElementById("modal-name").innerText = cardData.name;
            document.getElementById("modal-image").src = cardData.image;
            document.getElementById("modal-category").innerText = cardData.category;
            document.getElementById("modal-price").innerText = cardData.price;
            document.getElementById("modal-description").innerText = cardData.description;

            document.getElementById("tree-modal").classList.remove("hidden");
        });
    });

    // Add to Cart button handlers
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute('data-index');
            const selectedItem = Card.plants[index];
            addToCart(selectedItem);
        });
    });
}

function addToCart(item) {
    // Check if item already in cart
    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('YourCard');
    cartContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('flex', 'justify-between', 'items-center', 'border-b', 'border-green-300', 'pb-2');

        itemDiv.innerHTML = `
            <div class="p-3 flex flex-col">
                <h1 class="font-semibold">${item.name}</h1>
                <p>৳${item.price} x ${item.quantity} </p>
            </div>
            <button class="remove-item text-red-600 p-2 font-bold" data-index="${index}">&times;</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    // Total price display
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('mt-4', 'p-3', 'font-bold', 'text-lg', 'text-green-800');
    totalDiv.innerText = `Total: ৳${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);

    // Add event listeners to remove buttons
    const removeButtons = cartContainer.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const idx = button.getAttribute('data-index');
            cart.splice(idx, 1);
            renderCart();
        });
    });
}

LoadCard('https://openapi.programming-hero.com/api/plants');
