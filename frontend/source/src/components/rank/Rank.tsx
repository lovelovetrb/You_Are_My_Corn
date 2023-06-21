import styles from "@/components/rank/Rank.module.css";
import { useState } from "react";

const Rank = () => {
    const isactiveStyle = {
        backgroundColor: "#ff527b",
    };
    const [active, setActive] = useState(0);

    return (
        <div className={styles.wrapper}>
            <div className={styles.genreArea}>
                <button
                    className={styles.genreButton}
                    style={active === 0 ? isactiveStyle : {}}
                    onClick={() => {
                        setActive(0);
                    }}
                >
                    うれしい
                </button>
                <button
                    className={styles.genreButton}
                    style={active === 1 ? isactiveStyle : {}}
                    onClick={() => {
                        setActive(1);
                    }}
                >
                    おこる
                </button>
                <button
                    className={styles.genreButton}
                    style={active === 2 ? isactiveStyle : {}}
                    onClick={() => {
                        setActive(2);
                    }}
                >
                    かなしい
                </button>
                <button
                    className={styles.genreButton}
                    style={active === 3 ? isactiveStyle : {}}
                    onClick={() => {
                        setActive(3);
                    }}
                >
                    きたい
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th>らんく</th>
                        <th>なまえ</th>
                        <th>すこあ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.tableBody}>
                        <td>1</td>
                        <td>user1</td>
                        <td>100</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Rank;
