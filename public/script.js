const result = document.querySelector(".result")
const fetchPeople = async() =>{
    try{
        const {data} = await axios.get('/api/people')
        console.log(data)
        const people = data.data.map((person) =>{
            return `<h5>${person.name}<br><button class="edit" onclick="nameEdit" >Edit</button><button class="del" data="${person.id}">Delete</button></h5>`
        })
        result.innerHTML = people.join("")
        const del = document.querySelectorAll(".del")
        del.forEach((person)=>{
            person.addEventListener("click",async (e) =>{
                e.preventDefault()
                try{
                    const{data} = await axios.delete("/api/people/" + person.getAttribute('data'))
                    fetchPeople();
                } catch (error){
                    formAlert.textContent = error.response.data.msg
                }
                input.value = "";
            })
        })
        
    } catch (error){
        formAlert.textContent = error.response.data.msg
    }
}
fetchPeople()


const btn = document.querySelector(".submit-btn")

const input = document.querySelector(".form-input")
const formAlert = document.querySelector(".form-alert")

btn.addEventListener("click",async (e) =>{
    e.preventDefault()
    const nameValue = input.value
    try{
        const{data} = await axios.post("/api/people", {name:nameValue})
        const h5 = document.createElement("h5")
        result.appendChild(h5)
        fetchPeople();
    } catch (error){
        formAlert.textContent = error.response.data.msg
    }
    input.value = "";
})

function nameEdit()