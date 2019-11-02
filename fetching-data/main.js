let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    let productQuery = document.getElementById("product").value.trim();
    let url = `https://serpapi.com/search?q=${productQuery}&tbm=shop&api_key=5680df1256b257af71c6601da987d01181bc5a80caa5eefd4fa51b5636e6e4c8`;

    fetch(url)
        .then(res =>
            res.json()
        )
        .then(data => {
            console.log(data.shopping_results);
        })
        .catch(err => console.log(err));

    console.log(productQuery);
    console.log(url);
});