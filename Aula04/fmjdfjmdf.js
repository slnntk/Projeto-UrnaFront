const button = document.getElementById('button-search');
const box = document.getElementById('numberTitulo')
const dataContainer = document.getElementById('data-container');
button.addEventListener('click', function() {
    const number = box.value;

    fetch(`http://localhost:8080/candidatos/id/${number}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const { nome, votos, partido } = data;

            dataContainer.innerHTML = `
              <h2>${nome}</h2>
              <p>Votos: ${votos}</p>
              <p>Partido: ${partido.name}</p>`;
        })
        .catch(error => {
            console.log(error);
        });
});
