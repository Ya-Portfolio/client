import React, { useEffect, useRef, useState } from 'react';
import './AdminFile.css';
import { Check, Edit, File, Plus, X } from 'lucide-react';
import AddIcon from '../Components/addIcon/AddIcon';
import { DeleteOutline } from '@mui/icons-material';
import axiosPrivate from '../../api/axios'; // Ensure you have the correct axios instance
import { useParams } from 'react-router-dom';

function AdminFile() {
  const { id } = useParams(); // Get the _id from URL parameters
  const [cards, setCards] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [addFile, setAddFile] = useState(false);
  const textRef = useRef(null);
  const descRef = useRef();
  const fileRef = useRef();
  const lastCardRef = useRef();
  const [file, setFile] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  // Refs for title and description based on the number of fetched documents
  const titleRefs = useRef([]);
  const descriptionRefs = useRef([]);
  const fileRefs = useRef([]);

  // Fetch data from the server using the _id from URL parameters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('/document', {
          params: { _id: id },
        });
        const { documents: data } = response.data?.data?.file;
        console.log(data)
        setCards(data);
        setImageUrls(Array(data.length).fill('')); // Initialize image URLs
        titleRefs.current = Array(data.length).fill().map(() => React.createRef()); // Create refs for titles
        descriptionRefs.current = Array(data.length).fill().map(() => React.createRef()); // Create refs for descriptions
        fileRefs.current = Array(data.length).fill().map(() => React.createRef()); // Create refs for files
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const addFileEvent = () => {
    setAddFile(!addFile);
    setTimeout(() => {
      if (lastCardRef.current) {
        lastCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 0);
  };

  useEffect(() => {
    if (addFile) {
      textRef.current.focus();
    }
  }, [addFile]);

  const deleteFile = (i) => {
    const newCards = cards.filter((_, index) => index !== i);
    const newImageUrls = imageUrls.filter((_, index) => index !== i);
    setCards(newCards);
    setImageUrls(newImageUrls);
  };

  const handleEditClick = (index) => {
    setEditableIndex(index === editableIndex ? null : index);
  };

  const handleNewAddition = () => {
    if (!textRef.current.value) {
      return;
    }

    setCards([...cards, cards.length + 1]);
    setImageUrls([...imageUrls, '']); // Add empty entry for new image
    setAddFile(false);
    setTimeout(() => {
      if (lastCardRef.current) {
        lastCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 0);
  };

  const generateUrl = (file, i) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      setImageUrls((prev) => {
        const updatedUrls = [...prev];
        updatedUrls[i] = data; // Store the generated URL
        return updatedUrls;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileAdditionImg = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFile(url);
      setHasImage(true);
    }
  };

  const handleFileAddition = (e, i) => {
    const file = e.target.files[0];
    if (file) {
      generateUrl(file, i);
    }
  };

  const cancelEditing = (index) => {
    setEditableIndex(null);
  };

  return (
    <div className="adminFileContainer">
      <AddIcon onClick={addFileEvent} isCancel={addFile} />
      <h1 className="ebGaramond">File Manager</h1>
      <div className="filesContainer">
        {cards?.map((card, index) => (
          <div className="fileCards" key={index + 93782}>
            {editableIndex === index ? (
              <div className="admindeleteIcon" onClick={() => cancelEditing(index)}>
                <X />
              </div>
            ) : (
              <div className="admindeleteIcon" onClick={() => deleteFile(index)}>
                <DeleteOutline />
              </div>
            )}
            <div className="adminEditIcon">
              {editableIndex === index ? (
                <p onClick={() => handleEditClick(index)}>
                  <Check />
                </p>
              ) : (
                <p>
                  <Edit onClick={() => handleEditClick(index)} />
                </p>
              )}
            </div>
            {(() => {
              const isEditable = editableIndex === index;
              const hasImage = imageUrls[index];

              return (
                <label htmlFor={isEditable ? `adminFile-${index}` : ''}>
                  <div className="fileImgBg">
                    {isEditable ? (
                      hasImage ? (
                        <img
                          src={imageUrls[index]}
                          alt={`Uploaded file ${index + 1}`}
                          style={{ width: '100%', height: '100%' }}
                        />
                      ) : (
                        <Plus />
                      )
                    ) : (
                      <File />
                    )}
                  </div>
                </label>
              );
            })()}
            <input
              type="file"
              id={`adminFile-${index}`}
              ref={fileRefs.current[index]}
              style={{ display: 'none' }}
              onChange={(e) => handleFileAddition(e, index)}
            />
            <div className="fileInfo">
              <h3>
                {editableIndex === index ? (
                  <input
                    type="text"
                    ref={titleRefs.current[index]}
                    placeholder="File Name"
                    defaultValue={titleRefs.current[index]?.current?.value || 'File Name'}
                  />
                ) : (
                  `File Name ${index + 1}`
                )}
              </h3>
              <p>
                {editableIndex === index ? (
                  <input
                    type="text"
                    ref={descriptionRefs.current[index]}
                    placeholder="File Description"
                    defaultValue={descriptionRefs.current[index]?.current?.value || 'File Description'}
                  />
                ) : (
                  'File Description'
                )}
              </p>
            </div>
          </div>
        ))}
        {addFile && (
          <div className="fileCards editableFile" ref={lastCardRef}>
            <div className="fileImgBg">
              {true ? (
                hasImage ? (
                  <label htmlFor="newfile">
                    <img
                      src={file}
                      alt="Uploaded Preview"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <input
                      type="file"
                      id="newfile"
                      ref={fileRef}
                      style={{ display: 'none' }}
                      onChange={handleFileAdditionImg}
                    />
                  </label>
                ) : (
                  <label htmlFor="newfile">
                    <Plus />
                    <input
                      type="file"
                      id="newfile"
                      ref={fileRef}
                      style={{ display: 'none' }}
                      onChange={handleFileAdditionImg}
                    />
                  </label>
                )
              ) : (
                <File />
              )}
            </div>
            <div className="adminEditIcon" onClick={handleNewAddition}>
              <p>
                <Check />
              </p>
            </div>
            <div className="fileInfo">
              <h3>
                <input type="text" ref={textRef} placeholder="File Name" />
              </h3>
              <p>
                <input type="text" ref={descRef} placeholder="File Description" />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFile;
