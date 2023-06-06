const button = document.getElementById('button-search');
const box = document.getElementById('numberTitulo');
const dataContainer = document.getElementById('data-container');

const tabEleitor = document.getElementById('tab-eleitor');
const tabVote = document.getElementById('tab-vote');

const VOTER_NOT_EXIST_ALERT = "THIS VOTER DOES NOT EXIST";
const VOTER_ALREADY_VOTED_ALERT = "THAT VOTER HAS ALREADY VOTED";

function showAlert(message) {
    alert(message);
}

button.addEventListener('click', function() {
    const number = box.value;

    fetch(`http://localhost:8080/eleitores/titulo/${number}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const { titulo, hasVoted } = data;
            
            if (hasVoted === true) {
                showAlert(VOTER_ALREADY_VOTED_ALERT);
            } else if (titulo === undefined && hasVoted === undefined) {
                showAlert(VOTER_NOT_EXIST_ALERT);
            } else {
                dataContainer.innerHTML = `    
                    <p>Titulo: ${titulo}</p>
                    <p>Voto: ${hasVoted}</p>
                `;
                showTab(tabVote); // Mostrar aba de Votação
                hideTab(tabEleitor); // Ocultar aba de Eleitor
            }
        })
        .catch(error => {
            console.log(error);
        });
});

function showTab(tab) {
    tab.classList.add('active');
}

function hideTab(tab) {
    tab.classList.remove('active');
}
