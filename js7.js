/*
In this flies we will add the chrome api to get current tab 
*/

let Myleads = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn=document.getElementById("delete-btn")
const savebtn = document.querySelector("#save-btn")

const leadsfromlocalstorage = JSON.parse(localStorage.getItem("Myleads"))



if(leadsfromlocalstorage){
    Myleads=leadsfromlocalstorage
    renderleads(Myleads)  
}


savebtn.addEventListener("click",function(){
    //grab the URL of current tab!....google it get that code
    //we copied this below small code
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //we have removed thier code and pushed this below code inside this function which was written out of this function
        Myleads.push(tabs[0].url)   
        localStorage.setItem("Myleads", JSON.stringify(Myleads) )  
        renderleads(Myleads)  

        //now we have to add some code in manifest files also for the permession
      });

    
    
})

deletebtn.addEventListener("dblclick",function(){
    
    localStorage.clear()
    Myleads=[]
    renderleads(Myleads) 
})

inputbtn.addEventListener("click", function () {
    Myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("Myleads", JSON.stringify(Myleads) )
    renderleads(Myleads)
})

function renderleads(leads) {
    let listitem = ""
    for (let i = 0; i < leads.length; i++) {
        listitem += `
                    <li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                    </li>
                     `
    }
    ulEl.innerHTML = listitem
}