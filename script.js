window.onload = () => {
    fetch('http://gateway.marvel.com/v1/public/characters?apikey=b703ebcf36f7b7bdb42b10f2dd8f1b39')
        .then( (response) => {
            return response.json();
            console.log(response.json());
        })
        .then( (data) => {
            console.log(data);
        });
};