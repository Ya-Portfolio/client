import React from 'react'
import ContactForm from '../../../components/home/FormElement'
import Navbar from '../../../components/navbar/Navbar'

function Contact() {
    return (
        <div className="hexaPage">
            <Navbar title='Chandrababu Gowda' value="Contact" />
            <div className="hexaContent">
                <ContactForm />
            </div>
        </div>
    )
}

export default Contact