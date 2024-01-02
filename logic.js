const question = [
    {
        q : "People who work together",
        ans : [
            {a:"Worker ", corr : false},
            {a:"Superhuman ", corr : false},
            {a:"Colleagues ", corr : true},
            {a:"Expert ", corr : false},
        ]
    },
    {
        q : "One who goes on foot",
        ans : [
            {a:"Machination ", corr : false},
            {a:"Pedestrian  ", corr : true},
            {a:"Transmigration ", corr : false},
            {a:"Eccentric ", corr : false},
        ]
    },
    {
        q : "One who can speak two languages",
        ans : [
            {a:"Bilingual ", corr : true},
            {a:"Polylingual  ", corr : false},
            {a:"Polygamy ", corr : false},
            {a:"Oligarchy ", corr : false},
        ]
    },
    {
        q : "Word with the same meaning",
        ans : [
            {a:"Antonyms ", corr : false},
            {a:"Idioms ", corr : false},
            {a:"Noun  ", corr : false},
            {a:"Synonyms ", corr : true},
        ]
    },
    {
        q : "The person who works for free",
        ans : [
            {a:"Member ", corr : false},
            {a:"Volunteer ", corr : true},
            {a:"Organiser ", corr : false},
            {a:"Servant  ", corr : false},
        ]
    },
    
]

let que = document.querySelector(".questions h2");
let answer = document.querySelectorAll(".btn");
// console.log(answer);
let next = document.querySelector(".next-q");
let currQuesIdx = 0;
let score = 0;
let count = 0;


function startQuiz(){
    currQuesIdx = 0;
    score = 0;
    count = 0;
    next.disabled = true
    showQuestions();
}
function showQuestions(){
    next.disabled = true

    count++;
    // console.log(`cnt: ${count}`)
    let quesNo = currQuesIdx + 1;
    que.innerHTML = `${quesNo}. ${question[currQuesIdx].q}`;
    answer.forEach((ele,idx)=> {
        // console.log(ele)
        ele.innerHTML = question[currQuesIdx].ans[idx].a
        if(question[currQuesIdx].ans[idx].corr == true){
            ele.dataset.correct = "true";
        }
        else{
            ele.dataset.correct = "false";
        }
        ele.addEventListener("click",selectAns);
    });
    currQuesIdx++;
}

function selectAns(e){
    
    let selectedBtn = e.target;
    if(selectedBtn.dataset.correct == "true"){
        selectedBtn.classList.add("correct");
        score++;
        // console.log(`sc: ${score}`)
    }
    else if(selectedBtn.dataset.correct == "false"){
        selectedBtn.classList.add("incorrect");
    }
    answer.forEach(ele =>{
        if(ele.dataset.correct == "true"){
            ele.classList.add("correct");
        }
        ele.disabled = true;
    });
    if(count<question.length){ 
        next.disabled = false;
        next.addEventListener("click",resetState);
    }
    else{
        answer.forEach((ele,idx)=>{
            ele.style.display = "none"
            // ele.style.background = "white";
        });
        next.disabled = true;
        showResult();
    }
}

function resetState(){
    que.innerHTML = "";
    next.innerHTML = ""
    answer.forEach((ele,idx)=>{
        ele.style.display = "block"
        ele.innerHTML = ""
        ele.classList.remove("correct")
        ele.classList.remove("incorrect")
        ele.disabled = false;
        // ele.style.background = "white";
    });
    if(count<question.length){
        next.innerHTML = "Next"
        showQuestions();
    }
    else{
        next.innerHTML = "Next"
        startQuiz();
    }
}

function showResult(){
    que.innerHTML = `Your Score is ${score} out of ${question.length}`;
    next.innerHTML = "Play Again";
    next.disabled = false;
    next.addEventListener("click",resetState);
}

startQuiz();