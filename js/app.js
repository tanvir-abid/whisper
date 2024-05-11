import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore,setDoc,doc,getDoc,updateDoc,  collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getDatabase,ref, set,push,serverTimestamp, onChildAdded,child, get,remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCREwUA-9nS_l2YR4RCFO804_cQ6uuxWX4",
  authDomain: "whisper-7355e.firebaseapp.com",
  databaseURL: "https://whisper-7355e-default-rtdb.firebaseio.com",
  projectId: "whisper-7355e",
  storageBucket: "whisper-7355e.appspot.com",
  messagingSenderId: "524875351072",
  appId: "1:524875351072:web:7b582f5c5946c73cd16845",
  databaseURL: "https://whisper-7355e-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

//==================================//
document.addEventListener('DOMContentLoaded', async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "user_profiles", user.uid);

      // Wrap getDoc in a separate async function
      async function fetchData() {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          createMainContainer(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }

      fetchData(); 
    } else {
      createCredentialContainer();
    }
  });
});

//==============================================//
function createCredentialContainer() {
  // Create credential-container div
  const credentialContainer = document.createElement('div');
  credentialContainer.id = 'credential-container';

  // Create site-logo-container div
  const siteLogoContainer = document.createElement("div");
  siteLogoContainer.classList.add("site-logo-container");

  // Create site-logo div with an img tag
  const siteLogo = document.createElement("div");
  siteLogo.classList.add("site-logo");
  const img = document.createElement("img");
  img.src = "img/chat.png"; 
  siteLogo.appendChild(img);

  // Create site-title div with h1 and p tags
  const siteTitle = document.createElement("div");
  siteTitle.classList.add("site-title");
  siteTitle.innerHTML = "<h1>Whisper</h1><p>Connect Faster, Chat Smarter</p>";

  siteLogoContainer.appendChild(siteLogo);
  siteLogoContainer.appendChild(siteTitle);
  credentialContainer.appendChild(siteLogoContainer);

//-----------------------------------------------//
  const allForms = document.createElement('div');
  allForms.className = 'all-forms-container';
  // Create signIn-form-container div
  const signInFormContainer = document.createElement('div');
  signInFormContainer.id = 'signIn-form-container';
  signInFormContainer.classList.add('form-container','display');

  // Create form header div
  const formHeader = document.createElement('div');
  formHeader.className = 'form-header';

  // Create thumbnail div
  const thumbnailDiv = document.createElement('div');
  thumbnailDiv.className = 'thumbnail';
  thumbnailDiv.innerHTML = `<img src="img/signIn.png" title="Sign In To Whisper">`

  // Create header-texts div
  const headerTextsDiv = document.createElement('div');
  headerTextsDiv.className = 'header-texts';
  // Create h2 for header
  const signInH2 = document.createElement('h2');
  signInH2.innerHTML = "Sign In";
  headerTextsDiv.appendChild(signInH2);
  // Create p for additional text if needed
  const signInP = document.createElement('p');
  signInP.textContent = "Enter your credentials";
  headerTextsDiv.appendChild(signInP);

  // Append thumbnail and header-texts to form-header
  formHeader.appendChild(thumbnailDiv);
  formHeader.appendChild(headerTextsDiv);

  // Append form header to signIn-form-container
  signInFormContainer.appendChild(formHeader);

  const inputTypes = ['email', 'password'];
  // const dynamicForm = createForm(inputTypes);
  // Create sign-in form
  const signInForm = createForm(inputTypes, 'Sign In');
  signInForm.id = 'signInForm';

  // Create forget password button
  const forgetPasswordBtn = document.createElement('button');
  forgetPasswordBtn.type = 'button'; // Change type if needed
  forgetPasswordBtn.innerHTML = 'Forget Password';
  signInForm.appendChild(forgetPasswordBtn);
  forgetPasswordBtn.addEventListener('click', ()=>{
    displayModalForUserEmail((email) => {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        displayWarning('<h3>Password reset email sent!</h3><p>N.B.: You may not find any email if the provided email is not registered.</p>');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
    });
  })

  // Append sign-in form to signIn-form-container
  signInFormContainer.appendChild(signInForm);

  // Create register link paragraph
  const registerLinkParagraph = document.createElement('p');
  registerLinkParagraph.innerHTML = 'Don\'t have an account?';

  const registerLink = document.createElement('span');
  registerLink.textContent = "Register";
  registerLinkParagraph.appendChild(registerLink);
  signInFormContainer.appendChild(registerLinkParagraph);
  // Add click event to register link
  registerLink.addEventListener('click', () => {
    if(signInFormContainer.classList.contains('display')){
      signInFormContainer.classList.remove('display');
      registerFormContainer.classList.add('display');
    }
  });
//========================================//
  // Create register-form-container div
  const registerFormContainer = document.createElement('div');
  registerFormContainer.id = 'register-form-container';
  registerFormContainer.className = 'form-container';

  // Create form header div
  const regFormHeader = document.createElement('div');
  regFormHeader.className = 'form-header';

  // Create thumbnail div
  const regThumbnailDiv = document.createElement('div');
  regThumbnailDiv.className = 'thumbnail';
  regThumbnailDiv.innerHTML = `<img src="img/register.png" title="Register To Whisper">`

  // Create header-texts div
  const regHeaderTextsDiv = document.createElement('div');
  regHeaderTextsDiv.className = 'header-texts';
  // Create h2 for header
  const registerH2 = document.createElement('h2');
  registerH2.innerHTML = "Register";
  regHeaderTextsDiv.appendChild(registerH2);
  // Create p for additional text if needed
  const registerP = document.createElement('p');
  registerP.textContent = "Enter your credentials";
  regHeaderTextsDiv.appendChild(registerP);

  // Append thumbnail and header-texts to form-header
  regFormHeader.appendChild(regThumbnailDiv);
  regFormHeader.appendChild(regHeaderTextsDiv);

  // Append form header to signIn-form-container
  registerFormContainer.appendChild(regFormHeader);

  // Create register form
  const registerInputTypes = ['text', 'email', 'password'];
  const registerForm = createForm(registerInputTypes, "Register");
  registerForm.id = 'registerForm';

  // Create checkbox input and label
  const checkboxGroup = document.createElement('div');
  checkboxGroup.className = 'checkbox-group';
  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.id = 'termsCheckbox'; 
  const checkboxLabel = document.createElement('label');
  checkboxLabel.textContent = 'I agree to the terms and conditions';
  checkboxLabel.setAttribute('for', 'termsCheckbox'); 

  // Append checkbox input and label to checkbox-group
  checkboxGroup.appendChild(checkboxInput);
  checkboxGroup.appendChild(checkboxLabel);

  // Insert checkbox-group before the submit button in registerForm
  const submitBtn = registerForm.querySelector('button[type="submit"]');
  registerForm.insertBefore(checkboxGroup, submitBtn);

  // Append register form to register-form-container
  registerFormContainer.appendChild(registerForm);

  // Create register link paragraph
  const signInLinkParagraph = document.createElement('p');
  signInLinkParagraph.innerHTML = 'Do you have an account?';

  const signInLink = document.createElement('span');
  signInLink.textContent = "Sign In";
  signInLinkParagraph.appendChild(signInLink);
  registerFormContainer.appendChild(signInLinkParagraph);
  // Add click event to register link
  signInLink.addEventListener('click', () => {
    if(registerFormContainer.classList.contains('display')){
      registerFormContainer.classList.remove('display');
      signInFormContainer.classList.add('display');
    }
  });

  allForms.appendChild(signInFormContainer);
  allForms.appendChild(registerFormContainer);
  credentialContainer.append(allForms);

  const mainTag = document.querySelector('main');
  mainTag.innerHTML = "";
  mainTag.appendChild(credentialContainer);

  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let signInSubmitBtn = signInForm.querySelector("button[type='submit']");
    signInSubmitBtn.innerHTML = "<i class='bx bx-loader bx-spin'></i>";

    const formData = new FormData(signInForm);
    const signInData = Object.fromEntries(formData.entries());

    const emptyInputs = Object.values(signInData).some(value => value.trim() === '');
    if (emptyInputs) {
      displayWarning("Please fill in all fields!");
      signInSubmitBtn.innerHTML = "Sign In";
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
      const user = userCredential.user;
      const docRef = doc(db, "user_profiles", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        createMainContainer(docSnap.data());
        signInSubmitBtn.innerHTML = "Submit";
      } else {
        console.log("No such document!");
        signInSubmitBtn.innerHTML = "Submit";
      }
    } catch (error) {
      signInSubmitBtn.innerHTML = "Submit";
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign in error:", errorCode, errorMessage);
      if(errorCode === "auth/invalid-credential"){
        displayWarning("User not found. try again with different email or password.");
      }
    }
  });
  

  registerForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    if (!checkboxInput.checked) {
      displayWarning("Please agree to the terms and conditions.");
      return;
    }

    let registerSubmitBtn = registerForm.querySelector("button[type='submit']");
    registerSubmitBtn.innerHTML = "<i class='bx bx-loader bx-spin'></i>"; 
    const formData = new FormData(registerForm);
    const registerData = Object.fromEntries(formData.entries());

    const emptyInputs = Object.values(registerData).some(value => value.trim() === '');
    if (emptyInputs) {
      displayWarning("Please fill in all fields!");
      registerSubmitBtn.innerHTML = "Register";
      return;
    }

    // Check email pattern
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(registerData.email)) {
      displayWarning("Please enter a valid email address.");
        registerSubmitBtn.innerHTML = "Register";
        return;
    }

    // Check password length
    if (registerData.password.length < 8) {
      displayWarning("Password must be at least 8 characters long.");
        registerSubmitBtn.innerHTML = "Register";
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const user = userCredential.user;
      const uid = user.uid;
      // Prepare user data with additional fields
      registerData.id = uid;
      registerData.connections = [];
      registerData.createdON = new Date().toISOString();

      delete registerData.password; // Remove the "password" field from the registerData object

      await setDoc(doc(db, "user_profiles", uid), registerData);

      registerSubmitBtn.innerHTML = "Register"; 
      displayWarning("User registration successful!");
  
    } catch (error) {
      registerSubmitBtn.innerHTML = "Register";
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === "auth/email-already-in-use"){
        displayWarning("Email already registered.")
      }
      console.error("Registration error:", errorCode, errorMessage);
    }
  });

}

