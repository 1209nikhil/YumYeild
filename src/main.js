// Import animations
import { initTypeAnimation, TextScramble, initScrollAnimations } from './animations.js';

// DOM Elements
const root = document.getElementById('root');

// Pages/Routes definition
let currentPage = 'home';

// Initialize the application
function initApp() {
  createNavbar();
  renderPage(currentPage);

  // Add event listeners for navigation
  document.addEventListener('click', (e) => {
    const target = e.target;
    const navLink = target.closest('.nav-link');

    if (navLink && navLink.getAttribute('data-page')) {
      e.preventDefault();
      const page = navLink.getAttribute('data-page');
      navigateTo(page);
    }
  });

  // Initialize scroll animations
  initScrollAnimations();
}

// Navigation function
function navigateTo(page) {
  currentPage = page;

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    }
  });

  // Render the selected page
  renderPage(page);
}

// Make navigateTo globally available
window.navigateTo = navigateTo;

// Create Navbar
function createNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';

  navbar.innerHTML = `
    <div class="logo"><i class="fas fa-utensils"></i> Yum<span>Yield</span></div>
    <ul class="nav-menu">
      <li><a href="#" class="nav-link active" data-page="home">Home</a></li>
      <li><a href="#" class="nav-link" data-page="bot">Bot</a></li>
      <li><a href="#" class="nav-link" data-page="recommender">Recommender</a></li>
      <li><a href="#" class="nav-link" data-page="budgetiser">Budgetiser</a></li>
    </ul>
  `;

  root.appendChild(navbar);

  // Add text scramble effect to logo
  const logoText = navbar.querySelector('.logo span');
  if (logoText) {
    const textScramble = new TextScramble(logoText);
    logoText.addEventListener('mouseover', () => {
      textScramble.setText('Yield');
    });
  }
}

// Render the page content
function renderPage(page) {
  // Clear previous content except navbar
  const navbar = document.querySelector('.navbar');
  root.innerHTML = '';
  root.appendChild(navbar);

  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'section container';

  // Render page-specific content
  switch (page) {
    case 'home':
      renderHomePage(contentContainer);
      break;
    case 'bot':
      renderBotPage(contentContainer);
      break;
    case 'recommender':
      renderRecommenderPage(contentContainer);
      break;
    case 'budgetiser':
      renderBudgetiserPage(contentContainer);
      break;
  }

  root.appendChild(contentContainer);
}

// Home Page
function renderHomePage(container) {
  container.innerHTML = `
    <div class="hero animate-fadeIn">
      <h1 id="hero-heading">Welcome to <span class="highlight">YumYield</span></h1>
      <p>Your ultimate food companion for recommendations, meal planning, and budget optimization</p>
      <div class="hero-buttons" style="margin-top: 2rem;">
        <button class="btn" onclick="navigateTo('bot')">Chat with FoodBot</button>
        <button class="btn btn-secondary" style="margin-left: 1rem;" onclick="navigateTo('recommender')">Get Recommendations</button>
      </div>
    </div>

    <div class="features" style="margin-top: 4rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <div class="card animate-on-scroll">
        <i class="fas fa-robot" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
        <h3>Food Chat Bot</h3>
        <p>Ask questions about recipes, ingredients, cooking techniques, and more. Our intelligent bot provides instant assistance.</p>
        <a href="#" class="btn" onclick="navigateTo('bot')">Try Bot</a>
      </div>

      <div class="card animate-on-scroll">
        <i class="fas fa-utensils" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
        <h3>Food Recommender</h3>
        <p>Discover new recipes tailored to your taste preferences, dietary restrictions, and available ingredients.</p>
        <a href="#" class="btn" onclick="navigateTo('recommender')">Get Recommendations</a>
      </div>

      <div class="card animate-on-scroll">
        <i class="fas fa-wallet" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
        <h3>Food Budgetiser</h3>
        <p>Plan your meals within your budget. Optimize grocery shopping and reduce food waste with our budgeting tools.</p>
        <a href="#" class="btn" onclick="navigateTo('budgetiser')">Plan Budget</a>
      </div>
    </div>
  `;

  // Fix navigation buttons
  const buttons = container.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const page = button.getAttribute('onclick')?.match(/navigateTo\('(.+)'\)/)?.[1];
      if (page) navigateTo(page);
    });
  });

  // Add typing animation to the hero heading
  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    initTypeAnimation(heroHeading, 'Welcome to YumYield', 100);
  }

  // Add scroll animations
  const animatedElements = container.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    element.style.transitionDelay = `${0.2 * (index + 1)}s`;
  });

  // Trigger animations
  setTimeout(() => {
    animatedElements.forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }, 500);
}

