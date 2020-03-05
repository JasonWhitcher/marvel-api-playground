window.onload = () => {
    fetch('https://gateway.marvel.com/v1/public/characters/1066?apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39')
        .then( (response) => {
            return response.json();
        })
        .then( (data) => {
            console.log(data);
        })
        .catch( (error) => {
            console.log('Oh No:' + error);
        });
};