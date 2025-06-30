import styles from "./Loader.module.css"

const Loader = () => {
    const Flower = ({ type, className }) => (
    <div className={`${styles.flower} ${styles[type]} ${className}`}>
      <div className={styles.petals}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.petal} style={{ transform: `rotate(${i * 45}deg)` }} />
        ))}
      </div>
      <div className={styles.center}></div>
    </div>
  )
  return (
    <div className={`${styles.loaderContainer} min-vh-100 d-flex align-items-center justify-content-center`}>
     <div className={styles.animationArea}>
        {/* Top flower */}
        <Flower type="pink" className={styles.topFlower} />

        {/* Left flower */}
        <Flower type="purple" className={styles.leftFlower} />

        {/* Right flower */}
        <Flower type="pink" className={styles.rightFlower} />

        {/* Bottom flower */}
        <Flower type="purple" className={styles.bottomFlower} />
        <div className={styles.centerButton}>
          <button className="btn btn-outline-secondary px-4 py-2"><div className={styles.loadingText}>
          <span>B</span>
          <span>l</span>
          <span>o</span>
          <span>o</span>
          <span>m</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>&nbsp;</span>
          <span>B</span>
          <span>a</span>
          <span>s</span>
          <span>k</span>
          <span>e</span>
          <span>t</span>
        </div></button>
        </div>
      </div>
    </div>
  )
}

export default Loader
