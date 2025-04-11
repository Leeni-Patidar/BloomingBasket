"use client"

import { Sprout, WandSparkles, Truck, Leaf } from "lucide-react"
import styles from "../assets/About.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const About = () => {
  return (
    <>
    <Navbar/>
    <section className={styles.heroSection}>
      <div className={styles.heroImage}>
        <img
          src="/public/images/About/about-1.jpeg?height=600&width=1200"
          alt="Cherry blossoms"
          width={1200}
          height={600}
          priority
          className={styles.image}
        />
      </div>
    </section>

    <section className={styles.aboutSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h4 className={`${styles.timesFont} mb-4 text-decoration-underline `}>Our Mission</h4>
            <p className={styles.aboutText}>
              At Blossom Studio, we provide a unique experience celebrating beauty and thoughtfulness in every floral
              arrangement. Our passion for flowers drives us to create stunning designs that capture the essence of
              nature's beauty. We believe that flowers have the power to transform spaces and emotions, bringing joy and
              comfort to every occasion.
            </p>
            <p className={styles.aboutText}>
              Our team of skilled florists combines artistry and expertise to craft arrangements that tell your story
              and convey your sentiments in a personalized experience. Our roses are hand-selected from the finest
              growers to ensure quality and longevity, allowing you to enjoy their beauty for days to come.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.aboutSection}>
      <div className="container py-2">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h4 className={`${styles.timesFont} mb-4 text-decoration-underline `}>Why Choose Blossom Studio?</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mb-4">
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <Sprout className={styles.icon} />
              </div>
              <h4 className="mt-0 mb-3 ">Fresh Picks</h4>
              <p>Hand-selected flowers sourced from local and sustainable growers.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
              <WandSparkles className={styles.icon} />
              </div>
              <h4 className="mt-0 mb-3">Custom Designs</h4>
              <p>Personalized arrangements crafted to match your style and occasion.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <Truck className={styles.icon} />
              </div>
              <h4 className="mt-0 mb-3">Seasonal Specials</h4>
              <p>Unique seasonal collections that celebrate nature's changing beauty.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <Leaf className={styles.icon} />
              </div>
              <h4 className="mt-0 mb-3">Fast Delivery</h4>
              <p>Same-day delivery options to ensure your flowers arrive fresh and beautiful.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.aboutSection}>
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className={styles.imageWrapper}>
              <img
                src="/public/images/About/about-2.png"
                alt="Florist arranging flowers"
                width={500}
                height={350}
                className={styles.storyImage}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <h4 className={`${styles.timesFont} mb-4 text-decoration-underline `}>Our Story</h4>
            <p className={styles.aboutText}>
              Blossom Studio was founded on a passion for creating beautiful floral experiences. Our journey began in a
              small flower shop where our founder, Emma, discovered her love for floral design. What started as a
              creative outlet quickly blossomed into a thriving business dedicated to bringing joy through flowers.
            </p>
            <p className={styles.aboutText}>
              Today, our team of skilled florists continues to push the boundaries of floral design. We take pride in
              our craft and are committed to sourcing the finest blooms from local growers. Each arrangement is
              thoughtfully designed to tell a story and create lasting memories for our clients.
            </p>
            <p className={styles.aboutText}>
              Whether you're celebrating a special occasion or simply want to brighten someone's day, we're here to help
              you express your sentiments through the language of flowers.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className={styles.aboutSection}>
  <div className="container text-center">
    <h4 className= {`${styles.timesFont} mb-4 text-decoration-underline `}>
      Ready to Create Something Beautiful?
    </h4>
    <p className={styles.aboutText}> 
      Let us help you create the perfect floral arrangement for any occasion.
      Explore our collections or get in touch with our team.
    </p>
    <div className={`${styles.buttonGroup} d-flex justify-content-center gap-3`}>
    <a href="/shop" className={styles.outlineButton}>Shop Now</a>
    <a href="/contact" className={styles.outlineButton}>Contact Us</a>
    </div>
  </div>
</section>

    <Footer/>
    </>
  )
}

export default About
