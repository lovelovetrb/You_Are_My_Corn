import Image from "next/image";

import { ResultData } from "@/types/resultData";

import css from "@/components/tweetButton/TweetButton.module.css";


type props = {
    text: string;
    result?: ResultData;
    onClickFunc?: () => void;
};


const TweetButton = ({ text, result, onClickFunc }: props) => {
    return (
        <a
            className={css.button}
            href={`http://twitter.com/share?url=https://bit.ly/emochare&text=${result.text}%0a私のスコアは！！！${result.score}ダ！！！%0a&hashtags=エモちゃれ`}
            target="_blank"
            rel="noreferrer"
        >
            <Image src="/twitter.png" alt="twitter" width={25} height={25} />
            <p>{text}</p>
        </a>

    );
};

export default TweetButton;
