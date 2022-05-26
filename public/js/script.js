let btnName = ["Read", "Create", "Update", "Delete"];
const btnObj = {};
const modalEl = new bootstrap.Modal(document.querySelector('#staticBackdrop'), {});
const displayPetImage = document.querySelector("#displayPetImage");
const btnCreateNewPet = document.querySelector("#btnCreateNewPet");
btnCreateNewPet.addEventListener("click", createNewPet);

const btnResetFrom = document.querySelector("#btnResetFrom");
btnResetFrom.addEventListener("click", resetPetForm);

const petImgInput = document.querySelector("#petImgInput");
petImgInput.addEventListener("change", function (){
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        const petImage = reader.result;
        displayPetImage.style.backgroundImage = `url(${petImage})`;
    });
    reader.readAsDataURL(this.files[0]);
});

async function fetchShowData(){
    const response = await fetch("/api/v1/vpets/test/628e6436eba12e657f1b0849");
    const data = await response.json();
    const petName = document.querySelector("#petName");
    const petPrice = document.querySelector("#petPrice");
    const petQty = document.querySelector("#petQty");
    const petImage = document.querySelector("#petImage");
    petPrice.textContent = data.price;
    petQty.textContent = data.qty;
    petName.textContent = data.name;
    petImage.src = data.imgsrc;
    

}
//fetchShowData();

function handleNavBtnClick(evt){
    for(let i = 0; i < btnName.length; i++){
        btnObj[btnName[i].toLocaleLowerCase()].classList.remove("active");
    }
    evt.target.classList.add("active");
    if(evt.target.name === "create"){
        modalEl.show();

    }else{
        const vPetCards = document.querySelectorAll(".modalbtn");
        vPetCards.forEach(btn=>btn.textContent = evt.target.name.toUpperCase());
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

function createNewPet(){
    console.log("create new pet");
    const petName = document.querySelector("#petName");
    const petDes = document.querySelector("#petDes");
    const petPrice = document.querySelector("#petPrice");
    const petQty = document.querySelector("#petQty");
    const petImgInput = document.querySelector("#petImgInput").files[0];
    let formData = new FormData();
    formData.append("name", petName.value);
    formData.append("des", petDes.value);
    formData.append("price", petPrice.value);
    formData.append("qty", petQty.value);
    formData.append("imgsrc", petImgInput);
    sendFormData(formData);
}

function resetPetForm(){
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