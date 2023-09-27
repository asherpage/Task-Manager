const result = document.querySelector(".result")
const input = document.querySelector(".form-input")
const btn = document.querySelector(".submit-btn")
const formAlert = document.querySelector(".form-alert")
const input2 = document.querySelector(".form-input2")
let x = false;
let editId = -1;
let name2;
const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')
        console.log(data)
        const people = data.data.map((person) =>{
            return `<div class="divy"><h5 class = "names"> ${person.name} </h5><h3 style="font-size:0.7rem">${person.description}</h3><button class="edit" data-id="${person.id}">Edit</button><button class="del" data-id="${person.id}">Delete</button><p style="display:flex; text-align:center">Done:<input type="checkbox" class="check" id="${person.id}" name="${person.id}" ></p></div>`
        })
        result.innerHTML = people.join("")
        const del = document.querySelectorAll(".del")
        del.forEach((person)=>{
            person.addEventListener("click",async (e) =>{
                e.preventDefault()
                try{
                    const{data} = await axios.delete("/api/people/" + person.getAttribute('data-id'))
                    fetchPeople();
                } catch (error){
                    formAlert.textContent = error.response.data.msg
                }
                input.value = "";
            })
        })
        const checkboxes = document.querySelectorAll(".check");

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function() {
                const div = this.closest(".divy");
                if (this.checked) {
                    div.classList.add("red-background");
                } else {
                    div.classList.remove("red-background");
                }
            });
        });
        
        const edit = document.querySelectorAll(".edit")
        edit.forEach((person)=>{
            person.addEventListener("click",async (e) =>{
                e.preventDefault()
                try{
                    const{data} = await axios.get("/api/people/")
                    name2 = data.data.filter(
                        (x) => x.id == Number(person.getAttribute('data-id'))
                    )
                    input.value = name2[0].name;

                    input2.value = name2[0].description;
                    editId = person.getAttribute('data-id')
                    x = true;
                    fetchPeople();
                } catch (error){
                    
                }
            })
        })

    } catch (error){
        formAlert.textContent = error.response.data.msg
    }

    
}
fetchPeople()

btn.addEventListener("click",async (e) =>{
    e.preventDefault()
    const nameValue = input.value
    const descValue = input2.value
    try{
        if (x == true){
           x = false;
           console.log(descValue)
           await axios.put('/api/people/' + editId, {
            name: nameValue,
            description: descValue,
           })
        } else{
            const {data} = await axios.post("/api/people", {name:nameValue, description: descValue})
        const h5 = document.createElement("h5")
        h5.textContent = data.person;
        result.appendChild(h5)
        const h3 = document.createElement("h3")
        h3.textContent = data.description;
        result.appendChild(h3)
        
        }
        fetchPeople();
    } catch (error){
        formAlert.textContent = error.response.data.msg
    }
    input.value = "";
    input2.value = "";
})
