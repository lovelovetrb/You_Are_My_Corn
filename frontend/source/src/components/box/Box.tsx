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
                {words[0] === "" && <p>今回の縛りはなし！！好きな言葉を使ってね！！</p>}
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