function createForm(inputsArray, buttonText = 'Submit') {
  const form = document.createElement('form');

  inputsArray.forEach(inputType => {
    const inputField = document.createElement('input');
    inputField.type = inputType;
    if(inputType === 'text'){
      inputField.name = 'name'; 
      inputField.placeholder = `Enter your name`;
    }else{
      inputField.name = inputType.toLowerCase(); 
      inputField.placeholder = `Enter your ${inputType}`;
    }
    form.appendChild(inputField);
  });

  // Create submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = buttonText;
  form.appendChild(submitBtn);

  return form;
}

function displayModalForUserEmail(callback) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';

  // Create modal content container
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const headerTitle = document.createElement('h3');
  headerTitle.textContent = 'Forgot Password';
  const closeButton = document.createElement('button');
  closeButton.innerHTML = "<i class='bx bx-x'></i>";
  closeButton.addEventListener('click', () => {
    modal.remove(); // Remove the modal on close button click
  });
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  // Create form element
  const inputTypes = ['email'];
  const form = createForm(inputTypes, 'Send Reset Email');
  modalBody.appendChild(form);

  // Append modal header and content to modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const emailData = Object.fromEntries(formData.entries());
    const emptyInputs = Object.values(emailData).some(value => value.trim() === '');
    if (emptyInputs) {
      alert("Please fill in all fields!");
      return;
    }

    callback(emailData.email.trim()); 
    modal.remove(); 
  });
}

