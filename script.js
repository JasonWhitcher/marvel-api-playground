
let url = 'https://gateway.marvel.com/v1/public/characters';
let apiKey = 'apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39';
let paramNameStartsWith = 'nameStartsWith=';
let paramLimitNumber = 'limit=' + 5;

window.onload = () => {
    let inputName = document.getElementById('chr-name');
    
    inputName.addEventListener('input', (event) => {
        let chrName = inputName.value;
        console.log(chrName);
        fetch(url+ '?' + paramNameStartsWith + chrName + '&' + paramLimitNumber + '&' + apiKey)
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
                console.log(data);
            })
            .catch( (error) => {
                console.log('Oh No:' + error);
            });
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