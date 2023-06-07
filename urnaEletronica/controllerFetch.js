const buttonEleitor = document.getElementById('button-search-voter');
const buttonCandidate = document.getElementById('button-search-candidate');
const buttonVote = document.getElementById('button-vote');

const box = document.getElementById('numberTitulo');
const boxCandidate = document.getElementById('numberOfCandidato');

const VOTER_ALREADY_VOTED_ALERT = "Esse eleitor já votou!";

searchEleitorButton();

function showAlert(message) {
    const alertContainer = document.getElementById('alert-container');
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert');
    alertElement.innerHTML = `${message}<span class="alert-close">&times;</span>`;
    alertContainer.appendChild(alertElement);

    const closeButton = alertElement.querySelector('.alert-close');
    closeButton.addEventListener('click', function() {
        alertContainer.removeChild(alertElement);
    });
}

function toggleScreens() {
    const eleitorPage = document.getElementById('eleitor-page');
    const candidatePage = document.getElementById('candidate-page');

    eleitorPage.style.display = 'none';
    candidatePage.style.display = 'block';
}


function searchEleitorButton(){
    buttonEleitor.addEventListener('click', function (){
        const numberEleitor = box.value;
        consultaEleitor(numberEleitor);
    })
}

function searchCandidateButton(){
    buttonCandidate.addEventListener('click', function (){
        const numberCandidate = boxCandidate.value;
        console.log(numberCandidate);
        consultaCandidate(numberCandidate);
    })
}

function voteButton(){
    buttonVote.addEventListener('click', function (){
        if (document.getElementById('voter-hasVoted').textContent === true){
            showAlert(VOTER_ALREADY_VOTED_ALERT);
        }
        else{
            vote();
        }
    })
}

async function vote() {
    try {
        const numberOfTituloValue = parseInt(document.getElementById('voter-title').textContent);
        const numberCandidateValue = parseInt(document.getElementById('candidate-number').textContent);

        const retorno = await fetch(`http://localhost:8080/urna/number/${numberCandidateValue}/titulo/${numberOfTituloValue}`, {
            method: 'PUT',
            mode: 'cors'
        });

        if (retorno.ok) {
            const eleitorPage = document.getElementById('eleitor-page');
            const candidatePage = document.getElementById('candidate-page');
            const confirmPage = document.getElementById('confirmation-screen')

            eleitorPage.style.display = 'none';
            candidatePage.style.display = 'none';
            confirmPage.style.display = 'flex';
        }
    } catch (error) {
        showAlert(error.message);
    }
}



async function consultaEleitor(numberOfTitulo){
    try {
        const retorno = await fetch(`http://localhost:8080/eleitores/titulo/${numberOfTitulo}`);
        if (retorno.status === 404) {
            throw new Error('Eleitor não encontrado');
        }

        const voter = await retorno.json();
        const titulo = voter.titulo;
        const hasVoted = voter.hasVoted;
        document.getElementById('voter-title').textContent = titulo;
        document.getElementById('voter-hasVoted').textContent = hasVoted;

        if (hasVoted === true){
            showAlert(VOTER_ALREADY_VOTED_ALERT);
        }
        else {
            toggleScreens();
            showAlert(`Eleitor ${titulo} pronto para votar, procure seu candidato pelo numero ! e vote !`)
            searchCandidateButton();
        }
    } catch (error) {
        showAlert(error.message);
    }
}
async function consultaCandidate(numberOfCandidato){
    try {
        const retorno = await fetch(`http://localhost:8080/candidatos/number/${numberOfCandidato}`);
        if (retorno.status === 404) {
            throw new Error('Candidato não encontrado');
        }

        const voter = await retorno.json();
        const candidatoNumero = voter.number;
        const candidatoNome = voter.nome;
        const partidoNome = voter.partido.name;

        document.getElementById('candidate-name').textContent = candidatoNome;
        document.getElementById('candidate-number').textContent = candidatoNumero;
        document.getElementById('candidate-partido').textContent = partidoNome;

        if (retorno.status === 200){
            voteButton();
        }

    } catch (error) {
        showAlert(error.message);
    }
}


