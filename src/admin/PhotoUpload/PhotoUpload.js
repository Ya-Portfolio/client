import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage, deleteImage } from '../../redux/photoSlice'
import { v4 as uuidv4 } from 'uuid'
import './photoUpload.css'
import { DeleteOutline } from '@mui/icons-material'

function PhotoUpload({ imgs , saveToCloud}) {

    const imagesArr = useSelector(state => state.images.images)
    const dispatch = useDispatch()
    const [finalImgArr, setFinalImageAr] = useState()
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

                setFinalImageAr(file)
            }
        }
    }

    useEffect(() => {
        if (imgs && imgs.length > 0) {
            setImagesArray(imgs)
            // setFinalImageAr(imgs)
        }
        else {
            setImagesArray(imagesArr)
        }
    }, [imagesArr])

    const handleDeleteFn = (id) => {
        console.log(id)
        dispatch(deleteImage({ id }))
    }



    return (
        <>
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
                <button className="addNewSkillButton" onClick={()=>saveToCloud(finalImgArr)}>Save to Cloud</button>
            </div>
        </>
    )
}

export default PhotoUpload