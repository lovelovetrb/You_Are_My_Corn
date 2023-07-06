import TextareaAutosize from "react-textarea-autosize";

import { useRouter } from "next/router";

import { useState } from "react";

import { useSetAtom } from "jotai";
import { textAtom } from "@/lib/jotai";

import styles from "@/components/speechBuble/SpeechBuble.module.css";

// TODO: 送信時の挙動
// TODO: 送信ボタンのスタイル
const SpeechBuble = () => {
    const [text, setText] = useState("");
    const setPleyText = useSetAtom(textAtom);
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm("ほんとうにこれでいい？")) {
            setPleyText(text);
            router.push("/result");
        }
    };
    return (
        <div className={styles.wrapper}>
            <p className={styles.heading}>キモチをつたえて！</p>
            <form
                className={styles.inputArea}
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <TextareaAutosize
                    minRows={5}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
                {/* TODO: 画像の追加（送信ボタン） */}
                <button disabled={text.length === 0} className={text.length === 0 ? styles.disabled : ""}>
                    おくる
                </button>
            </form>
        </div>
    );
};
export default SpeechBuble;
