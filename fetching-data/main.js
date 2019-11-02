let submitButton = document.getElementById("submit-button");
let suggestionArea = document.getElementById("results");
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    let productQuery = document.getElementById("product").value.trim();
    let url = `https://serpapi.com/search?q=${productQuery}&tbm=shop&api_key=5680df1256b257af71c6601da987d01181bc5a80caa5eefd4fa51b5636e6e4c8`;
    async function getData(url) {
        const response = await fetch(url).catch(err => err);
        const myJson = await response.json();
        console.log(myJson.shopping_results);
        suggestionArea.innerHTML = "";
        for (suggestions in myJson.shopping_results) {
            let results = myJson.shopping_results[suggestions];
            let suggestionHTML = `<div class="suggestion-item">
            <img src="${results.thumbnail ? results.thumbnail : "eco_image.jpg" }" alt="${results.title}" width="37px" height="30px">
            <span>${results.title}</span>
            <span>${results.price}</span>
            <a title="${results.title}" href="${results.link}" target="_blank">Buy this</a>
          </div>`
            suggestionArea.insertAdjacentHTML('beforeend', suggestionHTML);
        }
    }
    getData(url);
    console.log(productQuery);
    console.log(url);
});