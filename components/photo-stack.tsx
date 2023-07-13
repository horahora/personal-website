import styles from "./photo-stack.module.css";

export default function PhotoStack() {
  return (
    <div className={styles.container}>
      <img src="https://via.placeholder.com/150" width={150} height={150} />
      <img src="https://via.placeholder.com/150" width={150} height={150} />
      <img src="https://via.placeholder.com/150" width={150} height={150} />
    </div>
  );
}
