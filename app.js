
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { 
        getFirestore, 
        collection, 
        getDocs, 
        doc, 
        deleteDoc, 
        addDoc, 
        serverTimestamp, 
        query, 
        orderBy,
        onSnapshot
        } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

  // https://firebase.google.com/docs/web/setup#available-libraries
  const firebaseConfig = {
    apiKey: "AIzaSyAd9DfgTHSO5IT6wouUDra-XVHWS9qt3uk",
    authDomain: "testing-firebase-9347c.firebaseapp.com",
    projectId: "testing-firebase-9347c",
    storageBucket: "testing-firebase-9347c.appspot.com",
    messagingSenderId: "135516563041",
    appId: "1:135516563041:web:8f01d4c834a5bf69482c20",
    measurementId: "G-TXWN1LXVWB"
  };

  // Initialize Firebase & refs
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionGames = collection(db,'games')


  // Referências / Seletores
  const formTodo = document.querySelector('.form-add-todo')
  const formSearch = document.querySelector('.form-search input')
  const todosContainer = document.querySelector('.todos-container')

  const q = query(collection(db, 'games'), orderBy('createdAt', 'asc'));

  //Listener Firebase real time 
  onSnapshot(q, querySnapshot => {

    if(!querySnapshot.metadata.hasPendingWrites){
        const gameLis = querySnapshot.docs.reduce((acc, item)=> {
            const {title, developedBy } = item.data()
            
            acc += `
            <li data-id='${item.id}' class="list-group-item d-flex justify-content-between align-items-center">
            <span>${title}</span>
            <i data-remove="${item.id}" class="far fa-trash-alt delete"></i>
        </li>
            `
            return acc 
          }, '')
          todosContainer.innerHTML = gameLis
    }


  })

// Add Item to todo
formTodo.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputValue = event.target.add.value
  


    addDoc(collectionGames, {
        title: inputValue,
        createdAt: serverTimestamp()
      })
      .then(doc=> {
        // console.log(doc)
      })
      .catch(error => console.log(error))

 

    event.target.reset()
})

// Filter itens in todo
formSearch.addEventListener('input', (e)=>{

    const inputSearchValue = e.target.value.toLowerCase().trim()
   
    Array.from(todosContainer.children)
        .filter( item => !item.textContent.toLowerCase().includes(inputSearchValue))
        .forEach((item)=>{
            item.classList.add('hidden')
        })

    Array.from(todosContainer.children)
        .filter( item => item.textContent.toLowerCase().includes(inputSearchValue))
        .forEach((item)=>{
            item.classList.remove('hidden')
        })    
       
        console.log(filtered)
        
})

// detele itens from todo
todosContainer.addEventListener('click', (e)=> {
    const clickedElement = e.target
    const idRemoveButton = e.target.dataset.remove
    if(clickedElement.classList.contains('delete')){
        
        deleteDoc(doc(db,'games', idRemoveButton))
        .then(()=> {
            console.log('game removido')
            // clickedElement.parentElement.remove()
            // console.log('callback do snapshot executado')
            // const game = document.querySelector(`[data-id="${idRemoveButton}"]`)
            // game.remove()
        })
        .catch((console.log))
        

    }

})