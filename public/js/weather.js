//Greet The LoggedIn User

const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.name){
        location.href = '/login';
    } else{
        greeting.innerHTML = `hello ${sessionStorage.name}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}


//Weather Details
let input = document.querySelector('.input_text');
let main = document.querySelector('#name');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let clouds = document.querySelector('.clouds');
let button= document.querySelector('.submit');


button.addEventListener('click', function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=24c065056859ebb086c448a9d4ce7bab&units=metric')
    .then(response => response.json())
    .then(data => {
      let tempValue = data['main']['temp'];
      let nameValue = data['name'];
      let descValue = data['weather'][0]['description'];

      main.innerHTML = nameValue;
      desc.innerHTML = `Desc - ${descValue}`;
      temp.innerHTML = `Temp - ${tempValue}°C`;
      input.value ="";

  })

    .catch(err => alert("Invalid City Or Country Name!"));
})







