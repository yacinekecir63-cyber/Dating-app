const no = document.getElementById("no");
const yes = document.getElementById("yes");
let add = 1.5;
let cnt = 0;
let foodChoose = null;
let dateChoose  = null;
let timeChoose = null;
const foods = document.querySelectorAll(".foods");

no.addEventListener("click", ()=>{
    no.textContent = "Not Today !";
});

no.addEventListener("mouseover",()=>{
    cnt++;
    if(cnt == 7){
        yes.textContent = 'Are U blind ?';
    }
    add=add+0.2;
    yes.style.fontSize = `${add}rem`;

    no.style.position = 'absolute';

    let random = (Math.random()*85) + 5;
    no.style.top = `${random}%`;
    let random1 = (Math.random()*85)+5;
    no.style.left = `${random1}%`;
});

yes.addEventListener("click", ()=>{
    const song = document.getElementById("song");
    song.play();
    hide(asking);
    hide(container);
    show(foodTittle);
    const foodContainer = document.getElementById("foodContainer");
    setTimeout(()=>{
        foodContainer.style.display = 'grid';

    },400);
})

function hide(id){
    id.classList.add('fade-out');
    setTimeout(() => {
        id.style.display = 'none';
    }, 400); // match the transition duration
}

function show(id){
    setTimeout(()=>{
        id.style.display = 'block';
    }, 400);
    // force a reflow so the browser registers the display change before transitioning
    id.offsetHeight;
    id.classList.remove('fade-out');
}

foods.forEach(food =>{
    food.addEventListener("click",()=>{
        foodChoose = food.textContent;
        console.log(foodChoose);
        hide(foodTittle);
        hide(foodContainer);
        show(timeAsking);
        show(timeContainer);
        show(confirm);
    })
})

const date = document.getElementById("date");
const nowDate = new Date();
const today = nowDate.getFullYear() + "-" + String(nowDate.getMonth()+1).padStart(2 ,"0")+"-"+ String(nowDate.getDate()).padStart(2,"0");
date.min = today;

const confirm = document.getElementById("confirm");
confirm.addEventListener("click",()=>{
    const date1 = document.getElementById("date");
    const time = document.getElementById("time");
    timeChoose = time.value;
    dateChoose = date1.value;
    if(timeChoose && dateChoose){
        hide(timeAsking);
        hide(timeContainer);
        hide(confirm);
        const lasth1 = document.getElementById("lasth1");
        lasth1.textContent = `So ${foodChoose}, ` + getFormattedDate(dateChoose) + ` at ${timeChoose}`;
        show(lasth1);
        show(seeyou);
        show(loveImg);
    }
})

function getFormattedDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const monthName = dateObj.toLocaleDateString("en", { month: "long" });
    return `${day} ${monthName} ${year}`;
}