import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = "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";


export const sendMessageToAI = createAsyncThunk(
  'chat/sendMessageToAI',
  async (apiMessages, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: apiMessages
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API Failure");
      return data.choices[0].message.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ 
        message: action.payload, 
        sender: "user", 
        direction: "incoming" 
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push({ 
          message: action.payload, 
          sender: "ChatGPT", 
          direction: "outgoing" 
        });
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;