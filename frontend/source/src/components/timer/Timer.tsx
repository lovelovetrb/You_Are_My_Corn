import { useTimer } from "react-timer-hook";
import { Dispatch, SetStateAction } from "react";

import styles from "@/components/timer/Timer.module.css";

type Props = {
    expiryTimestamp: Date;
    onExpireFunc: Dispatch<SetStateAction<boolean>>;
};

const Timer = ({ expiryTimestamp, onExpireFunc }: Props) => {
    const { seconds, minutes } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            alert("おわりだよ！\nけっかをそうしんしよう！");
            onExpireFunc(true);
        },
    });

    return (
        <>
            <p className={styles.timer}>
                のこりじかん : {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </p>
        </>
    );
};

export default Timer;
