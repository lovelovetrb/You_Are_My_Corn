import styles from "@/components/nameForm/NameForm.module.css";
import { ResultData } from "@/types/resultData";

import { useState } from "react";

type props = {
    resultData: ResultData;
};

const NameForm = ({ resultData }: props) => {
    const [name, setName] = useState<string>("");
    const [isSend, setIsSend] = useState<boolean>(false);
    const nameMaxLength = 10;
    const handleClick = async () => {
        resultData.username = name;
        await fetch("http://localhost:3000/api/entry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resultData),
        }).then((res) => {
            if (res.ok) {
                alert("登録しました");
                setIsSend(true);
            } else {
                alert("登録に失敗しました");
            }
        });
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
