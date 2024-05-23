import React from 'react';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import '../style/homepage.css';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';


const slideImages = [
  {
    url: `${image1}`,
    caption: "Réponds aux questions",
    alt: "Réponds aux questions"
  },
  {
    url: `${image2}`,
    caption: 'Suis tes scores',
    alt: "Suis tes scores"
  },
  {
    url: `${image3}`,
    caption: "Compare les avec d'autres joueurs !",
    alt: "Compare les avec d'autres joueurs !"
  },
];

const HomePage = () => {

  return (
    <>
      <h2>Le site de quiz quotidien !</h2>
      <Link to="/quiz-page" className='btn btn-success m-1'>Lancer une session Quiz</Link>
      <br/>
      <br/>
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
