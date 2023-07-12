import TextareaAutosize from "react-textarea-autosize";

import { useRouter } from "next/router";
import Image from "next/image";

import { useState } from "react";

import { useSetAtom } from "jotai";
import { textAtom } from "@/lib/jotai";

import styles from "@/components/speechBuble/SpeechBuble.module.css";

type Props = {
    isLimit: boolean;
};
const SpeechBuble = ({ isLimit }: Props) => {
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
                    disabled={isLimit}
                    minRows={5}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
                <button disabled={text.length === 0} className={text.length === 0 ? styles.disabled : ""}>
                    <Image src="/submit_button.svg" alt="send" width={50} height={50} />
                </button>
            </form>
        </div>
    );
};
export default SpeechBuble;