//==================================//
async function createMainContainer(userInfo) {
  // Create main-container div
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");

  // Create navbar-container div
  const navbarContainer = document.createElement("div");
  navbarContainer.classList.add("navbar-container");

  if(window.innerWidth <= 768){
    navbarContainer.classList.add('mobile');
  }

  // Create site-logo-container div
  const siteLogoContainer = document.createElement("div");
  siteLogoContainer.classList.add("site-logo-container");

  // Create site-logo div with an img tag
  const siteLogo = document.createElement("div");
  siteLogo.classList.add("site-logo");
  const img = document.createElement("img");
  img.src = "img/chat.png"; 
  siteLogo.appendChild(img);

  // Create site-title div with h1 and p tags
  const siteTitle = document.createElement("div");
  siteTitle.classList.add("site-title");
  siteTitle.innerHTML = "<h1>Whisper</h1><p>Connect Faster, Chat Smarter</p>";

  siteLogoContainer.appendChild(siteLogo);
  siteLogoContainer.appendChild(siteTitle);

  // Create connection-list-container div with 'loading' text-----------------//
  const connectionListContainer = document.createElement("div");
  connectionListContainer.classList.add("connection-list-container");

  const connectionListHeader = document.createElement('div');
  connectionListHeader.classList.add('connection-list-header');

  const headerMain = document.createElement('div');
  headerMain.className = 'list-header-main';

  const pTag = document.createElement("p");
  pTag.innerHTML = "Connections";
  headerMain.appendChild(pTag);

  const connectionHeaderBtnContainer = document.createElement('div');
  connectionHeaderBtnContainer.className = 'action-button-container';
  const reloadSpan = document.createElement('span');
  reloadSpan.className = 'reload-span';
  reloadSpan.innerHTML = "<i class='bx bx-refresh'></i>";
  connectionHeaderBtnContainer.appendChild(reloadSpan);
  const newConnectionSpan = document.createElement('span');
  newConnectionSpan.className = 'new-connection';
  newConnectionSpan.innerHTML = "<i class='bx bx-plus'></i>";
  connectionHeaderBtnContainer.appendChild(newConnectionSpan);
  const optionsSpan = document.createElement('span');
  optionsSpan.className = 'options-span';
  optionsSpan.innerHTML = "<i class='bx bx-dots-vertical-rounded'></i>";
  connectionHeaderBtnContainer.appendChild(optionsSpan);
  headerMain.appendChild(connectionHeaderBtnContainer);

  connectionListHeader.appendChild(headerMain);
  connectionListContainer.appendChild(connectionListHeader);
  //------------------------------------------//
  const listHolder = document.createElement('div');
  listHolder.classList.add('list-holder');
  listHolder.addEventListener('click', ()=>{
    hideMenuOptions();
  })

  const loading = document.createElement('div');
  loading.className = 'loading center';
  loading.innerHTML = "<i class='bx bx-loader bx-spin' ></i>";
  listHolder.appendChild(loading);

  connectionListContainer.appendChild(listHolder);

  const ulList = document.createElement("ul");
  ulList.id = 'menu-list';
  // Sort connections by timestamp in descending order (most recent first)
  userInfo.connections.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  // Now connectedUsers array contains connected users sorted by timestamp (most recent first)
  let initialLoadComplete = false; 
  const processedKeys = new Set(); 
  // let isConversationOpen = false;

  if(userInfo.connections.length > 0){
    userInfo.connections.forEach((connectedUser, index) => {
      let liItem = createLiElm(connectedUser)
    
      ulList.appendChild(liItem);
    });
    listHolder.innerHTML = '';
    listHolder.appendChild(ulList);
  }else{
    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer center';
    disclaimer.innerHTML = `
        <div>
          <h3>No Connections</h3>
          <p>Click on the plus icon to add new people.</p>
        </div>
    `;
    listHolder.innerHTML = '';
    listHolder.appendChild(disclaimer);
  }

  function createLiElm(connectionObj){
    let isConversationOpen = false;

    const liItem = document.createElement("li");
    const liNameSpan = document.createElement('span');
    liNameSpan.innerHTML = connectionObj.connectionName;
    liItem.appendChild(liNameSpan);
  
    let displayNewSpan = document.createElement('span');
    displayNewSpan.id = 'display-new-msg';
    liItem.appendChild(displayNewSpan);

    const commentsRef = ref(database, `${connectionObj.conversationID}/` + 'messages');
    onChildAdded(commentsRef, (data) => {
      if (initialLoadComplete && !processedKeys.has(data.key)) {
        if(!displayNewSpan.classList.contains('new') && isConversationOpen == false){
              displayNewSpan.classList.add('new');  
        }
        processedKeys.add(data.key); 
        if(userInfo.id !== data.val().sender){
          notify();
        }
      }
    });
  
    liItem.addEventListener("click", () => {
      const liElements = document.querySelectorAll('#menu-list li');
      liElements.forEach((li) => {
        li.classList.remove('active');
      });
      liItem.classList.add('active');

      handleNewConversation(userInfo, connectionObj);
      if(window.innerWidth <= 768) {
        navbarContainer.classList.remove('mobile');
      }
      if(displayNewSpan.classList.contains('new')){
        displayNewSpan.classList.remove('new');    
      }
      liElements.forEach((li) => {
        if (li === liItem) {
          isConversationOpen = true;
        } else {
          isConversationOpen = false;
        }
      });
    });

    return liItem;
  }

  setTimeout(() => {
    initialLoadComplete = true;
  }, 3000); 

  newConnectionSpan.addEventListener('click', () => {
    handleNewConnection((data) => {
      //data = friend data obj //
      const liItem = document.createElement("li");
      liItem.textContent = data.connectionName;
      // liItem.style.animationDelay = `${index*500}ms`;
      liItem.addEventListener("click", () => {
          handleNewConversation(userInfo,data);
          if(window.innerWidth <= 768) {
            navbarContainer.classList.remove('mobile');
          }

          let displayNewSpan = document.getElementById('display-new-msg');
          if(displayNewSpan.classList.contains('new')){
            displayNewSpan.classList.remove('new');    
          }
          isConversationOpen = true;
        
      });

      let menu = document.getElementById('menu-list');
      if (!menu) {
        listHolder.innerHTML = "";
        listHolder.appendChild(ulList);
      }
      ulList.appendChild(liItem);

    }, userInfo);
  });

  //--------------------------------------------//
  const headerMenuOptionContainer = document.createElement('div');
  headerMenuOptionContainer.className = "options-container";

  optionsSpan.addEventListener('click', ()=>{
    headerMenuOptionContainer.classList.toggle('show');
  })

  connectionListHeader.appendChild(headerMenuOptionContainer);
  // Create user-info-container div---------------------------------//
  const userInfoContainer = document.createElement("div");
  userInfoContainer.classList.add("user-info-container");

  // Create name-initial div with a p tag
  const nameInitial = document.createElement("div");
  nameInitial.classList.add("name-initial");
  nameInitial.textContent = userInfo.name.charAt(0).toUpperCase(); 

  // Create user-name-id div with h3 and p tags
  const userNameId = document.createElement("div");
  userNameId.classList.add("user-name-id");
  const userName = document.createElement("h3");
  userName.textContent = userInfo.name;

  const userId = document.createElement("p");
  const userIdSpan = document.createElement('span');
  userIdSpan.textContent = userInfo.id;
  userId.appendChild(userIdSpan);
  // Create span tag with copy icon
  const copyIcon = document.createElement("span");
  copyIcon.classList.add("copy-icon");
  copyIcon.innerHTML = "<i class='bx bx-copy-alt' ></i>"; 
  userId.appendChild(copyIcon);
  copyIcon.addEventListener('click', () => {
    // Create a temporary textarea element to copy text to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = userIdSpan.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    displayWarning('User ID is copied successfully.')
  });

  userNameId.appendChild(userName);
  userNameId.appendChild(userId);
  userInfoContainer.appendChild(nameInitial);
  userInfoContainer.appendChild(userNameId);

  const menuList = document.createElement('ul');
  const settingItem = document.createElement('li');
  settingItem.innerHTML = "<i class='bx bx-cog' ></i> Setting";
  const signOutItem = document.createElement('li');
  signOutItem.innerHTML = "<i class='bx bx-log-out'></i> Sign Out";
  // Append list items to ul
  menuList.appendChild(settingItem);
  menuList.appendChild(signOutItem);

  const creditTag = document.createElement('p');
  creditTag.className = "credit";
  creditTag.innerHTML = `<a href="https://github.com/tanvir-abid" target="_blank">Tanvir Abid</a> @ ${new Date().getFullYear()}. All rights reserved.`;

  headerMenuOptionContainer.appendChild(userInfoContainer);
  headerMenuOptionContainer.appendChild(menuList);
  headerMenuOptionContainer.appendChild(creditTag);
  // Append all sub-containers to navbar-container
  navbarContainer.appendChild(siteLogoContainer);
  navbarContainer.appendChild(connectionListContainer);

  // Create conversation-container div
  const conversationContainer = document.createElement("div");
  conversationContainer.classList.add("conversation-container");
  conversationContainer.innerHTML = `
      <div class='no-conversation'>
        <h1>No Conversation<h1>
      </div>
  `;
  conversationContainer.addEventListener('click', ()=>{
    hideMenuOptions();
  })

  // Append navbar-container and conversation-container to main-container
  mainContainer.appendChild(navbarContainer);
  mainContainer.appendChild(conversationContainer);

  // Append main-container to the main tag in the document
  const mainTag = document.querySelector("main");
  mainTag.innerHTML = "";
  mainTag.appendChild(mainContainer);

  signOutItem.addEventListener('click', ()=>{
    signOut(auth).then(() => {
      createCredentialContainer();
    }).catch((error) => {
      console.log(error);
    });
  });

  settingItem.addEventListener('click', ()=>{
    createSettingsModal(userInfo);
  });

  reloadSpan.addEventListener('click', async () => {
    const iconElement = reloadSpan.querySelector('.bx-refresh');
    iconElement.classList.add('bx-spin');

    const docRef = doc(db, "user_profiles", userInfo.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newFetchData = docSnap.data();
      const newConnections = newFetchData.connections;
      const oldConnections = userInfo.connections;
  
      // Find new connections
      newConnections.forEach((newConn) => {
        const isNew = !oldConnections.some((oldConn) => oldConn.userId === newConn.userId);
        if (isNew) {
          let liItem = createLiElm(newConn);
          let menu = document.getElementById('menu-list');
          if (!menu) {
            listHolder.innerHTML = "";
            listHolder.appendChild(ulList);
          }
        
          // Check if li elements exist in menu-list
          const liElements = document.querySelectorAll('#menu-list li');
          let foundMatch = false;
          liElements.forEach((li) => {
            if (li.textContent.trim() === newConn.connectionName) {
              foundMatch = true;
            }
          });
        
          // If no match found, append the li item
          if (!foundMatch) {
            ulList.appendChild(liItem);
          }
        
          iconElement.classList.remove('bx-spin');
        }else{
          iconElement.classList.remove('bx-spin');
        }
      });
    } else {
      console.log("No such document!");
    }
  });

  function hideMenuOptions(){
    if(headerMenuOptionContainer.classList.contains('show')){
      headerMenuOptionContainer.classList.remove('show');
    }
  }
  
}

