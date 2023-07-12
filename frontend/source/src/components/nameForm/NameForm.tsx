import styles from "@/components/nameForm/NameForm.module.css";

import { useState } from "react";

const NameForm = () => {
    const [name, setName] = useState<string>("");
    const [isSend, setIsSend] = useState<boolean>(false);
    const nameMaxLength = 10;
    const handleClick = () => {
        // TODO: ranking登録処理
        alert(name);
        setIsSend(true);
    };

    return (
        <div className={styles.nameFormArea}>
            <p>なまえをにゅうりょく(10もじまで)</p>
            <div className={styles.form}>
                <input
                    onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                    }}
                />
                <button
                    className={name.length === 0 || name.length > nameMaxLength || isSend ? styles.disabled : ""}
                    onClick={handleClick}
                    disabled={name.length === 0 || name.length > nameMaxLength || isSend}
                >
                    OK
                </button>
            </div>
        </div>
    );
};
export default NameForm;
