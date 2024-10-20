import React from 'react'
import './Documents.css'
import folder from '../../assets/documents/Rectangle 32.png'
import doc from '../../assets/documents/Rectangle 31.png'
import Navbar from '../../components/navbar/Navbar'

function Documents() {
    return (
        <div className="documentsContainer">
            <Navbar title='Chandrababu Gowda' value="Documents" />
            <div className="docsContainer">
                {
                    [1, 2, 3, 4, 5].map((card, index) => {
                        return (
                            <div className="folders" key={Math.random()}>
                                <img src={folder} alt="" />
                                <p>{"College docs"}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="pageContainer">
                {
                    [1, 2, 3, 4, 5, 6, 7].map((card, index) => {
                        return (
                            <div className="pages" key={Math.random()}>
                                <img src={doc} alt="" />
                                <p>{"Personal docs"}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Documents