function handleNewConnection(callback,user) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const headerTitle = document.createElement('h3');
  headerTitle.textContent = 'New Connection';
  const closeButton = document.createElement('button');
  closeButton.innerHTML = "<i class='bx bx-x' ></i>";
  closeButton.addEventListener('click', () => {
    modal.remove(); // Remove the modal on close button click
  });
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);

  // Create modal content container
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  // Create form element
  const form = document.createElement('form');
  form.id = 'connectionForm';

  // Create input element
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.id = 'connectionName';
  inputField.placeholder = 'Enter User ID Here...';

  // Create submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Add';

  // Append input and button to form
  form.appendChild(inputField);
  form.appendChild(submitBtn);

  // Append form to modal body
  modalBody.appendChild(form);

  // Append modal header and content to modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent)

  // Append modal to body
  document.body.appendChild(modal);

  // Focus on the input field
  inputField.focus();

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userIDInput = inputField.value;

    if(userIDInput === user.id){
      displayWarning("You can't connect to your account. Try different id.");
      return
    }
    
    const docSnap = await getDoc(doc(db, "user_profiles", userIDInput.trim()));
    if (docSnap.exists()) {
      let friendData = docSnap.data();
      const thisProfileOwner = user;

      const conversationId = "conv"+"-"+convertToSixDigitNumber(thisProfileOwner.id)+"-"+convertToSixDigitNumber(friendData.id);

      const newConnectionForOwner = {
        userId: friendData.id,
        connectionName: friendData.name,
        conversationID: conversationId,
        timestamp: new Date().toISOString() 
      };

      const newConnectionForFriend = {
        userId: thisProfileOwner.id,
        connectionName: thisProfileOwner.name,
        conversationID: conversationId,
        timestamp: new Date().toISOString() 
      };

      thisProfileOwner.connections.push(newConnectionForOwner);
      friendData.connections.push(newConnectionForFriend);

      const docRef = doc(db, "user_profiles", thisProfileOwner.id);

      await updateDoc(doc(db, "user_profiles", thisProfileOwner.id), {
        connections: thisProfileOwner.connections, 
      });

      await updateDoc(doc(db, "user_profiles", friendData.id), {
        connections: friendData.connections, 
      });

      const emptyObj =  {
        conversationID: conversationId,
        users: [thisProfileOwner.id, friendData.id],
        messages: []
      }

      set(ref(database, `${conversationId}/`), emptyObj);

      callback(newConnectionForOwner); 

      modal.remove(); 

    } else {
      modal.remove(); 
      // docSnap.data() will be undefined in this case
      displayWarning("No connection found! try again.");
    }
  });
}

