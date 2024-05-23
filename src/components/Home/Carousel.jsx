// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Carousel = () => {
    SwiperCore.use([Autoplay]);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 1000 }} // Ensure autoplay continues after user interaction
      loop={true}

    >
      <SwiperSlide>
        <img src="assets/images/carousel/jp1.jpg" alt="Slide 1" className='w-full  mx-auto' />
      </SwiperSlide>
      <SwiperSlide>
        <img src="assets/images/carousel/jp2.jpg" alt="Slide 2" className='w-full  mx-auto' />
      </SwiperSlide>
      <SwiperSlide>
        <img src="assets/images/carousel/jp3.jpg" alt="Slide 3" className='w-full  mx-auto' />
      </SwiperSlide>
      <SwiperSlide>
        <img src="assets/images/carousel/jp4.jpg" alt="Slide 4" className='w-full  mx-auto' />
      </SwiperSlide>
      
    </Swiper>
  );
};

export default Carousel;