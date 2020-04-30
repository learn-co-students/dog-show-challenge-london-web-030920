document.addEventListener('DOMContentLoaded', () => {
    
    const theDogForm = document.querySelector("#dog-form")
    const dogURL = "http://localhost:3000/dogs"





function fetchDogs(){
    return fetch(dogURL)
    .then(function(response){
        return response.json()
    })
}

function renderDogs(){
    fetchDogs()
    .then(function(dogs){
        for (let i = 0; i < dogs.length; i++ )
        renderDog(dogs[i])
    })
}

function renderDog(dog){
    const tableBody = document.querySelector("#table-body")
    const dogRow = document.createElement("tr")
    const dogDataName = document.createElement("td")
    dogDataName.innerText = dog.name
    const dogDataBreed = document.createElement("td")
    dogDataBreed.innerText = dog.breed
    const dogDataSex = document.createElement("td")
    dogDataSex.innerText = dog.sex
    const dogDataEdit = document.createElement("td")
    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit Dog"
    dogDataEdit.appendChild(editBtn)
    dogRow.append(dogDataName, dogDataBreed, dogDataSex, dogDataEdit)
    tableBody.appendChild(dogRow)
    editBtn.addEventListener("click", function(e){
        theDogForm[0].value = `${dog.name}`
        theDogForm[1].value = `${dog.breed}`
        theDogForm[2].value = `${dog.sex}`
        updateDog(dog)
    })
    
}
function updateDog(dog){
    theDogForm.addEventListener("submit", function(e){
        e.preventDefault()
        // dogDataSex.innerText = dog.sex.value
        const updatedName = theDogForm[0].value
        const updatedBreed = theDogForm[1].value
        const updatedSex = theDogForm[2].value
        const updateDog = {"name": updatedName,
        "breed": updatedBreed,
        "sex": updatedSex}
        patchDog(dog, updateDog)
    })
}

function patchDog(dog, updateDog){
    const theDog = {name: dog.name, breed: dog.breed, sex: dog.sex}
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(updateDog)
    }
    fetch(`${dogURL}/${dog.id}`, configObj)
    .then(function(response){
        return response.json()
    }).then(function(response){
        document.querySelector("#table-body").innerHTML = " "
        renderDogs()
    })
}

renderDogs()
})