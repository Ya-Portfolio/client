import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBlog,
  updateBlogTitle,
  addProject,
  updateProjectTitle,
  addNote,
  updateNoteTitle,
  deleteBlog,
  updateBlogDate,
  deleteProject,
  deleteNote,
  addInternship,
  updateInternshipTitle,
  deleteInternship,
  updateProjectDate,
  updateNoteDate,
  updateInternshipDate,
  addInitialState,
} from '../../redux/notesBlogSlice';
import './AdminActualContent.css';
import { EllipsisVertical } from 'lucide-react';
import { ArrowRightAltRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axios';
import { toast } from 'sonner';

function AdminContent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = [
        { title: 'Blogs', id: 1 },
        { title: 'Projects', id: 2 },
      ];
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="adminDashboard">
      <h1 className="nunito">Chandrababu's Dashboard</h1>
      <div className="actualAdminContent">
        {categories.map((category) => (
          <AdminBlogCards key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default AdminContent;

function AdminBlogCards({ category }) {
  const cards = useSelector((state) => state.notes.categories[category.title.toLowerCase()]);
  const [isEditing, setIsEditing] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dateEditingIndex, setDateEditingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axiosPrivate.get('/file/short-details', {
        params: {
          type: category.title.toLowerCase(),
        },
      });
      const newData = response.data?.data?.files || [];
      const newArr = newData.map((data) => {
        return {
          id: data._id,
          title: data.title,
          date: data.date,
        };
      });
      dispatch(addInitialState({ category: category.title.toLowerCase(), data: newArr }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addAndScrollEventHandler = async () => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    await axiosPrivate
      .post('/file', {
        type: category.title.toLowerCase(),
      })
      .then((res) => {
        if (!res.data?.data?._id) {
          toast.error(`Failed to add new ${category.title.toLowerCase()}!`);
          return;
        }

        const newCard = {
          id: res.data?.data?._id,
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

        setIsEditing(newCard.id); // Automatically open the editing state for the newly added card
        toast.success(`New ${category.title.toLowerCase()} added successfully!`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleTitleChange = (e, id) => {
    const updatedTitle = e.target.value;

    switch (category.title.toLowerCase()) {
      case 'blogs':
        dispatch(updateBlogTitle({ id, title: updatedTitle }));
        break;
      case 'projects':
        dispatch(updateProjectTitle({ id, title: updatedTitle }));
        break;
      case 'notes':
        dispatch(updateNoteTitle({ id, title: updatedTitle }));
        break;
      case 'internships':
        dispatch(updateInternshipTitle({ id, title: updatedTitle }));
        break;
      default:
        break;
    }
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
    setDateEditingIndex(null);
  };

  const handleDelete = async (id) => {

    await axiosPrivate.delete('/file', {
      params: {
        _id: id,
      },
    }).then(res => {
      toast.success(`Successfully deleted ${category.title.toLowerCase()}!`);
      switch (category.title.toLowerCase()) {
        case 'blogs':
          dispatch(deleteBlog(id));
          break;
        case 'projects':
          dispatch(deleteProject(id));
          break;
        case 'notes':
          dispatch(deleteNote(id));
          break;
        case 'internships':
          dispatch(deleteInternship(id));
          break;
        default:
          break;
      }
      setDropdownOpen(null);
      fetchBlogs()
    }).catch(e => {
      console.log(e);
      toast.error(`Failed to delete ${category.title.toLowerCase()}!`);
    });

  };

  const handleDateChange = (id) => {
    setDateEditingIndex(id);
    const card = cards.find((card) => card.id === id);
    setSelectedDate(card.date);
    setDropdownOpen(null);
  };

  const handleSaveDate = (id) => {
    switch (category.title.toLowerCase()) {
      case 'blogs':
        dispatch(updateBlogDate({ id, date: selectedDate }));
        break;
      case 'projects':
        dispatch(updateProjectDate({ id, date: selectedDate }));
        break;
      case 'notes':
        dispatch(updateNoteDate({ id, date: selectedDate }));
        break;
      case 'internships':
        dispatch(updateInternshipDate({ id, date: selectedDate }));
        break;
      default:
        break;
    }
    setDateEditingIndex(null);
  };

  const handleBlurEvent = () => {
    setIsEditing(null);
  };

  const NavigateToBlog = (id) => {
    const card = cards.find((blog) => blog.id === id);
    navigate(`/admin/${category.title.toLowerCase()}/${id}`, {
      state: {
        category: category.title.toLowerCase(),
        blogId: id,
        title: card.title,
        date: card.date,
      },
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
        {cards.map((blog) => (
          <div className="adminBlogContainer" key={blog.id}>
            <div className="adminNoteContainerComplete">
              <div className="adminNotePrimaryChild">
                {isEditing === blog.id ? (
                  <input
                    type="text"
                    value={blog.title || ''}
                    onChange={(e) => handleTitleChange(e, blog.id)}
                    onBlur={handleBlurEvent}
                    className="adminNoteHeader nunito"
                    autoFocus
                  />
                ) : (
                  <h3 className="adminNoteHeader nunito" onClick={() => setIsEditing(blog.id)}>
                    {blog.title || `Untitled ${category.title.toLowerCase()}`}
                  </h3>
                )}
                <p className="adminNoteDate nunito">
                  {category.title.toLowerCase() === 'blogs'
                    ? 'Published on '
                    : category.title.toLowerCase() === 'projects'
                      ? 'Last updated on '
                      : category.title.toLowerCase() === 'internships'
                        ? 'Internship started on '
                        : ''}
                  {dateEditingIndex === blog.id ? (
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      onBlur={() => handleSaveDate(blog.id)}
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
                <button className="adminBtn" onClick={() => handleDropdownToggle(blog.id)}>
                  <EllipsisVertical size={20} />
                </button>
                <button className="adminBtn" onClick={() => NavigateToBlog(blog.id)}>
                  <ArrowRightAltRounded size={20} />
                </button>
                {dropdownOpen === blog.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDelete(blog.id)}>Delete</button>
                    <button onClick={() => handleDateChange(blog.id)}>Change Date</button>
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
