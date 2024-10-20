import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, updateBlogTitle, addProject, updateProjectTitle, addNote, updateNoteTitle, deleteBlog, updateBlogDate, deleteProject, deleteNote, addInternship, updateInternshipTitle, deleteInternship, updateProjectDate, updateNoteDate, updateInternshipDate } from '../../redux/notesBlogSlice';
import './AdminActualContent.css';
import { v4 as uuidv4 } from 'uuid';
import { EllipsisVertical } from 'lucide-react';
import { ArrowRightAltRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AdminContent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = [
        { title: "Blogs", id: 1 },
        { title: "Projects", id: 2 },
        { title: "Notes", id: 3 },
        { title: "Internships", id: 4 },
      ];
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="adminDashboard">
      <h1 className='nunito'>Darshan's Dashboard</h1>
      <div className="actualAdminContent">
        {categories.map((category) => (
          <AdminBlogCards key={Math.random()} category={category} />
        ))}
      </div>
    </div>
  );
}

export default AdminContent;

function AdminBlogCards({ category }) {
  const cards = useSelector((state) => state.notes.categories[category.title.toLowerCase()]);
  const cardsRefs = useRef([]);
  const [isEditing, setIsEditing] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dateEditingIndex, setDateEditingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    cardsRefs.current = Array(cards.length).fill().map((_, i) => cardsRefs.current[i] || React.createRef());
  }, [cards]);

  const addAndScrollEventHandler = () => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const newCard = {
      id: uuidv4(),
      title: `Untitled ${category.title.toLowerCase()}`,
      date: today,
    };

    switch (category.title.toLowerCase()) {
      case 'blogs':
        dispatch(addBlog(newCard));
        break;
      case 'projects':
        dispatch(addProject(newCard));
        break;
      case 'notes':
        dispatch(addNote(newCard));
        break;
      case 'internships':
        dispatch(addInternship(newCard));
        break;
      default:
        break;
    }

    cardsRefs.current.push(React.createRef());
    setTimeout(() => {
      const newIndex = cards.length;
      const currentBlogRefs = cardsRefs.current;

      if (currentBlogRefs[newIndex]) {
        currentBlogRefs[newIndex].current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setIsEditing(newIndex);
      }
    }, 100);
  };

  const handleTitleChange = (e, index) => {
    const updatedTitle = e.target.value;

    switch (category.title.toLowerCase()) {
      case 'blogs':
        dispatch(updateBlogTitle({ index, title: updatedTitle }));
        break;
      case 'projects':
        dispatch(updateProjectTitle({ index, title: updatedTitle }));
        break;
      case 'notes':
        dispatch(updateNoteTitle({ index, title: updatedTitle }));
        break;
      case 'internships':
        dispatch(updateInternshipTitle({ index, title: updatedTitle }));
        break;
      default:
        break;
    }
  };

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
    setDateEditingIndex(null);
  };

  const handleDelete = (index) => {
    switch (category.title.toLowerCase()) {
      case 'blogs':
        dispatch(deleteBlog(index));
        break;
      case 'projects':
        dispatch(deleteProject(index));
        break;
      case 'notes':
        dispatch(deleteNote(index));
        break;
      case 'internships':
        dispatch(deleteInternship(index));
        break;
      default:
        break;
    }
    setDropdownOpen(null);
  };

  const handleDateChange = (index) => {
    setDateEditingIndex(index);
    setSelectedDate(cards[index].date);
    setDropdownOpen(null);
  };

  const handleSaveDate = (index) => {
    switch (category.title.toLowerCase()) {
      case 'blogs':
        dispatch(updateBlogDate({ index, date: selectedDate }));
        break;
      case 'projects':
        dispatch(updateProjectDate({ index, date: selectedDate }));
        break;
      case 'notes':
        dispatch(updateNoteDate({ index, date: selectedDate }));
        break;
      case 'internships':
        dispatch(updateInternshipDate({ index, date: selectedDate }));
        break;
      default:
        break;
    }
    setDateEditingIndex(null);
  };

  const handleBlurEvent = () => {
    setIsEditing(null);
  };

  const NavigateToBlog = (index) => {
    const blogId = cards[index].id;
    navigate(`/admin/${category.title.toLowerCase()}/${blogId}`, {
      state: {
        category: category.title.toLowerCase(),
        blogId: blogId,
        title: cards[index].title,
        date: cards[index].date
      }
    });
  };

  return (
    <div className="adminNoteCards">
      <div className="adminNoteHeader">
        <h2>{category.title}</h2>
        <button className="adminBtn" onClick={addAndScrollEventHandler}>
          Add new {category.title.toLowerCase()}
        </button>
      </div>
      <div className="adminBlogsContent">
        {cards.map((blog, index) => (
          <div className="adminBlogContainer" key={blog.id} ref={cardsRefs.current[index]}>
            <div className="adminNoteContainerComplete">
              <div className="adminNotePrimaryChild">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={blog.title}
                    onChange={(e) => handleTitleChange(e, index)}
                    onBlur={handleBlurEvent}
                    className="adminNoteHeader nunito"
                    autoFocus
                  />
                ) : (
                  <h3 className="adminNoteHeader nunito" onClick={() => setIsEditing(index)}>
                    {blog.title}
                  </h3>
                )}
                <p className="adminNoteDate nunito">
                  {
                    category.title.toLowerCase() === 'blogs' ? 'Published on ' : category.title.toLowerCase() === 'projects' ? 'Last updated on ' : category.title.toLowerCase() === 'internships' ? 'Internship started on ' : ''
                  }
                  {dateEditingIndex === index ? (
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      onBlur={() => handleSaveDate(index)}
                    />
                  ) : (
                    new Date(blog.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  )}
                </p>
              </div>
              <div className="adminNavbarSecondaryChild">
                <button className="adminBtn" onClick={() => handleDropdownToggle(index)}>
                  <EllipsisVertical size={20} />
                </button>
                <button className="adminBtn" onClick={() => NavigateToBlog(index)}>
                  <ArrowRightAltRounded size={20} />
                </button>
                {dropdownOpen === index && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    <button onClick={() => handleDateChange(index)}>Change Date</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
