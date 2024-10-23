import { Toaster } from 'sonner';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Documents from './pages/Documents/Documents';
import Contact from './pages/Documents/Contact/Contact';
import Login from './components/login/Login';
import Blog from './pages/Blog/Blog';
import IndividualProject from './pages/ProjectPage/IndividualProject';
import Admin from './admin/mainPage/Admin';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminContent from './admin/AdminContent/AdminContent';
import AdminBlog from './admin/AdminContent/AdminBlog';
import AdminDocUpload from './admin/AdminDocUpload/AdminDocUpload';
import AdminFile from './admin/AdminFile/AdminFile';
import PublicBlog from './public/PublicPage';
import MainLanding from './admin/mainlanding/MainLanding';
import AdminNotesContent from './admin/notes/AdminNotesContent';
import EmailApp from './admin/mail/EmailApp';
// import AdminSkills from './admin/adminSkills/AdminSkills';
import Skill from './admin/Skills/Skill';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          toastOptions={{
            style: {
              padding: '20px 15px',
            },
            className: 'class',
          }}
        />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/documents' element={<Documents />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/works' element={<IndividualProject />} />
          <Route path='/public/:id' element={<PublicBlog />} />
          <Route path='/admin' element={<Admin />}>
            <Route index element={<MainLanding />} />
            <Route path='accessories' element={<AdminContent />} />
            <Route path='email' element={<EmailApp />} />
            <Route path='documents' element={<AdminDocUpload />} />
            <Route path='note' element={<AdminNotesContent />} />
            <Route path='Addskill/:id' element={<Skill />} />
            {/* <Route path='skills/:id' element={<Skill />} /> */}

            <Route path='document/:id' element={<AdminFile />} />
            <Route path='edit/:id' element={<AdminBlog />} />
            <Route path=':category/:id' element={<AdminBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;



function HomePage() {
  return (
    <div className='home'>
      <Home />
    </div>
  )
}

export { HomePage }