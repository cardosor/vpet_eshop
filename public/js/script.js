
//Nav bar Button names
let btnName = ["Read", "Create", "Update", "Delete"];
//Obj to hold Nav bar buttons 
const btnObj = {};
//Obj to hold form elements
const formElObj = {};
//Application states
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
const btnDeletePet = document.querySelector("#btnDeletePet");
btnDeletePet.addEventListener("click", deletePet);
const btnSubmitForm = document.querySelector("#btnSubmitForm");
btnSubmitForm.addEventListener("click", subimitForm);
const btnResetForm = document.querySelector("#btnResetForm");
btnResetForm.addEventListener("click", resetForm);
const closeModalTop = document.querySelector("#closeModalTop");
closeModalTop.addEventListener("click", closeForm);
const closeModalBottom = document.querySelector("#closeModalBottom");
closeModalBottom.addEventListener("click", closeForm);
let btnRudPet = null; //Each vpet card will have one button that will change according to the state
const spinner = document.querySelector(".spinner-border");
const indexSpinner = document.querySelector("#indexSpinner");
const showPetCard = document.querySelector("#showPetCard");

//Div element that contains all the vpets cards
const cardDeck = document.querySelector("#cardDeck");
//Image input field
const petImgInput = document.querySelector("#petImgInput");
//Event to add the image as background to a div once the image is selected
petImgInput.addEventListener("change", function (){
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        const petImage = reader.result;
        displayPetImage.style.backgroundImage = `url(${petImage})`;
    });
    reader.readAsDataURL(this.files[0]);
});

//Select form elemets and add it to the formElObj
function formElToObj(){
    const petFormEl = document.querySelectorAll(".pet-form");
    petFormEl.forEach(el=>{
        const name = el.name;
        if(el.id !== undefined && el.id !== null){
            formElObj[name] = el
        }
    });
}
formElToObj();

//=====FETCHDATA SIGLE vPet=====
//=====FETCHDATA SIGLE vPet=====
//=====FETCHDATA SIGLE vPet=====
async function fetchDataSingle(id){
    const response = await fetch("/api/v1/vpets/json/"+id);
    const data = await response.json();
    return data;
}

//=====FETCHDATA All vPet=====
//=====FETCHDATA All vPet=====
//=====FETCHDATA All vPet=====
async function fetchDataAll(){
    //show loader
    indexSpinner.style.display = "block";
    const response = await fetch("/api/v1/vpets/json/");
    const data = await response.json();
    return data;
}

//Add vPets to the cardDeck element based on json file
function loadIndexData(data){
    if(cardDeck){
        data.forEach((obj)=>{
            console.log(obj);
            cardDeck.insertAdjacentHTML("afterbegin",`
            <div class="card index-pet-card">
                <img src=${obj.imgsrc} class="card-img-top" alt=""/>
                <div class="card-header">
                    vPet Name: ${obj.name} 
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Description: ${obj.des.length > 20 ? obj.des.substring(0,obj.des.lastIndexOf(" ",20))+"..." : obj.des }</li>
                    <li class="list-group-item">Price: ${obj.price.toFixed(2)}</li>
                    <li class="list-group-item">Quantity: ${obj.qty}</li>
                </ul>
                <div class="card-body">
                <button type="button" data-id=${obj._id} class="btn btn-primary btnRudPet">
                ${currentState.toUpperCase()}
                </button>
                </div>
            </div>
            `);
        });
    }
    //Need to query all the button again
    btnRudPet = document.querySelectorAll(".btnRudPet");
    btnRudPet.forEach(btn=>btn.addEventListener("click", rudPet));
}

//Call fetchDataAll async function
fetchDataAll().then((result, reject)=>{
    if(reject){
        alert("Please try reloading the page!");
    }else{
        indexSpinner.style.display = "none";
        loadIndexData(result);
    }
});

//Once a CRUD action takes place the data needs to be reloaded, page is not refreshed.
function reloadIndex(){
    const indexPetCard = document.querySelectorAll(".index-pet-card");
    indexPetCard.forEach((el)=>el.remove());
    fetchDataAll().then((result, reject)=>{
        if(reject){
            alert("Please try reloading the page!");
        }else{
            indexSpinner.style.display = "none";
            loadIndexData(result);
        }
    });
}


//Load data to show card
function loadShowData(data){
    spinner.style.display = "none";
    showPetCard.style.display="block";
    const petShowEl = document.querySelectorAll(".pet-show");
    petShowEl.forEach(el=>{
        const name = el.dataset.name;
        const display = el.dataset.display;
        if(name === "imgsrc"){
            el.src = data[name]
        }else{
            el.textContent = `${display}: ${name === "price" ?  data[name].toFixed(2) : data[name]}`;
        }
    });
}

//load data to the form
function loadUpdateFormData(data){
    spinner.style.display = "none";
    const petImgInput = document.querySelector("#petImgInput");
    petImgInput.files[0] = null;
    petImgInput.value = "";
    for(property in formElObj){
        const obj = formElObj[property];
        const name = obj.name;
        console.log(obj.id);
        if(obj.id === "displayPetImage"){
            obj.style.backgroundImage = `url(${data["imgsrc"]})`;
        }else{
            obj.value = `${name === "price" ?  data[name].toFixed(2) : data[name]}`;
        }
    }
}

//Handle NAV BAR click.
function handleNavBtnClick(evt){
    //Remove the active status.
    for(let i = 0; i < btnName.length; i++){
        btnObj[btnName[i].toLocaleLowerCase()].classList.remove("active");
    }
    //Add active status to the clicked button
    evt.target.classList.add("active");
    //If create is select show Modal with form change state.
    if(evt.target.name === "create"){
        currentState = states.create;
        showForm(true);
        modalTitle.textContent = "Create vPet";
        modalEl.show()
    }else{
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

//Select all NAV BAR buttons based on btnName array and add addEventListener
for(let i = 0; i < btnName.length; i++){
    btnObj[btnName[i].toLocaleLowerCase()] = document.querySelector("#btn"+btnName[i]);
    btnObj[btnName[i].toLocaleLowerCase()].addEventListener('click',handleNavBtnClick);
}

//===========Form Section=============
//===========Form Section=============
//===========Form Section=============

//Send form data and reload vPet list
async function sendFormData(formData, id){
    let route = ""; 
    let method = "";
    let message = "";
    if(currentState === states.update){
        if(id)
        method = "PUT";
        route = `/api/v1/vpets/json/${id}`;
        message = "Pet updated.";
    }else{
        method = "POST";
        route = "/api/v1/vpets/json";
        message = "Pet created.";
    }
    const response = await fetch(route, {method:method, body:formData});
    const data = await response.json();
    console.dir(data);
    if(!data.error){
        alert(message);
        reloadIndex();
    }else{
        alert(data.error);
    }
}

//Called when button subimit is clicked
//Get the data in the form then send to sendFormData function
function subimitForm(evt){
    //To check if there are missing fields
    let isMissing = false;
    //if id is set this will be an update request
    const id = evt.target.dataset.id ? evt.target.dataset.id : null;
    const formData = new FormData();
    //Get the image
    const petImgInput = document.querySelector("#petImgInput").files[0];
    //Get the original file path in case this is an update
    //The image will be deleted in case a new one is provided
    const origFilePath = document.querySelector("#origFilePath");
    //If the current state is create, there is no need to send the original file path
    if(petImgInput){
        if(currentState === states.create){
            origFilePath.value = "none";
        }
        formData.append("imgsrc", petImgInput)
    }
    for(property in formElObj){
        const obj = formElObj[property];
        const name = obj.name;
        const value = obj.value;
        //displayPetImage does not need to be send, this is only a image preview
        if(obj.id !== "displayPetImage"){
            if(name !== undefined && isMissing === false){
                //Check for missing fields in the form
                value ?  isMissing = false : isMissing = true;
                formData.append(name, value)
            }
        }
    }
    isMissing ? alert("Please complete all fields.") : sendFormData(formData, id);
}

//Reset form 
function resetForm(){
    const petName = document.querySelector("#petName");
    const petDes = document.querySelector("#petDes");
    const petPrice = document.querySelector("#petPrice");
    const petQty = document.querySelector("#petQty");
    const petImgInput = document.querySelector("#petImgInput");
    const displayPetImage = document.querySelector("#displayPetImage");
    const origFilePath = document.querySelector("#origFilePath");
    btnSubmitForm.setAttribute("data-id", "");
    petName.value  = "";
    petDes.value = "";
    petPrice.value = "";
    petQty.value = "";
    origFilePath.value = "";
    petImgInput.files[0] = null;
    petImgInput.value = "";
    displayPetImage.style.backgroundImage = null;
}

//If the form is closed and the state is create, the page will go back to show/read
//Else the form will be reset and the current state will not change
function closeForm(){
    if(currentState === states.create){
        const evt = {};
        evt.target = btnObj.read;
        handleNavBtnClick(evt)
    }else if(currentState === states.update){
        resetForm();
    }
}

//Show from and hide pet card in the Modal
function showForm(value){
    let display = "none"
    if(value === true){
        display = "block"
    }
    showPetCard.style.display="none";
    btnDeletePet.style.display = "none"
    createUpdatePetForm.style.display=display;
    btnResetForm.style.display=display;
    btnSubmitForm.style.display=display;
}

//Delete vPet and show a message with the deleted vPet information.
async function deletePet(evt){
    const id = evt.target.dataset.id;
    const response = await fetch(`/api/v1/vpets/json/${id}`, {method:"DELETE"});
    const data = await response.json();
    if(!data.error){
        alert(`Deleted Successfully!\n
        Name: ${data.name}\n
        Description: ${data.des.substring(0,data.des.lastIndexOf(" ",20))}...\n
        Price: ${data.price}\n
        Quantaty: ${data.qty}`);
        reloadIndex();
        modalEl.hide();
    }else{
        alert(data.error);
    }
}

//READ, UPDATE and DELETE pet button, according to the current state the button click will take a
//different action then show the modal wil the Update form, the Delete option or the Show information card
function rudPet(evt){
    const id = evt.target.dataset.id;
    switch(currentState){
        case states.read:
            showForm(false)
            fetchDataSingle(id).then((result, reject)=>{
                if(reject){
                    alert("Please try again later.");
                }else{
                    loadShowData(result);
                }
            });
            break;
        case states.update:
            showForm(true)
            fetchDataSingle(id).then((result, reject)=>{
                if(reject){
                    alert("Please try again later.");
                }else{
                    btnResetForm.style.display = "none"
                    btnSubmitForm.setAttribute("data-id", evt.target.dataset.id);
                    loadUpdateFormData(result)
                }
            });
            break;
        case states.delete:
            showForm(false)
            btnDeletePet.style.display = "block"
            btnDeletePet.setAttribute("data-id", evt.target.dataset.id);
            fetchDataSingle(id).then((result, reject)=>{
                if(reject){
                    alert("Please try again later.");
                }else{
                    loadShowData(result);
                }
            });
            break;
        default:
            showForm(false);
            fetchDataSingle(id).then((result, reject)=>{
                if(reject){
                    alert("Please try again later.");
                }else{
                    loadShowData(result);
                }
            });
            break;
    }
    modalEl.show();
}