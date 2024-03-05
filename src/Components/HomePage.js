import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../style/homepage.css';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';


const slideImages = [
  {
    url: `${image1}`,
    caption: "C'est un site de quiz où vous pourrez répondre à des questions de culture générale"
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

  const [number, setNumber] = useState(1);

  const handleClick = () => {
    setNumber(number + 1);
  };

  const isOdd = number % 2 !== 0;
  const move =  isOdd? "d-none" : "";

  return (
    <div className=''>
      <div>
        <h2>Bonjour et bienvenue sur mon premier project sous React et Node.js</h2>
        <button onClick={handleClick} className='btn btn-primary mb-3'>{isOdd ? 'Le principe du site ?' : 'Fermer'}</button>
      </div>
      <div className={`slide-containter ${move}`}>
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div className='divStyle'style={{ 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
              <div className='panStyle'>{slideImage.caption}</div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  )
};

export default HomePage;