// Bot Page
function renderBotPage(container) {
  container.innerHTML = `
    <div class="animate-fadeIn">
      <h1 id="bot-heading">Food <span class="highlight">Bot</span></h1>
      <p>Ask me anything about food, recipes, cooking techniques, and more!</p>
    </div>

    <div class="chat-container animate-fadeIn" style="margin-top: 2rem;">
      <div class="chat-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-robot" style="font-size: 1.5rem;"></i>
          <h3 style="margin-bottom: 0; color: white;">YumYield Bot</h3>
        </div>
        <p style="margin: 0; font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem;">Powered by YumYield AI</p>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="message bot-message">
          <div class="message-content">
            <p>👋 Hello! I'm YumYield's Food Bot. How can I help you today?</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.7;">Ask me about recipes, ingredients, cooking techniques, meal planning, or food facts.</p>
          </div>
        </div>
      </div>

      <div class="chat-input-container">
        <input type="text" class="chat-input" id="chat-input" placeholder="Type your message here...">
        <button class="chat-submit" id="chat-submit">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>

      <div style="padding: 0.75rem; font-size: 0.8rem; color: var(--text-secondary); text-align: center; border-top: 1px solid #333;">
        YumYield Bot can make mistakes. Consider checking important information.
      </div>
    </div>
  `;

  // ✅ Ensure DOM updates before selecting elements
  setTimeout(() => {
    const botHeading = document.getElementById("bot-heading");
    if (botHeading) {
      initTypeAnimation(botHeading, "Food Bot", 100);
    }

    // ✅ Get Elements AFTER they exist
    const chatInput = document.getElementById("chat-input");
    const chatSubmit = document.getElementById("chat-submit");
    const chatMessages = document.getElementById("chat-messages");

    if (!chatSubmit) {
      console.error("Error: chat-submit button not found in the DOM");
      return;
    }

    // ✅ Helper function to simulate typing effect
    const typeMessage = (element, text, index = 0, interval = 20) => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeMessage(element, text, index + 1, interval), interval);
      }
    };

    const sendMessage = async () => {
      const message = chatInput.value.trim();
      if (message) {
          // Add user message to chat
          const userMessageElement = document.createElement('div');
          userMessageElement.className = 'message user-message';
          userMessageElement.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
          chatMessages?.appendChild(userMessageElement);
          chatInput.value = '';
  
          // Scroll to bottom
          chatMessages.scrollTop = chatMessages.scrollHeight;
  
          // Show thinking indicator
          const botThinkingElement = document.createElement('div');
          botThinkingElement.className = 'message bot-message thinking';
          botThinkingElement.innerHTML = `<div class="message-content">
              <div class="thinking-dots"><span>.</span><span>.</span><span>.</span></div>
          </div>`;
          chatMessages?.appendChild(botThinkingElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
  
          try {
              // Send request to FastAPI backend
              const response = await fetch('http://localhost:8000/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ prompt: message })
              });
  
              const data = await response.json();
  
              // Remove thinking indicator
              chatMessages?.removeChild(botThinkingElement);
  
              // Add bot response
              const botMessageElement = document.createElement('div');
              botMessageElement.className = 'message bot-message';
              botMessageElement.innerHTML = `<div class="message-content"><p id="bot-response-text"></p></div>`;
              chatMessages?.appendChild(botMessageElement);
  
              // Simulate typing effect
              const responseTextElement = botMessageElement.querySelector('#bot-response-text');
              typeMessage(responseTextElement, data.response || "Sorry, I couldn't generate a response.");
  
              // Scroll to bottom
              chatMessages.scrollTop = chatMessages.scrollHeight;
          } catch (error) {
              console.error("Error fetching response:", error);
              chatMessages?.removeChild(botThinkingElement);
          }
      }
  };
  
  // Add event listeners
  chatSubmit?.addEventListener('click', sendMessage);
  chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });
  

    // ✅ Attach event listeners AFTER ensuring chat-submit exists
    chatSubmit.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    // Focus input on load
    setTimeout(() => chatInput?.focus(), 500);
  }, 100); // Small delay to ensure the DOM updates
}


