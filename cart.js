const pokemonForm = document.getElementById('pokemonForm');
const selectedPokemonList = document.getElementById('selectedPokemonList');

// Add an event listener to the form
pokemonForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the name and email input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Create an array to hold the selected Pokemon data
  const selectedPokemonData = [];

  // Loop through the selectedPokemon array and add each Pokemon's data to the selectedPokemonData array
  selectedPokemon.forEach((pokemon) => {
    selectedPokemonData.push({
      id: pokemon.id,
      name: pokemon.name,
    });
  });

  // Create a hidden input field to hold the selectedPokemonData array as a JSON string
  const selectedPokemonDataInput = document.createElement('input');
  selectedPokemonDataInput.type = 'hidden';
  selectedPokemonDataInput.name = 'selectedPokemonData';
  selectedPokemonDataInput.value = JSON.stringify(selectedPokemonData);
  pokemonForm.appendChild(selectedPokemonDataInput);

  // Submit the form
  pokemonForm.submit();
});

// Display the selected Pokemon in the form
function displaySelectedPokemon() {
  selectedPokemonList.innerHTML = '';
  selectedPokemon.forEach((pokemon) => {
    const pokemonElement = document.createElement('div');
    pokemonElement.innerText = pokemon.name;
    selectedPokemonList.appendChild(pokemonElement);
  });
}

displaySelectedPokemon(); // Call the function to display the selected Pokemon on page load


//form handling
// Get the form element
const form = document.querySelector('#pokemonForm');

// Handle the form submission event
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the form data
  const formData = new FormData(form);

  // Convert the form data to a plain object
  const plainFormData = Object.fromEntries(formData.entries());

  // Save the form data to local storage as a JSON string
  localStorage.setItem('formData', JSON.stringify(plainFormData));

  // Redirect to a thank you page or display a success message
  window.location.href = 'success.html';
});

