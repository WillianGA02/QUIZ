// Todas as Variaveis usadas, do HTML

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

// Variaveis criadas aqui no JS
let contador = 0
let pontos = 0
let indice = undefined

//Uma array com objetos dentro, contendo perguntas alternativas e a resposta correta de cada
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


//Funçaõ para iniciar o quiz apartir do clique do botão iniciar do "container1", mas não nescessariamente ele e executado pelo botão.
function iniciarQuiz() {


    //Aqui para aparecer um container e sumir o outro, pois por base apenas "container1" está habilitado
    container1.style.display = 'none'
    container2.style.display = 'flex'
    

    //variavel para pegar cada pergunta, pois com base o nosso contador está sempre no 0, no caso começa na primeira pergunta
    let perguntaAtual = perguntas[contador]

    //Aqui pegamos a pergunta de cada alternativa, com base na variavel "contador"
    let textP = document.createTextNode(perguntaAtual.pergunta)
    perguntaText.appendChild(textP)


    //Aqui nos sabemos quantas alternativas tem em cada pergunta
    let Alternativas = perguntaAtual.alternativas.length

    //Aqui vem a magaica para botar as alternativas na tela
    //Enquanto i (i=0) for menor do que alternativas (alternativas = 4) eu vou adicionar i++, então ele vai rodar o loop ate satisfazer a condição!
    for (let i = 0; i < Alternativas; i++) {

        //Aqui nos criamos um li || Aqui no caso apenas criamos a li, então vai criar e poder criar outro ja de novo 
        let liElement = document.createElement('li')

        //Aqui nos associamos cada alternativa com base no "i" que começa em 0, 1 ,2 ,3
        let liText = document.createTextNode(perguntaAtual.alternativas[i])

        //Aqui associamos ao liElement cada texto pegado das alternativas
        liElement.appendChild(liText)

        //Aqui vamos dar um indice invisivel para cada li criado, com base no "i"
        liElement.dataset.indice = i

        //Aqui associamos o "li" para dentro do "ol" para ficar dentro da tela já.
        olElement.appendChild(liElement)

        //Ação de clique para cada "li", então vai executar a função definida
        liElement.addEventListener('click', selecionarResposta)
    }


}


//Essa e a função de alguem que clicou em alguma "li" Criada anteriormente
//O evenet é um objeto com varias informações sobre o evento que aconteceu, ele não retorna um valor, ele retorna dados!
function selecionarResposta(event) {
    //Para saber qual elemento foi clicado usamos o "target" que com base nas informações do "event" podemos usar o "target" para saber qual "li" foi clicado
    const liClicado = event.target

    console.log(event)
    //Aqui nos pegamos o "indice" que criamos lá na hora de criarmos os "li" no loop, e convertemos em "Number" pois ele sempre retorna uma "string"
    //"dataset" e uma propriedade do HTML para não precisarmos usar o id ou class, uma propriedade mais interna
    indice = Number(event.target.dataset.indice)


    // Remove a seleção de todos os li
    // Aqui pegamos todas as alternativas ("li") que estão no "ol" nesse momento
    const todasAlternativas = olElement.querySelectorAll('li')

    // Pegando todas essas alternativas usamos o ForEach, que ele passa por todos os itens, executa uma ação para cada um, mas mantem a mesma array, não cria uma nova array como o map
    // ClassList remove todas as class ('alternativa-selecionada') que tem em cada li 
    todasAlternativas.forEach(li => li.classList.remove('alternativa-selecionada'))
    
    // Adiciona a borda apenas no clicado
    // ClassList adiciona a class ('alternativa-selecionada') somente para a "liClicada"
    liClicado.classList.add('alternativa-selecionada')
}


// Função para ser ativada quando for clicado o botão avançar de para pssar por cada questão
function avancar() {
    //Sé o indice for igual a undefined, quer dizer que a pessoa não clicou em nenhuma alternativa, então temos que dar um alerta para a pessoa, falando que ela não pode avançar pois não selecionou nada, é da um return para não executar mais nada abaixo.
    if(indice === undefined){
        alert('Selecione uma alternativa')
        return
    }

    //Aqui nos pegamos cada alternativa correta de cada questão
    const correta = perguntas[contador].correta

    // Sé indice for igual a correta, nos vamos adicionar a pontos mais 1, para a pontuação da pessoa aumentar a cada acerto dela
    if(indice === correta){
        pontos++
        pontuacao.innerText = `${pontos}/5`
        pontuacaoFinal.innerText = `Você acertou ${pontos}/5 !`
    }

    // Se o contador for menor que 4
    if (contador < 4) {
        // Adiciona mais um ao contador apos o clique em avançar
        contador = contador + 1

        //Definimos o indice novamente a undefined pois nos ja estamos em uma nova pergunta
        indice = undefined

        //Para não ficar varias coisas na tela apagmos tudo dentro de pergunta e ol
        perguntaText.innerHTML = ''
        olElement.innerHTML = ''
        
        //E iniciamos o quiz, pois o contador está com uma nova numeração, então muda tudo dentro do iniciarQuiz()
        iniciarQuiz()

    //Aqui caso o contador não seje mais menor que 4, então quer dizer que nos ja passamos por todas as perguntas do Quiz, então ja chegamos no final
    } else {
        //Então escondemos a tela do quiz, e mostramos a tela final que é o "container3"
        container2.style.display = 'none'
        container3.style.display = 'flex'
        
    }

}

//Função para jogar novamente, que é executada quando clicarmos no botão jogar de novo
function JogarDenovo(){
    //Dai como o botão foi clicado temos que mostrar a tela do quiz ('container2') novamente e desligar a da tela final('container3')
    container2.style.display = 'flex'
    container3.style.display = 'none'

    //Como estamos começando de novo temos que apagar tudo que tem dentro de cada variavel que guardou algo anteriormente
    perguntaText.innerHTML = ''
    olElement.innerHTML = ''


    pontuacao.innerText = '0/5'
    pontuacaoFinal.innerText = `Você acertou 0/5 !`

    contador = 0
    pontos = 0
    indice = undefined

    //E iniciar a função do Quiz novamente
    iniciarQuiz()
}


//Aqui estão os botões de cada função a ser executada
jogarNovamente.addEventListener('click', JogarDenovo)
avancarPergunta.addEventListener('click', avancar)
buttonIniciar.addEventListener('click', iniciarQuiz)


