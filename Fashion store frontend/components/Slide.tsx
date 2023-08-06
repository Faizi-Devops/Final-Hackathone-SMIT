import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px"
  };

  return (
   

    
    <div >
      <Slider {...settings}>
        <div>
          <Image
            src="/slide1.jpg"
            alt="Picture of the author"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/slide2.jpg"
            alt="Picture of the author"
            width={400}
            height={100}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/slide3.jpg"
            alt="Picture of the author"
            width={400}
            height={300}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/slide4.jpg"
            alt="Picture of the author"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
        <div>
          <Image
            src="/slide5.jpg"
            alt="Picture of the author"
            width={400}
            height={300}
            layout="responsive"
          />
        </div>
      </Slider>
    </div>
  
  );
};

export default Slide;
