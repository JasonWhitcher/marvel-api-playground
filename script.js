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
        fetch(url + '?' + paramName + charName + '&' + apiKey)
            .then( (response) =>{
                return response.json();
            })
            .then( (data) => {
                characterObject = data.data.results[0];
console.log('characterObject: ' + characterObject);
                updateDisplay(characterObject);
            })
            .catch( (error) => {
                console.log('Fetch by Id error:' + error);
            });
    }

    function updateDisplay(characterObject) {
        console.log('Updating Display...');
        showCharacterName(characterObject);
        showCharacterDescription(characterObject);
        showCharacterImage(characterObject);
    }

    function showCharacterName(characterObject) {
        let characterName = characterObject.name;
        document.getElementById('char-name').innerText = characterName;
    }

    function showCharacterImage(characterObject) {
        let imageURL = characterObject.thumbnail.path + '.' + characterObject.thumbnail.extension;
        document.getElementById('char-image').setAttribute('src', imageURL);
    }

    function showCharacterDescription(characterObject) {
        let characterDescription = characterObject.description;
        document.getElementById('char-description').innerText = characterDescription;
    }

    function getFirstComicCover(characterObject) {
        
    }
    
    
};