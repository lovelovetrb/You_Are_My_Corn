import Image from "next/image";

import { Result } from "@/types/resultData";

import css from "@/components/tweetButton/TweetButton.module.css";

type props = {
    text: string;
    result?: Result;
    onClickFunc?: () => void;
};

const TweetButton = ({ text, result, onClickFunc }: props) => {
    // TODO:tweetButtonの実装
    return (
        <button className={css.button} onClick={onClickFunc}>
            <Image src="/twitter.png" alt="twitter" width={25} height={25} />
            <p>{text}</p>
        </button>
    );
};

export default TweetButton;
