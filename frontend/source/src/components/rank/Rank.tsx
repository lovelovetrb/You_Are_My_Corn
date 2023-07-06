import styles from "@/components/rank/Rank.module.css";
import { useState } from "react";
import { Ranking } from "@/types/ranking";

type props = {
    ranking: Ranking[];
};

const Rank = ({ ranking }: props) => {
    const [active, setActive] = useState(0);
    const category = ["よろこび", "いかり", "かなしみ", "きたい"];
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
                    {/* TODO: fetch ranking data */}
                    {ranking
                        .filter((item) => item.category === active)
                        .sort((a, b) => b.score - a.score)
                        .map((item, index) => {
                            if (index < showRankingNum) {
                                return (
                                    <tr key={index} className={styles.tableBody}>
                                        <td>{index + 1}</td>
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
