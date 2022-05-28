let btnName = ["Read", "Create", "Update", "Delete"];
const btnObj = {};
const states = {create:"create",
                read: "read",
                update:"update",
                delete:"delete"}
let currentState = states.read;
//===============MODAL===============
//===================================
const modalEl = new bootstrap.Modal(document.querySelector('#modal'), {});
const modalElTitle = document.querySelector('#modalTitle');
//=========MODAL Elements============
//===================================
const displayPetImage = document.querySelector("#displayPetImage");
const createUpdatePetForm = document.querySelector("#createUpdatePetForm");
const btnSubmitForm = document.querySelector("#btnSubmitForm");
btnSubmitForm.addEventListener("click", subimitForm);
const btnResetForm = document.querySelector("#btnResetForm");
btnResetForm.addEventListener("click", resetForm);
const closeModalTop = document.querySelector("#closeModalTop");
closeModalTop.addEventListener("click", closeForm);
const closeModalBottom = document.querySelector("#closeModalBottom");
closeModalBottom.addEventListener("click", closeForm);
let btnRudPet = document.querySelectorAll(".btnRudPet");
btnRudPet.forEach(btn=>btn.addEventListener("click", rudPet));
const spinner = document.querySelector(".spinner-border");
const showPetCard = document.querySelector("#showPetCard");

//=============================
//=============================
const petImgInput = document.querySelector("#petImgInput");
petImgInput.addEventListener("change", function (){
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        const petImage = reader.result;
        displayPetImage.style.backgroundImage = `url(${petImage})`;
    });
    reader.readAsDataURL(this.files[0]);
});

async function fetchShowData(id){
    const response = await fetch("/api/v1/vpets/test/"+id);
    const data = await response.json();
    spinner.style.display = "none";
    showPetCard.style.display="block";
    const petShowEl = document.querySelectorAll(".pet-show");
    petShowEl.forEach(el=>{
        const name = el.dataset.name;
        const display = el.dataset.display;
        if(name === "imgsrc"){
            el.src = data[name]
        }else{
            console.log(el.dataset.name);
            el.textContent = `${display}: ${name === "price" ?  data[name].toFixed(2) : data[name]}`;
        }
        
    });
}
//fetchShowData();

function handleNavBtnClick(evt){
    for(let i = 0; i < btnName.length; i++){
        btnObj[btnName[i].toLocaleLowerCase()].classList.remove("active");
    }
    evt.target.classList.add("active");
    if(evt.target.name === "create"){
        currentState = states.create;
        showForm(true);
        modalTitle.textContent = "Create vPet";
        modalEl.show();

    }else{
        console.log(evt.target.name);
        if(evt.target.name === "update"){
            currentState = states.update;
            modalTitle.textContent = "Update vPet";
        }else if(evt.target.name === "delete"){
            currentState = states.delete;
            modalTitle.textContent = "Delete vPet";
        }else if(evt.target.name === "show"){
            modalTitle.textContent = "Show vPet";
            currentState = states.read;
        }
        btnRudPet.forEach(btn=>btn.textContent = evt.target.name.toUpperCase());
    }
}
for(let i = 0; i < btnName.length; i++){
    btnObj[btnName[i].toLocaleLowerCase()] = document.querySelector("#btn"+btnName[i]);
    btnObj[btnName[i].toLocaleLowerCase()].addEventListener('click',handleNavBtnClick);
}

async function sendFormData(formData){
    console.log("sendFormData");
    const response = await fetch("/api/v1/vpets/json", {method:"POST", body:formData});
    const data = await response.json();
    if(!data.error){
        alert("Entry Completed Successfully!");
    }else{
        alert(data.error);
    }
}

function subimitForm(){
    const petName = document.querySelector("#petName");
    const petDes = document.querySelector("#petDes");
    const petPrice = document.querySelector("#petPrice");
    const petQty = document.querySelector("#petQty");
    const petImgInput = document.querySelector("#petImgInput").files[0];
    const formData = new FormData();
    formData.append("name", petName.value);
    formData.append("des", petDes.value);
    formData.append("price", petPrice.value);
    formData.append("qty", petQty.value);
    formData.append("imgsrc", petImgInput);
    sendFormData(formData);
}

function resetForm(){
    const petName = document.querySelector("#petName");
    const petDes = document.querySelector("#petDes");
    const petPrice = document.querySelector("#petPrice");
    const petQty = document.querySelector("#petQty");
    const petImgInput = document.querySelector("#petImgInput");
    const displayPetImage = document.querySelector("#displayPetImage");
    petName.value  = "";
    petDes.value = "";
    petPrice.value = "";
    petQty.value = "";
    petImgInput.files[0] = null;
    petImgInput.value = "";
    displayPetImage.style.backgroundImage = null;
}

function closeForm(){
    if(currentState === states.create){
        const evt = {};
        evt.target = btnObj.read;
        handleNavBtnClick(evt)
    }
}

function getPetData(id){
    spinner.style.display = "block";
    fetchShowData(id);
}

function showForm(value){
    let display = "none"
    if(value === true){
        display = "block"
    }
    showPetCard.style.display="none";
    createUpdatePetForm.style.display=display;
    btnResetForm.style.display=display;
    btnSubmitForm.style.display=display;
}

function rudPet(evt){
    
    switch(currentState){
        case states.read:
            showForm(false)
            getPetData(evt.target.dataset.id)
            break;
        case states.update:
            showForm(true)
            break;
        case states.delete:
            showForm(false)
            break;
        default:
            showForm(false)
            break;
    }
    modalEl.show();
}