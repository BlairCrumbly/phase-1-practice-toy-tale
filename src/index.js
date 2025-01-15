let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const form = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {

  
  addBtn.addEventListener("click", () => {
    // Hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
//get all toys
  const getToys = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching toys");
      }
      const toys = await response.json();
      
      renderToys(toys);
    } catch (error) {
      console.log("Error fetching toys:", error);
    }
  };

  //! render toys into the DOM

  const renderToys = (toys) => {
    
    
    toys.forEach(toy => {
      // Create a new div for the toy cardd
      const toyCard = document.createElement("div");
      toyCard.classList.add("card");
      
      toyCard.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} like</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `;
      
      // Append the toy card to the collection container
      toyCollection.appendChild(toyCard);
    });
  };
  //! add new toy, new form
  
  form.addEventListener("submit", (event) => {
    event.preventDefault() //!important to remember after submit!!!!!!!!!!!!!!!!!!


    const newToy = {
      name: nameInput.target.name.value.trim(),
      image: imageInput.target.image.value.trim(),
      likes: 0,
    };
    
    if(newToy.name === "" || newToy.image === ""){
      alert("fill in both fields")
      return
    }

    (
      async postToy () => {
        try {
          const response = await fetch("localhost:3000/toys"),{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(newToy)
            
          }                         
          const data = await response.json()
        } catch (error) {
          alert(error)
          
        }

      }
    )()



  });

  getToys("http://localhost:3000/toys");
});