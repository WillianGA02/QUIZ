let container1 = document.getElementById('container1')
let container2 = document.getElementById('container2')
let container3 = document.getElementById('container3')
let olElement = document.getElementById('olElement')
let pontuacao = document.getElementById('pontuacao')
let pontuacaoFinal = document.getElementById('pontuacaoFinal')
let perguntaText = document.getElementById('perguntaText')
let avancarPergunta = document.getElementById('avancarPergunta')
let buttonIniciar = document.getElementById('buttonIniciar')
let jogarNovamente = document.getElementById('jogarNovamente')


let contador = 0

let pontos = 0
let indice = undefined


const perguntas = [
    {
        pergunta: "Qual linguagem é executada diretamente no navegador?",
        alternativas: ["Python", "Java", "JavaScript", "C++"],
        correta: 2
    },
    {
        pergunta: "O que o CSS faz em um site?",
        alternativas: [
            "Cria a lógica do site",
            "Estrutura o conteúdo",
            "Estiliza a aparência",
            "Conecta com o banco de dados"
        ],
        correta: 2
    },
    {
        pergunta: "Qual tag HTML é usada para criar um link?",
        alternativas: ["<link>", "<a>", "<href>", "<url>"],
        correta: 1
    },
    {
        pergunta: "Qual comando é usado para declarar uma variável que pode mudar?",
        alternativas: ["const", "var", "let", "static"],
        correta: 2
    },
    {
        pergunta: "Qual evento JavaScript é disparado ao clicar em um elemento?",
        alternativas: ["hover", "submit", "click", "press"],
        correta: 2
    }
];

function iniciarQuiz() {

    container1.style.display = 'none'
    container2.style.display = 'flex'
    


    let perguntaAtual = perguntas[contador]

    let textP = document.createTextNode(perguntaAtual.pergunta)
    perguntaText.appendChild(textP)

    let Alternativas = perguntaAtual.alternativas.length

    for (let i = 0; i < Alternativas; i++) {
        let liElement = document.createElement('li')
        let liText = document.createTextNode(perguntaAtual.alternativas[i])
        liElement.appendChild(liText)
        liElement.dataset.indice = i

        liElement.addEventListener('click', selecionarResposta)

        olElement.appendChild(liElement)
    }


}

function selecionarResposta(event) {

    const liClicado = event.target


    indice = Number(event.target.dataset.indice)


    // Remove a seleção de todos os li
    const todasAlternativas = olElement.querySelectorAll('li')
    todasAlternativas.forEach(li => li.classList.remove('alternativa-selecionada'))

    // Adiciona a borda apenas no clicado
    liClicado.classList.add('alternativa-selecionada')

    

    
    
    console.log(indice)

}


function avancar() {

    if(indice === undefined){
        alert('Selecione uma alternativa')
        return
    }

    const correta = perguntas[contador].correta

    if(indice === correta){
        pontos++
        pontuacao.innerText = `${pontos}/5`
        pontuacaoFinal.innerText = `Você acertou ${pontos}/5 !`
    }


    if (contador < 4) {

        contador = contador + 1
        indice = undefined

        perguntaText.innerHTML = ''
        olElement.innerHTML = ''
        

        iniciarQuiz()
    } else {

        container2.style.display = 'none'
        container3.style.display = 'flex'
        
    }

}

function JogarDenovo(){
    container2.style.display = 'flex'
    container3.style.display = 'none'

    perguntaText.innerHTML = ''
    olElement.innerHTML = ''


    pontuacao.innerText = '0/5'

    contador = 0
    pontos = 0
    indice = undefined

    iniciarQuiz()
}



jogarNovamente.addEventListener('click', JogarDenovo)
avancarPergunta.addEventListener('click', avancar)
buttonIniciar.addEventListener('click', iniciarQuiz)