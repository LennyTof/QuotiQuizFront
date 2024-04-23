import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../style/homepage.css';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';


const slideImages = [
  {
    url: `${image1}`,
    caption: "C'est un site de quiz culture générale"
  },
  {
    url: `${image2}`,
    caption: 'Suivez vos scores'
  },
  {
    url: `${image3}`,
    caption: 'Et comparez les avec les autres utilisateurs !'
  },
];

const HomePage = () => {

  return (
    <>
      <div>
        <h2 className='homepage-title'>Bonjour et bienvenue sur mon premier project sous React et Node.js</h2>
      </div>
      <div className={`slide-containter`}>
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div className='panStyle'><h3>{slideImage.caption}</h3></div>
              <div className='divStyle'style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                <span className='pictureNumber'>{index + 1}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </>
  )
};

export default HomePage;
