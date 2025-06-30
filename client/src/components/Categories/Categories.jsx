import { Link } from "react-router-dom"
import styles from "./Categories.module.css"

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
    <section className={styles.categories}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className={styles.sectionTitle}>Shop by Occasion</h2>
            <p className={styles.sectionDescription}>Find the perfect flowers for every special moment in your life</p>
          </div>
        </div>
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-lg-3 col-md-6 mb-4">
              <Link to={`/shop?category=${category.id}`} className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                </div>
                <div className={styles.categoryContent}>
                  <h4>{category.name}</h4>
                  <p>{category.description}</p>
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