// Recommender Page
function renderRecommenderPage(container) {
  container.innerHTML = `
    <div class="animate-fadeIn">
      <h1 id="recommender-heading">Food <span class="highlight">Recommender</span></h1>
      <p>Get personalized recipe recommendations based on your preferences</p>

      <div class="card" style="margin-top: 2rem;">
        <h3>Your Preferences</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <div>
            <label for="cuisine">Cuisine Type</label>
            <select id="cuisine" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; background-color: #2a2a2a; color: white; border: 1px solid #444; border-radius: var(--border-radius);">
              <option value="">Select Cuisine</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="american">American</option>
            </select>
          </div>
          <div>
            <label for="meal-type">Meal Type</label>
            <select id="meal-type" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; background-color: #2a2a2a; color: white; border: 1px solid #444; border-radius: var(--border-radius);">
              <option value="">Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <label for="dietary">Dietary Restrictions</label>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.5rem;">
            <label style="display: flex; align-items: center;">
              <input type="checkbox" style="margin-right: 0.5rem;"> Vegetarian
            </label>
            <label style="display: flex; align-items: center;">
              <input type="checkbox" style="margin-right: 0.5rem;"> Vegan
            </label>
            <label style="display: flex; align-items: center;">
              <input type="checkbox" style="margin-right: 0.5rem;"> Gluten-Free
            </label>
            <label style="display: flex; align-items: center;">
              <input type="checkbox" style="margin-right: 0.5rem;"> Dairy-Free
            </label>
            <label style="display: flex; align-items: center;">
              <input type="checkbox" style="margin-right: 0.5rem;"> Nut-Free
            </label>
          </div>
        </div>

        <button class="btn" style="margin-top: 2rem;">Get Recommendations</button>
      </div>

      <div id="recommendations" style="margin-top: 3rem;">
        <h2>Recommended Recipes</h2>
        <p>Select your preferences and click "Get Recommendations" to see suggested recipes.</p>
      </div>
    </div>
  `;

  // Add typing animation to heading
  const recommenderHeading = document.getElementById('recommender-heading');
  if (recommenderHeading) {
    initTypeAnimation(recommenderHeading, 'Food Recommender', 100);
  }
}

// Budgetiser Page
function renderBudgetiserPage(container) {
  container.innerHTML = `
    <div class="animate-fadeIn">
      <h1 id="budgetiser-heading">Food <span class="highlight">Budgetiser</span></h1>
      <p>Plan your meals within your budget and reduce food waste</p>

      <div class="card" style="margin-top: 2rem;">
        <h3>Your Budget Settings</h3>
        <div style="margin-top: 1rem;">
          <label for="budget-amount">Monthly Food Budget ($)</label>
          <input type="number" id="budget-amount" placeholder="Enter your budget"
            style="width: 100%; padding: 0.8rem; margin-top: 0.5rem; background-color: #2a2a2a; color: white; border: 1px solid #444; border-radius: var(--border-radius);">
        </div>

        <div style="margin-top: 1rem;">
          <label for="household-size">Household Size</label>
          <input type="number" id="household-size" placeholder="Number of people"
            style="width: 100%; padding: 0.8rem; margin-top: 0.5rem; background-color: #2a2a2a; color: white; border: 1px solid #444; border-radius: var(--border-radius);">
        </div>

        <div style="margin-top: 1rem;">
          <label>Meal Priorities</label>
          <div style="margin-top: 0.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Cost Savings</span>
              <span>Balanced</span>
              <span>Premium Ingredients</span>
            </div>
            <input type="range" min="1" max="5" value="3"
              style="width: 100%; background-color: #2a2a2a; border-radius: var(--border-radius);">
          </div>
        </div>

        <button class="btn" style="margin-top: 2rem;">Calculate Budget Plan</button>
      </div>

      <div id="budget-results" style="margin-top: 3rem;">
        <h2>Your Budget Breakdown</h2>
        <p>Enter your budget details and click "Calculate Budget Plan" to see your personalized meal budget breakdown.</p>
      </div>
    </div>
  `;

  // Add typing animation to heading
  const budgetiserHeading = document.getElementById('budgetiser-heading');
  if (budgetiserHeading) {
    initTypeAnimation(budgetiserHeading, 'Food Budgetiser', 100);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);


const { getFoods } = require('./foodService');
async function displayFoods(cuisine, type, style, mealType, dietaryRestrictions) {
  try {
    const foods = await getFoods(cuisine, type, style, mealType, dietaryRestrictions);

    console.log('Recommended foods:', foods);

    const container = document.getElementById('food-list');
    container.innerHTML = foods.map(food =>
      `<li>
        <strong>${food.name}</strong> 
        (${food.cuisine}, ${food.meal_type}, ${food.dietary_restrictions || 'No Restrictions'})
      </li>`
    ).join('');
  } catch (err) {
    console.error('Error fetching foods:', err);
  }
}

// Example Call:
displayFoods('Japanese', 'Main Course', 'Savory', 'Lunch', ['gluten-free']);

function applyFilters() {
  const cuisine = document.getElementById('cuisine').value;
  const type = document.getElementById('type').value;
  const style = document.getElementById('style').value;
  const mealType = document.getElementById('mealType').value;

  // Get selected dietary restrictions
  const dietaryRestrictions = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);

  displayFoods(cuisine, type, style, mealType, dietaryRestrictions);
}

