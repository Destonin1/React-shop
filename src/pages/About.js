import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import aboutImg from '../img/unnamed.png';

const About = () =>  {
  return (
    <>
        <Header />
        <section>
          <div className="container">
              <div className="about section-content">
                  <h2 className="section-title">About <span className="title-span">us</span></h2>
                  <div className='about__content'>
                    <img className="about__img" src={aboutImg} alt="building"/>
                    <p className='about__text'>
                      Online is a solution for those who value their time and want to order high-quality cloth in one click.
                    </p>
                    <p className='about__text'>
                      When ordering goods online in our store, you can be sure of the high quality of products and speed of delivery. 
                      Sending goods is carried out every day by courier. Most importantly, we cover all shipping costs.
                    </p>
                    <p className='about__text'>
                      The pride of our store are professional consultants who work for you 7 days a week. Each of them has passed a multi-level 
                      training program from the Tikkurila Group concern and will be able to choose the optimal coverage for your interior and comfort.
                    </p>
                    <p className='about__text'>
                      We are always working to improve the service, the convenience of choosing and placing an order.
                    </p>
                    <p className='about__text'>
                      We wish you pleasant shopping in the Shopy online store!
                    </p>
                  </div>
              </div>
          </div>
        </section>
        <Footer />
    </>
    
  );
}

export default About;