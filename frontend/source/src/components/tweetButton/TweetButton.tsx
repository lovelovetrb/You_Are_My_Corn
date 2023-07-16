import Image from "next/image";

import { ResultData } from "@/types/resultData";

import css from "@/components/tweetButton/TweetButton.module.css";


type props = {
    text: string;
    result?: ResultData;
    onClickFunc?: () => void;
};

// const [result, setResult] = useState<ResultData>({
//     text: "",
//     category: 0,
//     score: 0,
//     rank: 0,
//     verificationHash: "",
// });

const TweetButton = ({ text, result, onClickFunc }: props) => {
    // TODO:tweetButtonの実装
    return (
        // <button className={css.button} href="http://twitter.com/share" target="_blank" onClick={onClickFunc}>
        //     <Image src="/twitter.png" alt="twitter" width={25} height={25} />
        //     <p>{text}</p>
        // </button>

        <a
            className={css.button}
            href={`http://twitter.com/share?url=${location.href}&text=${result.score}%0a&text=${result.text}%0a&hashtags=エモちゃれ`}
            target="_blank"
            rel="noreferrer"
        >
            <Image src="/twitter.png" alt="twitter" width={25} height={25} />
            <p>{text}</p>
        </a>

    );
};

export default TweetButton;
