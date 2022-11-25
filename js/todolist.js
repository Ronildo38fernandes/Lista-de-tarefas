; (function(){
          "use strict"
          const itemInput = document.getElementById("item-input")
          const todoAddForm = document.getElementById("todo-add")
          const ul = document.getElementById("todo-list")
          const lis = ul.getElementsByTagName("li")
          //estrutura dos dados
          let arrTasks = getSavedData()
          setNewData()
          
         
          function getSavedData() {
               let tasksData = localStorage.getItem("task")
               tasksData = JSON.parse(tasksData)
        
               return tasksData && tasksData.length ? tasksData : [
                   {
                       name: "task 1",
                       createAt: Date.now(),
                       completed: true
                   },
                   {
                       name: "task 2",
                       createAt: Date.now(),
                       completed: false
                   }
               ]
        
        
           }

          
          function setNewData(){
               localStorage.setItem("task",JSON.stringify(arrTasks))
          }
          setNewData()
          
          //não faz nada no momento 
          // function addEventli (li){
          //      li.addEventListener("click",function(){
          //         console.log(this)

          //      })
          // } 
          
          //recebe a estrutura e retorna uma li
          function generateLiTask(obj){
               const li = document.createElement("li")
               const p = document.createElement("p")     
               const checkButton = document.createElement("button")  
               const editButton = document.createElement("i")
               const deleteButton = document.createElement("i")     
               
               
               
                    li.className = "todo-item"

                    checkButton.className="button-check"
                    checkButton.innerHTML = 
                    `<i class ="fas fa-check ${obj.completed ? " ":" displayNone"}" data-action = "checkButton"></i>`
                    checkButton.setAttribute("data-action","checkButton")
                    li.appendChild(checkButton)
                    p.className = "task-name"
                    p.textContent = obj.name
                    li.appendChild(p)
                    
                    editButton.className = "fas fa-edit"
                    editButton.setAttribute("data-action","editButton")
                    li.appendChild(editButton)
                    
                    const containerEdit= document.createElement("div") 
                    containerEdit.className = "editContainer"
                    const inputEdit = document.createElement("input")
                    
                    inputEdit.setAttribute("type","text") 
                    inputEdit.className="editInput"
                    inputEdit.value = obj.name
                    containerEdit.appendChild(inputEdit)
                    
                    const containerEditButton = document.createElement("button")
                    containerEditButton.className = "editButton"
                    containerEditButton.textContent = "Editar"
                    containerEditButton.setAttribute("data-action","containerEditButton")
                    containerEdit.appendChild(containerEditButton)
                    
                    const containerCancelButton = document.createElement("button")
                    containerCancelButton.className = "cancelButton"
                    containerCancelButton.textContent = "Cancelar"
                    containerCancelButton.setAttribute("data-action","containerCancelButton")
                    containerEdit.appendChild(containerCancelButton)
                    li.appendChild(containerEdit)
                    
                    
                    deleteButton.className = "fas fa-trash-alt"
                    deleteButton.setAttribute("data-action","deleteButton")
                    li.appendChild(deleteButton)

                    
                 //   addEventli(li)
                    return li
          }
          
          //rederiza na tela e acrescenta as li em cada interação
          function renderTasks(){
               ul.innerHTML= " "
               arrTasks.forEach(obj => {
                    ul.appendChild(generateLiTask(obj))
               })
          }
          
          
          function addTask(task){
               arrTasks.push({
                    name:task,
                    createAt: Date.now(),
                    completed: true
               })   
               setNewData()
               
          }
          
          function clickerdUl(e){
   
               
               
               const dataAction = e.target.getAttribute("data-action")
               if(!dataAction) return

               let currentLi = e.target

               while(currentLi.nodeName != "LI"){
                    currentLi = currentLi.parentElement
               }
               
               const currentLiIndex = [...lis].indexOf(currentLi)
               console.log(currentLiIndex)
               const actions = {
                    editButton: function (){
                        const editContainer = currentLi.querySelector(".editContainer");


                         [...ul.querySelectorAll(".editContainer")].forEach(container => {
                              container.removeAttribute("style")
                         });


                        editContainer.style.display = "flex";



                    },
                    
                    deleteButton : function(){
                         arrTasks.splice(currentLiIndex,1)
                        // currentLi.parentElement.removeChild(currentLi)
                        setNewData() 
                        renderTasks()
                    },
                    containerEditButton: function(){
                         const val = currentLi.querySelector(".editInput").value
                         arrTasks[currentLiIndex].name = val
                         renderTasks()
                         setNewData()
                    },
                    containerCancelButton: function(){
                         currentLi.querySelector(".editContainer").removeAttribute("style")
                    },
                    checkButton: function(){
                         arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed 
                         if(arrTasks[currentLiIndex].completed){
                              currentLi.querySelector(".fa-check").classList.remove("displayNone")
                         }else{
                              currentLi.querySelector(".fa-check").classList.add("displayNone")
                         }
                    }
                    
               }
               setNewData()
               if(actions[dataAction]){
                    actions[dataAction]()
               }


          }
          //apos o submit gera um onj novo e atualiza a tela
          todoAddForm.addEventListener("submit",function(e){
                    e.preventDefault()
                    addTask(itemInput.value)
                     renderTasks()
                     itemInput.value = ""
                     itemInput.focus()

          });
          ul.addEventListener("click",clickerdUl)
          
          renderTasks()

})()