// Firebase e imports permanecem os mesmos
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
// Importar Firestore: collection, addDoc, getDocs, query, orderBy, limit, doc, getDoc, updateDoc, setDoc, serverTimestamp, where, deleteDoc
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, getDoc, updateDoc, setDoc, serverTimestamp, where, deleteDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Configuração do Firebase (MANTIDA COMO FORNECIDA PELO USUÁRIO)
const firebaseConfig = {
  apiKey: "AIzaSyCenbkggBbZmkc8ULS--1iL0KIsm4Flmpk", // ATENÇÃO: SUBSTITUA PELA SUA CHAVE REAL E PROTEJA-A!
  authDomain: "butchercode-4e998.firebaseapp.com",
  projectId: "butchercode-4e998",
  storageBucket: "butchercode-4e998.firebaseapp.com",
  messagingSenderId: "535961032533",
  appId: "1:535961032533:web:de1ad79b53c18f125d01dc"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Adicionado para depuração: Verifica se o script está sendo carregado
console.log("script.js carregado e executando!");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded disparado. Iniciando a aplicação.");

  // --- Seletores de Elementos DOM ---
  const authModalOverlay = document.getElementById('authModalOverlay');
  const authModalTitle = document.getElementById('authModalTitle');
  const authPrompt = document.getElementById('authPrompt');
  const passwordInput = document.getElementById('passwordInput');
  const usernameInputDOM = document.getElementById('usernameInput');
  const authSubmit = document.getElementById('authSubmit');
  const registerButton = document.getElementById('registerButton');
  const authError = document.getElementById('authError');
  const closeAuthModalButton = document.getElementById('closeAuthModal');

  const welcomeMessage = document.getElementById('welcomeMessage');
  const initialScreenOptions = document.getElementById('initial-screen-options');
  const butcherCodeTitle = document.getElementById('butcherCodeTitle');
  const logoutSection = document.getElementById('logoutSection');
  const logoutButton = document.getElementById('logoutButton');
  const userProfileMenuItem = document.getElementById('userProfileMenuItem');

  const loginRegisterSidebarItem = document.getElementById('loginRegisterSidebarItem');
  const loginRegisterSidebarButton = document.getElementById('loginRegisterSidebarButton');
  const loginRegisterInitialScreen = document.getElementById('loginRegisterInitialScreen');
  const loginInitialLink = document.getElementById('loginInitialLink');
  const registerInitialLink = document.getElementById('registerInitialLink');

  const userProfileSection = document.getElementById('userProfileSection');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const userEmailDisplay = document.getElementById('userEmailDisplay');
  const editUsernameButton = document.getElementById('editUsernameButton');
  const newUsernameInput = document.getElementById('newUsernameInput');
  const saveUsernameButton = document.getElementById('saveUsernameButton');
  const usernameUpdateFeedback = document.getElementById('usernameUpdateFeedback');
  const adminStatusText = document.getElementById('adminStatusText');
  const cooperatorStatusText = document.getElementById('cooperatorStatusText');
  const showAddProductFromProfileButton = document.getElementById('showAddProductFromProfileButton');
  const showAdminManageProductsFromProfileButton = document.getElementById('showAdminManageProductsFromProfileButton');
  const showAdminManageUsersFromProfileButton = document.getElementById('showAdminManageUsersFromProfileButton');

  const mainTerminalSection = document.getElementById('mainTerminalSection');
  const inputCode = document.getElementById('inputCode');
  const btnExecute = document.getElementById('btnExecute');
  const resultDiv = document.getElementById('result');
  const bovinosList = document.getElementById('bovinosList');
  const suinosList = document.getElementById('suinosList');

  const addProductSectionDOM = document.getElementById('addProductSection');
  const inputNewCode = document.getElementById('inputNewCode');
  const inputNewName = document.getElementById('inputNewName');
  const selectNewCategory = document.getElementById('selectNewCategory');
  const btnAddNewProduct = document.getElementById('btnAddNewProduct');
  const addProductFeedback = document.getElementById('addProductFeedback');
  const backToHomeAddProductButton = document.getElementById('backToHomeAddProduct');
  const addProductSectionTitle = document.querySelector('#addProductSection h2');

  const commentsSectionDOM = document.getElementById('commentsSection');
  const commentLabel = document.getElementById('commentLabel');
  const commentInput = document.getElementById('commentInput');
  const submitCommentButton = document.getElementById('submitCommentButton');
  const commentsFeedback = document.getElementById('commentsFeedback');
  const commentsList = document.getElementById('commentsList');
  const loginToCommentMessage = document.getElementById('loginToCommentMessage');
  const backToHomeCommentsButton = document.getElementById('backToHomeComments');

  const mainContent = document.querySelector('main');
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarTitles = document.querySelectorAll('#sidebar h2[data-type="accordion"]');
  const initialScreen = document.getElementById('initialScreen');

  const accessTerminalButton = document.getElementById('accessTerminalButton');
  const accessGamesButton = document.getElementById('accessGamesButton');
  const viewCommentsButton = document.getElementById('viewCommentsButton');
  const accessInstructionsButton = document.getElementById('accessInstructionsButton');

  const gamesHubSection = document.getElementById('gamesHubSection');
  const playGameCodeFromHubButton = document.getElementById('playGameCodeFromHubButton');
  const playFlashcardGameButton = document.getElementById('playFlashcardGameButton');
  const backToHomeFromGamesHubButton = document.getElementById('backToHomeFromGamesHub');

  const instructionsSection = document.getElementById('instructionsSection');
  const backToHomeFromInstructionsButton = document.getElementById('backToHomeFromInstructions');

  const gameCodeSection = document.getElementById('gameCodeSection');
  const backToGamesHubFromGameCodeButton = document.getElementById('backToGamesHubFromGameCode');

  const flashcardGameSection = document.getElementById('flashcardGameSection');
  const flashcardDiv = document.getElementById('flashcard');
  const flashcardFrontLabel = document.getElementById('flashcard-front-label');
  const flashcardFrontContent = document.getElementById('flashcard-front-content');
  const flashcardBackLabel = document.getElementById('flashcard-back-label');
  const flashcardBackContent = document.getElementById('flashcard-back-content');
  const flipCardButton = document.getElementById('flip-card-button');
  const flashcardControlsDiv = document.getElementById('flashcard-controls');
  const difficultyButtons = document.querySelectorAll('.difficulty-btn');
  const nextFlashcardButton = document.getElementById('next-flashcard-button');
  const restartFlashcardButton = document.getElementById('restart-flashcard-button');
  const flashcardFeedbackDiv = document.getElementById('flashcard-feedback');
  const backToGamesHubFromFlashcardButton = document.getElementById('backToGamesHubFromFlashcard');

  const backToHomeTerminalButton = document.getElementById('backToHomeTerminal');
  const backToHomeProfileButton = document.getElementById('backToHomeProfile');

  const gameStartScreen = document.getElementById('game-start-screen');
  const gameEndScreen = document.getElementById('game-end-screen');
  const gameElements = document.getElementById('game-elements');
  const startGameButton = document.getElementById('start-game-button');
  const restartGameButton = document.getElementById('restart-game-button');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const feedbackElement = document.getElementById('feedback');
  const scoreDisplayElement = document.getElementById('score-display');
  const nextQuestionButton = document.getElementById('next-question');
  const progressBar = document.getElementById('progress-bar');
  const timerElement = document.getElementById('timer');
  const questionCounterElement = document.getElementById('question-counter');
  const finalScoreMessage = document.getElementById('final-score-message');
  const endGameButton = document.getElementById('end-game-button');

  const adminProductManagementSection = document.getElementById('adminProductManagementSection');
  const adminBovinosList = document.getElementById('adminBovinosList');
  const adminSuinosList = document.getElementById('adminSuinosList');
  const adminProductManagementFeedback = document.getElementById('adminProductManagementFeedback');
  const backToHomeAdminProductsButton = document.getElementById('backToHomeAdminProducts');

  const adminUserManagementSection = document.getElementById('adminUserManagementSection');
  const adminUserList = document.getElementById('adminUserList');
  const adminUserManagementFeedback = document.getElementById('adminUserManagementFeedback');
  const backToProfileFromUserAdminButton = document.getElementById('backToProfileFromUserAdmin');


  // --- Variáveis Globais e Estado ---
  let currentUser = null;
  let currentUserRole = 'user';
  let activeAccordionItem = null;
  let productData = { bovinos: {}, suinos: {} };
  let productsInverseNormalized = {};

  const GAME_CODE_STATE_KEY = "game_code_state";
  const TIME_PER_QUESTION = 15;
  let gameCodeTimeLeft, gameCodeTimerInterval, gameCodeTickSoundInterval;
  let gameCodeCurrentQuestionIndex = 0, gameCodeScore = 0, gameCodeQuestions = [];

  const FLASHCARD_DIFFICULTY_KEY = "butchercode_flashcard_difficulties";
  let flashcardDifficulties = {};
  let currentFlashcard = null;
  let allFlashcardProducts = [];
  let isFlashcardTransitioning = false;


  const sounds = {
      correct: new Audio('images/sounds/correct.mp3'),
      incorrect: new Audio('images/sounds/incorrect.mp3'),
      gameStart: new Audio('images/sounds/game-start.mp3'),
      gameEnd: new Audio('images/sounds/game-end.mp3'),
      tick: new Audio('images/sounds/tick.mp3'),
      terminalSuccess: new Audio('images/sounds/terminal-success.mp3'),
      terminalError: new Audio('images/sounds/terminal-error.mp3'),
      flip: new Audio('images/sounds/flip.mp3')
  };

  // --- Funções Utilitárias ---
  function playSound(soundName) {
      if (sounds[soundName]) {
          sounds[soundName].currentTime = 0;
          sounds[soundName].play().catch(e => console.warn("Erro ao tocar som:", soundName, e));
      }
  }

  function normalizeText(text) {
      return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/\s+/g, '')
          .trim();
  }

  function generateFakeEmail(username) {
      return `${normalizeText(username).replace(/[^a-z0-9]/g, '')}@butchercode.com`;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // --- Lógica de UI e Navegação ---
  function updateUserAccessUI() {
      const isAdmin = currentUserRole === 'admin';
      const isCooperator = currentUserRole === 'cooperator';
      const isLoggedIn = !!currentUser;

      if (loginRegisterSidebarItem) loginRegisterSidebarItem.style.display = isLoggedIn ? 'none' : 'block';
      if (loginRegisterInitialScreen) loginRegisterInitialScreen.style.display = isLoggedIn ? 'none' : 'block';

      if (userProfileMenuItem) userProfileMenuItem.style.display = isLoggedIn ? 'block' : 'none';
      if (logoutSection) logoutSection.style.display = isLoggedIn ? 'block' : 'none';

      if (showAddProductFromProfileButton) {
          showAddProductFromProfileButton.style.display = isLoggedIn && (isAdmin || isCooperator) ? 'inline-block' : 'none';
      }
      if (showAdminManageProductsFromProfileButton) {
          showAdminManageProductsFromProfileButton.style.display = isLoggedIn && isAdmin ? 'inline-block' : 'none';
      }
      if (showAdminManageUsersFromProfileButton) {
          showAdminManageUsersFromProfileButton.style.display = isLoggedIn && isAdmin ? 'inline-block' : 'none';
      }
      if(adminStatusText) adminStatusText.style.display = isLoggedIn && isAdmin ? 'block' : 'none';
      if(cooperatorStatusText) cooperatorStatusText.style.display = isLoggedIn && isCooperator && !isAdmin ? 'block' : 'none';


      if (mainContent.classList.contains('show-comments')) {
          loadComments();
      }
      if (mainContent.classList.contains('show-admin-products') && !isAdmin) {
          showSection('initialScreen');
      }
       if (mainContent.classList.contains('show-admin-users') && !isAdmin) {
          showSection('initialScreen');
      }
      const addProductSectionEl = document.getElementById('addProductSection');
      const editingCode = addProductSectionEl ? addProductSectionEl.dataset.editingCode : null;

      if (mainContent.classList.contains('show-add-product')) {
          if (editingCode && !isAdmin) {
              showSection('initialScreen');
          } else if (!editingCode && (!isLoggedIn || (!isAdmin && !isCooperator))) {
               showSection('initialScreen');
          }
      }
  }

  function showSection(sectionId, fromSubSection = false) {
      mainContent.classList.remove('show-terminal', 'show-game', 'show-initial',
                                  'show-add-product', 'show-comments', 'show-profile',
                                  'show-admin-products', 'show-admin-users', 'show-games-hub',
                                  'show-flashcard-game', 'show-instructions');
      document.querySelectorAll('.back-to-home-button, .back-to-games-hub-button, #backToProfileFromUserAdmin').forEach(btn => {
          if(btn) btn.style.display = 'none';
      });


      if (sectionId !== 'gameCodeSection') {
          clearInterval(gameCodeTimerInterval); clearInterval(gameCodeTickSoundInterval);
      }

      let targetButtonToDisplay = null;

      if (sectionId === 'mainTerminalSection') {
          mainContent.classList.add('show-terminal');
          targetButtonToDisplay = backToHomeTerminalButton;
      } else if (sectionId === 'gamesHubSection') {
          mainContent.classList.add('show-games-hub');
          targetButtonToDisplay = backToHomeFromGamesHubButton;
      } else if (sectionId === 'gameCodeSection') {
          mainContent.classList.add('show-game');
          if(gameStartScreen) gameStartScreen.style.display = 'flex';
          if(gameElements) gameElements.style.display = 'none';
          if(gameEndScreen) gameEndScreen.style.display = 'none';
          targetButtonToDisplay = backToGamesHubFromGameCodeButton;
      } else if (sectionId === 'flashcardGameSection') {
          mainContent.classList.add('show-flashcard-game');
          startFlashcardGame();
          targetButtonToDisplay = backToGamesHubFromFlashcardButton;
      } else if (sectionId === 'instructionsSection') {
          mainContent.classList.add('show-instructions');
          targetButtonToDisplay = backToHomeFromInstructionsButton;
      } else if (sectionId === 'addProductSection') {
          const isAdmin = currentUserRole === 'admin';
          const isCooperator = currentUserRole === 'cooperator';
          const canAccessAddProduct = isAdmin || isCooperator;

          if (!currentUser) {
              showAuthModal('Você precisa fazer login para acessar esta funcionalidade.');
              return;
          }
          const addProductSectionEl = document.getElementById('addProductSection');
          const isEditing = addProductSectionEl && addProductSectionEl.dataset.editingCode;

          if (!isEditing && !canAccessAddProduct) {
              showAuthModal('Você não tem permissão para adicionar produtos.', 'Acesso Negado');
              setTimeout(() => showSection('initialScreen'), 0);
              return;
          }
          if (isEditing && !isAdmin) {
               showAuthModal('Apenas administradores podem editar produtos.', 'Acesso Negado');
              setTimeout(() => showSection('initialScreen'), 0);
              return;
          }
          mainContent.classList.add('show-add-product');
          targetButtonToDisplay = backToHomeAddProductButton;
          if (!isEditing) {
              resetAddProductForm();
          }
      } else if (sectionId === 'commentsSection') {
          mainContent.classList.add('show-comments');
          loadComments();
          targetButtonToDisplay = backToHomeCommentsButton;
           if (currentUser) {
              if(commentLabel) commentLabel.style.display = 'block';
              if(commentInput) { commentInput.style.display = 'block'; commentInput.disabled = false; }
              if(submitCommentButton) { submitCommentButton.style.display = 'block'; submitCommentButton.disabled = false; }
              if(loginToCommentMessage) loginToCommentMessage.style.display = 'none';
          } else {
              if(commentLabel) commentLabel.style.display = 'none';
              if(commentInput) { commentInput.style.display = 'none'; commentInput.disabled = true; }
              if(submitCommentButton) { submitCommentButton.style.display = 'none'; submitCommentButton.disabled = true; }
              if(loginToCommentMessage) {
                  loginToCommentMessage.style.display = 'block';
                  loginToCommentMessage.innerHTML = `Você precisa <a href="#" id="loginLinkFromComments" style="color: var(--cor-link-padrao);">fazer login</a> para comentar.`;
                  loginToCommentMessage.classList.remove('correct', 'error', 'warning');
                  loginToCommentMessage.classList.add('warning');
                  const loginLink = document.getElementById('loginLinkFromComments');
                  if (loginLink && !loginLink.dataset.listenerAttached) {
                      loginLink.addEventListener('click', (e) => {
                          e.preventDefault();
                          showAuthModal('Faça login para poder comentar.');
                      });
                      loginLink.dataset.listenerAttached = 'true';
                  }
              }
          }
      } else if (sectionId === 'userProfileSection') {
          if (!currentUser) {
              showAuthModal('Você precisa fazer login para ver seu perfil.');
              return;
          }
          mainContent.classList.add('show-profile');
          if (currentUser && currentUser.uid && db) {
              getDoc(doc(db, 'users', currentUser.uid)).then(docSnap => {
                  const userData = docSnap.exists() ? docSnap.data() : null;
                  const displayName = userData && userData.username ? userData.username : (currentUser.email ? currentUser.email.split('@')[0] : 'Usuário');

                  if(usernameDisplay) {
                      usernameDisplay.textContent = displayName;
                      usernameDisplay.classList.remove('admin-username', 'cooperator-username');
                      if (currentUserRole === 'admin') usernameDisplay.classList.add('admin-username');
                      else if (currentUserRole === 'cooperator') usernameDisplay.classList.add('cooperator-username');
                  }
                  if(userEmailDisplay && currentUser.email) userEmailDisplay.textContent = currentUser.email;
                  updateUserAccessUI();
              }).catch(e => {
                  console.error("Erro ao carregar dados do perfil:", e);
                   const fallbackUsername = currentUser.email ? currentUser.email.split('@')[0] : 'Usuário';
                  if(usernameDisplay) {
                       usernameDisplay.textContent = fallbackUsername;
                       usernameDisplay.classList.remove('admin-username', 'cooperator-username');
                  }
                  if(userEmailDisplay && currentUser.email) userEmailDisplay.textContent = currentUser.email;
              });
          }
          targetButtonToDisplay = backToHomeProfileButton;
      } else if (sectionId === 'adminProductManagementSection') {
          if (!currentUser || currentUserRole !== 'admin') {
              showAuthModal('Acesso restrito a administradores.');
              if (currentUser && currentUserRole !== 'admin') setTimeout(() => showSection('initialScreen'),0);
              return;
          }
          mainContent.classList.add('show-admin-products');
          populateAdminProductLists();
          targetButtonToDisplay = backToHomeAdminProductsButton;
      } else if (sectionId === 'adminUserManagementSection') {
          if (!currentUser || currentUserRole !== 'admin') {
              showAuthModal('Acesso restrito a administradores.');
               if (currentUser && currentUserRole !== 'admin') setTimeout(() => showSection('initialScreen'),0);
              return;
          }
          mainContent.classList.add('show-admin-users');
          populateAdminUserList();
          targetButtonToDisplay = backToProfileFromUserAdminButton;
      } else {
          mainContent.classList.add('show-initial');
          if(welcomeMessage) welcomeMessage.classList.add('show');
          if(initialScreenOptions) initialScreenOptions.classList.add('show');
      }

      if(targetButtonToDisplay) targetButtonToDisplay.style.display = 'block';

      if (!fromSubSection) {
          if (hamburger) hamburger.classList.remove('open');
          if (sidebar) sidebar.classList.remove('open');
          document.body.classList.remove('sidebar-open');
      }
  }


  function showAuthModal(reasonMessage = '', generalPrompt = 'Faça login ou crie uma conta para prosseguir:') {
    if(authModalTitle) authModalTitle.textContent = 'Bem-vindo, Mestre Açougueiro!';
    if (reasonMessage && authPrompt) {
        authPrompt.textContent = reasonMessage;
    } else if(authPrompt) {
        authPrompt.textContent = generalPrompt;
    }
    if(authError) authError.textContent = '';
    if(authModalOverlay) authModalOverlay.classList.add('show');

    if(authSubmit) authSubmit.textContent = 'Entrar';
    if(registerButton) registerButton.textContent = 'Criar Conta';

    if(usernameInputDOM) {
      usernameInputDOM.value = '';
    }
    if(passwordInput) passwordInput.value = '';
  }

  onAuthStateChanged(auth, async (user) => {
      if (user) {
          currentUser = user;
          try {
              const userDocRef = doc(db, 'users', user.uid);
              const userDocSnap = await getDoc(userDocRef);
              const userData = userDocSnap.exists() ? userDocSnap.data() : null;

              const displayName = userData && userData.username ? userData.username : (user.email ? user.email.split('@')[0] : 'Usuário');
              currentUserRole = userData && userData.role ? userData.role : 'user';

              let welcomeDisplayName = displayName;
               if (currentUserRole === 'admin') {
                  welcomeDisplayName = `<span class="admin-username">${displayName} (Admin)</span>`;
              } else if (currentUserRole === 'cooperator') {
                  welcomeDisplayName = `<span class="cooperator-username">${displayName} (Cooperador)</span>`;
              }

              if(welcomeMessage) welcomeMessage.innerHTML = `Bem-vindo, ${welcomeDisplayName}! <br>Vamos aos cortes!`;

              if (mainContent.classList.contains('show-profile') && usernameDisplay) {
                  usernameDisplay.textContent = displayName;
                  usernameDisplay.classList.remove('admin-username', 'cooperator-username');
                  if (currentUserRole === 'admin') usernameDisplay.classList.add('admin-username');
                  else if (currentUserRole === 'cooperator') usernameDisplay.classList.add('cooperator-username');
              }
              if(userEmailDisplay && user.email) userEmailDisplay.textContent = user.email;


          } catch (error) {
              console.error("Erro ao carregar dados do usuário no Firestore:", error);
              const fallbackUsername = user.email ? user.email.split('@')[0] : 'Usuário';
              if(welcomeMessage) welcomeMessage.innerHTML = `Bem-vindo, ${fallbackUsername}! <br>Vamos aos cortes!`;
              if(usernameDisplay && mainContent.classList.contains('show-profile')) {
                   usernameDisplay.textContent = fallbackUsername;
                   usernameDisplay.classList.remove('admin-username', 'cooperator-username');
              }
              if(userEmailDisplay && user.email && mainContent.classList.contains('show-profile')) userEmailDisplay.textContent = user.email;
              currentUserRole = 'user';
          }

          if(welcomeMessage) welcomeMessage.classList.add('show');
          if(initialScreenOptions) initialScreenOptions.classList.add('show');
          if(authModalOverlay) authModalOverlay.classList.remove('show');
          if(loginRegisterInitialScreen) loginRegisterInitialScreen.style.display = 'none';

      } else {
          currentUser = null;
          currentUserRole = 'user';
          if(welcomeMessage) {
            welcomeMessage.innerHTML = "Bem-vindo ao ButcherCode! <br>Sua central de códigos e informações de açougue.";
          }
          if(welcomeMessage) welcomeMessage.classList.add('show');
          if(initialScreenOptions) initialScreenOptions.classList.add('show');
          if(authModalOverlay) authModalOverlay.classList.remove('show');
          if(loginRegisterInitialScreen) loginRegisterInitialScreen.style.display = 'block';

          if(usernameDisplay && mainContent.classList.contains('show-profile')) {
               usernameDisplay.textContent = '';
               usernameDisplay.classList.remove('admin-username', 'cooperator-username');
          }
          if(userEmailDisplay && mainContent.classList.contains('show-profile')) userEmailDisplay.textContent = '';


          const isRestrictedSectionForGuests = mainContent.classList.contains('show-profile') ||
                                               mainContent.classList.contains('show-add-product') ||
                                               mainContent.classList.contains('show-admin-products') ||
                                               mainContent.classList.contains('show-admin-users');
          if (isRestrictedSectionForGuests) {
               showSection('initialScreen');
          } else if (mainContent.classList.contains('show-comments')) {
               showSection('commentsSection');
          }
      }
      updateUserAccessUI();
  });


  if (closeAuthModalButton) {
      closeAuthModalButton.addEventListener('click', () => {
          if (authModalOverlay) authModalOverlay.classList.remove('show');
      });
  }
  if (authModalOverlay) {
      authModalOverlay.addEventListener('click', (event) => {
          if (event.target === authModalOverlay) {
              authModalOverlay.classList.remove('show');
          }
      });
  }

  if(authSubmit) {
      authSubmit.addEventListener('click', async () => {
          const usernameVal = usernameInputDOM.value.trim();
          const passwordVal = passwordInput.value.trim();
          if(authError) authError.textContent = '';

          if (authSubmit.textContent === 'Voltar para Login') {
              if(authModalTitle) authModalTitle.textContent = 'Bem-vindo, Mestre Açougueiro!';
              if(authPrompt) authPrompt.textContent = 'Faça login ou crie uma conta para prosseguir:';
              authSubmit.textContent = 'Entrar';
              if(registerButton) registerButton.textContent = 'Criar Conta';
              return;
          }

          if (!usernameVal || !passwordVal) {
              if(authError) authError.textContent = 'Por favor, insira nome de usuário e senha.';
              return;
          }

          try {
              // REMOVIDO: Consulta Firestore para buscar fakeEmail.
              // Agora o fakeEmail é gerado diretamente.
              const fakeEmail = generateFakeEmail(usernameVal);

              await signInWithEmailAndPassword(auth, fakeEmail, passwordVal);
              // Se o login for bem-sucedido, onAuthStateChanged cuidará da UI.
          } catch (error) {
              console.error("Erro ao fazer login:", error);
              let errorMessage = "Erro no login.";
              if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
                  errorMessage = "Nome de usuário ou senha inválidos.";
              } else if (error.code === 'auth/too-many-requests') {
                  errorMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
              } else {
                  errorMessage = `Erro: ${error.message}`;
              }
              if(authError) authError.textContent = errorMessage;
          }
      });
  }

  if(registerButton) {
      registerButton.addEventListener('click', async () => {
          const usernameVal = usernameInputDOM.value.trim();
          const passwordVal = passwordInput.value.trim();
          if(authError) authError.textContent = '';

          if (registerButton.textContent === 'Criar Conta') {
              if(authModalTitle) authModalTitle.textContent = 'Criar Nova Conta';
              if(authPrompt) authPrompt.textContent = 'Preencha seus dados para criar sua conta:';
              if(authSubmit) authSubmit.textContent = 'Voltar para Login';
              registerButton.textContent = 'Registrar';
          } else {
              if (!usernameVal) {
                  if(authError) authError.textContent = 'Por favor, insira um nome de usuário.';
                  return;
              }
              if (!passwordVal) {
                  if(authError) authError.textContent = 'Por favor, insira uma senha.';
                  return;
              }
              if (passwordVal.length < 6) {
                   if(authError) authError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
                  return;
              }

              // REMOVIDO: Consulta Firestore para verificar nome de usuário existente antes do registro.
              // A unicidade será tratada pelo Firebase Auth via fakeEmail.
              try {
                  const fakeEmail = generateFakeEmail(usernameVal);
                  const userCredential = await createUserWithEmailAndPassword(auth, fakeEmail, passwordVal);
                  const user = userCredential.user;

                  // Criar o documento do usuário no Firestore APÓS o registro bem-sucedido no Auth
                  await setDoc(doc(db, 'users', user.uid), {
                      username: usernameVal,
                      email: fakeEmail, // Armazenar o fakeEmail para consistência
                      createdAt: serverTimestamp(),
                      role: 'user' // Papel padrão
                  });
                  // onAuthStateChanged cuidará da UI após o registro.
              } catch (error) {
                  console.error("Erro ao registrar:", error);
                  let errorMessage = "Erro no registro.";
                  if (error.code === 'auth/email-already-in-use') {
                      // Se o fakeEmail já existe, significa que o nome de usuário já foi usado.
                      errorMessage = "Este nome de usuário já está em uso. Por favor, escolha outro.";
                  } else if (error.code === 'auth/weak-password') {
                      errorMessage = "A senha deve ter pelo menos 6 caracteres.";
                  } else {
                      errorMessage = `Erro: ${error.message}`;
                  }
                  if(authError) authError.textContent = errorMessage;
              }
          }
      });
  }

  if (loginRegisterSidebarButton) {
      loginRegisterSidebarButton.addEventListener('click', () => {
          showAuthModal('Faça login ou crie uma conta para continuar.');
          if (hamburger && hamburger.classList.contains('open')) {
              hamburger.classList.remove('open');
              if (sidebar) sidebar.classList.remove('open');
              document.body.classList.remove('sidebar-open');
          }
      });
  }

  if (loginInitialLink) {
      loginInitialLink.addEventListener('click', (e) => {
          e.preventDefault();
          showAuthModal('Bem-vindo de volta! Faça seu login ou crie uma conta.');
          if(authModalTitle) authModalTitle.textContent = 'Bem-vindo, Mestre Açougueiro!';
          if(authPrompt) authPrompt.textContent = 'Faça login ou crie uma conta para prosseguir:';
          if(authSubmit) authSubmit.textContent = 'Entrar';
          if(registerButton) registerButton.textContent = 'Criar Conta';
          if(passwordInput) passwordInput.value = '';
          if(authError) authError.textContent = '';
      });
  }

  if (registerInitialLink) {
      registerInitialLink.addEventListener('click', (e) => {
          e.preventDefault();
          showAuthModal('Novo por aqui? Crie sua conta ou faça login se já tiver uma.');
          if(authModalTitle) authModalTitle.textContent = 'Criar Nova Conta';
          if(authPrompt) authPrompt.textContent = 'Preencha seus dados para criar sua conta:';
          if(authSubmit) authSubmit.textContent = 'Voltar para Login';
          if(registerButton) registerButton.textContent = 'Registrar';
          if(passwordInput) passwordInput.value = '';
          if(authError) authError.textContent = '';
      });
  }


  if(logoutButton) {
      logoutButton.addEventListener('click', async () => {
          try {
              await signOut(auth);
          } catch (error) {
              console.error("Erro ao fazer logout:", error);
              const feedbackEl = document.getElementById('userProfileSection');
              if (feedbackEl) {
                  const p = document.createElement('p');
                  p.textContent = "Erro ao fazer logout.";
                  p.style.color = "var(--cor-erro)";
                  feedbackEl.prepend(p);
                  setTimeout(() => p.remove(), 3000);
              }
          }
      });
  }

  if(editUsernameButton) {
    editUsernameButton.addEventListener('click', () => {
        if(newUsernameInput) newUsernameInput.style.display = 'block';
        if(saveUsernameButton) saveUsernameButton.style.display = 'block';
        if(usernameUpdateFeedback) {
          usernameUpdateFeedback.textContent = '';
          usernameUpdateFeedback.className = '';
        }

        if (currentUser && db) {
            getDoc(doc(db, 'users', currentUser.uid)).then(docSnap => {
                const userData = docSnap.data();
                if(newUsernameInput) newUsernameInput.value = userData && userData.username ? userData.username : '';
            }).catch(e => console.error("Erro ao carregar nome de usuário para edição:", e));
        }
        editUsernameButton.style.display = 'none';
    });
  }

  if(saveUsernameButton) {
    saveUsernameButton.addEventListener('click', async () => {
        const newUsernameVal = newUsernameInput.value.trim();
        if(usernameUpdateFeedback) usernameUpdateFeedback.className = '';

        if (!newUsernameVal) {
            if(usernameUpdateFeedback) {
                usernameUpdateFeedback.textContent = 'O nome de usuário não pode estar vazio.';
                usernameUpdateFeedback.classList.add('error');
            }
            return;
        }

        if (currentUser && db) {
            try {
                const usersRef = collection(db, 'users');
                // Consulta para verificar unicidade do username para OUTROS usuários
                const q = query(usersRef, where('username', '==', newUsernameVal));
                const querySnapshot = await getDocs(q);

                let usernameExists = false;
                querySnapshot.forEach(docSnap => {
                    if (docSnap.id !== currentUser.uid) { // Se o username pertence a outro UID
                        usernameExists = true;
                    }
                });

                if (usernameExists) {
                    if(usernameUpdateFeedback) {
                        usernameUpdateFeedback.textContent = 'Este nome de usuário já está em uso por outro usuário.';
                        usernameUpdateFeedback.classList.add('error');
                    }
                    return;
                }

                const userDocRef = doc(db, 'users', currentUser.uid);
                await updateDoc(userDocRef, {
                    username: newUsernameVal
                });

                const displayName = newUsernameVal;
                if(usernameDisplay) {
                    usernameDisplay.textContent = displayName;
                    usernameDisplay.classList.remove('admin-username', 'cooperator-username');
                    if (currentUserRole === 'admin') usernameDisplay.classList.add('admin-username');
                    else if (currentUserRole === 'cooperator') usernameDisplay.classList.add('cooperator-username');
                }

                let welcomeDisplayName = displayName;
                if (currentUserRole === 'admin') {
                    welcomeDisplayName = `<span class="admin-username">${displayName} (Admin)</span>`;
                } else if (currentUserRole === 'cooperator') {
                    welcomeDisplayName = `<span class="cooperator-username">${displayName} (Cooperador)</span>`;
                }
                if(welcomeMessage) welcomeMessage.innerHTML = `Bem-vindo, ${welcomeDisplayName}! <br>Vamos aos cortes!`;


                if(usernameUpdateFeedback) {
                    usernameUpdateFeedback.textContent = 'Nome de usuário atualizado com sucesso!';
                    usernameUpdateFeedback.classList.add('correct');
                }
                if(newUsernameInput) newUsernameInput.style.display = 'none';
                if(saveUsernameButton) saveUsernameButton.style.display = 'none';
                if(editUsernameButton) editUsernameButton.style.display = 'inline-block';
                setTimeout(() => { if(usernameUpdateFeedback) usernameUpdateFeedback.textContent = ''; usernameUpdateFeedback.className = ''; }, 3000);
            } catch (error) {
                console.error("Erro ao atualizar nome de usuário:", error);
                if(usernameUpdateFeedback) {
                    usernameUpdateFeedback.textContent = `Erro ao atualizar: ${error.message}`;
                    usernameUpdateFeedback.classList.add('error');
                }
            }
        }
    });
  }

  if(showAddProductFromProfileButton) {
      showAddProductFromProfileButton.addEventListener('click', () => showSection('addProductSection', true));
  }
  if(showAdminManageProductsFromProfileButton) {
      showAdminManageProductsFromProfileButton.addEventListener('click', () => showSection('adminProductManagementSection', true));
  }
  if(showAdminManageUsersFromProfileButton) {
      showAdminManageUsersFromProfileButton.addEventListener('click', () => showSection('adminUserManagementSection', true));
  }

  // --- FUNÇÕES DE CARREGAMENTO E SALVAMENTO DE PRODUTOS (AGORA USANDO FIRESTORE) ---

  // Dados iniciais para popular o Firestore se a coleção 'products' estiver vazia
  const initialProductData = [
    { code: "14601", name: "Acém", category: "bovinos" },
    { code: "14625", name: "Alcatra com Maminha", category: "bovinos" },
    { code: "1762", name: "Bisteca com osso", category: "bovinos" },
    { code: "14694", name: "Colchão Duro", category: "bovinos" },
    { code: "26390", name: "Colchão Mole", category: "bovinos" },
    { code: "25812", name: "Contra Filé", category: "bovinos" },
    { code: "14793", name: "Coração da Alcatra", category: "bovinos" },
    { code: "4282", name: "Fígado", category: "bovinos" },
    { code: "14762", name: "Lagarto", category: "bovinos" },
    { code: "14809", name: "Miolo da Paleta", category: "bovinos" },
    { code: "14618", name: "Músculo do Dianteiro", category: "bovinos" },
    { code: "14816", name: "Paleta", category: "bovinos" },
    { code: "14823", name: "Patinho", category: "bovinos" },
    { code: "00260", name: "Picanha em Pedaços", category: "bovinos" },
    { code: "05418", name: "Picanha Grill", category: "bovinos" },
    { code: "16094", name: "Picanha Maturada", category: "bovinos" },
    { code: "07160", name: "Picanha Todo Dia", category: "bovinos" },
    { code: "06019", name: "Picanha Tradicional", category: "bovinos" },
    { code: "11549", name: "Bisteca Suína", category: "suinos" },
    { code: "23023", name: "Carne Suína Corte", category: "suinos" },
    { code: "15776", name: "Carne Suína Embalada", category: "suinos" },
    { code: "23740", name: "Costela com Panceta Suína Corte", category: "suinos" },
    { code: "23733", name: "Costela com Panceta Suína Embalada", category: "suinos" },
    { code: "18159", name: "Pé Suíno", category: "suinos" }
  ];

  async function loadProductData() {
      console.log("Carregando dados dos produtos do Firestore...");
      try {
          const productsColRef = collection(db, 'products');
          const productsSnapshot = await getDocs(productsColRef);

          productData = { bovinos: {}, suinos: {} }; // Resetar dados em memória

          if (productsSnapshot.empty) {
              console.warn("Coleção 'products' vazia. Populando com dados iniciais...");
              for (const prod of initialProductData) {
                  await addDoc(productsColRef, {
                      code: prod.code,
                      name: prod.name,
                      category: prod.category,
                      createdAt: serverTimestamp(),
                      updatedAt: serverTimestamp()
                  });
              }
              // Após popular, recarregar para ter os IDs dos documentos
              const updatedSnapshot = await getDocs(productsColRef);
              updatedSnapshot.forEach(docSnap => {
                  const prod = docSnap.data();
                  if (prod.category === 'bovinos') {
                      productData.bovinos[prod.code] = { name: prod.name, docId: docSnap.id };
                  } else if (prod.category === 'suinos') {
                      productData.suinos[prod.code] = { name: prod.name, docId: docSnap.id };
                  }
              });
              console.log("Dados iniciais adicionados ao Firestore e carregados.");
          } else {
              productsSnapshot.forEach(docSnap => {
                  const prod = docSnap.data();
                  if (prod.category === 'bovinos') {
                      productData.bovinos[prod.code] = { name: prod.name, docId: docSnap.id };
                  } else if (prod.category === 'suinos') {
                      productData.suinos[prod.code] = { name: prod.name, docId: docSnap.id };
                  }
              });
              console.log("Dados dos produtos carregados do Firestore.");
          }
      } catch (error) {
          console.error("Erro ao carregar ou popular dados dos produtos no Firestore:", error);
          // Fallback para dados em memória se o Firestore falhar completamente
          productData.bovinos = initialProductData.filter(p => p.category === 'bovinos').reduce((acc, p) => { acc[p.code] = { name: p.name, docId: null }; return acc; }, {});
          productData.suinos = initialProductData.filter(p => p.category === 'suinos').reduce((acc, p) => { acc[p.code] = { name: p.name, docId: null }; return acc; }, {});
          console.warn("Usando dados iniciais em memória devido a erro no Firestore.");
      } finally {
          rebuildProductIndexesAndSidebar();
          prepareAllFlashcardProducts();
          if (mainContent.classList.contains('show-admin-products') && currentUserRole === 'admin') {
              populateAdminProductLists();
          }
      }
  }

  async function saveProductData(productDocId = null, productDataToSave) {
      try {
          const productsColRef = collection(db, 'products');
          if (productDocId) {
              // Atualizar produto existente
              const productRef = doc(db, 'products', productDocId);
              await updateDoc(productRef, {
                  name: productDataToSave.name,
                  category: productDataToSave.category,
                  updatedAt: serverTimestamp()
              });
              console.log("Produto atualizado no Firestore!");
          } else {
              // Adicionar novo produto
              await addDoc(productsColRef, {
                  code: productDataToSave.code,
                  name: productDataToSave.name,
                  category: productDataToSave.category,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
              });
              console.log("Novo produto adicionado ao Firestore!");
          }
          return true;
      } catch (error) {
          console.error("Erro ao salvar dados do produto no Firestore:", error);
          const feedbackEl = document.getElementById('addProductFeedback') || document.getElementById('adminProductManagementFeedback');
          if(feedbackEl) {
               feedbackEl.textContent = 'Erro ao salvar dados no Firestore.';
               feedbackEl.className = 'error';
          }
          return false;
      }
  }

  // A função populateSidebarList permanece a mesma, mas agora recebe o objeto productData
  // que é preenchido a partir do Firestore.
  function populateSidebarList(listElement, data) {
    if(!listElement) return;
    listElement.innerHTML = '';
    if (!data || Object.keys(data).length === 0) {
      const li = document.createElement('li');
      li.textContent = "Nenhum item nesta categoria.";
      li.style.paddingLeft = "8px";
      li.style.fontStyle = "italic";
      listElement.appendChild(li);
      return;
    }
    // Ordena os itens pelo nome para exibição na sidebar
    Object.entries(data).sort(([,a],[,b]) => a.name.localeCompare(b.name)).forEach(([code, prodInfo]) => {
      const li = document.createElement('li');
      li.classList.add('item');
      li.textContent = `${code.padStart(5, '0')} - ${prodInfo.name}`;
      li.tabIndex = 0;
      li.addEventListener('click', () => {
        showSection('mainTerminalSection');
        if(inputCode) inputCode.value = code.padStart(5, '0');
        displayResult(prodInfo.name, true);
        if(resultDiv) resultDiv.classList.remove('success', 'error');
        if(hamburger) hamburger.classList.remove('open');
        if(sidebar) sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
      });
      listElement.appendChild(li);
    });
  }

  function rebuildProductIndexesAndSidebar() {
      productsInverseNormalized = {};
      productData.bovinos = {}; // Resetar para garantir que apenas dados do Firestore sejam usados
      productData.suinos = {};  // Resetar para garantir que apenas dados do Firestore sejam usados

      // Carregar todos os produtos do Firestore para construir os índices e a sidebar
      const productsColRef = collection(db, 'products');
      getDocs(productsColRef).then(snapshot => {
          snapshot.forEach(docSnap => {
              const prod = docSnap.data();
              if (prod.category === 'bovinos') {
                  productData.bovinos[prod.code] = { name: prod.name, docId: docSnap.id };
              } else if (prod.category === 'suinos') {
                  productData.suinos[prod.code] = { name: prod.name, docId: docSnap.id };
              }
              productsInverseNormalized[normalizeText(prod.name)] = { code: prod.code.padStart(5, '0'), originalName: prod.name, docId: docSnap.id };
          });
          populateSidebarList(bovinosList, productData.bovinos);
          populateSidebarList(suinosList, productData.suinos);
          prepareAllFlashcardProducts();

          if (currentUserRole === 'admin' && mainContent.classList.contains('show-admin-products')) {
              populateAdminProductLists();
          }
      }).catch(error => {
          console.error("Erro ao reconstruir índices e sidebar:", error);
          // Em caso de erro, ainda tentar popular com o que estiver em productData (se houver um fallback)
          populateSidebarList(bovinosList, productData.bovinos);
          populateSidebarList(suinosList, productData.suinos);
      });
  }


  function displayResult(text, isSuccess) {
    if(!resultDiv) return;
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('scrolling', 'success', 'error');
    const marqueeSpan = document.createElement('span');
    marqueeSpan.textContent = text;
    resultDiv.appendChild(marqueeSpan);
    const icon = document.createElement('i');
    icon.classList.add('feedback-icon', 'fas');
    icon.classList.add(isSuccess ? 'fa-check-circle' : 'fa-times-circle');
    resultDiv.appendChild(icon);
    resultDiv.classList.add(isSuccess ? 'success' : 'error');
    playSound(isSuccess ? 'terminalSuccess' : 'terminalError');
    setTimeout(() => icon.classList.add('show'), 50);
    setTimeout(() => { icon.classList.remove('show'); icon.remove(); }, 1500);
    if (text.length > (resultDiv.offsetWidth / parseFloat(getComputedStyle(resultDiv).fontSize)) * 0.8 ) {
      marqueeSpan.classList.add('marquee');
      void resultDiv.offsetWidth; resultDiv.classList.add('scrolling');
    }
  }

  function buscarCodigoOuNome(inputVal) {
    const texto = inputVal.trim();
    if (!texto) return { result: "Nenhum valor digitado.", found: false };

    if (/^\d+$/.test(texto)) { // Busca por código
      const codigo = texto.padStart(5, '0');
      let foundProduct = null;
      if (productData.bovinos && productData.bovinos[codigo]) {
          foundProduct = productData.bovinos[codigo].name;
      } else if (productData.suinos && productData.suinos[codigo]) {
          foundProduct = productData.suinos[codigo].name;
      }
      return { result: foundProduct || `Código "${codigo}" não encontrado.`, found: !!foundProduct };
    } else { // Busca por nome
      const normalizedInput = normalizeText(texto);
      const foundData = productsInverseNormalized[normalizedInput];
      return { result: foundData ? foundData.code : `Produto "${texto}" não encontrado.`, found: !!foundData };
    }
  }

  if(btnExecute && inputCode) {
    btnExecute.addEventListener('click', () => {
      const valor = inputCode.value;
      const { result: res, found } = buscarCodigoOuNome(valor);
      displayResult(res, found);
    });
    inputCode.addEventListener('keydown', e => { if (e.key === 'Enter') btnExecute.click(); });
    inputCode.addEventListener('input', () => {
      if(resultDiv) { resultDiv.innerHTML = ''; resultDiv.classList.remove('scrolling', 'success', 'error'); }
    });
  }

  function resetAddProductForm() {
      if(inputNewCode) inputNewCode.value = '';
      if(inputNewName) inputNewName.value = '';
      if(selectNewCategory) selectNewCategory.value = 'bovinos';
      if(inputNewCode) inputNewCode.readOnly = false;
      if(btnAddNewProduct) btnAddNewProduct.textContent = 'Adicionar Produto';
      if(addProductFeedback) {
        addProductFeedback.textContent = '';
        addProductFeedback.className = '';
      }
      if(addProductSectionTitle) addProductSectionTitle.textContent = 'Adicionar Novo Produto';

      const addProductSectionEl = document.getElementById('addProductSection');
      if (addProductSectionEl) {
          delete addProductSectionEl.dataset.editingCode;
          delete addProductSectionEl.dataset.originalCategory;
          delete addProductSectionEl.dataset.docId; // Limpar o docId também
      }
  }

  function handleSetupEditProduct(event) {
      if (!currentUser || currentUserRole !== 'admin') {
          showAuthModal('Apenas administradores podem editar produtos.');
          return;
      }
      const { code, name, category, docid } = event.target.dataset; // Obter docId

      showSection('addProductSection', true);

      if(inputNewCode) {
          inputNewCode.value = code;
          inputNewCode.readOnly = true;
      }
      if(inputNewName) inputNewName.value = name;
      if(selectNewCategory) selectNewCategory.value = category;

      if(btnAddNewProduct) btnAddNewProduct.textContent = 'Salvar Alterações';

      const addProductSectionEl = document.getElementById('addProductSection');
      if (addProductSectionEl) {
          addProductSectionEl.dataset.editingCode = code;
          addProductSectionEl.dataset.originalCategory = category;
          addProductSectionEl.dataset.docId = docid; // Armazenar o docId
      }

      if(addProductFeedback) {
          addProductFeedback.textContent = `Editando produto: ${name} (${code.padStart(5, '0')})`;
          addProductFeedback.className = 'warning';
      }
      if(addProductSectionTitle) addProductSectionTitle.textContent = 'Editar Produto';
  }

  if(btnAddNewProduct && inputNewCode && inputNewName && selectNewCategory && addProductFeedback) {
    btnAddNewProduct.addEventListener('click', async () => {
        if(addProductFeedback) addProductFeedback.className = '';
        if (!currentUser) {
            addProductFeedback.textContent = 'Você precisa estar logado para esta ação.';
            addProductFeedback.classList.add('error');
            showAuthModal('Você precisa estar logado.');
            return;
        }

        const addProductSectionEl = document.getElementById('addProductSection');
        const editingCode = addProductSectionEl ? addProductSectionEl.dataset.editingCode : null;
        const originalCategory = addProductSectionEl ? addProductSectionEl.dataset.originalCategory : null;
        const docId = addProductSectionEl ? addProductSectionEl.dataset.docId : null; // Obter docId

        const newNameVal = inputNewName.value.trim();
        const categoryVal = selectNewCategory.value;

        if (editingCode) { // Lógica de EDIÇÃO
            if (currentUserRole !== 'admin') {
                addProductFeedback.textContent = 'Apenas administradores podem editar produtos.';
                addProductFeedback.classList.add('error');
                setTimeout(() => {
                    resetAddProductForm();
                    showSection('initialScreen');
                }, 3000);
                return;
            }
            if (!newNameVal) {
                addProductFeedback.textContent = 'O nome do produto não pode estar vazio.';
                addProductFeedback.classList.add('warning');
                return;
            }

            // Verificar se o novo nome já existe para outro produto (excluindo o que está sendo editado)
            const normalizedNewName = normalizeText(newNameVal);
            const productsColRef = collection(db, 'products');
            const q = query(productsColRef, where('name', '==', newNameVal));
            const querySnapshot = await getDocs(q);

            let nameExistsForOtherProduct = false;
            querySnapshot.forEach(docSnap => {
                if (docSnap.id !== docId) { // Se o ID do documento for diferente do que estamos editando
                    nameExistsForOtherProduct = true;
                }
            });

            if (nameExistsForOtherProduct) {
                addProductFeedback.textContent = `O nome "${newNameVal}" já está em uso por outro produto.`;
                addProductFeedback.classList.add('error');
                return;
            }

            const successSave = await saveProductData(docId, { name: newNameVal, category: categoryVal });
            if (successSave) {
                addProductFeedback.textContent = `Produto "${newNameVal}" (${editingCode.padStart(5, '0')}) atualizado!`;
                addProductFeedback.classList.add('correct');
                rebuildProductIndexesAndSidebar(); // Recarrega dados e sidebar
                setTimeout(() => {
                    resetAddProductForm();
                    showSection('adminProductManagementSection', true);
                }, 1500);
            } else {
                // Se falhar, recarregar os dados do Firestore para garantir consistência
                await loadProductData();
                setTimeout(() => resetAddProductForm(), 3000);
            }
        } else { // Lógica de ADIÇÃO
            const canAddProducts = currentUserRole === 'admin' || currentUserRole === 'cooperator';
            if (!canAddProducts) {
                addProductFeedback.textContent = 'Você não tem permissão para adicionar novos produtos.';
                addProductFeedback.classList.add('error');
                 setTimeout(() => {
                        resetAddProductForm();
                        showSection('initialScreen');
                    }, 2000);
                return;
            }

            const newCodeVal = inputNewCode.value.trim();
            if (!newCodeVal || !newNameVal || !categoryVal) {
                addProductFeedback.textContent = 'Preencha todos os campos.'; addProductFeedback.classList.add('warning'); return;
            }
            if (inputNewCode.readOnly) {
                inputNewCode.readOnly = false;
            }
            const formattedCode = newCodeVal.padStart(5, '0');

            // Verificar se o código já existe no Firestore
            const productsColRef = collection(db, 'products');
            const qCode = query(productsColRef, where('code', '==', formattedCode));
            const codeSnapshot = await getDocs(qCode);
            if (!codeSnapshot.empty) {
                addProductFeedback.textContent = `Código "${formattedCode}" já existente!`; addProductFeedback.classList.add('error'); return;
            }

            // Verificar se o nome já existe no Firestore
            const qName = query(productsColRef, where('name', '==', newNameVal));
            const nameSnapshot = await getDocs(qName);
            if (!nameSnapshot.empty) {
                addProductFeedback.textContent = `Nome de produto "${newNameVal}" já existente!`; addProductFeedback.classList.add('error'); return;
            }

            const successSave = await saveProductData(null, { code: formattedCode, name: newNameVal, category: categoryVal });
            if (successSave) {
                addProductFeedback.textContent = `Produto "${newNameVal}" (${formattedCode}) adicionado!`; addProductFeedback.classList.add('correct');
                rebuildProductIndexesAndSidebar(); // Recarrega dados e sidebar
                setTimeout(() => resetAddProductForm(), 1500);
            } else {
                // Se falhar, recarregar os dados do Firestore para garantir consistência
                await loadProductData();
                setTimeout(() => { if(addProductFeedback) addProductFeedback.textContent = ''; addProductFeedback.className = ''; }, 3000);
            }
          }
      });
    }


    async function loadComments() {
        if (!commentsList || !db) return;
        commentsList.innerHTML = '<p style="text-align: center; color: var(--cor-texto-secundario);">Carregando comentários...</p>';
        try {
            const commentsCollectionRef = collection(db, 'comments');
            const q_comments = query(commentsCollectionRef, orderBy('timestamp', 'desc'), limit(20));
            const querySnapshot = await getDocs(q_comments);
            if (querySnapshot.empty) {
                commentsList.innerHTML = '<p style="text-align: center; color: var(--cor-texto-secundario);">Nenhum comentário ainda. Seja o primeiro a deixar um!</p>'; return;
            }
            commentsList.innerHTML = '';
            querySnapshot.forEach(docSnap => {
                const comment = docSnap.data();
                const commentId = docSnap.id;
                const div = document.createElement('div');
                div.classList.add('comment-item');

                const strongElement = document.createElement('strong');
                const commenterNameText = comment.username || 'Anônimo';

                if (comment.authorRole === 'admin') {
                    const adminSpan = document.createElement('span');
                    adminSpan.classList.add('admin-username');
                    adminSpan.textContent = commenterNameText;
                    strongElement.appendChild(adminSpan);
                } else if (comment.authorRole === 'cooperator') {
                    const cooperatorSpan = document.createElement('span');
                    cooperatorSpan.classList.add('cooperator-username');
                    cooperatorSpan.textContent = commenterNameText;
                    strongElement.appendChild(cooperatorSpan);
                } else {
                    strongElement.textContent = commenterNameText;
                }
                strongElement.appendChild(document.createTextNode(': '));


                const commentTextNode = document.createTextNode(comment.comment + " ");

                const date = comment.timestamp && comment.timestamp.toDate ? new Date(comment.timestamp.toDate()) : new Date();
                const formattedDate = date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const timestampSpan = document.createElement('span');
                timestampSpan.classList.add('timestamp');
                timestampSpan.textContent = formattedDate;

                div.appendChild(strongElement);
                div.appendChild(commentTextNode);
                div.appendChild(timestampSpan);

                if (currentUserRole === 'admin') {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Apagar';
                    deleteBtn.classList.add('admin-delete-comment-btn');
                    deleteBtn.style.cssText = 'background-color: var(--cor-erro); color: white; padding: 3px 8px; font-size: 0.8rem; margin-left: 10px; border: none; border-radius: 3px; cursor: pointer; float: right;';
                    deleteBtn.onmouseover = () => deleteBtn.style.backgroundColor = 'var(--cor-botao-admin-perigo-hover)';
                    deleteBtn.onmouseout = () => deleteBtn.style.backgroundColor = 'var(--cor-erro)';

                    deleteBtn.onclick = async () => {
                        showCustomConfirm('Tem certeza que deseja apagar este comentário? Esta ação é irreversível.', async () => {
                            try {
                                await deleteDoc(doc(db, 'comments', commentId));
                                commentsFeedback.textContent = 'Comentário apagado com sucesso!';
                                commentsFeedback.className = 'correct';
                                loadComments();
                            } catch (e) {
                                console.error("Erro ao apagar comentário:", e);
                                commentsFeedback.textContent = `Erro ao apagar: ${e.message}`;
                                commentsFeedback.className = 'error';
                            }
                            setTimeout(() => { if(commentsFeedback) commentsFeedback.textContent = ''; commentsFeedback.className = ''; }, 3000);
                        });
                    };
                    div.appendChild(deleteBtn);
                }
                commentsList.appendChild(div);
            });
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
            commentsList.innerHTML = `<p style="text-align: center; color: var(--cor-erro);">Erro ao carregar comentários.</p>`;
        }
    }

    if(submitCommentButton && commentInput && commentsFeedback) {
      submitCommentButton.addEventListener('click', async () => {
          if(commentsFeedback) commentsFeedback.className = '';
          if (!currentUser) {
              commentsFeedback.textContent = 'Você precisa estar logado para enviar um comentário.';
              commentsFeedback.classList.add('error');
              showAuthModal('Você precisa estar logado para enviar um comentário.');
              return;
          }
          const commentText = commentInput.value.trim();
          if (!commentText) {
              commentsFeedback.textContent = 'O comentário não pode estar vazio.'; commentsFeedback.classList.add('warning'); return;
          }
          try {
              const userDocRef = doc(db, 'users', currentUser.uid);
              const userDocSnap = await getDoc(userDocRef);
              const userData = userDocSnap.exists() ? userDocSnap.data() : null;
              const username = userData && userData.username ? userData.username : (currentUser.email ? currentUser.email.split('@')[0] : 'Anônimo');
              const userRoleForComment = userData && userData.role ? userData.role : 'user';

              await addDoc(collection(db, 'comments'), {
                  userId: currentUser.uid,
                  username: username,
                  comment: commentText,
                  timestamp: serverTimestamp(),
                  authorRole: userRoleForComment
              });
              commentsFeedback.textContent = 'Comentário enviado com sucesso!'; commentsFeedback.classList.add('correct');
              commentInput.value = ''; loadComments();
          } catch (error) {
              console.error("Erro ao enviar comentário:", error);
              commentsFeedback.textContent = `Erro ao enviar comentário: ${error.message}`; commentsFeedback.classList.add('error');
          }
          setTimeout(() => { if(commentsFeedback) commentsFeedback.textContent = ''; commentsFeedback.className = ''; }, 3000);
      });
    }

    function populateAdminProductLists() {
        if (currentUserRole !== 'admin' || !adminBovinosList || !adminSuinosList) return;
        if(adminProductManagementFeedback) adminProductManagementFeedback.className = '';

        adminBovinosList.innerHTML = '';
        adminSuinosList.innerHTML = '';

        const createProductListItem = (code, name, category, docId) => { // Adicionar docId
            const li = document.createElement('li');
            const infoSpan = document.createElement('span');
            infoSpan.classList.add('product-info');
            infoSpan.textContent = `${code.padStart(5, '0')} - ${name}`;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('edit-product-btn');
            editBtn.dataset.code = code;
            editBtn.dataset.name = name;
            editBtn.dataset.category = category;
            editBtn.dataset.docid = docId; // Armazenar docId no dataset
            editBtn.addEventListener('click', handleSetupEditProduct);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.classList.add('delete-product-btn');
            deleteBtn.dataset.code = code;
            deleteBtn.dataset.category = category;
            deleteBtn.dataset.docid = docId; // Armazenar docId no dataset
            deleteBtn.addEventListener('click', handleDeleteProduct);

            li.appendChild(infoSpan);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            return li;
        };

        // Reconstruir listas a partir de productData (que já foi populado do Firestore)
        if (productData.bovinos && Object.keys(productData.bovinos).length > 0) {
            Object.entries(productData.bovinos).sort(([,a],[,b]) => a.name.localeCompare(b.name)).forEach(([code, prodInfo]) => {
                adminBovinosList.appendChild(createProductListItem(code, prodInfo.name, 'bovinos', prodInfo.docId));
            });
        } else {
            adminBovinosList.innerHTML = '<li>Nenhum produto bovino cadastrado.</li>';
        }

        if (productData.suinos && Object.keys(productData.suinos).length > 0) {
             Object.entries(productData.suinos).sort(([,a],[,b]) => a.name.localeCompare(b.name)).forEach(([code, prodInfo]) => {
                adminSuinosList.appendChild(createProductListItem(code, prodInfo.name, 'suinos', prodInfo.docId));
            });
        } else {
            adminSuinosList.innerHTML = '<li>Nenhum produto suíno cadastrado.</li>';
        }
    }

    async function handleDeleteProduct(event) {
        if(adminProductManagementFeedback) adminProductManagementFeedback.className = '';
        if (currentUserRole !== 'admin') {
            if(adminProductManagementFeedback) {
                adminProductManagementFeedback.textContent = 'Apenas administradores podem excluir produtos.';
                adminProductManagementFeedback.classList.add('error');
            }
            return;
        }

        const codeToDelete = event.target.dataset.code;
        const categoryToDelete = event.target.dataset.category;
        const docIdToDelete = event.target.dataset.docid; // Obter o ID do documento

        if (!docIdToDelete) {
            console.error("ID do documento do produto não encontrado para exclusão.");
            if(adminProductManagementFeedback) {
                adminProductManagementFeedback.textContent = 'Erro: ID do produto não encontrado.';
                adminProductManagementFeedback.classList.add('error');
            }
            return;
        }

        showCustomConfirm(`Tem certeza que deseja excluir o produto ${codeToDelete}? Esta ação é irreversível!`, async () => {
            try {
                await deleteDoc(doc(db, 'products', docIdToDelete));
                if(adminProductManagementFeedback) {
                    adminProductManagementFeedback.textContent = `Produto ${codeToDelete} excluído com sucesso!`;
                    adminProductManagementFeedback.classList.add('correct');
                }
                rebuildProductIndexesAndSidebar(); // Recarregar dados e atualizar UI
            } catch (error) {
                console.error("Erro ao excluir produto do Firestore:", error);
                if(adminProductManagementFeedback) {
                    adminProductManagementFeedback.textContent = `Erro ao excluir: ${error.message}`;
                    adminProductManagementFeedback.classList.add('error');
                }
            }
            setTimeout(() => { if(adminProductManagementFeedback) adminProductManagementFeedback.textContent = ''; adminProductManagementFeedback.className = ''; }, 4000);
        });
    }

    // --- Novas Funções para Gerenciamento de Usuários (Admin) ---
    async function populateAdminUserList() {
        if (!adminUserList || !db || currentUserRole !== 'admin' || !currentUser) {
            if(adminUserList) adminUserList.innerHTML = '<li>Acesso negado ou erro ao carregar.</li>';
            return;
        }
        if(adminUserManagementFeedback) adminUserManagementFeedback.textContent = ''; adminUserManagementFeedback.className = '';
        adminUserList.innerHTML = '<li>Carregando usuários...</li>';

        try {
            const usersCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollectionRef);

            if (querySnapshot.empty) {
                adminUserList.innerHTML = '<li>Nenhum usuário registrado encontrado.</li>';
                return;
            }

            adminUserList.innerHTML = '';
            querySnapshot.forEach(docSnap => {
                const userData = docSnap.data();
                const userId = docSnap.id;

                if (userId === currentUser.uid) {
                    return;
                }

                const li = document.createElement('li');
                const userInfoSpan = document.createElement('span');
                userInfoSpan.classList.add('user-info');
                userInfoSpan.textContent = `Nome: ${userData.username || 'N/A'} - Email: ${userData.email || 'N/A'} - Papel: ${userData.role || 'user'}`;

                const deleteUserBtn = document.createElement('button');
                deleteUserBtn.textContent = 'Excluir Usuário';
                deleteUserBtn.classList.add('delete-user-btn');
                deleteUserBtn.dataset.userid = userId;
                deleteUserBtn.dataset.username = userData.username || 'este usuário';

                deleteUserBtn.addEventListener('click', handleDeleteUser);

                li.appendChild(userInfoSpan);
                li.appendChild(deleteUserBtn);
                adminUserList.appendChild(li);
            });

        } catch (error) {
            console.error("Erro ao carregar lista de usuários:", error);
            adminUserList.innerHTML = '<li>Erro ao carregar usuários. Tente novamente.</li>';
            if(adminUserManagementFeedback) {
                adminUserManagementFeedback.textContent = 'Erro ao carregar usuários.';
                adminUserManagementFeedback.className = 'error';
            }
        }
    }

    async function handleDeleteUser(event) {
        if (currentUserRole !== 'admin') {
            if(adminUserManagementFeedback) {
                adminUserManagementFeedback.textContent = 'Apenas administradores podem excluir usuários.';
                adminUserManagementFeedback.className = 'error';
            }
            return;
        }

        const userIdToDelete = event.target.dataset.userid;
        const usernameToDelete = event.target.dataset.username;

        if (!userIdToDelete) {
            console.error("ID do usuário para exclusão não encontrado.");
            if(adminUserManagementFeedback) {
                adminUserManagementFeedback.textContent = 'Erro: ID do usuário não encontrado.';
                adminUserManagementFeedback.className = 'error';
            }
            return;
        }

        showCustomConfirm(`Tem certeza que deseja excluir os dados do usuário "${usernameToDelete}" (ID: ${userIdToDelete}) da aplicação? A conta de login do Firebase não será afetada.`, async () => {
            try {
                await deleteDoc(doc(db, 'users', userIdToDelete));

                if(adminUserManagementFeedback) {
                    adminUserManagementFeedback.textContent = `Dados do usuário "${usernameToDelete}" excluídos com sucesso do Firestore.`;
                    adminUserManagementFeedback.className = 'correct';
                }
                console.warn(`Dados do usuário ${userIdToDelete} excluídos do Firestore. A conta de autenticação do Firebase Auth pode ainda existir.`);

                populateAdminUserList();
            } catch (error) {
                console.error("Erro ao excluir dados do usuário do Firestore:", error);
                if(adminUserManagementFeedback) {
                    adminUserManagementFeedback.textContent = `Erro ao excluir dados do usuário: ${error.message}`;
                    adminUserManagementFeedback.className = 'error';
                }
            }
            setTimeout(() => { if(adminUserManagementFeedback) adminUserManagementFeedback.textContent = ''; adminUserManagementFeedback.className = ''; }, 4000);
        });
    }


    function showCustomConfirm(message, onConfirm) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 10000;';
        const modalBox = document.createElement('div');
        modalBox.style.cssText = 'background: var(--cor-fundo-secundario); padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); text-align: center; max-width: 350px; width: 90%;';
        const msgElement = document.createElement('p');
        msgElement.textContent = message;
        msgElement.style.marginBottom = '20px';
        msgElement.style.color = 'var(--cor-texto-principal)';
        msgElement.style.fontSize = '1.05rem';
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirmar';
        confirmBtn.style.cssText = 'background: var(--cor-botao-primario-fundo); color: white; padding: 10px 18px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;';
        confirmBtn.onmouseover = () => confirmBtn.style.background = 'var(--cor-botao-primario-hover)';
        confirmBtn.onmouseout = () => confirmBtn.style.background = 'var(--cor-botao-primario-fundo)';
        confirmBtn.onclick = () => {
            onConfirm();
            document.body.removeChild(overlay);
        };
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancelar';
        cancelBtn.style.cssText = 'background: var(--cor-botao-secundario-fundo); color: var(--cor-texto-principal); padding: 10px 18px; border: 1px solid var(--cor-botao-secundario-borda); border-radius: 4px; cursor: pointer;';
        cancelBtn.onmouseover = () => cancelBtn.style.background = 'var(--cor-botao-secundario-hover)';
        cancelBtn.onmouseout = () => cancelBtn.style.background = 'var(--cor-botao-secundario-fundo)';
        cancelBtn.onclick = () => {
            document.body.removeChild(overlay);
        };
        modalBox.appendChild(msgElement);
        modalBox.appendChild(confirmBtn);
        modalBox.appendChild(cancelBtn);
        overlay.appendChild(modalBox);
        confirmBtn.focus();
    }

    // --- Event Listeners para Navegação ---
    if(butcherCodeTitle) butcherCodeTitle.addEventListener('click', () => showSection('initialScreen'));
    if(accessTerminalButton) accessTerminalButton.addEventListener('click', () => showSection('mainTerminalSection'));
    if(accessGamesButton) accessGamesButton.addEventListener('click', () => showSection('gamesHubSection'));
    if(viewCommentsButton) viewCommentsButton.addEventListener('click', () => showSection('commentsSection'));
    if(accessInstructionsButton) accessInstructionsButton.addEventListener('click', () => showSection('instructionsSection'));
    if(playGameCodeFromHubButton) playGameCodeFromHubButton.addEventListener('click', () => showSection('gameCodeSection'));
    if(playFlashcardGameButton) playFlashcardGameButton.addEventListener('click', () => showSection('flashcardGameSection'));
    if(backToHomeFromGamesHubButton) backToHomeFromGamesHubButton.addEventListener('click', () => showSection('initialScreen'));
    if(backToGamesHubFromGameCodeButton) backToGamesHubFromGameCodeButton.addEventListener('click', () => showSection('gamesHubSection'));
    if(backToGamesHubFromFlashcardButton) backToGamesHubFromFlashcardButton.addEventListener('click', () => showSection('gamesHubSection'));
    if(backToProfileFromUserAdminButton) backToProfileFromUserAdminButton.addEventListener('click', () => showSection('userProfileSection', true));

    document.querySelectorAll('.back-to-home-button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.id === 'backToHomeAddProduct' || mainContent.classList.contains('show-add-product')) {
                 resetAddProductForm();
            }
            showSection('initialScreen');
        });
    });

    document.querySelectorAll('#sidebar h2[data-type="main-content"]').forEach(el => {
        const target = el.dataset.target;
        if (target) {
            el.addEventListener('click', () => {
                if (target === 'userProfileSection' && !currentUser) {
                    showAuthModal('Você precisa fazer login para ver seu perfil.');
                    return;
                }
                showSection(target);
            });
        }
    });

    if(hamburger && sidebar) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open'); sidebar.classList.toggle('open'); document.body.classList.toggle('sidebar-open');
      });
    }
    document.addEventListener('click', e => {
      if (sidebar && !sidebar.contains(e.target) && hamburger && !hamburger.contains(e.target) && authModalOverlay && !authModalOverlay.contains(e.target) && e.target !== butcherCodeTitle) {
        if(hamburger) hamburger.classList.remove('open'); if(sidebar) sidebar.classList.remove('open'); document.body.classList.remove('sidebar-open');
      }
    });
    if(sidebarTitles) {
      sidebarTitles.forEach(title => {
        title.addEventListener('click', () => {
          const targetId = title.dataset.target;
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            if (activeAccordionItem && activeAccordionItem !== targetElement) {
                activeAccordionItem.classList.remove('open');
                if(activeAccordionItem.previousElementSibling && activeAccordionItem.previousElementSibling.matches('h2')) {
                    activeAccordionItem.previousElementSibling.classList.remove('open');
                }
            }
            targetElement.classList.toggle('open'); title.classList.toggle('open');
            activeAccordionItem = targetElement.classList.contains('open') ? targetElement : null;
          }
        });
      });
    }

    // --- Lógica dos Jogos (GameCode e Flashcard) ---
    function gameCodeGenerateQuestions() {
        const allProductsList = [];
        // Agora, itera sobre o objeto productData para obter todos os produtos
        if (productData.bovinos) {
            Object.entries(productData.bovinos).forEach(([code, prodInfo]) => allProductsList.push([code, prodInfo.name]));
        }
        if (productData.suinos) {
            Object.entries(productData.suinos).forEach(([code, prodInfo]) => allProductsList.push([code, prodInfo.name]));
        }

        const generated = [];
        const numQuestionsToGenerate = Math.min(20, allProductsList.length > 1 ? allProductsList.length * 2 : 20);
        if (allProductsList.length < 2 && allProductsList.length > 0) {
             const [correctCode, correctName] = allProductsList[0];
             for (let i = 0; i < numQuestionsToGenerate; i++) {
                const type = Math.random() < 0.5 ? 'codeToName' : 'nameToCode';
                let questionText, correctAnswer;
                let optionsSet = new Set();
                if (type === 'codeToName') {
                    questionText = `Qual o nome do produto com o código: ${correctCode.padStart(5, '0')}?`; correctAnswer = correctName;
                    optionsSet.add(correctName); optionsSet.add("Opção Falsa 1"); optionsSet.add("Opção Falsa 2"); optionsSet.add("Opção Falsa 3");
                } else {
                    questionText = `Qual o código do produto: ${correctName}?`; correctAnswer = correctCode.padStart(5, '0');
                    optionsSet.add(correctCode.padStart(5, '0')); optionsSet.add("0000X"); optionsSet.add("0000Y"); optionsSet.add("0000Z");
                }
                while(optionsSet.size < 4 && allProductsList.length > 1) { // Garante 4 opções se houver produtos suficientes
                    const [randomCode, randomName] = allProductsList[Math.floor(Math.random() * allProductsList.length)];
                    let randomOption = (type === 'codeToName') ? randomName : randomCode.padStart(5, '0');
                    if (randomOption !== correctAnswer && randomOption !== undefined && randomOption !== null && String(randomOption).trim() !== '') {
                        optionsSet.add(randomOption);
                    }
                }
                while(optionsSet.size > 4) { optionsSet.delete(Array.from(optionsSet)[Math.floor(Math.random() * optionsSet.size)]);}
                const shuffledOptions = Array.from(optionsSet); shuffleArray(shuffledOptions);
                generated.push({ question: questionText, options: shuffledOptions, correctAnswer: correctAnswer });
            }
        } else if (allProductsList.length >= 2) {
            for (let i = 0; i < numQuestionsToGenerate; i++) {
                const type = Math.random() < 0.5 ? 'codeToName' : 'nameToCode';
                const [correctCode, correctName] = allProductsList[Math.floor(Math.random() * allProductsList.length)];
                let questionText, correctAnswer; let optionsSet = new Set();
                if (type === 'codeToName') {
                    questionText = `Qual o nome do produto com o código: ${correctCode.padStart(5, '0')}?`; correctAnswer = correctName;
                } else {
                    questionText = `Qual o código do produto: ${correctName}?`; correctAnswer = correctCode.padStart(5, '0');
                }
                optionsSet.add(correctAnswer);
                while (optionsSet.size < Math.min(4, allProductsList.length)) {
                    const [randomCode, randomName] = allProductsList[Math.floor(Math.random() * allProductsList.length)];
                    let randomOption = (type === 'codeToName') ? randomName : randomCode.padStart(5, '0');
                    if (randomOption !== correctAnswer && randomOption !== undefined && randomOption !== null && String(randomOption).trim() !== '') {
                        optionsSet.add(randomOption);
                    }
                }
                const shuffledOptions = Array.from(optionsSet); shuffleArray(shuffledOptions);
                generated.push({ question: questionText, options: shuffledOptions, correctAnswer: correctAnswer });
            }
        } else {
             console.warn("Poucos produtos para gerar perguntas para o GameCode."); return [];
        }
        return generated;
    }
    function gameCodeSaveState() { localStorage.setItem(GAME_CODE_STATE_KEY, JSON.stringify({ gameCodeCurrentQuestionIndex, gameCodeScore, gameCodeQuestions, gameCodeTimeLeft })); }
    function gameCodeLoadState() {
        const savedState = localStorage.getItem(GAME_CODE_STATE_KEY);
        if (savedState) { try {
            const gameState = JSON.parse(savedState);
            if (gameState && typeof gameState.gameCodeCurrentQuestionIndex === 'number' &&
                typeof gameState.gameCodeScore === 'number' && Array.isArray(gameState.gameCodeQuestions) &&
                typeof gameState.gameCodeTimeLeft === 'number') {
                gameCodeCurrentQuestionIndex = gameState.gameCodeCurrentQuestionIndex;
                gameCodeScore = gameState.gameCodeScore;
                gameCodeQuestions = gameState.gameCodeQuestions;
                gameCodeTimeLeft = (gameState.gameCodeTimeLeft > 0 && gameState.gameCodeTimeLeft <= TIME_PER_QUESTION) ? gameState.gameCodeTimeLeft : TIME_PER_QUESTION;
                return true;
            }} catch (e) { console.error("Erro ao carregar estado do GameCode:", e); localStorage.removeItem(GAME_CODE_STATE_KEY); }
        } return false;
    }
    function gameCodeStartTimer() {
        clearInterval(gameCodeTimerInterval); clearInterval(gameCodeTickSoundInterval);
        gameCodeTimeLeft = (gameCodeTimeLeft === undefined || gameCodeTimeLeft === null || gameCodeTimeLeft <= 0 || gameCodeTimeLeft > TIME_PER_QUESTION) ? TIME_PER_QUESTION : gameCodeTimeLeft;
        if(timerElement) { timerElement.textContent = `Tempo: ${gameCodeTimeLeft}s`; timerElement.classList.remove('warning', 'critical'); }
        if(progressBar) progressBar.style.width = `${(gameCodeTimeLeft / TIME_PER_QUESTION) * 100}%`;
        if (gameCodeTimeLeft <= 5 && gameCodeTimeLeft > 0) gameCodeTickSoundInterval = setInterval(() => { if (gameCodeTimeLeft > 0) playSound('tick'); }, 1000);

        gameCodeTimerInterval = setInterval(() => {
            gameCodeTimeLeft--;
            if(timerElement) timerElement.textContent = `Tempo: ${gameCodeTimeLeft}s`;
            const progress = (gameCodeTimeLeft / TIME_PER_QUESTION) * 100;
            if(progressBar) progressBar.style.width = `${progress}%`;

            if (gameCodeTimeLeft <= 5 && gameCodeTimeLeft > 0) {
                if(timerElement) { timerElement.classList.add('warning'); timerElement.classList.remove('critical'); }
                if (!gameCodeTickSoundInterval) gameCodeTickSoundInterval = setInterval(() => { if (gameCodeTimeLeft > 0) playSound('tick'); }, 1000);
            } else if (gameCodeTimeLeft <= 0) {
                clearInterval(gameCodeTimerInterval); clearInterval(gameCodeTickSoundInterval);
                if(timerElement) { timerElement.textContent = "Tempo esgotado!"; timerElement.classList.add('critical'); }
                gameCodeCheckAnswer(null);
            } else {
                if(timerElement) timerElement.classList.remove('warning', 'critical');
                clearInterval(gameCodeTickSoundInterval); gameCodeTickSoundInterval = null;
            }
            gameCodeSaveState();
        }, 1000);
    }
    function gameCodeShowQuestion() {
      if (gameCodeCurrentQuestionIndex < gameCodeQuestions.length) {
        gameCodeTimeLeft = TIME_PER_QUESTION; gameCodeStartTimer();
        const currentQuestion = gameCodeQuestions[gameCodeCurrentQuestionIndex];
        if(questionElement) questionElement.textContent = currentQuestion.question;
        if(optionsElement) optionsElement.innerHTML = '';
        currentQuestion.options.forEach(option => {
          const button = document.createElement('button'); button.textContent = option; button.dataset.answer = option;
          button.addEventListener('click', gameCodeCheckAnswer); if(optionsElement) optionsElement.appendChild(button);
        });
        if(feedbackElement) { feedbackElement.textContent = ''; feedbackElement.className = ''; }
        if(nextQuestionButton) nextQuestionButton.style.display = 'none';
        if(questionCounterElement) questionCounterElement.textContent = `Pergunta ${gameCodeCurrentQuestionIndex + 1} de ${gameCodeQuestions.length}`;

        const totalQuestionsAttempted = gameCodeCurrentQuestionIndex;
        const percentage = totalQuestionsAttempted > 0 ? (((gameCodeScore / totalQuestionsAttempted) * 100) || 0).toFixed(0) : 0;
        if(scoreDisplayElement) scoreDisplayElement.textContent = `Pontuação: ${gameCodeScore}/${totalQuestionsAttempted} (${percentage}%)`;
        gameCodeSaveState();
      } else gameCodeEndGame(false);
    }
    function gameCodeCheckAnswer(event) {
        clearInterval(gameCodeTimerInterval); clearInterval(gameCodeTickSoundInterval);
        const currentQuestion = gameCodeQuestions[gameCodeCurrentQuestionIndex]; if (!currentQuestion) return;
        const correctAnswer = currentQuestion.correctAnswer; let selectedAnswer = null;
        if (event && event.target) selectedAnswer = event.target.dataset.answer;

        if(optionsElement) optionsElement.querySelectorAll('button').forEach(button => {
            button.disabled = true;
            if (button.dataset.answer === correctAnswer) button.style.backgroundColor = 'var(--cor-sucesso)';
            else if (button.dataset.answer === selectedAnswer) button.style.backgroundColor = 'var(--cor-erro)';
        });

        if (selectedAnswer === correctAnswer) {
            if(feedbackElement) { feedbackElement.textContent = 'Correto!'; feedbackElement.className = 'correct'; }
            gameCodeScore++; playSound('correct');
        } else {
            if(feedbackElement) { feedbackElement.textContent = `Incorreto. A resposta correta era: ${currentQuestion.correctAnswer}`; feedbackElement.className = 'incorrect'; }
            playSound('incorrect');
        }
        gameCodeCurrentQuestionIndex++;
        const totalQuestionsAttempted = gameCodeCurrentQuestionIndex;
        const percentage = totalQuestionsAttempted > 0 ? (((gameCodeScore / totalQuestionsAttempted) * 100) || 0).toFixed(0) : 0;
        if(scoreDisplayElement) scoreDisplayElement.textContent = `Pontuação: ${gameCodeScore}/${totalQuestionsAttempted} (${percentage}%)`;

        if(nextQuestionButton) nextQuestionButton.style.display = 'block';
        gameCodeSaveState();
    }
    function gameCodeNextQuestion() {
        if(feedbackElement) { feedbackElement.textContent = ''; feedbackElement.className = ''; }
        if(optionsElement) optionsElement.querySelectorAll('button').forEach(button => { button.style.backgroundColor = 'var(--cor-botao-secundario-fundo)'; button.disabled = false; });
        gameCodeShowQuestion();
    }
    function gameCodeEndGame(earlyExit = false) {
        clearInterval(gameCodeTimerInterval); clearInterval(gameCodeTickSoundInterval);
        if(gameElements) gameElements.style.display = 'none';
        if(gameEndScreen) gameEndScreen.style.display = 'flex';
        playSound('gameEnd');

        const totalQuestionsAttempted = gameCodeCurrentQuestionIndex;
        const finalPercentage = totalQuestionsAttempted > 0 ? ((gameCodeScore / totalQuestionsAttempted) * 100).toFixed(0) : 0;
        let message = "Sua pontuação final foi: ";
        if (earlyExit) message = "Você finalizou o jogo antecipadamente! <br>Sua pontuação parcial foi: ";

        if(finalScoreMessage) finalScoreMessage.innerHTML = `${message}<br><span style="font-size: 2em; color: ${finalPercentage >= 70 ? 'var(--cor-sucesso)' : (finalPercentage >= 40 ? 'var(--cor-aviso)' : 'var(--cor-erro)')};">${gameCodeScore} de ${totalQuestionsAttempted} (${finalPercentage}%)</span>`;

        if(scoreDisplayElement) scoreDisplayElement.textContent = '';
        if(questionCounterElement) questionCounterElement.textContent = '';
        if(timerElement) timerElement.textContent = '';
        if(progressBar) progressBar.style.width = '100%';
        localStorage.removeItem(GAME_CODE_STATE_KEY);
    }
    function gameCodeStartGame() {
        if(gameStartScreen) gameStartScreen.style.display = 'none';
        if(gameEndScreen) gameEndScreen.style.display = 'none';
        if(gameElements) gameElements.style.display = 'block';
        playSound('gameStart');

        if (!gameCodeLoadState() || gameCodeQuestions.length === 0 || gameCodeCurrentQuestionIndex >= gameCodeQuestions.length) {
            gameCodeCurrentQuestionIndex = 0; gameCodeScore = 0;
            gameCodeQuestions = gameCodeGenerateQuestions();
            shuffleArray(gameCodeQuestions);
            localStorage.removeItem(GAME_CODE_STATE_KEY);
            gameCodeTimeLeft = TIME_PER_QUESTION;
        }

        if (gameCodeQuestions.length === 0) {
            if(gameElements) gameElements.style.display = 'none';
            if(gameStartScreen) {
                gameStartScreen.style.display = 'flex';
                const h3 = gameStartScreen.querySelector('h3'); if(h3) h3.textContent = 'Atenção!';
                const p = gameStartScreen.querySelector('p');
                if(p) p.innerHTML = 'Não há produtos suficientes para gerar perguntas. Adicione mais produtos para começar a jogar!';
            }
            if(startGameButton) startGameButton.style.display = 'none';
            return;
        } else {
             if(startGameButton) startGameButton.style.display = 'block';
             if(gameStartScreen){
                 const h3 = gameStartScreen.querySelector('h3'); if(h3) h3.textContent = 'Bem-vindo ao GameCode!';
                 const p = gameStartScreen.querySelector('p');
                 if(p) p.innerHTML = 'Teste seus conhecimentos sobre os códigos de açougue.<br>Você terá 15 segundos para responder a cada uma das 20 perguntas.';
             }
        }
        if(scoreDisplayElement) scoreDisplayElement.textContent = '';
        if(nextQuestionButton) {
            nextQuestionButton.textContent = 'Próxima Pergunta';
            nextQuestionButton.removeEventListener('click', gameCodeStartGame);
            nextQuestionButton.addEventListener('click', gameCodeNextQuestion);
        }
        if(optionsElement) optionsElement.querySelectorAll('button').forEach(button => { button.style.backgroundColor = 'var(--cor-botao-secundario-fundo)'; button.disabled = false; });
        gameCodeShowQuestion();
    }

    if(startGameButton) startGameButton.addEventListener('click', gameCodeStartGame);
    if(restartGameButton) restartGameButton.addEventListener('click', gameCodeStartGame);
    if(endGameButton) endGameButton.addEventListener('click', () => gameCodeEndGame(true));


    function loadFlashcardDifficulties() {
        const storedDifficulties = localStorage.getItem(FLASHCARD_DIFFICULTY_KEY);
        if (storedDifficulties) {
            try {
                flashcardDifficulties = JSON.parse(storedDifficulties);
            } catch(e) {
                console.error("Erro ao carregar dificuldades dos flashcards:", e);
                flashcardDifficulties = {};
            }
        } else {
            flashcardDifficulties = {};
        }
    }

    function saveFlashcardDifficulty(code, difficulty) {
        flashcardDifficulties[code] = difficulty;
        localStorage.setItem(FLASHCARD_DIFFICULTY_KEY, JSON.stringify(flashcardDifficulties));
    }

    function prepareAllFlashcardProducts() {
        allFlashcardProducts = [];
        // Agora, itera sobre o objeto productData para obter todos os produtos
        if (productData.bovinos) {
            Object.entries(productData.bovinos).forEach(([code, prodInfo]) => allFlashcardProducts.push({ code, name: prodInfo.name }));
        }
        if (productData.suinos) {
            Object.entries(productData.suinos).forEach(([code, prodInfo]) => allFlashcardProducts.push({ code, name: prodInfo.name }));
        }
    }

    function getNextFlashcard() {
        if (allFlashcardProducts.length === 0) {
            return null;
        }

        const weightedList = [];
        allFlashcardProducts.forEach(prod => {
            const difficulty = flashcardDifficulties[prod.code] || 'medio';
            let weight = 1;
            if (difficulty === 'dificil') weight = 5;
            else if (difficulty === 'medio') weight = 3;

            for (let i = 0; i < weight; i++) {
                weightedList.push(prod);
            }
        });

        shuffleArray(weightedList);

        let nextCard;
        if (weightedList.length === 0) {
             nextCard = allFlashcardProducts[Math.floor(Math.random() * allFlashcardProducts.length)];
        } else {
            nextCard = weightedList[Math.floor(Math.random() * weightedList.length)];
        }

        nextCard.type = Math.random() < 0.5 ? 'codeToName' : 'nameToCode';
        return nextCard;
    }

    function resetAndPrepareFlashcardDOM() {
        if (flashcardDiv) flashcardDiv.classList.remove('flipped');

        if(flashcardFrontLabel) flashcardFrontLabel.textContent = '';
        if(flashcardFrontContent) flashcardFrontContent.textContent = 'Carregando...';
        if(flashcardBackLabel) flashcardBackLabel.textContent = '';
        if(flashcardBackContent) flashcardBackContent.textContent = '';

        if(flashcardFeedbackDiv) flashcardFeedbackDiv.textContent = '';
        if(flashcardControlsDiv) flashcardControlsDiv.style.display = 'none';
        if(nextFlashcardButton) nextFlashcardButton.style.display = 'none';
        if(flipCardButton) flipCardButton.style.display = 'block';
        if(restartFlashcardButton) restartFlashcardButton.style.display = 'block';
        difficultyButtons.forEach(btn => btn.classList.remove('selected'));
    }

    function populateFlashcardDOM(cardData) {
        if (!cardData) {
            if(flashcardFrontContent) flashcardFrontContent.textContent = "Sem mais cards!";
            if(flashcardBackContent) flashcardBackcardContent.textContent = "Reinicie ou adicione produtos.";
            if(flipCardButton) flipCardButton.style.display = 'none';
            if(flashcardControlsDiv) flashcardControlsDiv.style.display = 'none';
            if(nextFlashcardButton) nextFlashcardButton.style.display = 'none';
            if(flashcardFeedbackDiv) {
                flashcardFeedbackDiv.textContent = allFlashcardProducts.length === 0 ? 'Adicione produtos para jogar.' : 'Você viu todos os cards! Reinicie para ver novamente.';
                flashcardFeedbackDiv.className = 'info';
            }
            return;
        }

        if (cardData.type === 'codeToName') {
            if(flashcardFrontLabel) flashcardFrontLabel.textContent = "Código do Produto:";
            if(flashcardFrontContent) flashcardFrontContent.textContent = cardData.code.padStart(5, '0');
            if(flashcardBackLabel) flashcardBackLabel.textContent = "Nome do Produto:";
            if(flashcardBackContent) flashcardBackContent.textContent = cardData.name;
        } else {
            if(flashcardFrontLabel) flashcardFrontLabel.textContent = "Nome do Produto:";
            if(flashcardFrontContent) flashcardFrontContent.textContent = cardData.name;
            if(flashcardBackLabel) flashcardBackLabel.textContent = "Código do Produto:";
            if(flashcardBackContent) flashcardBackContent.textContent = cardData.code.padStart(5, '0');
        }
    }

    function prepareAndShowNextFlashcard() {
        if (isFlashcardTransitioning) return;
        isFlashcardTransitioning = true;

        const actuallyLoadNextCard = () => {
            resetAndPrepareFlashcardDOM();
            // Força o DOM a atualizar antes de buscar e popular o novo card
            requestAnimationFrame(() => {
                currentFlashcard = getNextFlashcard();
                populateFlashcardDOM(currentFlashcard);
                isFlashcardTransitioning = false;
            });
        };

        if (flashcardDiv && flashcardDiv.classList.contains('flipped')) {
            flashcardDiv.addEventListener('transitionend', actuallyLoadNextCard, { once: true });
            flashcardDiv.classList.remove('flipped');
            // Não tocar som aqui, pois o som de "flip" já toca ao virar
        } else {
            actuallyLoadNextCard();
        }
    }

    function startFlashcardGame() {
        loadFlashcardDifficulties();
        prepareAllFlashcardProducts();
        if (allFlashcardProducts.length === 0) {
            if(flashcardFrontContent) flashcardFrontContent.textContent = "Adicione produtos para usar os flashcards.";
            if(flashcardBackContent) flashcardBackContent.textContent = "";
            if(flipCardButton) flipCardButton.style.display = 'none';
            if(flashcardControlsDiv) flashcardControlsDiv.style.display = 'none';
            if(nextFlashcardButton) nextFlashcardButton.style.display = 'none';
            if(restartFlashcardButton) restartFlashcardButton.style.display = 'none';
            if(flashcardFeedbackDiv) {
                 flashcardFeedbackDiv.textContent = 'Não há produtos para exibir nos flashcards.';
                 flashcardFeedbackDiv.className = 'info';
            }
            return;
        }
        prepareAndShowNextFlashcard();
    }

    if(flipCardButton) {
        flipCardButton.addEventListener('click', () => {
            if (!currentFlashcard || !flashcardDiv || isFlashcardTransitioning) return;

            isFlashcardTransitioning = true;
            flashcardDiv.classList.toggle('flipped');
            playSound('flip');

            flashcardDiv.addEventListener('transitionend', () => {
                isFlashcardTransitioning = false;
                if (flashcardDiv.classList.contains('flipped')) {
                    if(flashcardControlsDiv) flashcardControlsDiv.style.display = 'block';
                    if(nextFlashcardButton) nextFlashcardButton.style.display = 'block';
                    if(flipCardButton) flipCardButton.style.display = 'none';

                    const currentDifficulty = flashcardDifficulties[currentFlashcard.code];
                    difficultyButtons.forEach(btn => {
                        btn.classList.remove('selected');
                        if (btn.dataset.difficulty === currentDifficulty) {
                            btn.classList.add('selected');
                        }
                    });
                } else {
                    if(flashcardControlsDiv) flashcardControlsDiv.style.display = 'none';
                    if(nextFlashcardButton) nextFlashcardButton.style.display = 'none';
                    if(flipCardButton) flipCardButton.style.display = 'block';
                }
            }, { once: true });
        });
    }

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!currentFlashcard) return;
            const difficulty = button.dataset.difficulty;
            saveFlashcardDifficulty(currentFlashcard.code, difficulty);

            difficultyButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            if(flashcardFeedbackDiv) {
                flashcardFeedbackDiv.textContent = `Card classificado como "${difficulty}".`;
                flashcardFeedbackDiv.className = 'info';
                 setTimeout(() => { if(flashcardFeedbackDiv) flashcardFeedbackDiv.textContent = ''; flashcardFeedbackDiv.className = ''; }, 2000);
            }
        });
    });

    if(nextFlashcardButton) {
        nextFlashcardButton.addEventListener('click', () => {
            prepareAndShowNextFlashcard();
        });
    }

    if(restartFlashcardButton) {
        restartFlashcardButton.addEventListener('click', () => {
            showCustomConfirm("Tem certeza que deseja reiniciar o progresso de todos os flashcards? As classificações de dificuldade serão perdidas.", () => {
                flashcardDifficulties = {};
                localStorage.removeItem(FLASHCARD_DIFFICULTY_KEY);
                if(flashcardFeedbackDiv) {
                    flashcardFeedbackDiv.textContent = "Progresso dos flashcards reiniciado.";
                    flashcardFeedbackDiv.className = 'info';
                }
                setTimeout(() => { if(flashcardFeedbackDiv) flashcardFeedbackDiv.textContent = ''; flashcardFeedbackDiv.className = ''; }, 2000);
                startFlashcardGame();
            });
        });
    }

    // Chama loadProductData no início para carregar os dados do Firestore
    loadProductData();
    showSection('initialScreen');
});
