import React from 'react'
import './AddIcon.css'
import { Plus, X } from 'lucide-react'

function AddIcon({ onClick, isCancel }) {
    return (
        <div className='addIconAdmin' onClick={onClick}>
            <h1>
                {
                    isCancel ? <X /> : <Plus />

                }
            </h1>

        </div>
    )
}

export default AddIcon