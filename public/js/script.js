function handleFile(){
    console.log("Added File");
}

async function alertHello(){
    const response = await fetch("http://localhost:3000/api/v1/vpets/test");
    const data = await response.json();
    console.log(data);
    inputHello.value = data.test;

}

buttonSayHello = document.querySelector("#buttonSayHello");

inputHello = document.querySelector("#helloInput");

buttonSayHello.addEventListener("click", alertHello);