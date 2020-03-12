
let url = 'https://gateway.marvel.com/v1/public/characters';
let apiKey = 'apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39';
let paramNameStartsWith = 'nameStartsWith=';
let paramLimitNumber = 'limit=' + 5;

window.onload = () => {
    let inputName = document.getElementById('chr-name');
    let datalistElement = document.getElementById('char-list');

    inputName.addEventListener('input', (event) => {
        let chrName = inputName.value;
        console.log('charName: ' + chrName.length);
        if (chrName.length > 0) {
            fetch(url+ '?' + paramNameStartsWith + chrName + '&' + paramLimitNumber + '&' + apiKey)
                .then( (response) => {
                    return response.json();
                })
                .then( (data) => {
                    let names = data.data.results;
                    let optionsList = '';
                    datalistElement.innerHTML = '';
                    for (let name of names) {
                        optionsList += '<option value="' + name.name + '">';
                        console.log(name.name);
                    }
                    console.log(optionsList);
                    datalistElement.innerHTML = optionsList;
                })
                .catch( (error) => {
                    console.log('Oh No:' + error);
                });
        }
    });
    
    /*fetch('https://gateway.marvel.com/v1/public/characters/1016823?apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39')
        .then( (response) => {
            return response.json();
        })
        .then( (data) => {
            console.log(data);
        })
        .catch( (error) => {
            console.log('Oh No:' + error);
        });*/
};