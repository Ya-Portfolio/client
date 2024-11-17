import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage, deleteImage } from '../../redux/photoSlice'
import { v4 as uuidv4 } from 'uuid'
import './photoUpload.css'
import { DeleteOutline } from '@mui/icons-material'
import axiosPrivate from '../../api/axios'
import { toast } from 'sonner'

function PhotoUpload({ imgs, saveToCloud, name, id, fetchImages }) {
    const imagesArr = useSelector(state => state.images.images)
    const dispatch = useDispatch()
    const [finalImgArr, setFinalImgArr] = useState([])
    const [imagesArray, setImagesArray] = useState([])

    const handleImageAddition = async (e) => {
        if (e && e.target) {
            const file = e.target.files[0] || null
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                dispatch(addImage({ id: uuidv4(), file: imageUrl }))
                setFinalImgArr((prev) => [...prev, file])

                const formData = new FormData()
                formData.append('_id', id)           // Skill ID
                formData.append('name', name)        // Skill Name
                formData.append('image', file)       // File object

                try {
                    const response = await axiosPrivate.put('/skill', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Necessary for file upload
                        },
                    })
                    console.log(response.data)
                    toast.success("Image uploaded successfully")
                    fetchImages()
                } catch (error) {
                    console.error("Error uploading image:", error)
                    toast.error("Image upload failed")
                }


            }
        }
    }

    useEffect(() => {
        if (imgs && imgs.length > 0) {
            setImagesArray(imgs)
        } else {
            setImagesArray(imagesArr)
        }
    }, [imgs, imagesArr])

    const handleDeleteFn = (id) => {
        dispatch(deleteImage({ id }))
    }

    return (
        <>
            <div className="photoUploadContainer">
                <div className="addingNewCards">
                    <label htmlFor="photo">
                        <div className="addingNewInnerCards">
                            +
                            <input type="file" name="photo" id="photo" onChange={handleImageAddition} style={{ display: 'none' }} />
                        </div>
                    </label>
                </div>
                <div className="imageGalleryAddedToImages">
                    {
                        imagesArray.map((image) => (
                            <div key={image.id} title={image.id} className="imageCardsForGallery">
                                <div className="deleteOptionForGallery" title='delete' onClick={() => handleDeleteFn(image.id)}>
                                    <DeleteOutline />
                                </div>
                                <img src={image.url} alt="skills" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="buttonContainer">
                <button className="addNewSkillButton" onClick={() => saveToCloud(finalImgArr[0])}>Save to Cloud</button>
            </div>
        </>
    )
}

export default PhotoUpload
