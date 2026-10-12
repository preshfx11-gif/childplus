import React, { useEffect, useState } from 'react'

export default function App() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // jQuery/Owl Carousel/Swiper load from CDN <script> tags in index.html.
    // They're almost always ready by the time this runs, but if the network
    // is slow, retry for a few seconds instead of silently giving up once.
    let cancelled = false
    let cleanupFn = () => {}
    let attempts = 0

    const tryInit = () => {
      if (cancelled) return
      const $ = window.$

      if (!$ || !$.fn || !$.fn.owlCarousel || !window.Swiper) {
        attempts += 1
        if (attempts < 40) {
          setTimeout(tryInit, 150) // keep retrying for up to ~6s
        } else {
          console.warn('jQuery/Owl Carousel/Swiper failed to load from CDN')
        }
        return
      }

      // Initialize all owl carousels
      if ($('.causes-one__carousel').length) {
        $('.causes-one__carousel').owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 5000,
          responsive: {
            0:    { items: 1 },
            768:  { items: 2 },
            1200: { items: 3 },
          }
        })
      }

      if ($('.gallery-one__carousel').length) {
        $('.gallery-one__carousel').owlCarousel({
          loop: true,
          margin: 20,
          nav: false,
          dots: false,
          autoplay: true,
          autoplayTimeout: 3000,
          responsive: {
            0:    { items: 1 },
            600:  { items: 2 },
            900:  { items: 3 },
            1200: { items: 5 },
          }
        })
      }

      if ($('.testimonial-one__carousel').length) {
        $('.testimonial-one__carousel').owlCarousel({
          loop: true,
          margin: 30,
          nav: true,
          dots: false,
          autoplay: true,
          autoplayTimeout: 5000,
          navText: [
            '<span class="fas fa-chevron-left"></span>',
            '<span class="fas fa-chevron-right"></span>',
          ],
          responsive: {
            0:    { items: 1 },
            768:  { items: 2 },
          }
        })
      }

      if ($('.brand-one__carousel').length) {
        $('.brand-one__carousel').owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          dots: false,
          autoplay: true,
          autoplaySpeed: 5000,
          autoplayTimeout: 5000,
          responsive: {
            0:    { items: 2 },
            480:  { items: 3 },
            768:  { items: 4 },
            1200: { items: 5 },
          }
        })
      }

      // Initialize Swiper for main slider
      new window.Swiper('.thm-swiper__slider', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        pagination: {
          el: '#main-slider-pagination',
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: '#main-slider__swiper-button-next',
          prevEl: '#main-slider__swiper-button-prev',
        },
        autoplay: { delay: 5000 },
      })

      cleanupFn = () => {
        const carousels = [
          '.causes-one__carousel',
          '.gallery-one__carousel',
          '.testimonial-one__carousel',
          '.brand-one__carousel',
        ]
        carousels.forEach(selector => {
          if ($(selector).data('owl.carousel')) {
            $(selector).trigger('destroy.owl.carousel')
          }
        })
      }
    }

    tryInit()

    return () => {
      cancelled = true
      cleanupFn()
    }
  }, [])

  useEffect(() => {
    // WOW.js watches the page for elements with a "wow" class (e.g. "wow
    // fadeInLeft") and adds animate.css's "animated" class once they scroll
    // into view, which is what actually plays the fade/slide animation.
    // Same retry pattern as above since it also loads from a CDN <script>.
    let cancelled = false
    let attempts = 0

    const tryInitWow = () => {
      if (cancelled) return
      if (!window.WOW) {
        attempts += 1
        if (attempts < 40) {
          setTimeout(tryInitWow, 150)
        } else {
          console.warn('WOW.js failed to load from CDN')
        }
        return
      }
      new window.WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
      }).init()
    }

    tryInitWow()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="body">
      <div className="preloader" style={{ display: 'none' }}>
        <img className="preloader__image" width="60" src="https://placehold.co/60x60/fb1010/ffffff?text=%E2%9D%A4&font=montserrat" alt="" style={{ height: '60px', objectFit: 'cover' }} />
      </div>

      <div className="page-wrapper">

        {/* HEADER */}
        <header className="main-header clearfix">
          <div className="main-header__logo">
            <a href="https://www.childplusafrica.org/index.html">
              <img src="./assets/images/logo.png" alt="Child Plus Africa" style={{ height: '50px', width: 'auto' }} />
            </a>
          </div>
          <div className="main-menu-wrapper">
            <div className="main-menu-wrapper__top">
              <div className="main-menu-wrapper__top-inner">
                <div className="main-menu-wrapper__left">
                  <div className="main-menu-wrapper__left-content">
                    <div className="main-menu-wrapper__left-text">
                      <p>Welcome to Child Plus Africa</p>
                    </div>
                    <div className="main-menu-wrapper__left-email-box">
                      <div className="icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="email">
                        <a href="mailto:letstalk@childplusafrica.org">letstalk@childplusafrica.org</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-menu-wrapper__right">
                  <div className="main-menu-wrapper__right-social">
                    <a href="https://twitter.com/childplusafrica" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href="https://web.facebook.com/ChildplusAfrica" target="_blank" rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                    <a href="https://www.instagram.com/Childplusinitiative" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UCF4u78uqv55S92TKvBArO0w" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-menu-wrapper__bottom">
              <nav className="main-menu">
                <div className="main-menu__inner">
                  <a href="https://www.childplusafrica.org/index.html#" className="mobile-nav__toggler"><i className="fa fa-bars"></i></a>
                  <ul className="main-menu__list">
                    <li className="current"><a href="https://www.childplusafrica.org/index.html">Home</a></li>
                    <li><a href="https://www.childplusafrica.org/aboutus.html">About Us</a></li>
                    <li className="dropdown">
                      <a href="https://www.childplusafrica.org/index.html#">Projects</a>
                      <ul>
                        <li><a href="https://www.childplusafrica.org/events.html">Our Projects</a></li>
                        <li><a href="https://www.childplusafrica.org/beneficiaries.html">Beneficiaries</a></li>
                        <li><a href="https://www.childplusafrica.org/gallery.html">Gallery</a></li>
                      </ul>
                    </li>
                    <li><a href="https://www.childplusafrica.org/team.html">Team</a></li>
                    <li><a href="https://www.childplusafrica.org/blog/blog.html">Our Blog</a></li>
                    <li className="dropdown">
                      <a href="https://www.childplusafrica.org/index.html#">Contact Us</a>
                      <ul>
                        <li><a href="https://www.childplusafrica.org/contact.html">Contact Us</a></li>
                        <li><a href="https://www.childplusafrica.org/donate.html">Donate</a></li>
                        <li><a href="https://forms.gle/RQHomMhPJrr3WXBz6">Volunteer</a></li>
                        <li><a href="https://forms.gle/iHMXA3Bo48GbdF25A">Partner with Us</a></li>
                      </ul>
                    </li>
                  </ul>
                  <div className="main-menu__right">
                    <a href="https://www.childplusafrica.org/index.html#" className="main-menu__search search-toggler fas fa-search"></a>
                    <div className="main-menu__phone-contact">
                      <div className="main-menu__phone-icon"><span className="fas fa-comment-dots"></span></div>
                      <div className="main-menu__phone-number">
                        <p>Call Anytime</p>
                        <a href="tel:+2348033415500">+234 8033 415 500</a>
                      </div>
                    </div>
                    <a href="https://www.childplusafrica.org/donate.html" className="main-menu__donate-btn">
                      <i className="fa fa-heart"></i>Donate
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* STICKY HEADER */}
        <div className={`stricky-header stricked-menu main-menu${isSticky ? ' stricky-fixed' : ''}`}>
          <div className="sticky-header__content">
            <div className="main-menu__inner">
              <a href="https://www.childplusafrica.org/index.html#" className="mobile-nav__toggler"><i className="fa fa-bars"></i></a>
              <ul className="main-menu__list">
                <li className="current"><a href="https://www.childplusafrica.org/index.html">Home</a></li>
                <li><a href="https://www.childplusafrica.org/aboutus.html">About Us</a></li>
                <li className="dropdown">
                  <a href="https://www.childplusafrica.org/index.html#">Projects</a>
                  <ul>
                    <li><a href="https://www.childplusafrica.org/events.html">Our Projects</a></li>
                    <li><a href="https://www.childplusafrica.org/beneficiaries.html">Beneficiaries</a></li>
                    <li><a href="https://www.childplusafrica.org/gallery.html">Gallery</a></li>
                  </ul>
                </li>
                <li><a href="https://www.childplusafrica.org/team.html">Team</a></li>
                <li><a href="https://www.childplusafrica.org/blog/blog.html">Our Blog</a></li>
                <li className="dropdown">
                  <a href="https://www.childplusafrica.org/index.html#">Contact Us</a>
                  <ul>
                    <li><a href="https://www.childplusafrica.org/contact.html">Contact Us</a></li>
                    <li><a href="https://www.childplusafrica.org/donate.html">Donate</a></li>
                    <li><a href="https://forms.gle/RQHomMhPJrr3WXBz6">Volunteer</a></li>
                    <li><a href="https://forms.gle/iHMXA3Bo48GbdF25A">Partner with Us</a></li>
                  </ul>
                </li>
              </ul>
              <div className="main-menu__right">
                <a href="https://www.childplusafrica.org/index.html#" className="main-menu__search search-toggler fas fa-search"></a>
                <div className="main-menu__phone-contact">
                  <div className="main-menu__phone-icon"><span className="fas fa-comment-dots"></span></div>
                  <div className="main-menu__phone-number">
                    <p>Call Anytime</p>
                    <a href="tel:+2348033415500">+234 8033 415 500</a>
                  </div>
                </div>
                <a href="https://www.childplusafrica.org/donate.html" className="main-menu__donate-btn">
                  <i className="fa fa-heart"></i>Donate
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN SLIDER */}

        <section className="main-slider">
          <div className="swiper-container thm-swiper__slider swiper-container-fade swiper-container-initialized swiper-container-horizontal"
            data-swiper-options='{"slidesPerView":1,"loop":true,"effect":"fade","pagination":{"el":"#main-slider-pagination","type":"bullets","clickable":true},"navigation":{"nextEl":"#main-slider__swiper-button-next","prevEl":"#main-slider__swiper-button-prev"},"autoplay":{"delay":5000}}'>
            <div className="swiper-wrapper">

              <div className="swiper-slide" style={{ position: 'relative' }} data-swiper-slide-index="0">
                <div className="image-layer" style={{ backgroundImage: 'url(./assets/images/backgrounds/hero-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="image-layer-overlay"></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="main-slider__content">
                        <p>Helping Kids Off the Streets</p>
                        <h2>We Help Keep <span style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>Kids
                          </span> <br /> off the Streets</h2>
                        <a href="https://www.childplusafrica.org/aboutus.html" className="thm-btn"><i className="fas fa-arrow-circle-right"></i>See How</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-slide" style={{ position: 'relative' }} data-swiper-slide-index="1">
                <div className="image-layer" style={{ backgroundImage: 'url(./assets/images/backgrounds/hero-2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="image-layer-overlay"></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="main-slider__content">
                        <p>Every Effort Counts</p>
                        <h2>Train a <span style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>Child
                          </span> <br /> Today</h2>
                        <a href="https://www.childplusafrica.org/donate.html" className="thm-btn"><i className="fas fa-arrow-circle-right"></i>Make Donation</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-slide" style={{ position: 'relative' }} data-swiper-slide-index="2">
                <div className="image-layer" style={{ backgroundImage: 'url(./assets/images/backgrounds/hero-3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="image-layer-overlay"></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="main-slider__content">
                        <p>Make an Impact</p>
                        <h2>Volunteer <span style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>With
                          </span> <br /> Us Today</h2>
                        <a href="https://forms.gle/RQHomMhPJrr3WXBz6" className="thm-btn"><i className="fas fa-arrow-circle-right"></i>Volunteer Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper-slide" style={{ position: 'relative' }} data-swiper-slide-index="3">
                <div className="image-layer" style={{ backgroundImage: 'url(./assets/images/backgrounds/hero-4.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="image-layer-overlay"></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="main-slider__content">
                        <p>Hands On, Heart First</p>
                        <h2>Outreach <span style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>Programmes
                          </span> <br /> That Matter</h2>
                        <a href="https://www.childplusafrica.org/events.html" className="thm-btn"><i className="fas fa-arrow-circle-right"></i>See Programmes</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="main-slider__counter">
              <ul className="main-slider__counter-box list-unstyled">
                <li>
                  <h3 className="main-sldier__counter-digit">104</h3>
                  <span className="main-slider__counter-text">Full &amp; Part Scholarships</span>
                </li>
                <li>
                  <h3 className="main-sldier__counter-digit">38</h3>
                  <span className="main-slider__counter-text">Volunteering Helpers</span>
                </li>
              </ul>
            </div>

            <div className="swiper-pagination" id="main-slider-pagination"></div>

            <div className="main-slider__nav">
              <div className="swiper-button-prev" id="main-slider__swiper-button-prev" tabIndex="0" role="button" aria-label="Previous slide">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="swiper-button-next" id="main-slider__swiper-button-next" tabIndex="0" role="button" aria-label="Next slide">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>

          </div>
        </section>

        {/* WELCOME ONE */}
        <section className="welcome-one">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="welcome-one__left">
                  <div className="welcome-one__img-box">
                    <img src="./assets/images/welcome-mission.jpg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
                    <div className="welcome-one__img-box-2">
                      <img src="./assets/images/welcome-story.jpg" alt="" style={{ width: '320px', height: 'auto', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <h2 className="welcome-one__bottom-text">Helping Today</h2>
                    <div className="welcome-one__heart-icon">
                      <span className="fas fa-heart"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="welcome-one__right">
                  <div className="section-title text-left">
                    <span className="section-title__tagline">Welcome to Child Plus Africa</span>
                    <h2 className="section-title__title">No child deserves to be left behind</h2>
                  </div>
                  <p className="welcome-one__right-text">Child Plus Africa is a not-for-profit organization founded on Christian principles, supporting disadvantaged children of low socio-economic backgrounds through education, healthcare, and welfare so every child can attain great heights.</p>
                  <div className="welcome-one__our-mission-and-story">
                    <div className="welcome-one__mission-and-story-single">
                      <h3><i className="fas fa-arrow-circle-right"></i>Our Mission</h3>
                      <p className="welcome-one__our-mission-and-story-text">Developing the skills, behaviours, and confidence of children, and building an even platform of love and support so all children can thrive.</p>
                    </div>
                    <div className="welcome-one__mission-and-story-single">
                      <h3><i className="fas fa-arrow-circle-right"></i>Our Story</h3>
                      <p className="welcome-one__our-mission-and-story-text">Born out of a call to reach the over 20 million out-of-school children in Nigeria, one scholarship and one outreach programme at a time.</p>
                    </div>
                  </div>
                  <div className="welcome-one__progress">
                    <div className="welcome-one__progress-single">
                      <h4 className="welcome-one__progress-title">Education</h4>
                      <div className="bar">
                        <div className="bar-inner count-bar counted" data-percent="83%" style={{ width: '83%' }}>
                          <div className="count-text">83%</div>
                        </div>
                      </div>
                    </div>
                    <div className="welcome-one__progress-single">
                      <h4 className="welcome-one__progress-title">Healthcare</h4>
                      <div className="bar">
                        <div className="bar-inner count-bar counted" data-percent="38%" style={{ width: '38%' }}>
                          <div className="count-text">38%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="https://www.childplusafrica.org/aboutus.html" className="welcome-one__btn thm-btn"><i className="fas fa-arrow-circle-right"></i>Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAUSES ONE — source items only, NO owl-stage-outer */}
        <section className="causes-one">
          <div className="container">
            <div className="section-title text-center">
              <span className="section-title__tagline">Our Programmes</span>
              <h2 className="section-title__title">Find a programme <br /> and support a child</h2>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="causes-one__carousel owl-theme owl-carousel">
                  <div className="causes-one__single wow fadeInLeft" data-wow-duration="1500ms">
                    <div className="causes-one__img">
                      <div className="causes-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                        <img src="./assets/images/programs/education.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <a href="https://www.childplusafrica.org/donate.html"><i className="fa fa-plus"></i></a>
                      </div>
                      <div className="causes-one__category"><span>Education</span></div>
                    </div>
                    <div className="causes-one__content">
                      <h3 className="causes-one__title"><a href="https://www.childplusafrica.org/donate.html">Full Educational Scholarships</a></h3>
                      <p className="causes-one__text">Taking children off the street and back into the classroom with full and part scholarships every academic session.</p>
                    </div>
                    <div className="causes-one__progress">
                      <div className="bar"><div className="bar-inner count-bar counted" data-percent="65%" style={{ width: '65%' }}><div className="count-text">65%</div></div></div>
                      <div className="causes-one__goals">
                        <p><span>104</span> Sponsored</p>
                        <p><span>150</span> Goal</p>
                      </div>
                    </div>
                  </div>
                  <div className="causes-one__single wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
                    <div className="causes-one__img">
                      <div className="causes-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                        <img src="./assets/images/programs/healthcare.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <a href="https://www.childplusafrica.org/donate.html"><i className="fa fa-plus"></i></a>
                      </div>
                      <div className="causes-one__category"><span>Healthcare</span></div>
                    </div>
                    <div className="causes-one__content">
                      <h3 className="causes-one__title"><a href="https://www.childplusafrica.org/donate.html">Free Healthcare Outreach</a></h3>
                      <p className="causes-one__text">Free basic healthcare and welfare check-ups for children who would otherwise go without medical attention.</p>
                    </div>
                    <div className="causes-one__progress">
                      <div className="bar"><div className="bar-inner count-bar counted" data-percent="52%" style={{ width: '52%' }}><div className="count-text">52%</div></div></div>
                      <div className="causes-one__goals">
                        <p><span>$12,400</span> Raised</p>
                        <p><span>$20,000</span> Goal</p>
                      </div>
                    </div>
                  </div>
                  <div className="causes-one__single wow fadeInRight" data-wow-duration="1500ms" data-wow-delay="200ms">
                    <div className="causes-one__img">
                      <div className="causes-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                        <img src="./assets/images/programs/welfare.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <a href="https://www.childplusafrica.org/donate.html"><i className="fa fa-plus"></i></a>
                      </div>
                      <div className="causes-one__category"><span>Welfare</span></div>
                    </div>
                    <div className="causes-one__content">
                      <h3 className="causes-one__title"><a href="https://www.childplusafrica.org/donate.html">Street Outreach &amp; Rescue</a></h3>
                      <p className="causes-one__text">Identifying vulnerable children on the streets of Port Harcourt and connecting them with our welfare programmes.</p>
                    </div>
                    <div className="causes-one__progress">
                      <div className="bar"><div className="bar-inner count-bar counted" data-percent="40%" style={{ width: '40%' }}><div className="count-text">40%</div></div></div>
                      <div className="causes-one__goals">
                        <p><span>$8,900</span> Raised</p>
                        <p><span>$22,000</span> Goal</p>
                      </div>
                    </div>
                  </div>
                  <div className="causes-one__single wow fadeInLeft" data-wow-duration="1500ms">
                    <div className="causes-one__img">
                      <div className="causes-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                        <img src="./assets/images/spelling-bee.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <a href="https://www.childplusafrica.org/donate.html"><i className="fa fa-plus"></i></a>
                      </div>
                      <div className="causes-one__category"><span>Skills</span></div>
                    </div>
                    <div className="causes-one__content">
                      <h3 className="causes-one__title"><a href="https://www.childplusafrica.org/donate.html">Spelling Bee &amp; Skills Programme</a></h3>
                      <p className="causes-one__text">Our annual Spelling Bee builds confidence and healthy competition while sharpening skills that last a lifetime.</p>
                    </div>
                    <div className="causes-one__progress">
                      <div className="bar"><div className="bar-inner count-bar counted" data-percent="71%" style={{ width: '71%' }}><div className="count-text">71%</div></div></div>
                      <div className="causes-one__goals">
                        <p><span>$15,600</span> Raised</p>
                        <p><span>$22,000</span> Goal</p>
                      </div>
                    </div>
                  </div>
                  <div className="causes-one__single wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
                    <div className="causes-one__img">
                      <div className="causes-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                        <img src="./assets/images/programs/skills.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <a href="https://www.childplusafrica.org/donate.html"><i className="fa fa-plus"></i></a>
                      </div>
                      <div className="causes-one__category"><span>Sports</span></div>
                    </div>
                    <div className="causes-one__content">
                      <h3 className="causes-one__title"><a href="https://www.childplusafrica.org/donate.html">Sports &amp; Recreation</a></h3>
                      <p className="causes-one__text">Free sports and recreation programmes that keep children engaged, healthy, and off the streets.</p>
                    </div>
                    <div className="causes-one__progress">
                      <div className="bar"><div className="bar-inner count-bar counted" data-percent="45%" style={{ width: '45%' }}><div className="count-text">45%</div></div></div>
                      <div className="causes-one__goals">
                        <p><span>$6,300</span> Raised</p>
                        <p><span>$14,000</span> Goal</p>
                      </div>
                    </div>
                  </div>
                  <div className="causes-one__single wow fadeInRight" data-wow-duration="1500ms" data-wow-delay="200ms">
                    <div className="causes-one__img">
                      <div className="causes-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '280px' }}>
                        <img src="./assets/images/programs/nutrition.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <a href="https://www.childplusafrica.org/donate.html"><i className="fa fa-plus"></i></a>
                      </div>
                      <div className="causes-one__category"><span>Education</span></div>
                    </div>
                    <div className="causes-one__content">
                      <h3 className="causes-one__title"><a href="https://www.childplusafrica.org/donate.html">School Feeding &amp; Nutrition</a></h3>
                      <p className="causes-one__text">A daily meal can be the difference between a child staying in school and dropping out — help us keep them fed.</p>
                    </div>
                    <div className="causes-one__progress">
                      <div className="bar"><div className="bar-inner count-bar counted" data-percent="58%" style={{ width: '58%' }}><div className="count-text">58%</div></div></div>
                      <div className="causes-one__goals">
                        <p><span>$9,700</span> Raised</p>
                        <p><span>$18,000</span> Goal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JOIN ONE */}
        <section className="join-one">
          <div className="join-one-bg jarallax" data-jarallax="" data-speed="0.2" data-imgposition="50% 0%" style={{ backgroundImage: 'url(./assets/images/welcome-story.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} data-jarallax-original-styles="background-image: url(./assets/images/welcome-story.jpg)"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="join-one__inner">
                  <h2 className="join-one__title">Join us to give every child <br /> a chance at education</h2>
                  <a href="https://www.childplusafrica.org/donate.html" className="join-one__btn thm-btn"><i className="fas fa-arrow-circle-right"></i>Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE BOXES */}
        <section className="three-boxes">
          <div className="container-box">
            <div className="row">
              <div className="col-xl-4">
                <div className="three-boxes__single">
                  <div className="three-boxes__single-bg" style={{ backgroundImage: 'url(./assets/images/programs/education.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div className="three-boxes__content">
                    <div className="three-boxes__icon"><span className="fas fa-graduation-cap"></span></div>
                    <div className="three-boxes__text-box">
                      <h2>Full Scholarships</h2>
                      <p className="three-boxes__text">Every academic session we take more children off the street and back into the classroom with full and part scholarships.</p>
                      <a href="https://www.childplusafrica.org/donate.html" className="three-boxes__btn"><i className="fa fa-heart"></i>Donate</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="three-boxes__single three-boxes__single-item-two">
                  <div className="three-boxes__single-bg" style={{ backgroundImage: 'url(./assets/images/programs/healthcare.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div className="three-boxes__content">
                    <div className="three-boxes__icon"><span className="fas fa-stethoscope"></span></div>
                    <div className="three-boxes__text-box">
                      <h2>Healthcare Outreach</h2>
                      <p className="three-boxes__text">Free basic healthcare and welfare support for children and families who need it most across our communities.</p>
                      <a href="https://www.childplusafrica.org/donate.html" className="three-boxes__btn"><i className="fa fa-heart"></i>Donate</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="three-boxes__single three-boxes__single-item-three">
                  <div className="three-boxes__single-bg" style={{ backgroundImage: 'url(./assets/images/programs/skills.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div className="three-boxes__content">
                    <div className="three-boxes__icon"><span className="fas fa-futbol"></span></div>
                    <div className="three-boxes__text-box">
                      <h2>Sports &amp; Skills</h2>
                      <p className="three-boxes__text">Sports, spelling bee, and skill-development programmes that build confidence and keep kids engaged and safe.</p>
                      <a href="https://www.childplusafrica.org/donate.html" className="three-boxes__btn"><i className="fa fa-heart"></i>Donate</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HELPING ONE */}
        <section className="helping-one">
          <div className="container">
            <div className="section-title text-center">
              <span className="section-title__tagline">Get Involved</span>
              <h2 className="section-title__title">Find a programme <br /> and support a child</h2>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="helping-one__left">
                  <h3 className="helping-one__title">We're Helping Today. Helping Tomorrow</h3>
                  <p className="helping-one__text">There are an estimated 100 million children living on the streets worldwide, and about 14 million children in Nigeria between ages 5 and 14 are involved in economic activity instead of school. We exist to change that story, one child at a time.</p>
                  <ul className="helping-one__left-list list-unstyled">
                    <li>
                      <div className="helping-one__left-icon"><i className="fas fa-arrow-circle-right"></i></div>
                      <div className="helping-one__left-text"><p>Full educational scholarships for children off the streets</p></div>
                    </li>
                    <li>
                      <div className="helping-one__left-icon"><i className="fas fa-arrow-circle-right"></i></div>
                      <div className="helping-one__left-text"><p>Free basic amenities, welfare, and healthcare support</p></div>
                    </li>
                    <li>
                      <div className="helping-one__left-icon"><i className="fas fa-arrow-circle-right"></i></div>
                      <div className="helping-one__left-text"><p>Sports, spelling bee, and skills programmes with continuity in mind</p></div>
                    </li>
                  </ul>
                  <div className="helping-one__left-img">
                    <img src="./assets/images/helping-today.jpg" alt="" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
                    <div className="helping-one__left-icon-box"><span className="fas fa-heart"></span></div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="helping-one__right">
                  <form action="https://www.childplusafrica.org/donate.html" className="helping-one__right-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="helping-one__right-input-box">
                          <input type="text" name="amount" placeholder="Enter Donation Amount" />
                          <div className="helping-one__right-dolar-icon"><span>$</span></div>
                        </div>
                      </div>
                      <div className="col-lg-6"><input type="text" name="name" placeholder="Your Name" /></div>
                      <div className="col-lg-6"><input type="email" name="email" placeholder="Email Address" /></div>
                      <div className="col-lg-12"><input type="text" name="phone" placeholder="Phone Number" /></div>
                      <div className="col-lg-12"><textarea name="message" placeholder="Write Message"></textarea></div>
                      <div className="col-lg-12">
                        <button type="submit" className="thm-btn helping-one__right-btn"><i className="fas fa-arrow-circle-right"></i>Continue Now</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY ONE — source items only, NO owl-stage-outer */}
        <section className="gallery-one">
          <div className="gallery-one__container-box clearfix">
            <div className="gallery-one__carousel owl-theme owl-carousel">
              <div className="gallery-one__single">
                <div className="gallery-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                  <img src="./assets/images/programs/education.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="gallery-one__hover-content-box" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', background: 'rgba(31,34,48,0.82)', padding: '14px 16px', textAlign: 'center', zIndex: 2 }}><h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, lineHeight: 1.3 }}>Child Education</h2><p style={{ color: '#fb1010', fontSize: '13px', margin: 0 }}>Child Plus Africa</p></div>
                </div>
              </div>
              <div className="gallery-one__single">
                <div className="gallery-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                  <img src="./assets/images/programs/welfare.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="gallery-one__hover-content-box" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', background: 'rgba(31,34,48,0.82)', padding: '14px 16px', textAlign: 'center', zIndex: 2 }}><h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, lineHeight: 1.3 }}>Scholarship Day</h2><p style={{ color: '#fb1010', fontSize: '13px', margin: 0 }}>Child Plus Africa</p></div>
                </div>
              </div>
              <div className="gallery-one__single">
                <div className="gallery-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                  <img src="./assets/images/spelling-bee.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="gallery-one__hover-content-box" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', background: 'rgba(31,34,48,0.82)', padding: '14px 16px', textAlign: 'center', zIndex: 2 }}><h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, lineHeight: 1.3 }}>Spelling Bee</h2><p style={{ color: '#fb1010', fontSize: '13px', margin: 0 }}>Child Plus Africa</p></div>
                </div>
              </div>
              <div className="gallery-one__single">
                <div className="gallery-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                  <img src="./assets/images/programs/healthcare.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="gallery-one__hover-content-box" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', background: 'rgba(31,34,48,0.82)', padding: '14px 16px', textAlign: 'center', zIndex: 2 }}><h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, lineHeight: 1.3 }}>Healthcare Outreach</h2><p style={{ color: '#fb1010', fontSize: '13px', margin: 0 }}>Child Plus Africa</p></div>
                </div>
              </div>
              <div className="gallery-one__single">
                <div className="gallery-one__img-box" style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                  <img src="./assets/images/welcome-story.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div className="gallery-one__hover-content-box" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', background: 'rgba(31,34,48,0.82)', padding: '14px 16px', textAlign: 'center', zIndex: 2 }}><h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, lineHeight: 1.3 }}>Sports Day</h2><p style={{ color: '#fb1010', fontSize: '13px', margin: 0 }}>Child Plus Africa</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL ONE — source items only, NO owl-stage-outer */}
        <section className="testimonial-one">
          <div className="testimonial-one-bg" style={{ backgroundImage: 'url(https://placehold.co/1600x700/fb1010/fb1010?text=+)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-4">
                <div className="testimonial-one__left">
                  <div className="section-title text-left">
                    <span className="section-title__tagline">Our Testimonials</span>
                    <h2 className="section-title__title">What they're saying about Child Plus Africa</h2>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="testimonial-one__right">
                  <div className="testimonial-one__carousel owl-theme owl-carousel">
                    <div className="testimonial-one__single">
                      <p className="testimonial-one__text">Volunteering with Child Plus Africa showed me how far a scholarship, a meal, and a little consistency can carry a child. Watching our kids grow in confidence has been the most rewarding part.</p>
                      <div className="testimonial-one__client-info">
                        <div className="testimonial-one__client-img">
                          <img src="https://placehold.co/80x80/fb1010/ffffff?text=KM&font=montserrat" alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                          <div className="testimonial-one__quote"></div>
                        </div>
                        <div className="testimonial-one__client-name"><h3>Kevin Martin</h3><p>Volunteer</p></div>
                      </div>
                    </div>
                    <div className="testimonial-one__single">
                      <p className="testimonial-one__text">Our Spelling Bee programme did more than teach words — it gave our children a stage to shine on and a reason to believe in themselves again.</p>
                      <div className="testimonial-one__client-info">
                        <div className="testimonial-one__client-img">
                          <img src="https://placehold.co/80x80/f2a93b/ffffff?text=JB&font=montserrat" alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                          <div className="testimonial-one__quote"></div>
                        </div>
                        <div className="testimonial-one__client-name"><h3>Jessica Brown</h3><p>Volunteer</p></div>
                      </div>
                    </div>
                    <div className="testimonial-one__single">
                      <p className="testimonial-one__text">As a board member I've seen how quickly a scholarship changes a household — it's not just one child, it's a whole family's outlook that shifts.</p>
                      <div className="testimonial-one__client-info">
                        <div className="testimonial-one__client-img">
                          <img src="https://placehold.co/80x80/1f7a8c/ffffff?text=JB&font=montserrat" alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                          <div className="testimonial-one__quote"></div>
                        </div>
                        <div className="testimonial-one__client-name"><h3>Jessica Brown</h3><p>Board of Trustees</p></div>
                      </div>
                    </div>
                    <div className="testimonial-one__single">
                      <p className="testimonial-one__text">Every outreach visit reminds me why Child Plus Africa exists — no child on our streets should be left without a chance at school and healthcare.</p>
                      <div className="testimonial-one__client-info">
                        <div className="testimonial-one__client-img">
                          <img src="https://placehold.co/80x80/fb1010/ffffff?text=KM&font=montserrat" alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
                          <div className="testimonial-one__quote"></div>
                        </div>
                        <div className="testimonial-one__client-name"><h3>Kevin Martin</h3><p>Volunteer</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HELP THEM */}
        <section className="help-them">
          <div className="help-them-bg jarallax" data-jarallax="" data-speed="0.2" data-imgposition="50% 0%" style={{ backgroundImage: 'url(./assets/images/backgrounds/help-them-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} data-jarallax-original-styles="background-image: url(./assets/images/backgrounds/help-them-bg.jpg)"></div>
          <div className="container">
            <div className="help-them__top">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <div className="help-them__top-content">
                    <h2 className="help-them__top-content-title">Help them whenever they are in need</h2>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4">
                  <div className="help-them__top-video-box">
                    <a href="https://www.childplusafrica.org/aboutus.html" className="help-them__top-video-btn video-popup"><i className="fa fa-play"></i></a>
                    <p className="help-them__top-video-text">Watch the Video</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="help-them__bottom">
              <div className="row">
                <div className="col-xl-4 col-lg-4">
                  <div className="help-them__single">
                    <div className="help-them__icon"><span className="fas fa-hand-holding-heart"></span></div>
                    <div className="help-them__text">
                      <h3>Become a Volunteer</h3>
                      <p>Join our team of volunteers helping run outreach, scholarship, and skills programmes across Port Harcourt.</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4">
                  <div className="help-them__single">
                    <div className="help-them__icon"><span className="fas fa-hand-holding-dollar"></span></div>
                    <div className="help-them__text">
                      <h3>Quick Fundraising</h3>
                      <p>Start or join a fundraiser to sponsor a scholarship, a meal programme, or a healthcare outreach visit.</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4">
                  <div className="help-them__single">
                    <div className="help-them__icon"><span className="fas fa-bullhorn"></span></div>
                    <div className="help-them__text">
                      <h3>Start Donating</h3>
                      <p>Even the cost of a daily cup of coffee can see a child through school — no gift is too small.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWS ONE */}
        <section className="news-one">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8">
                <div className="section-title text-left">
                  <span className="section-title__tagline">Get Daily Updates</span>
                  <h2 className="section-title__title">Latest news &amp; stories directly <br /> from our blog</h2>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="news-one__button-box">
                  <a href="https://www.childplusafrica.org/blog/blog.html" className="news-one__btn thm-btn"><i className="fas fa-arrow-circle-right"></i>View More</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="news-one__left">
                  <div className="news-one__img" style={{ position: 'relative', overflow: 'hidden', height: '340px' }}>
                    <img src="./assets/images/programs/education.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <a href="https://www.childplusafrica.org/blog/blog.html"><i className="fa fa-plus"></i></a>
                  </div>
                  <div className="news-one__bottom">
                    <ul className="list-unstyled news-one__meta">
                      <li>12 Aug, 2026</li>
                      <li><span>/</span></li>
                      <li><a href="https://www.childplusafrica.org/blog/blog.html">2 Comments</a></li>
                    </ul>
                    <h3 className="news-one__title">
                      <a href="https://www.childplusafrica.org/blog/blog.html">Over 20 Million Children Are Out of School in Nigeria</a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="news-one__right">
                  <div className="news-one__right-single">
                    <div className="news-one__right-img" style={{ position: 'relative', overflow: 'hidden', height: '100px' }}>
                      <img src="./assets/images/spelling-bee.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <a href="https://www.childplusafrica.org/blog/blog.html"><i className="fa fa-plus"></i></a>
                    </div>
                    <div className="news-one__right-content">
                      <ul className="list-unstyled news-one__right-meta">
                        <li>12 Aug, 2026</li><li><span>/</span></li>
                        <li><a href="https://www.childplusafrica.org/blog/blog.html">2 Comments</a></li>
                      </ul>
                      <h3 className="news-one__right-title"><a href="https://www.childplusafrica.org/blog/blog.html">The 2026 Spelling Bee Portal is Now Open</a></h3>
                    </div>
                  </div>
                  <div className="news-one__right-single">
                    <div className="news-one__right-img" style={{ position: 'relative', overflow: 'hidden', height: '100px' }}>
                      <img src="./assets/images/programs/nutrition.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <a href="https://www.childplusafrica.org/blog/blog.html"><i className="fa fa-plus"></i></a>
                    </div>
                    <div className="news-one__right-content">
                      <ul className="list-unstyled news-one__right-meta">
                        <li>12 Aug, 2026</li><li><span>/</span></li>
                        <li><a href="https://www.childplusafrica.org/blog/blog.html">2 Comments</a></li>
                      </ul>
                      <h3 className="news-one__right-title"><a href="https://www.childplusafrica.org/blog/blog.html">How Malnutrition Affects a Child's Ability to Learn</a></h3>
                    </div>
                  </div>
                  <div className="news-one__right-single">
                    <div className="news-one__right-img" style={{ position: 'relative', overflow: 'hidden', height: '100px' }}>
                      <img src="./assets/images/programs/healthcare.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <a href="https://www.childplusafrica.org/blog/blog.html"><i className="fa fa-plus"></i></a>
                    </div>
                    <div className="news-one__right-content">
                      <ul className="list-unstyled news-one__right-meta">
                        <li>12 Aug, 2026</li><li><span>/</span></li>
                        <li><a href="https://www.childplusafrica.org/blog/blog.html">2 Comments</a></li>
                      </ul>
                      <h3 className="news-one__right-title"><a href="https://www.childplusafrica.org/blog/blog.html">Inside Our 2026 Healthcare Outreach</a></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND ONE — source items only */}
        <section className="brand-one">
          <div className="container">
            <div className="section-title text-center">
              <span className="section-title__tagline">Our Partners</span>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="brand-one__carousel owl-theme owl-carousel">
                  <div className="brand-one__single"><div className="brand-one__img"><img src="./assets/images/clients/client-1.png" alt="" style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} /></div></div>
                  <div className="brand-one__single"><div className="brand-one__img"><img src="./assets/images/clients/client-2.png" alt="" style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} /></div></div>
                  <div className="brand-one__single"><div className="brand-one__img"><img src="./assets/images/clients/client-3.png" alt="" style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} /></div></div>
                  <div className="brand-one__single"><div className="brand-one__img"><img src="./assets/images/clients/client-4.png" alt="" style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} /></div></div>
                  <div className="brand-one__single"><div className="brand-one__img"><img src="./assets/images/clients/client-5.png" alt="" style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} /></div></div>
                  <div className="brand-one__single"><div className="brand-one__img"><img src="./assets/images/clients/client-6.png" alt="" style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain', margin: '0 auto' }} /></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="site-footer-bg" style={{ backgroundImage: 'url(https://placehold.co/1600x500/1c1c1c/1c1c1c?text=+)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="container">
            <div className="site-footer__top">
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                  <div className="footer-widget__column footer-widget__about">
                    <h3 className="footer-widget__title">About</h3>
                    <p className="footer-widget__text">Our mission is geared towards the support and development of skills, behaviours, and confidence — a platform that shows love and support to help all children attain great heights.</p>
                    <a href="https://www.childplusafrica.org/donate.html" className="footer-widget__about-btn"><i className="fa fa-heart"></i>Donate</a>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                  <div className="footer-widget__column footer-widget__explore clearfix">
                    <h3 className="footer-widget__title">Explore</h3>
                    <ul className="footer-widget__explore-list list-unstyled">
                      <li><a href="https://www.childplusafrica.org/donate.html">Donate</a></li>
                      <li><a href="https://www.childplusafrica.org/events.html">Our Projects</a></li>
                      <li><a href="https://forms.gle/RQHomMhPJrr3WXBz6">Volunteer</a></li>
                      <li><a href="https://www.childplusafrica.org/beneficiaries.html">Beneficiaries</a></li>
                      <li><a href="https://forms.gle/iHMXA3Bo48GbdF25A">Partner With Us</a></li>
                    </ul>
                    <ul className="footer-widget__explore-list footer-widget__explore-list-two list-unstyled">
                      <li><a href="https://www.childplusafrica.org/team.html">Team</a></li>
                      <li><a href="https://www.childplusafrica.org/contact.html">Contact</a></li>
                      <li><a href="https://www.childplusafrica.org/blog/blog.html">Blog</a></li>
                      <li><a href="https://www.childplusafrica.org/faq.html">Faqs</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                  <div className="footer-widget__column footer-widget__contact">
                    <h3 className="footer-widget__title">Contact</h3>
                    <ul className="list-unstyled footer-widget__contact-list">
                      <li>
                        <div className="icon"><i className="fas fa-comment-dots"></i></div>
                        <div className="text"><p><span>Call Anytime</span><a href="tel:+2348033415500">+234 8033 415 500</a></p></div>
                      </li>
                      <li>
                        <div className="icon"><i className="icon-message"></i></div>
                        <div className="text"><p><span>Send Email</span><a href="mailto:letstalk@childplusafrica.org">letstalk@childplusafrica.org</a></p></div>
                      </li>
                      <li>
                        <div className="icon"><i className="icon-address"></i></div>
                        <div className="text"><p><span>Visit Office</span>#20 HolyGhost Avenue, Iriebe, Port Harcourt, Rivers State</p></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                  <div className="footer-widget__column footer-widget__newsletter">
                    <h3 className="footer-widget__title">Newsletter</h3>
                    <p className="footer-widget__newsletter-text">Get updates on our scholarship rounds, outreach visits, and upcoming programmes.</p>
                    <form className="footer-widget__newsletter-form">
                      <input type="email" placeholder="Email address" name="email" />
                      <button type="submit" className="footer-widget__newsletter-btn"><i className="fas fa-arrow-circle-right"></i>Send</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="site-footer__bottom">
              <div className="row">
                <div className="col-xl-12">
                  <div className="site-footer__bottom-inner">
                    <div className="site-footer__bottom-logo-social">
                      <div className="site-footer__bottom-logo">
                        <a href="https://www.childplusafrica.org/index.html">
                          <img src="./assets/images/logo.png" alt="Child Plus Africa" style={{ height: '50px', width: 'auto' }} />
                        </a>
                      </div>
                      <div className="site-footer__bottom-social">
                        <a href="https://twitter.com/childplusafrica" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://web.facebook.com/ChildplusAfrica" target="_blank" rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                        <a href="https://www.instagram.com/Childplusinitiative" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UCF4u78uqv55S92TKvBArO0w" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
                      </div>
                    </div>
                    <div className="site-footer__bottom-copy-right">
                      <p>© Copyright 2026 by Child Plus Africa. All Rights Reserved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
      {/* /.page-wrapper */}

      {/* MOBILE NAV */}
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__overlay mobile-nav__toggler"></div>
        <div className="mobile-nav__content">
          <span className="mobile-nav__close mobile-nav__toggler"><i className="fa fa-times"></i></span>
          <div className="logo-box">
            <a href="https://www.childplusafrica.org/index.html" aria-label="logo image">
              <img src="./assets/images/logo.png" width="155" alt="Child Plus Africa" style={{ height: 'auto' }} />
            </a>
          </div>
          <div className="mobile-nav__container">
            <ul className="main-menu__list">
              <li className="current"><a href="https://www.childplusafrica.org/index.html">Home</a></li>
              <li><a href="https://www.childplusafrica.org/aboutus.html">About Us</a></li>
              <li className="dropdown">
                <a href="https://www.childplusafrica.org/index.html#">Projects<button aria-label="dropdown toggler"><i className="fa fa-angle-down"></i></button></a>
                <ul>
                  <li><a href="https://www.childplusafrica.org/events.html">Our Projects</a></li>
                  <li><a href="https://www.childplusafrica.org/beneficiaries.html">Beneficiaries</a></li>
                  <li><a href="https://www.childplusafrica.org/gallery.html">Gallery</a></li>
                </ul>
              </li>
              <li><a href="https://www.childplusafrica.org/team.html">Team</a></li>
              <li><a href="https://www.childplusafrica.org/blog/blog.html">Our Blog</a></li>
              <li className="dropdown">
                <a href="https://www.childplusafrica.org/index.html#">Contact Us<button aria-label="dropdown toggler"><i className="fa fa-angle-down"></i></button></a>
                <ul>
                  <li><a href="https://www.childplusafrica.org/contact.html">Contact Us</a></li>
                  <li><a href="https://www.childplusafrica.org/donate.html">Donate</a></li>
                  <li><a href="https://forms.gle/RQHomMhPJrr3WXBz6">Volunteer</a></li>
                  <li><a href="https://forms.gle/iHMXA3Bo48GbdF25A">Partner with Us</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <ul className="mobile-nav__contact list-unstyled">
            <li><i className="fa fa-envelope"></i><a href="mailto:letstalk@childplusafrica.org">letstalk@childplusafrica.org</a></li>
            <li><i className="fa fa-phone-alt"></i><a href="tel:+2348033415500">+234 8033 415 500</a></li>
          </ul>
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <a href="https://twitter.com/childplusafrica" className="fab fa-twitter"></a>
              <a href="https://web.facebook.com/ChildplusAfrica" className="fab fa-facebook-square"></a>
              <a href="https://www.instagram.com/Childplusinitiative" className="fab fa-instagram"></a>
              <a href="https://www.youtube.com/channel/UCF4u78uqv55S92TKvBArO0w" className="fab fa-youtube"></a>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH POPUP */}
      <div className="search-popup">
        <div className="search-popup__overlay search-toggler"></div>
        <div className="search-popup__content">
          <form action="https://www.childplusafrica.org/index.html#">
            <label htmlFor="search" className="sr-only">search here</label>
            <input type="text" id="search" placeholder="Search Here..." />
            <button type="submit" aria-label="search submit" className="thm-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <a href="https://www.childplusafrica.org/index.html#" data-target="html" className="scroll-to-target scroll-to-top" style={{ display: 'inline' }}>
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  )
}
