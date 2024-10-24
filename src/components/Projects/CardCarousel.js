// import React, { useEffect } from 'react';
// import './Slide.css';
// import pic from '../../assets/vault/Screenshot (30).png';
// import { Link } from 'react-router-dom';

// const CardCarousel = ({ setValue }) => {

//   const cardItems = [
//     {
//       id: Math.random(),
//       title: 'The Vault',
//       copy: 'An app for secure storage of confidential files, featuring a hierarchical access control system.',
//       tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Material-UI'],
//       image: pic,
//     },
//     {
//       id: Math.random(),
//       title: 'Project 2',
//       copy: 'Another project description.',
//       tags: ['React', 'Node.js', 'MongoDB'],
//       image: pic,
//     },
//     {
//       id: Math.random(),
//       title: 'Project 3',
//       copy: 'Third project description.',
//       tags: ['React', 'Node.js', 'MongoDB'],
//       image: pic,
//     },
//     {
//       id: Math.random(),
//       title: 'Project 4',
//       copy: 'Fourth project description.',
//       tags: ['React', 'Node.js', 'MongoDB'],
//       image: pic,
//     },
//   ];

//   document.addEventListener('DOMContentLoaded', () => {
//     const quaternaryPage = document.querySelector('.quaternaryPage')
//     const content1 = document.querySelector('.carousel')
//     quaternaryPage.style.height = 600 * cardItems.length + 800 + 'px'
//     content1.style.height = '100%'
//   })

//   useEffect(() => {
//     const quaternaryPage = document.querySelector('.quaternaryPage');
//     const content1 = document.querySelector('.carousel');

//     const setHeightBasedOnScreenSize = () => {
//       const windowHeight = window.innerHeight;

//       if (windowHeight < 500) {
//         quaternaryPage.style.height = `${300 * cardItems.length + 800}px`;
//       } else {
//         quaternaryPage.style.height = `${600 * cardItems.length + 800}px`;
//       }
//       content1.style.height = '100%';
//     };

//     // Initial height setup on mount
//     setHeightBasedOnScreenSize();

//     // Listen for window resize events to dynamically update height
//     window.addEventListener('resize', setHeightBasedOnScreenSize);

//     return () => {
//       // Cleanup resize event listener on unmount
//       window.removeEventListener('resize', setHeightBasedOnScreenSize);
//     };
//   }, [cardItems.length]);


//   const handleScrolling = (e) => {
//     console.log(window.scrollY)
//   }

//   return (
//     <div className="carousel" onWheel={handleScrolling}>
//       {cardItems.map((card, index) => (
//         <div className='card' key={card.id} style={{ zIndex: 10 - 2 * index }}>
//           <h2>{card.title}</h2>
//           <div className="tags">
//             {
//               card.tags.map(tag => (
//                 <span key={tag}>{tag}</span>
//               ))
//             }
//           </div>
//           <img src={card.image} alt="" />
//           <p>{card.copy}</p>
//           <div className="visit nunito">
//             <Link to={`/project`}> Read More</Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CardCarousel;


import './Slide.css';
import { Link } from 'react-router-dom';

const CardCarousel = ({ setValue, handleScrolling, cardItems }) => {

  return (
    <div className="carousel" onWheel={handleScrolling}>
      {cardItems.map((card, index) => (
        <div className="card" key={card._id} style={{ zIndex: 10 - 2 * index }}>
          <h2>{card.title}</h2>
          <div className="tags">
            {card.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <img src={card?.coverPhoto?.location} alt="" />
          {/* <p>{card.desc}</p> */}
          <div className="visit nunito">
            <Link to={`/public/${card._id}`}> Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCarousel;
