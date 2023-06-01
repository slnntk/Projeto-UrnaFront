const button = document.getElementById('button-search');
const box = document.getElementById('numberTitulo')
const dataContainer = document.getElementById('data-container');
button.addEventListener('click', function() {
    const number = box.value;

    fetch(`http://localhost:8080/eleitores/titulo/${number}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const { titulo, hasVoted } = data;

            dataContainer.innerHTML = `    
              <p>Titulo: ${titulo}</p>
              <p>Voto: ${hasVoted}</p>
             `;
        })
        .catch(error => {
            console.log(error);
        });
});

