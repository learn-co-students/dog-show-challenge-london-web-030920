document.addEventListener("DOMContentLoaded", () => {
  ///////API STUFF////////

  const DOGS_URL = "http://localhost:3000/dogs/";

  const apiHeaders = {
    "Content-type": "application/json",
    Accept: "application/json",
  };

  //get
  const get = (url) => {
    return fetch(url).then((resp) => resp.json());
  };

  //patch
  const patch = (url, dog, newBody) => {
    return fetch(url + dog.id, {
      method: "PATCH",
      headers: apiHeaders,
      body: JSON.stringify(newBody),
    }).then((response) => response.json());
  };

  const API = { get, patch };

  //////CONSTANTS/////////
  const tableBody = document.querySelector("#table-body");

  const newForm = document.querySelector("#dog-form");
  const formName = document.getElementsByName("name")[0];
  const formBreed = document.getElementsByName("breed")[0];
  const formSex = document.getElementsByName("sex")[0];

  ///////FUNCTIONS/////////
  const getDogs = () => {
    API.get(DOGS_URL).then((dogs) => dogs.forEach((dog) => renderDog(dog)));
  };

  const renderDog = (dog) => {
    const newTr = document.createElement("tr");
    newTr.innerHTML = `
      <td>${dog.name}</td> 
      <td>${dog.breed}</td> 
      <td>${dog.sex}</td> 
      `;

    const editButton = document.createElement("button");
    editButton.innerText = "Edit Dog";
    newTr.appendChild(editButton);
    editButton.addEventListener("click", () => {
      updateDogForm(dog);
    });

    tableBody.appendChild(newTr);
  };

  const updateDogForm = (dog) => {
    formName.value = dog.name;
    formBreed.value = dog.breed;
    formSex.value = dog.sex;

    newForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newName = formName.value;
      const newBreed = formBreed.value;
      const newSex = formSex.value;

      const newBody = {
        name: newName,
        breed: newBreed,
        sex: newSex,
      };

      updateDog(dog, newBody);
    });
  };

  const updateDog = (dog, body) => {
    API.patch(DOGS_URL, dog, body)
    .then(() => {
      tableBody.innerHTML = ""
      getDogs();

      formName.value = ""
      formBreed.value = ""
      formSex.value = ""
    });
  };

  ////////CALL FUNCTION//////
  getDogs();
});
