// import styles from "./About.module.css"

const About = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="py-16 bg-gradient-to-br from-[#da81a4] to-[#fecfef] rounded-2xl mb-16 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">About Blooming Basket</h1>
              <p className="text-lg leading-relaxed text-shadow-sm">
                We've been bringing joy and beauty to people's lives through fresh, stunning flowers for over 15 years.
                Our passion for floriculture and commitment to quality has made us a trusted name in the industry.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="About us"
                className="w-full max-w-md rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="py-16">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Story</h2>
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-8">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
                <h4 className="text-red-500 mb-4 font-semibold">Founded with Love</h4>
                <p className="text-gray-600 leading-relaxed">
                  Blooming Basket was founded in 2008 by Sarah and Michael Johnson, two passionate florists who wanted
                  to share their love for flowers with the world. What started as a small local flower shop has grown
                  into a thriving online business serving customers nationwide.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-8">
              <div className="bg-white p-8 rounded-xl shadow-md h-full">
                <h4 className="text-red-500 mb-4 font-semibold">Quality First</h4>
                <p className="text-gray-600 leading-relaxed">
                  We source our flowers directly from trusted growers and ensure they're fresh, vibrant, and
                  long-lasting. Every arrangement is carefully crafted by our skilled florists who take pride in their
                  artistry and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-16">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Values</h2>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="text-center p-8 bg-white rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#da81a4] to-[#fecfef] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  <i className="fas fa-heart"></i>
                </div>
                <h5 className="text-gray-800 mb-2 font-semibold">Passion</h5>
                <p className="text-gray-600 leading-relaxed">
                  We pour our heart into every arrangement, ensuring each bouquet tells a beautiful story.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="text-center p-8 bg-white rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#da81a4] to-[#fecfef] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  <i className="fas fa-leaf"></i>
                </div>
                <h5 className="text-gray-800 mb-2 font-semibold">Sustainability</h5>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to eco-friendly practices and supporting sustainable flower farming.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="text-center p-8 bg-white rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#da81a4] to-[#fecfef] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  <i className="fas fa-users"></i>
                </div>
                <h5 className="text-gray-800 mb-2 font-semibold">Community</h5>
                <p className="text-gray-600 leading-relaxed">
                  We believe in giving back to our community and supporting local causes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-16">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
            </div>
            <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Sarah Johnson"
                  className="w-36 h-36 rounded-full object-cover mx-auto mb-4"
                />
                <h5 className="text-gray-800 mb-2 font-semibold">Sarah Johnson</h5>
                <p className="text-red-500 font-semibold mb-4">Co-Founder & Head Florist</p>
                <p className="text-gray-600 leading-relaxed">
                  With over 20 years of experience, Sarah brings creativity and expertise to every arrangement.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Michael Johnson"
                  className="w-36 h-36 rounded-full object-cover mx-auto mb-4"
                />
                <h5 className="text-gray-800 mb-2 font-semibold">Michael Johnson</h5>
                <p className="text-red-500 font-semibold mb-4">Co-Founder & Operations Manager</p>
                <p className="text-gray-600 leading-relaxed">
                  Michael ensures smooth operations and maintains our high standards of customer service.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Emma Davis"
                  className="w-36 h-36 rounded-full object-cover mx-auto mb-4"
                />
                <h5>Emma Davis</h5>
                <p className="text-red-500 font-semibold mb-4">Senior Florist</p>
                <p className="text-gray-600 leading-relaxed">
                  Emma specializes in wedding arrangements and brings artistic flair to special occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
