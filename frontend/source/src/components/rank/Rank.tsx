import styles from "@/components/rank/Rank.module.css";
import { category } from "@/lib/num2category";
import { RankingData } from "@/types/rankingData";
import Image from "next/image";
import { useState } from "react";

type props = {
    ranking: RankingData[];
};

const Rank = ({ ranking }: props) => {
    const [active, setActive] = useState(0);
    const showRankingNum = 5;

    return (
        <div className={styles.wrapper}>
            <div className={styles.genreArea}>
                {category.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className={`${styles.genreButton} ${active === index ? styles.isActive : ""}`}
                            onClick={() => {
                                setActive(index);
                            }}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
            <table className={styles.table}>
                <tbody>
                    {ranking
                        .filter((item) => item.category === active)
                        .sort((a, b) => b.score - a.score)
                        .map((item, index) => {
                            if (index < showRankingNum) {
                                return index < 3 ? (
                                    <tr key={index} className={styles.clownRow}>
                                        <td>
                                            <div className={styles.clownWrapper}>
                                                <Image src={`/clown${index + 1}.svg`} alt="clown" width={80} height={80} />
                                                <p className={styles.clown}>{index + 1}</p>
                                            </div>
                                        </td>
                                        <td>{item.username}</td>
                                        <td className={styles.score}>{item.score}</td>
                                    </tr>
                                ) : (
                                    <tr key={index} className={styles.clownRow}>
                                        <td>
                                            <div className={styles.clownWrapper}>
                                                <Image src={"/clown1.svg"} alt="clown" className={styles.hiddenClown} width={80} height={80} />
                                                <p className={styles.clown}>{index + 1}</p>
                                            </div>
                                        </td>
                                        <td>{item.username}</td>
                                        <td className={styles.score}>{item.score}</td>
                                    </tr>
                                );
                            }
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Rank;
