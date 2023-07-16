import css from "@/components/floatingWindow/FloatingWindow.module.css";

const FloatingWindow = ({ setIsOpen }) => {
    return (
        <>
            <div className={css.txt}>
                <div className={css.flexbox}>
                    <h2>★あそびかた★</h2>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        ✖
                    </button>
                </div>
                <p className={css.howtouse}>
                    1.「よろこび」「いかり」「かなしみ」「きたい」のうち指定された「キモチ」が伝わる「ぶんしょう」を入力しよう
                </p>
                <p className={css.howtouse}>2.でも、必須ワードと禁止ワードが決められてるよ</p>
                <p className={css.howtouse}>
                    3.AIが入力された「ぶんしょう」を指定された「キモチ」にどれだけ近いかを「けいさん」して、得点をだすよ
                </p>
            </div>
        </>
    );
};
export default FloatingWindow;
