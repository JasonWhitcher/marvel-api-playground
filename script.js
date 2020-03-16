window.onload = () => {
    let url = 'https://gateway.marvel.com/v1/public/characters';
    let apiKey = 'apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39';
    let paramNameStartsWith = 'nameStartsWith=';
    let paramName = 'name=';
    let paramLimitNumber = 'limit=' + 5;
    
    let inputName = document.getElementById('char-name');
    let datalistElement = document.getElementById('char-list');
    let inputSubmit = document.getElementById('char-submit');

    inputName.addEventListener('input', (event) => {
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
                    console.log('Fetch search error:' + error);
                });
        }
    });

    inputSubmit.addEventListener('click', (event) => {
        let charName = inputName.value;
        fetch(url + '?' + paramName + charName + '&' + apiKey)
            .then( (response) =>{
                return response.json();
            })
            .then( (data) => {
console.log(data);
                let charObject = data.data.results[0];
console.log('id: ' + charObject.id);
            })
            .catch( (error) => {
                console.log('Fetch by Id error:' + error);
            });
    });


    function updateDisplay(characterObject) {
        //let characterObject = characterObject;
        console.log('Character ID: ' + getCharacterID(characterObject));
    }

    function getCharacterID(characterObject) {
        let characterID = characterObject.data.results.id;
        return characterID;
    }

    function getCharacterImage(characterObject) {
        let imageURL = characterObject.data.results.thumbnail.path + characterObject.data.results.thumbnail.extension;
    }

    function getCharacterDescription(characterObject) {
        let characterDescription = characterObject.data.results.description;
    }

    function getFirstComicCover(characterObject) {
        
    }
    
    
};