//==========================//
function handleNewConversation(owner, friendObj){
    const conversation_container = document.querySelector('.conversation-container');
    conversation_container.innerHTML = "";

    const headerContainer = createConversationHeader(owner, friendObj);
    conversation_container.appendChild(headerContainer);

    const conversationContents = document.createElement('div');
    conversationContents.className = 'conversation-contents';

    const conversationMsgContainer = document.createElement('div');
    conversationMsgContainer.id = 'conversation-msg-container';
    conversationContents.appendChild(conversationMsgContainer);
    conversation_container.appendChild(conversationContents);

    const dbRef = ref(getDatabase());
    get(child(dbRef, `${friendObj.conversationID}`)).then((snapshot) => {
      if (snapshot.exists()) {
          let conversationObject = snapshot.val();
          if(conversationObject.messages){
              populateConversationMsg(owner,friendObj,conversationObject);

              const inputContainer = createConversationInput(owner, conversationObject);
              conversation_container.appendChild(inputContainer);
          }else{
            conversationMsgContainer.innerHTML = `
              <div class="no-conversation">
                <h1>No Conversation</h1>
              </div>
            `;
            conversationObject.messages = [];
            populateConversationMsg(owner,friendObj, conversationObject);

            const inputContainer = createConversationInput(owner, conversationObject);
            conversation_container.appendChild(inputContainer);
          }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
//=========================//
function createConversationHeader(owner, friend) {
  // Create conversation-header div
  const conversationHeader = document.createElement("div");
  conversationHeader.classList.add("conversation-header");

  // Create responder-name div with a p tag for name
  const responderName = document.createElement("div");
  responderName.classList.add("responder-name");
  const nameInitialSpan = document.createElement("span");
  nameInitialSpan.className = "initial";
  nameInitialSpan.textContent = friend.connectionName.charAt(0).toUpperCase();
  responderName.appendChild(nameInitialSpan);

  const nameParagraph = document.createElement("p");
  nameParagraph.innerHTML = `<strong>${friend.connectionName}</strong><span>${friend.userId}</span>`;
  responderName.appendChild(nameParagraph);

  // Create action-btn-container div with a delete button
  const actionBtnContainer = document.createElement("div");
  actionBtnContainer.classList.add("action-btn-container");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='bx bxs-trash' ></i>";
  deleteButton.addEventListener("click", () => {
    // Call the displayConfirmationModal function with the callback
    displayConfirmationModal( async () => {
      console.log(`User confirms to delete conversation with ${friend.connectionName}`);
      // Remove from the owner's document
      const ownerRef = doc(db, 'user_profiles', owner.id);
      const ownerDocSnap = await getDoc(ownerRef);
      const ownerData = ownerDocSnap.data();

      const friendRef = doc(db, 'user_profiles', friend.userId);
      const friendDocSnap = await getDoc(friendRef);
      const friendData = friendDocSnap.data();

      if (!ownerData || !ownerData.connections && !friendData || !friendData.connections) {
        console.error("Owner data or connections not found!");
        return; // Exit if no data or no connections array
      }

      const updatedOwnerConnections = ownerData.connections.filter(
        (connection) => connection.conversationID !== friend.conversationID
      );

      const updatedFriendConnections = friendData.connections.filter(
        (connection) => connection.conversationID !== friend.conversationID
      );

      await updateDoc(ownerRef, {
        connections: updatedOwnerConnections,
      });
      await updateDoc(friendRef, {
        connections: updatedFriendConnections,
      });

      const messageRef = ref(database, friend.conversationID);
      remove(messageRef)
      .then(()=>{
        alert('Deletion successfull!!');
        // Reload the window
        window.location.reload();
      })
      .catch((error)=>{
        console.log(error);
      })

    });
  });

  actionBtnContainer.appendChild(deleteButton);

  if(window.innerWidth <= 768){
    const hideConversationBtn = document.createElement('button');
    hideConversationBtn.type = 'button';
    hideConversationBtn.innerHTML = "<i class='bx bx-x'></i>";
    hideConversationBtn.addEventListener('click', ()=>{
      document.querySelector('.navbar-container').classList.add('mobile');
      document.querySelector('.conversation-container').innerHTML = "";
    })
    actionBtnContainer.appendChild(hideConversationBtn);
  }

  // Append responder-name and action-btn-container to conversation-header
  conversationHeader.appendChild(responderName);
  conversationHeader.appendChild(actionBtnContainer);

  return conversationHeader;
}

function populateConversationMsg(owner,friend,data) {
  const conversationMsgContainer = document.getElementById("conversation-msg-container");
  if (!conversationMsgContainer) {
    console.error("Conversation message container not found.");
    return;
  }

  let firstLoad = true; // Flag variable to track first load

  // Function to handle messages
  function handleMessage(data) {
    if (!firstLoad) {
      let msgObj = data.val();
      singleMessageContent(msgObj);
      // if(owner.id !== msgObj.sender){
      //   notify();
      // }

    }
  }
  // Handle initial load
  if (data.messages) {
    Object.values(data.messages).forEach((message) => {
      singleMessageContent(message);
    });
  }
  const messageRef = ref(database, `${friend.conversationID}/` + 'messages');
  onChildAdded(messageRef, (data) => {
    handleMessage(data);
  });
  // Set firstLoad to false after the initial load condition
  firstLoad = false;

  function singleMessageContent(messageObj){
    const message = messageObj.message.trim();
    const sender = messageObj.sender.trim();
    const timestamp = messageObj.timestamp;

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");

    let senderName;

    if(owner.id === sender){
      messageContent.classList.add('owner');
      senderName = owner.name;
    }else{
      messageContent.classList.add('response');
      senderName = friend.connectionName;
    }
    
    const initialDiv = document.createElement("div");
    initialDiv.classList.add("initial");
    initialDiv.textContent = senderName.charAt(0).toUpperCase();
    
    const messageDiv = document.createElement("div");
    
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    
    const statusEm = document.createElement("em");
    const statusIcon = document.createElement('span');
    statusIcon.innerHTML = "<i class='bx bx-check'></i>"
    statusEm.appendChild(statusIcon);
    const timestampSpan = document.createElement('span');
    timestampSpan.textContent = convertToLocalTime(timestamp);
    statusEm.appendChild(timestampSpan);
    
    // Append elements
    messageDiv.appendChild(messageParagraph);
    messageDiv.appendChild(statusEm);
    
    messageContent.appendChild(initialDiv);
    messageContent.appendChild(messageDiv);

    const noCon = conversationMsgContainer.querySelector('.no-conversation');
    if(noCon){
      noCon.remove();
    }
    conversationMsgContainer.appendChild(messageContent);

    conversationMsgContainer.scrollTop = conversationMsgContainer.scrollHeight;
  }
}

function createConversationInput(ownerObj, conversationObj) {
  const conversationInputContainer = document.createElement("div");
  conversationInputContainer.classList.add("conversation-input-container");

  const inputForm = document.createElement("form");
  inputForm.classList.add("input-group");

  const messageInput = document.createElement("input");
  messageInput.focus();
  messageInput.type = "text";
  messageInput.placeholder = "Type your message...";
  inputForm.appendChild(messageInput);

  const sendButton = document.createElement("button");
  sendButton.type = 'submit';
  sendButton.innerHTML = "<i class='bx bx-paper-plane' ></i> Send";
  inputForm.appendChild(sendButton);

  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      const newMessageToSend = {
        sender: ownerObj.id,
        timestamp: serverTimestamp(),
        message: messageText
      };

      const postListRef = ref(database, `${conversationObj.conversationID}/` +'messages');
      const newPostRef = push(postListRef);
      set(newPostRef, newMessageToSend);
    }

    inputForm.reset();
  });


  conversationInputContainer.appendChild(inputForm);

  return conversationInputContainer;
}

//==================================//
// Function to display confirmation modal
function displayConfirmationModal(callback) {
   // Create modal
   const modal = document.createElement('div');
   modal.className = 'modal';
 
   // Create modal content container
   const modalContent = document.createElement('div');
   modalContent.className = 'modal-content';
 
   // Create modal header
   const modalHeader = document.createElement('div');
   modalHeader.className = 'modal-header';
   const headerTitle = document.createElement('h3');
   headerTitle.textContent = 'Warning';
   const closeButton = document.createElement('button');
   closeButton.innerHTML = "<i class='bx bx-x'></i>";
   closeButton.addEventListener('click', () => {
     modal.remove(); // Remove the modal on close button click
   });
   modalHeader.appendChild(headerTitle);
   modalHeader.appendChild(closeButton);
 
   // Create modal body
   const modalBody = document.createElement('div');
   modalBody.className = 'modal-body';
   const warningMessage = document.createElement('p');
   warningMessage.textContent = "Are you sure you want to delete this conversation?";
   modalBody.appendChild(warningMessage);

   const confirmBtn = document.createElement('button');
   confirmBtn.type = 'button';
   confirmBtn.innerHTML = "Confirm";
   confirmBtn.addEventListener('click', () => {
      callback(); 
      modal.remove(); 
   });
   modalBody.appendChild(confirmBtn);
 
   // Append modal header and content to modal
   modalContent.appendChild(modalHeader);
   modalContent.appendChild(modalBody);
   modal.appendChild(modalContent);
 
   // Append modal to body
   document.body.appendChild(modal);
}

function displayWarning(message) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';

  // Create modal content container
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const headerTitle = document.createElement('h3');
  headerTitle.textContent = 'Notification';
  const closeButton = document.createElement('button');
  closeButton.innerHTML = "<i class='bx bx-x'></i>";
  closeButton.addEventListener('click', () => {
    modal.remove(); // Remove the modal on close button click
  });
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  const warningMessage = document.createElement('div');
  warningMessage.innerHTML = message;
  modalBody.appendChild(warningMessage);

  // Append modal header and content to modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);
}

