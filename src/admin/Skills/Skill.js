import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PhotoUpload from '../PhotoUpload/PhotoUpload'
import './skills.css'
import axiosPrivate from '../../api/axios'
import { toast } from 'sonner'

function Skill() {
    const parameters = useParams()
    const location = useLocation()

    const [title, setTitle] = useState('')
    const [imgs, setImgs] = useState([])

    const setTitleFn = async (title) => {
        await axiosPrivate.put('/skill', {
            name: title,
            _id: parameters.id
        }).then(res => {
                console.log(res)
                setTitle(location.state?.title)
                toast.success("Title Updated successfully")
            }).catch(err => {
                console.log(err)
            })
    }

    const fetchImages = async () => {
        if (!location.state?.isNew && location.state?.gallery?.length >= 0) {
            setImgs(location.state.gallery)
            setTitle(location.state?.title)
        }
        else {
            setTitle(location.state?.title)
            // setTitleFn(location.state?.title)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const saveToCloud = async (finalImg) => {

        const formadata = new FormData()
        formadata.append('_id', parameters.id)
        formadata.append('name', title)
        formadata.append('image', finalImg)

        await axiosPrivate.put('/skill', formadata).then(res => {
            console.log(res)
            toast.success('Icons uploaded Successfully')
        }).catch(e => {
            console.log(e)
            toast.error("Cannot upload image")
        })
    }

    return (
        <div className="skillsContainerBloc">
            <h1 className='ebGaramond'>{title}</h1>
            <p className='nunito'>Upload the necessary Tech Stacks you gained in this skill</p>

            <div className="relatedImages">
                <PhotoUpload imgs={imgs} saveToCloud={saveToCloud} />
            </div>
        </div>
    )
}

export default Skill