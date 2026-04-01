import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, sendMessageToAI } from './features/Chatslice';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.chat);

  const handleSend = (html, text) => {
    if (!text.trim()) return;

    dispatch(addUserMessage(text));

    const apiHistory = [
      { role: "system", content: "You are a professional assistant." },
      ...messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.message
      })),
      { role: "user", content: text }
    ];

    dispatch(sendMessageToAI(apiHistory));
  };

  return (
    <div className="app-viewport">
    
      <div className="chat-window">

        {error && <div className="error-banner" role="alert">{error}</div>}
        
        <div className="messages-area">
            <div className='heading'>
       <h3><span className="robot-icon">🤖</span>Chatbot</h3>
      </div>
          <MainContainer>
            <ChatContainer>
              <MessageList 
                scrollBehavior="smooth"
                typingIndicator={status === 'loading' ? <TypingIndicator content="" /> : null}
              >
                {messages.map((m, i) => (
                  <Message key={i} model={{
                    message: m.message,
                    direction: m.direction,
                    position: "single"
                  }} />
                ))}
              </MessageList>
            </ChatContainer>
          </MainContainer>
        </div>

        <div className="floating-input-container">
          <div className="input-pill">
            <MessageInput 
              placeholder="Ask anything..." 
              onSend={handleSend} 
              attachButton={false}
              disabled={status === 'loading'}
            />
          </div>
          <p className="disclaimer">ChatGPT can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default App;