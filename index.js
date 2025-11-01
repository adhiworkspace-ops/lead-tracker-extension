import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js"
import { getDatabase,
         push,
         onValue,
         ref,
         remove
        } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js"
const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-72970-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDb = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDb, function(snapshot) {
    if(snapshot.exists()) {
        const snapshotValues = snapshot.val()
        const leadArray = Object.values(snapshotValues)
        render(leadArray)
    }

})
deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDb)
    render([])
})

inputBtn.addEventListener("click", function() {
    push(referenceInDb, inputEl.value)
    inputEl.value = ""
})