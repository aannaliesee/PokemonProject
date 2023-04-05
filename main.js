// Get the select element and the div element where the cart will be displayed
const pokemonList = document.getElementById('pokemonList');
const pokemonDetails = document.getElementById('pokemonDetails');
const cart = document.getElementById('cart');

fetch('https://pokeapi.co/api/v2/pokemon')
  .then(response => response.json())
  .then(data => {
    // Iterate over the list of Pokemon and create an option element for each one
    data.results.forEach(pokemon => {
      const option = document.createElement('option');
      option.value = pokemon.url.split('/')[6]; // Extract the ID from the URL
      option.text = pokemon.name;
      pokemonList.add(option);
    });
  })
  .catch(error => {
    console.error(error);
  });

// Load the selected Pokemon from local storage or create an empty array
let selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon')) || [];

// function to display a message in case of errors
function displayError(message) {
  pokemonDetails.innerHTML = '';
  const errorElement = document.createElement('div');
  errorElement.innerText = message;
  pokemonDetails.appendChild(errorElement);
}

// Add each Pokemon in the cart to the cart element
function displayCart() {
  cart.innerHTML = '';
  selectedPokemon.forEach((pokemon, index) => {
    const pokemonElement = document.createElement('div');
    pokemonElement.innerText = pokemon.name;

    // Create an image element for the Pokemon
    const pokemonImage = document.createElement('img');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(response => response.json())
      .then(data => {
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = pokemon.name;
      })
      .catch(error => {
        console.error(error);
        pokemonImage.alt = 'Pokemon sprite image not available';
      });

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => {
      selectedPokemon.splice(index, 1);
      localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
      displayCart(); // Update the cart display after removing the Pokemon
    });

    pokemonElement.appendChild(pokemonImage); // Add the image to the Pokemon element
    pokemonElement.appendChild(removeButton);
    cart.appendChild(pokemonElement);
  });
}

displayCart(); // Call the displayCart function on page load to show the current cart items

// Add an event listener to the select element
pokemonList.addEventListener('change', () => {
  // Get the selected Pokemon's ID and name
  const pokemonId = pokemonList.value;
  const pokemonName = pokemonList.options[pokemonList.selectedIndex].text;

  // Create a button element to add the selected Pokemon to the cart
  const addButton = document.createElement('button');
  addButton.innerText = 'Add to Cart';
  addButton.addEventListener('click', () => {
    // Check if the selected Pokemon is already in the cart
    const isAlreadyInCart = selectedPokemon.some(pokemon => pokemon.id === pokemonId);
    if (isAlreadyInCart) {
      alert('You can\'t add more than one of the same Pokemon to your team.');
    } else {
    // Add the selected Pokemon to the cart
    selectedPokemon.push({
      id: pokemonId,
      name: pokemonName
    });
    // Save the updated selected Pokemon array to local storage
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));
    displayCart(); // Update the cart display after adding the Pokemon
  }
});



  // Remove any existing buttons from the Pokemon details
  const existingButton = pokemonDetails.querySelector('button');
  if (existingButton) {
    existingButton.remove();
  }

  // Display the selected Pokemon's details
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(data => {
      pokemonDetails.innerHTML = `
        <h2>${pokemonName}</h2>
        <img src="${data.sprites.front_default}">
        <p><strong>Height:</strong> ${data.height} m</p>
        <p><strong>Weight:</strong> ${data.weight} kg</p>
      `;
      // Add the button to the Pokemon details
      pokemonDetails.appendChild(addButton);
      // Show the border
    pokemonDetails.classList.add('show');
    })
    .catch(error => console.error(error));
});