import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {
    blogs: [],
    projects: [],
    notes: [],
    internships: [],
  },
};

const notesBlogSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.categories.blogs.push(action.payload);
    },
    addProject: (state, action) => {
      state.categories.projects.push(action.payload);
    },
    addNote: (state, action) => {
      state.categories.notes.push(action.payload);
    },
    addInternship: (state, action) => {
      state.categories.internships.push(action.payload);
    },
    updateBlogTitle: (state, action) => {
      const { index, title } = action.payload;
      if (state.categories.blogs[index]) {
        state.categories.blogs[index].title = title;
      }
    },
    updateInternshipTitle: (state, action) => {
      const { index, title } = action.payload;
      if (state.categories.internships[index]) {
        state.categories.internships[index].title = title;
      }
    },
    updateProjectTitle: (state, action) => {
      const { index, title } = action.payload;
      if (state.categories.projects[index]) {
        state.categories.projects[index].title = title;
      }
    },
    updateNoteTitle: (state, action) => {
      const { index, title } = action.payload;
      if (state.categories.notes[index]) {
        state.categories.notes[index].title = title;
      }
    },
    deleteBlog: (state, action) => {
      state.categories.blogs.splice(action.payload, 1);
    },
    deleteInternship: (state, action) => {
      state.categories.internships.splice(action.payload, 1);
    },
    deleteProject: (state, action) => {
      state.categories.projects.splice(action.payload, 1);
    },
    deleteNote: (state, action) => {
      state.categories.notes.splice(action.payload, 1);
    },
    updateBlogDate: (state, action) => {
      const { index, date } = action.payload;
      if (state.categories.blogs[index]) {
        // console.log(state.categories.blogs[index])
        // console.log(state.categories.blogs[index].date)
        // console.log(date)
        state.categories.blogs[index].date = date;
      }
    },
    updateProjectDate: (state, action) => {
      const { index, date } = action.payload;
      if (state.categories.projects[index]) {
        state.categories.projects[index].date = date;
      }
    },
    updateNoteDate: (state, action) => {
      const { index, date } = action.payload;
      if (state.categories.notes[index]) {
        state.categories.notes[index].date = date;
      }
    },
    updateInternshipDate: (state, action) => {
      const { index, date } = action.payload;
      if (state.categories.internships[index]) {
        state.categories.internships[index].date = date;
      }
    },
  },
});

export const {
  addBlog,
  addProject,
  addNote,
  addInternship,
  updateBlogTitle,
  updateProjectTitle,
  updateNoteTitle,
  updateInternshipTitle,
  deleteBlog,
  deleteProject,
  deleteInternship,
  deleteNote,
  updateBlogDate,
  updateProjectDate,
  updateNoteDate,
  updateInternshipDate,
} = notesBlogSlice.actions;


export default notesBlogSlice.reducer;
