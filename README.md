# Kalyani Kharat
# AI Chatbot Application

A modern, responsive AI chatbot built using **React, Redux Toolkit, and Chat UI Kit**, powered by the Groq API (LLaMA model).
This project mimics a **ChatGPT-like interface** with multiple chat history, smooth UI, and interactive features.

---

## Features

* Real-time AI chat responses
* Multiple chat conversations (Redux-based)
* Chat history sidebar (switch between chats)
* Animated modern UI (ChatGPT-like experience)
* Typing indicator for AI responses
* Clean and responsive design
* Fast API integration using Groq (LLaMA 3)

---

## Tech Stack

* **Frontend:** React.js
* **State Management:** Redux Toolkit
* **UI Library:** @chatscope/chat-ui-kit-react
* **API:** Groq API (LLaMA model)
* **Styling:** CSS (custom + animations)

---

## Project Structure

```
src/
│
├── App.jsx                # Main UI component
├── App.css                # Styling
├── store.js               # Redux store setup
├── features/
│   └── Chatslice.js       # Redux logic (chat + history)
```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatbot-app.git
cd chatbot-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add API Key

Open `Chatslice.js` and replace:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

---

### 4. Run the app

```bash
npm run dev
```

---

## How It Works

* User sends a message
* Redux stores it in active chat
* API request is sent to Groq (LLaMA model)
* Response is received and added to chat
* UI updates automatically

---

## Disclaimer

This chatbot may generate incorrect responses.
Always verify important information.

---



---
