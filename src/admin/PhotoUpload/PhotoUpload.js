import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage, deleteImage } from '../../redux/photoSlice'
import { v4 as uuidv4 } from 'uuid'
import './photoUpload.css'
import { DeleteOutline } from '@mui/icons-material'

function PhotoUpload({ imgs }) {

    const imagesArr = useSelector(state => state.images.images)
    const dispatch = useDispatch()

    const [imagesArray, setImagesArray] = useState([])

    const handleImageAddition = (e) => {
        if (e && e.target) {
            const file = e.target?.files[0] || null
            if (file && e.target) {
                const imageUrl = URL.createObjectURL(file)
                dispatch(addImage(
                    {
                        id: uuidv4(),
                        file: imageUrl
                    }
                ))
            }
        }
    }

    useEffect(() => {
        if (imgs && imgs.length > 0) {
            setImagesArray(imgs)
        }
        else {
            setImagesArray(imagesArr)
        }
    }, [])

    const handleDeleteFn = (id) => {
        dispatch(deleteImage({ id }))
    }

  

    return (
        <div className="photoUploadContainer">
            <div className="addingNewCards">
                <label htmlFor="photo">
                    <div className="addingNewInnerCards" >
                        +
                        <input type="file" name="photo" id="photo" onChange={handleImageAddition} style={{ display: 'none' }} />
                    </div>
                </label>
            </div>
            <div className="imageGalleryAddedToImages">
                {
                    imagesArray.map((image, index) => (
                        <div key={Math.random()} title={image.id} className="imageCardsForGallery">
                            <div className="deleteOptionForGallery" title='delete' onClick={() => handleDeleteFn(image.index)}>
                                <DeleteOutline />
                            </div>
                            <img src={image.url} alt="skills" />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default PhotoUpload