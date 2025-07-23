import { Link } from "react-router-dom"
// import styles from "./Categories.module.css"

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Wedding Bouquets",
      image: "/placeholder.svg?height=300&width=300",
      description: "Beautiful arrangements for your special day",
    },
    {
      id: 2,
      name: "Birthday Flowers",
      image: "/placeholder.svg?height=300&width=300",
      description: "Colorful blooms to celebrate another year",
    },
    {
      id: 3,
      name: "Anniversary Gifts",
      image: "/placeholder.svg?height=300&width=300",
      description: "Romantic flowers for love celebrations",
    },
    {
      id: 4,
      name: "Sympathy Flowers",
      image: "/placeholder.svg?height=300&width=300",
      description: "Thoughtful arrangements for difficult times",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Occasion</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect flowers for every special moment in your life
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {categories.map((category) => (
            <div key={category.id} className="w-full lg:w-1/4 md:w-1/2 px-4 mb-8">
              <Link
                to={`/shop?category=${category.id}`}
                className="block no-underline text-inherit bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out h-full hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{category.name}</h4>
                  <p className="text-gray-600 m-0 text-sm">{category.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
