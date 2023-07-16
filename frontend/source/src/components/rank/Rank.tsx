import styles from "@/components/rank/Rank.module.css";
import { category } from "@/lib/num2category";
import { RankingData } from "@/types/rankingData";
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
                            const clown = {
                                backgroundImage: `url(/clown${index + 1}.svg)`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                            };
                            if (index < showRankingNum) {
                                return (
                                    <tr key={index} className={styles.tableBody}>
                                        <td style={index < 3 ? (clown as React.CSSProperties) : undefined}>{index + 1}</td>
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
