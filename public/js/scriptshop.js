const btnPets = document.querySelector("#btnPets");
const btnDash = document.querySelector("#btnDash");
btnPets.addEventListener('click',handleNavBtnClick);
btnDash.addEventListener('click',handleNavBtnClick);


//===============MODAL===============
//===================================
const modalEl = new bootstrap.Modal(document.querySelector('#modal'), {});
const modalElTitle = document.querySelector('#modalTitle');

const btnShowPet = document.querySelectorAll(".btnShowPet");
btnShowPet.forEach(btn=>btn.addEventListener("click", showPet));

const btnBuyPet = document.querySelectorAll(".btn-buy-pet");
btnBuyPet.forEach(btn=>btn.addEventListener("click", buyPet));

function buyPet(evt){
    console.log("buy pet");
    const id = evt.target.dataset.id;
    url = `/api/v1/vpets/shop/${id}`;
    window.open(url, "_self");
}
function handleNavBtnClick(evt){
    let url = ""
    if(evt.target.name === "shop"){
        url = "/api/v1/vpets/shop"
    }else if(evt.target.name === "dash"){
        url = "/api/v1/vpets/dashboard"
    }
    window.open(url, "_self");
}

async function fetchDataSingle(id){
    console.log(id);
    console.log("/api/v1/vpets/json/"+id);
    const response = await fetch("/api/v1/vpets/json/"+id);
    const data = await response.json();
    return data;
}

//Load data to show card
function loadShowData(data){
    const petShowEl = document.querySelectorAll(".pet-show");
    console.log(petShowEl);
    petShowEl.forEach(el=>{
        const name = el.dataset.name;
        const display = el.dataset.display;
        if(name === "imgsrc"){
            el.src = data[name]
        }else{
            el.textContent = `${display}: ${data[name]}`;
        }
    });
}

function showPet(evt){
    const id = evt.target.dataset.id;
    fetchDataSingle(id).then((result, reject)=>{
        if(reject){
            alert("Please try again later.");
        }else{
            loadShowData(result);
            modalEl.show();
        }
    });
}