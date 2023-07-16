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
                    1.「よろこび」「いかり」「かなしみ」「きたい」のうちしていされた「キモチ」がつたわる「ぶんしょう」をにゅうりょくしよう
                </p>
                <p className={css.howtouse}>2.でも、ひっすワードときんしワードがきめられてるよ</p>
                <p className={css.howtouse}>
                    3.AIがにゅうりょくされた「ぶんしょう」をしていされた「キモチ」にどれだけちかいかを「けいさん」して、とくてんをだすよ
                </p>
            </div>
        </>
    );
};
export default FloatingWindow;
