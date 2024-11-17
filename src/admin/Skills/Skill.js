import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PhotoUpload from '../PhotoUpload/PhotoUpload'
import './skills.css'
import axiosPrivate from '../../api/axios'
import { toast } from 'sonner'

function Skill() {
    const parameters = useParams()
    const location = useLocation()
    const [id, setId] = useState(null)
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
        if (!location.state?.isNew && location.state?.gallery?.length > 0) {
            const fetchSkills = async () => {
                try {
                    const response = await axiosPrivate.get('/skill')
                    const skillsArr = response.data?.data?.skills || []
                    const skill = skillsArr.find(obj => obj._id === parameters.id)
                    if (skill) {
                        const images = skill.gallery.map(img => ({
                            id: img._id,
                            url: img.location
                        }))
                        setImgs(images)
                        setId(skill._id)
                        console.log("Fetched images:", images)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            await fetchSkills()
            setTitle(location.state?.title)
        } else {
            setTitle(location.state?.title)
            setId(parameters.id)
        }
    }

    useEffect(() => {
        fetchImages()
        
    }, [location.state, parameters.id])

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
                <PhotoUpload imgs={imgs} saveToCloud={saveToCloud} name={title} id={id} fetchImages={fetchImages} />
            </div>
        </div>
    )
}

export default Skill
