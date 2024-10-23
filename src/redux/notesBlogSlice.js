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
    addNoteInitialState: (state, action) => {
      state.categories.notes = action.payload;
    },
    addInternship: (state, action) => {
      state.categories.internships.push(action.payload);
    },
    updateBlogTitle: (state, action) => {
      const { id, title } = action.payload;
      const blog = state.categories.blogs.find((blog) => blog.id === id);
      if (blog) {
        blog.title = title;
      }
    },
    addInitialState: (state, action) => {
      const { category, data } = action.payload;
      console.log(category, data);
      state.categories[category] = data;
    },
    updateInternshipTitle: (state, action) => {
      const { id, title } = action.payload;
      const internship = state.categories.internships.find((internship) => internship.id === id);
      if (internship) {
        internship.title = title;
      }
    },
    updateProjectTitle: (state, action) => {
      const { id, title } = action.payload;
      const project = state.categories.projects.find((project) => project.id === id);
      if (project) {
        project.title = title;
      }
    },
    updateNoteTitle: (state, action) => {
      const { id, title } = action.payload;
      const note = state.categories.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
      }
    },
    deleteBlog: (state, action) => {
      const { id } = action.payload;
      state.categories.blogs = state.categories.blogs.filter((blog) => blog.id !== id);
    },
    deleteInternship: (state, action) => {
      const { id } = action.payload;
      state.categories.internships = state.categories.internships.filter((internship) => internship.id !== id);
    },
    deleteProject: (state, action) => {
      const { id } = action.payload;
      state.categories.projects = state.categories.projects.filter((project) => project.id !== id);
    },
    deleteNote: (state, action) => {
      const { id } = action.payload;
      state.categories.notes = state.categories.notes.filter((note) => note.id !== id);
    },
    updateBlogDate: (state, action) => {
      const { id, date } = action.payload;
      const blog = state.categories.blogs.find((blog) => blog.id === id);
      if (blog) {
        blog.date = date;
      }
    },
    updateProjectDate: (state, action) => {
      const { id, date } = action.payload;
      const project = state.categories.projects.find((project) => project.id === id);
      if (project) {
        project.date = date;
      }
    },
    updateNoteDate: (state, action) => {
      const { id, date } = action.payload;
      const note = state.categories.notes.find((note) => note.id === id);
      if (note) {
        note.date = date;
      }
    },
    updateInternshipDate: (state, action) => {
      const { id, date } = action.payload;
      const internship = state.categories.internships.find((internship) => internship.id === id);
      if (internship) {
        internship.date = date;
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
  addNoteInitialState,
  updateBlogDate,
  updateProjectDate,
  addInitialState,
  updateNoteDate,
  updateInternshipDate,
} = notesBlogSlice.actions;

export default notesBlogSlice.reducer;
