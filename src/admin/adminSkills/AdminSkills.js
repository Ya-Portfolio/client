import { ArrowRightAltRounded, CancelOutlined } from '@mui/icons-material'
import { EllipsisVertical } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axiosPrivate from '../../api/axios'

function AdminSkills() {
    const [skills, setSkills] = useState([])
    const cardsRefs = useRef([])
    const [dropdownOpen, setDropdownOpen] = useState()
    const [newSkillTitle, setNewSkillTitle] = useState()
    const newSkill = useRef()
    const [id, setId] = useState()

    const navigate = useNavigate()

    const handleDropdownToggle = (index) => {
        if (dropdownOpen === index) {
            setDropdownOpen(null)
        } else {
            setDropdownOpen(index)
        }
    }

    const fetchSkills = async () => {
        try {
            const response = await axiosPrivate.get('/skill')
            console.log(response)
            setSkills(response.data?.data?.skills || [])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchSkills()
    }, [])

    const NavigateToSkill = (id) => {
        const skill = skills.find(obj => obj._id === id)
        navigate(`/admin/Addskill/${id}`, { state: { title: skill.name, isNewOne: false, gallery: skill.gallery } })
    }

    const handleDelete = async (id) => {
        await axiosPrivate.delete('/skill', {
            params: {
                ObjectId: id
            }
        }).then(res => {
            console.log(res)
            toast.success("Skills Deleted Successfully")
            fetchSkills()
        }).catch(e => {
            console.log(e)
            toast.error("Skill deletion failed")
        }).finally(() => {
            setDropdownOpen(null)
        })
    }


    const addAndScrollEventHandler = async () => {
        setNewSkillTitle(true)
        await axiosPrivate.post('/skill')
            .then(res => {
                console.log(res)
                setId(res.data?.data?._id)
                toast.success("New Skill added successfully!")
            }).catch(err => {
                toast.error("Failed to add new Skill!")
            })

    }

    const NavigateToNewSkill = () => {
        if (!newSkill.current.value) {
            toast.error("Title mustn't be empty!")
            return
        }
        navigate(`/admin/Addskill/${id}`, { state: { title: newSkill.current?.value, isNewOne: true } })
    }

    return (
        <div className="adminNoteCards">
            <div className="adminNoteHeader">
                <button className="adminBtn" onClick={addAndScrollEventHandler}>
                    Add new Skill
                </button>
            </div>
            <div className="adminBlogsContent">
                {skills.map((skill, index) => (
                    <div className="adminBlogContainer" key={Math.random()} ref={cardsRefs.current[index]}>
                        <div className="adminNoteContainerComplete">
                            <div className="adminNotePrimaryChild">

                                <h3 className="adminNoteHeader nunito">
                                    {skill.name}
                                </h3>
                                <p className="adminNoteDate nunito">
                                    Skill added on{' '}
                                    {
                                        new Date(skill.date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })
                                    }
                                </p>
                            </div>
                            <div className="adminNavbarSecondaryChild">
                                <button className="adminBtn" onClick={() => handleDropdownToggle(index)}>
                                    <EllipsisVertical size={20} />
                                </button>
                                <button className="adminBtn" onClick={() => NavigateToSkill(skill._id)}>
                                    <ArrowRightAltRounded size={20} />
                                </button>
                                {dropdownOpen === index && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDelete(skill._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {
                    newSkillTitle && (
                        <div className="adminBlogContainer">
                            <div className="adminNoteContainerComplete">
                                <div className="adminNotePrimaryChild">
                                    <h3 className="adminNoteHeader nunito">
                                        <input type="text" placeholder='Untitled' ref={newSkill} style={{ margin: 0 }} />
                                    </h3>
                                    <p className="adminNoteDate nunito">
                                        Skill added on{' '}
                                        {
                                            new Date(new Date()).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                        }
                                    </p>
                                </div>
                                <div className="adminNavbarSecondaryChild">
                                    <button className="adminBtn" onClick={() => setNewSkillTitle(false)}>
                                        <CancelOutlined size={20} />
                                    </button>
                                    <button className="adminBtn" onClick={() => NavigateToNewSkill()}>
                                        <ArrowRightAltRounded size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AdminSkills