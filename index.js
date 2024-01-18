
// scrim-mobilapp-url


import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    // https://scrim-mobile-app-default-rtdb.firebaseio.com/
    // remember to set Rules to allow read/write after 1/20/2024 if it's after that. mmmmkay?
    // epochconverter.com -> 1705708800000 lol
    databaseURL : "https://scrim-mobile-app-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

console.log(shoppingListInDB)

const inputFieldEl = document.getElementById("input-field")
const inputBtnEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

inputBtnEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value
    inputValue && push(shoppingListInDB, inputValue) 
    clearInputField()
})

onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
    
        let itemsArray = Object.entries(snapshot.val())
        // console.log(itemsArray)
        clearShoppintList()
        
        for (let i=0; i<itemsArray.length; i++) {
            // pass in the item array [id,value]
            
            let item = itemsArray[i]
            addItem(item)
        }
    } else {
        shoppingListEl.innerHTML = "<p>Nothing here...</p>"
    }
})

const addItem = (item) => {
    // update interface
    const itemId = item[0]
    const itemValue = item[1]

    const newEl = document.createElement('li')

    // attach remove dblclick to this list element
    newEl.addEventListener('click', () => {
        const itemLocationInDB = ref(database,`shoppingList/${itemId}`)
        // console.log(itemLocationInDB)
        remove(itemLocationInDB)
    })


    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
}

const clearInputField = () => {
    inputFieldEl.value = ''
}

const clearShoppintList = () => {
    shoppingListEl.innerHTML=''
}
