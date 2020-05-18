'use strict';

window.onload = () => {
    class ComicCharacter {
        constructor(characterObjectFromMarvel) {
            this.id = characterObjectFromMarvel.id;
            this.name = characterObjectFromMarvel.name;
            this.description = characterObjectFromMarvel.description;
            this.characterImage = convertToHTTPS(characterObjectFromMarvel.thumbnail.path + '.' + characterObjectFromMarvel.thumbnail.extension); // url?
            this.comicCovers = [];
            this.comicCovers = this.getRandomComicCovers(characterObjectFromMarvel); // Array of arrays of comic information(title, description, image).
        }
        
        /*
        @param  characterObjectFromMarvel {object}
        @return comicCovers     {array}     Array of objects. Objects contain comic cover: title, description, url.
        */
        getRandomComicCovers(characterObjectFromMarvel) {
console.log('Start: getRandomComicCovers()');
            let totalComics = characterObjectFromMarvel.comics.available;
            let comicData;
            let randomNumber;
            let comicURL;
            let comics = [];
            
            for (let count = 0; count < 3; count++) {
console.log('Comic Image: ' + count);
                randomNumber = getRandomInteger(1, totalComics) - 1; // -1 to change the number to the array index.
                comicURL = convertToHTTPS(`${GATEWAY_URL}/${this.id}/comics?limit=1&offset=${randomNumber}&${API_KEY}`);
                fetch(comicURL)
                    .then( (response) =>{
                        return response.json();
                    })
                    .then( (data) => {
                        comicData = data.data.results[0];
                        comics[count] = {
                            title:       comicData.title != null ? comicData.title : 'No title available',
                            description: comicData.description != null ? comicData.description : 'No description available',
                            url:         convertToHTTPS(comicData.thumbnail.path + '.' + comicData.thumbnail.extension)
                        };
console.log('comics:');
console.log(comics);
                        return comics;
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
    let paramLimitNumber = 'limit=' + 5;
    
    let inputName = document.getElementById('character-name');
    let datalistElement = document.getElementById('character-list');
    let inputSubmit = document.getElementById('character-submit');

    let characterObjectFromMarvel; // Object recieved from Marvel API.
    let characterObject; // Custom object created for this app.

    inputName.addEventListener('input', (event) => {
        showSearchSuggestions();
    });

    inputSubmit.addEventListener('click', (event) => {
        characterObject = getCharacter();
        displayCharacter(characterObject);
    });

    // NEED TO TEST A FETCH ERROR HERE.
    function showSearchSuggestions() {
        let characterName = inputName.value;
        if (characterName.length > 0) { // Make sure the input field is not empty.
            fetch(`${GATEWAY_URL}?nameStartsWith=${characterName}&${paramLimitNumber}&${API_KEY}`)
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

    function getCharacter() {
        let characterName = inputName.value;
console.log('Input name: ' + characterName);
        let characterURL = `${GATEWAY_URL}?name=${characterName}&${API_KEY}`;
        fetch(characterURL)
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
console.log('character Object 01:');
console.log(data);
                characterObjectFromMarvel = data.data.results[0];
console.log('character Object 02:');
console.log(characterObjectFromMarvel);
                characterObject = new ComicCharacter(characterObjectFromMarvel);
console.log('character Object 03:');
console.log(characterObject);
                return characterObject;
            })
            .catch( (error) => {
                console.log('Fetch Character by Id error:' + error);
            });
console.log('character Object 04:');
console.log(characterObject);
        return characterObject;
    }

    function displayCharacter(characterObject) {
        let characterNameContainer = document.getElementById('character-name-title');
        let characterDescriptionContainer = document.getElementById('character-description');
        let chatacterImageTag = document.getElementById('character-image');

        characterNameContainer.innerText = characterObject.name;
        characterDescriptionContainer.innerText = characterObject.description;
        chatacterImageTag.src = characterObject.characterImage;
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