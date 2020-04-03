window.onload = () => {
    let url = 'https://gateway.marvel.com/v1/public/characters';
    let apiKey = 'apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39';
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
            fetch(url + '?' + paramNameStartsWith + chrName + '&' + paramLimitNumber + '&' + apiKey)
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
console.log('Fetch Character by Id URL :' + url + '?' + paramName + charName + '&' + apiKey);
        fetch(url + '?' + paramName + charName + '&' + apiKey)
            .then( (response) =>{
                return response.json();
            })
            .then( (data) => {
                characterObject = data.data.results[0];
//console.log('characterObject: ' + characterObject);
console.log(data);
                updateDisplay(characterObject);
            })
            .catch( (error) => {
                console.log('Fetch Character by Id error:' + error);
            });
    }

    function updateDisplay(characterObject) {
        console.log('Updating Display...');
        showCharacterName(characterObject);
        showCharacterDescription(characterObject);
        showCharacterImage(characterObject);
        showRandomComicCovers(characterObject);
    }

    function showCharacterName(characterObject) {
        let characterName = characterObject.name;
        console.log('Updating Name...' + characterName);
        document.getElementById('char-name-title').innerText = characterName;
    }

    function showCharacterDescription(characterObject) {
        let characterDescription = characterObject.description;
        console.log('Updating Description...' + characterDescription);
        document.getElementById('char-description').innerText = characterDescription;
    }

    function showCharacterImage(characterObject) {
        let tempURL = characterObject.thumbnail.path + '.' + characterObject.thumbnail.extension;
        let imageURL = convertToHTTPS(tempURL);
        console.log('Updating Image...');
        document.getElementById('char-image').setAttribute('src', imageURL);
    }

    function showRandomComicCovers(characterObject) {
console.log('showRandomComicCovers() function');
        let comicCoversContainer = document.getElementById('char-comic-covers');
/////////////////////////////////////////////////////////////////
        comicCoversContainer.innerHTML += getRandomComicCover(characterObject);
    }

    function getRandomComicCover(characterObject) {
        let totalComics = characterObject.comics.available;
//console.log('Available Number of Comics: ' + totalComics);
        let randomNumber = getRandomInteger(1, totalComics) - 1; // -1 to change the number to the array index.
//console.log('Random Number: ' + randomNumber);
        let comicImage;    
        let comicLink = 'https://gateway.marvel.com:443/v1/public/characters/1009297/comics?limit=1&offset=' + randomNumber;
//console.log('Comic Link:' + comicLink);
        let tempComicURL = comicLink + '&' + apiKey;
        let comicURL = convertToHTTPS(tempComicURL);
//console.log('Comic URL:' + comicURL);
        fetch(comicURL)
            .then( (response) =>{
                return response.json();
            })
            .then( (data) => {
                let tempURL = data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension;
                let comicURL = convertToHTTPS(tempURL);
//console.log(data);
                comicImage = '<img class="comic-cover" src="' + comicURL + '" />';
console.log('comicImage: ' + comicImage);
                return comicImage;
            })
            .catch( (error) => {
                console.log('Fetch comic error:' + error);
            });
    }
    
    function convertToHTTPS(originalURL) {
        let newURL = originalURL;
        let isHTTPS =  originalURL.indexOf('https');
        if ( isHTTPS == -1 ) {
            newURL = originalURL.replace('http', 'https');
        }
        return newURL;
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
};