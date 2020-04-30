document.addEventListener('DOMContentLoaded', () => {
//const
const BASE_URL = `http://localhost:3000`
const DOGS_URL = `${BASE_URL}/dogs/`
const apiHeaders = {
    "Content-Type" : "application/json",
    "Accept" : "application/json"
}
const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

//APIS
const get = (url) => {
    return fetch(url).then(response => response.json())
}

const post = (url, dog) => {
    return fetch(url, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify(dog),
    }).then(response => response.json())
}

const patch = (url, dog) => {
    return fetch(url + dog.id, {
    method : "PATCH",
    headers: apiHeaders,
    body: JSON.stringify(dog)
}).then(response => response.json())
}

const API = {get, post, patch}
//functions

const getDogs = () => {
    API.get(DOGS_URL).then(dogs =>{
        dogs.forEach(dog => renderDog(dog))
    })
}

const renderDog = (dog) => {
    const editDogButton = document.createElement('button')
   const newRow = tableBody.insertRow()
   const dogName = newRow.insertCell(0)
   const dogBreed = newRow.insertCell(1)
   const dogSex = newRow.insertCell(2)
   const editDog = newRow.insertCell(3)

   dogName.innerHTML = dog.name
   dogBreed.innerHTML = dog.breed
   dogSex.innerHTML = dog.sex
   editDogButton.innerHTML = "Edit"
   editDog.appendChild(editDogButton)

   editDogButton.addEventListener('click', e => {
       populateDog(dog)
   })
}

const populateDog = (dog) => {
    
    const dogFormName = document.querySelector('input[name ="name"]')
    dogFormName.value = `${dog.name}`
    const dogFormBreed = document.querySelector('input[name ="breed"]')
    dogFormBreed.value = `${dog.breed}`
    const dogFormSex = document.querySelector('input[name ="sex"]')
    dogFormSex.value = `${dog.sex}`
    // dogForm[0].value = `${dog.name}`
    // dogForm[1].value = `${dog.breed}`
    // dogForm[2].value = `${dog.sex}`

    dogForm.addEventListener('submit', e => {
        e.preventDefault()
        patchDog(dog)
    })
    
}


const patchDog = (dog) => {
    const dogFormName = document.querySelector('input[name ="name"]')
    dog.name = dogFormName.value
    const dogFormBreed = document.querySelector('input[name ="breed"]')
    dog.breed = dogFormBreed.value
    const dogFormSex = document.querySelector('input[name ="sex"]')
    dog.sex = dogFormSex.value 
    
    
    API.patch(DOGS_URL, dog).then(() => {
        tableBody.innerHTML = ""
        getDogs()
    })
}






getDogs()
})