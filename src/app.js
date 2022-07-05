import axios from 'axios';

// api functie script

async function fetchingredientData(name) {

    try {
        const result = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=6f7619e16bca4d2d93898aa3d432b4dc&query=${name}`)
        console.log(result.data.results);
        console.log(result.data.results[0].id);
        console.log(result.data.results[0].name);
        console.log(result.data.results[0].image);

        const product = {
            name: result.data.results[0].name,
            id: result.data.results[0].id,
            image: result.data.results[0].image,
        }

        addItem(product)

    }
    catch (error) {
        console.error(error)
    }
}

// hieronder zoek ik door de api naar zijn ingredient

const searchForm = document.getElementById('search-form')

searchForm.addEventListener('submit', searchingIngredient)

function searchingIngredient(e) {
    e.preventDefault()

    const inputField = document.getElementById('search-ingredient')

    fetchingredientData(inputField.value)

}

// hieronder display ik het met de optie dat je de title kan doorstrepen, en met addItem, wordt het in de lijst bijgevoerd

function addItem(product) {

    const emptyInputField = document.getElementById('search-ingredient')

    emptyInputField.value = " ";

    const resultContainer = `
    <img src="https://spoonacular.com/cdn/ingredients_100x100/${product.image}"/>
    <h3>${product.name}</h3>
    `

    const h2 = document.createElement("h5");
    h2.innerHTML = resultContainer;

    h2.addEventListener("click", function () {
        h2.style.textDecoration = "line-through";

    })

    items.insertAdjacentElement("beforeend", h2);

    inputGroceries.value = " ";
}

// hieronder is het delete prullenbak optie 

const items = document.getElementById("inputResults");
// Hier is het resultaat
const deleteList = document.getElementById("reset-list");
// Hier reset je de lijst
deleteList.addEventListener("click", function () {
    items.innerHTML = "";
})

// hieronder is de input image optie 

const image_input = document.getElementById("image_input")
const uploaded_image = "";

image_input.addEventListener("change", function () {
    // console.log(image_input.value);
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("display_image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.file[0]);
    console.log(reader)
})



