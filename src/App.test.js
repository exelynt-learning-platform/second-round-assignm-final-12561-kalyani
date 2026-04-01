import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/Chatslice';
import App from './App';

const renderWithRedux = (component) => {
  const store = configureStore({ reducer: { chat: chatReducer } });
  return render(<Provider store={store}>{component}</Provider>);
};

test('checks if input bar is present', () => {
  renderWithRedux(<App />);
  expect(screen.getByPlaceholderText(/Ask anything/i)).toBeInTheDocument();
});

test('aligns user message to the left', () => {
  renderWithRedux(<App />);
  const input = screen.getByPlaceholderText(/Ask anything/i);
  fireEvent.change(input, { target: { value: 'Hello' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  const message = screen.getByText('Hello');
  expect(message.closest('.cs-message')).toHaveClass('cs-message--incoming');
});