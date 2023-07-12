import { motion } from "framer-motion";
import styles from "@/components/circleLoader/CircleLoader.module.css";

const spinTransition = {
    repeat: Infinity,
    duration: 1,
};
const CircleLoader = () => {
    return (
        <div className={styles.container}>
            <motion.div className={styles.circle} animate={{ rotate: 360 }} transition={spinTransition} />
        </div>
    );
};
export default CircleLoader;
