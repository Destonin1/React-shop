import styles from "./About-block.module.css"
import aboutImg from '../img/online.jpg';

const AboutBlock = () => {
    return (
        <section>
            <div className="container">
                <div className="section-content">
                    <h2 className="section-title">About <span className="title-span">us</span></h2>
                    <div className={styles.wrap}>
                        <img className={styles.img} src={aboutImg} alt="building"/>
                        <div className={styles.textBlock}>
                            <p className={styles.text}>
                            Online is a solution for those who value their time and want to order high-quality cloth in one click.
                            </p>
                            <p className={styles.text}>
                            When ordering goods online in our store, you can be sure of the high quality of products and speed of delivery. 
                            Sending goods is carried out every day by courier. Most importantly, we cover all shipping costs.
                            </p>
                            <p className={styles.text}>
                            The pride of our store are professional consultants who work for you 7 days a week. Each of them has passed a multi-level 
                            training program and will be able to choose the optimal coverage for your interior and comfort.
                            </p>
                            <p className={styles.text}>
                            We are always working to improve the service, the convenience of choosing and placing an order.
                            </p>
                            <p className={styles.text}>
                            We wish you pleasant shopping in the Shopy online store!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutBlock;