import styles from "@/components/box/Box.module.css";

type Props = {
    heading: string;
    words: string[];
};

const Box = ({ heading, words }: Props) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.heading}>{heading}</p>
            <ol className={styles.list}>
                {words.map((word, index) => {
                    return (
                        <li key={index} className={styles.listItem}>
                            {word}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default Box;
