window.onload = () => {
    class ComicCharacter {
        constructor(characterObject) {
            this._id = characterObject.id;
            this._name = characterObject.name;
            this._description = characterObject.description;
            this._characterImage = convertToHTTPS(characterObject.thumbnail.path + '.' + characterObject.thumbnail.extension); // url?
            this._comicCovers = this.getRandomComicCovers(characterObject); // Array of arrays of comic information(title, description, image).
            
        }
        
        /*
        @param  characterObject {object}
        @return comicCovers     {array}     Array of objects. Objects contain comic cover: title, description, url.
        */
        getRandomComicCovers(characterObject) {
            let totalComics = characterObject.comics.available;
console.log('availabel comics:' + totalComics);
            let randomNumber = undefined;
            let comicLink = undefined;
            let comicURL = undefined;
            let comics = new Array;
            
            for (let count = 0; count < 3; count++) {
                let randomNumber = getRandomInteger(1, totalComics) - 1; // -1 to change the number to the array index.
console.log('char ID:' + this._id);
                let comicLink = GATEWAY_URL + '/' + this._id + '/comics?limit=1&offset=' + randomNumber + '&' + API_KEY;
                let comicURL = convertToHTTPS(comicLink);
console.log('comicURL:' + comicURL);
                await fetch(comicURL)
                    .then( (response) =>{
                        return response.json();
                    })
                    .then( (data) => {
                        comicURL = convertToHTTPS(data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension);
                        comicTitle = data.data.results[0].title;
                        comicTitle = comicTitle != null ? comicTitle : 'No title available';
                        comicDescription = data.data.results[0].description;
                        comicDescription = comicDescription != null ? comicDescription : 'No description available';
                        comics[count] = {
                            title: comicTitle,
                            description: comicDescription,
                            url: comicURL
                        };
                })
                .catch( (error) => {
                    console.log('Fetch comic error:' + error);
                });
            }
            return comics;
        }
    }
    
    const GATEWAY_URL = 'https://gateway.marvel.com/v1/public/characters';
    const API_KEY = 'apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39';
    let paramNameStartsWith = 'nameStartsWith=';
    let paramName = 'name=';
    let paramLimitNumber = 'limit=' + 5;
    
    let inputName = document.getElementById('char-name');
    let datalistElement = document.getElementById('char-list');
    let inputSubmit = document.getElementById('char-submit');

    let characterObject;

    inputName.addEventListener('input', (event) => {
        showSearchSuggestions();
    });

    inputSubmit.addEventListener('click', (event) => {
        showSearchResults();
    });

    // NEED TO TEST A FETCH ERROR HERE.
    function showSearchSuggestions() {
        let chrName = inputName.value;
        if (chrName.length > 0) { // Make sure the input field is not empty.
            fetch(GATEWAY_URL + '?' + paramNameStartsWith + chrName + '&' + paramLimitNumber + '&' + API_KEY)
                .then( (response) => {
                    return response.json();
                })
                .then( (data) => {
                    let names = data.data.results;
                    let optionsList = '';
                    datalistElement.innerHTML = '';
                    for (let name of names) {
                        optionsList += '<option value="' + name.name + '">';
                    }
                    datalistElement.innerHTML = optionsList;
                })
                .catch( (error) => {
                    let errorMessage = document.getElementById('error-message');
                    console.log('Fetch search error:' + error);
                    errorMessage.innerText = 'There was an error connecting to the character data. Please try again later.';
                });
        }
    }

    function showSearchResults() {
        let charName = inputName.value;
//console.log('Fetch Character by Id URL :' + GATEWAY_URL + '?' + paramName + charName + '&' + API_KEY);
        fetch(GATEWAY_URL + '?' + paramName + charName + '&' + API_KEY)
            .then( (response) =>{
                return response.json();
            })
            .then( (data) => {
                characterObject = data.data.results[0];
                character = new ComicCharacter(characterObject);
console.log('characterClass:');
console.log(character);
//console.log('character data:');
//console.log(data);
                /*for (property in character) {
                    console.log(`${property}: ${character[property]}`);
                }*/
                //updateDisplay(characterObject);
            })
            .catch( (error) => {
                console.log('Fetch Character by Id error:' + error);
            });
    }

    
    
    function convertToHTTPS(originalURL) {
        let newURL = originalURL;
        let isHTTPS = originalURL.indexOf('https');
        if ( isHTTPS == -1 ) {
            newURL = originalURL.replace('http', 'https');
        }
        return newURL;
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
};