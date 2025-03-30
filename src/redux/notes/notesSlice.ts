import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

export interface Note {
  id: number;
  title: string;
  text: string;
  date: string;
  completed: boolean;
  rating: number; 
  isFavorite: boolean; 
  
}

interface NotesState {
  notes: Note[];
}

const generateFakeNote = (): Note => ({
  id: faker.number.int(1000),
  title: faker.lorem.words(3),
  text: faker.lorem.paragraph(),
  date: new Date().toLocaleDateString("en-US"),
  completed: false,
  rating: faker.number.int({ min: 1, max: 5 }),
  isFavorite: false,
});

const initialState: NotesState = {
  notes: Array.from({ length: 5 }, generateFakeNote),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state) => {
      state.notes.push(generateFakeNote());
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    toggleCompletion: (state, action: PayloadAction<number>) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) note.completed = !note.completed;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) note.isFavorite = !note.isFavorite;
    },

  },
});

export const { addNote, deleteNote, toggleCompletion, toggleFavorite } = notesSlice.actions;
export default notesSlice.reducer;
