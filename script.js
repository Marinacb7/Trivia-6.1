//Start Section
let name = document.querySelector("#name");
let start = document.querySelector("#start");
let startB = document.querySelector("#startB")

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//Question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//Correct and Next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

//Total de Pontos
let correct = 0;

//Valores das respostas
let UserAns = undefined;

//O que acontece quando o botão 'Avançar' é selecionado
start.addEventListener("click", () => {
  name.style.display = "none";
  start.style.display = "none";
  guide.style.display = "block";
});

//O que acontece quando o botão 'Sair' é selecionado
exit.addEventListener("click", () => {
  name.style.display = "block"
  start.style.display = "block";
  guide.style.display = "none";
});


//Criação do Timer

let countDown = () => {
  if (timer === 20) {
    clearInterval(interval);
    next_question.click();
  } else {
    timer++;
    time.innerText = timer;
  }
}

//setInterval(countDown,1000);

let loadData = () => {
  questionNo.innerText = index + 1 + ". ";
  questionText.innerText = MCQS[index].question;
  option1.innerText = MCQS[index].choice1;
  option2.innerText = MCQS[index].choice2;
  option3.innerText = MCQS[index].choice3;
  option4.innerText = MCQS[index].choice4;

  //    timer start
  timer = 0;
}

loadData();

//O que acontece quando o botão 'Continuar' é selecionado
continueBtn.addEventListener("click", () => {
  quiz.style.display = "block";
  guide.style.display = "none";

  interval = setInterval(countDown, 1000);
  loadData();

  //    Remover todas as classes ativas quando o botão 'Continuar' for selecionado

  choice_que.forEach(removeActive => {
    removeActive.classList.remove("active");
  })

  total_correct.innerHTML = `${correct = 0} de ${MCQS.length} Questões`;
});

choice_que.forEach((choices, choiceNo) => {
  choices.addEventListener("click", () => {
    choices.classList.add("active");
    //Checa resposta
    if (choiceNo === MCQS[index].answer) {
      correct++;
    } else {
      correct += 0;
    }
    //Parar Contagem
    clearInterval(interval);

    //Desabilitar as outras opções quando uma é escolhida
    for (i = 0; i <= 3; i++) {
      choice_que[i].classList.add("disabled");
    }
  })
});

////O que acontece quando o botão 'Próximo' é selecionado
next_question.addEventListener("click", () => {
  //    if index is less then MCQS.length
  if (index !== MCQS.length - 1) {
    index++;
    choice_que.forEach(removeActive => {
      removeActive.classList.remove("active");
    })

    //Questão
    loadData();

    //Resultado
    total_correct.style.display = "block";
    total_correct.innerHTML = `${correct} de ${MCQS.length} Questões`;
    clearInterval(interval);
    interval = setInterval(countDown, 1000);
  } else {
    index = 0;


    //Quando completo o Quiz mostrar resultado
    clearInterval(interval);
    quiz.style.display = "none";
    points.innerHTML = `Você acertou ${correct} de ${MCQS.length}`;
    result.style.display = "block";
  }
  for (i = 0; i <= 3; i++) {
    choice_que[i].classList.remove("disabled");
  }
})

//O que acontece quando o botão 'Sair' é selecionado
quit.addEventListener("click", () => {
  start.style.display = "block";
  result.style.display = "none";
  name.style.display = "block";
});

//O que acontece quando o botão 'Reiniciar' é selecionado
startAgain.addEventListener("click", () => {
  guide.style.display = "block";
  result.style.display = "none";
});