function convertToSixDigitNumber(id) {
  // Generate a hash of the ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
      let char = id.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
  }

  // Get a positive value
  const positiveHash = Math.abs(hash);

  // Extract a 6-digit number from the hash
  const sixDigitNumber = positiveHash % 1000000;

  // Ensure the number is 6 digits by padding with zeros if needed
  const paddedSixDigitNumber = sixDigitNumber.toString().padStart(6, '0');

  return paddedSixDigitNumber;
}

function convertToLocalTime(timestamp) {
  const date = new Date(timestamp);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const localDateTime = date.toLocaleString(undefined, options);
  return localDateTime;
}

function notify(){
  const audio = new Audio('sound/message-alert.mp3');
  audio.play();
}

//=======================//

function createSettingsModal(userProfile) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const headerTitle = document.createElement('h3');
  headerTitle.innerHTML = "<i class='bx bx-cog' ></i> Settings";
  const closeButton = document.createElement('button');
  closeButton.innerHTML = "<i class='bx bx-x' ></i>";
  closeButton.addEventListener('click', () => {
    modal.remove(); // Remove the modal on close button click
  });
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);

  // Create modal content container
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  const settingsContainer = document.createElement('div');
  settingsContainer.className = 'settings-container';

  const idGroup = createSettingGroup('ID', userProfile.id);
  const nameGroup = createSettingGroup('Name', userProfile.name);
  const emailGroup = createSettingGroup('Email', userProfile.email);
  // Append setting groups to the settings container
  settingsContainer.appendChild(idGroup);
  settingsContainer.appendChild(nameGroup);
  settingsContainer.appendChild(emailGroup);

  const changePassGroup = document.createElement('div');
  changePassGroup.className = "setting-group change-password";

  const changePassH3 = document.createElement('h4');
  changePassH3.innerHTML = "<i class='bx bx-lock-alt'></i> Do you want to change your password?";
  changePassGroup.appendChild(changePassH3);

  const groupValues = document.createElement('div');
  groupValues.classList.add('group-values');

  const changePassBtn = document.createElement('button');
  changePassBtn.type = 'button';
  changePassBtn.innerHTML = 'Change Password';
  // Add click event to changePassBtn
  changePassBtn.addEventListener('click', function(event) {
      event.preventDefault(); 
      changePassBtn.innerHTML = "<i class='bx bx-loader bx-spin' ></i>";

      sendPasswordResetEmail(auth, userProfile.email)
      .then(() => {
        changePassBtn.innerHTML = 'Change Password';
        displayWarning(`A password reset mail has been sent to ${userProfile.email}. Check your email to reset your password. Thank you.`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        changePassBtn.innerHTML = 'Change Password';
      });
  });

  groupValues.appendChild(changePassBtn);
  changePassGroup.appendChild(groupValues);

  settingsContainer.appendChild(changePassGroup);

  modalBody.appendChild(settingsContainer);
  // Append modal header and content to modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

}

// Function to create setting groups
function createSettingGroup(key, value) {
  const groupContainer = document.createElement('div');
  groupContainer.classList.add('setting-group');
  const icons = {
    ID: "<i class='bx bxs-user-badge'></i>",
    Name: "<i class='bx bx-user-circle' ></i>",
    Email: "<i class='bx bx-envelope' ></i>",
  };
  const groupKey = document.createElement('h3');
  groupKey.innerHTML = `${icons[key]} ${key}`;

  const groupValues = document.createElement('div');
  groupValues.classList.add('group-values');

    // For email, just display the value without edit option
    const valueParagraph = document.createElement('p');
    valueParagraph.textContent = value;
    groupValues.appendChild(valueParagraph);


  groupContainer.appendChild(groupKey);
  groupContainer.appendChild(groupValues);

  return groupContainer;
}