import css from "@/components/floatingWindow/FloatingWindow.module.css"

const FloatingWindow = ({ setIsOpen }) => {
    return (
        <>
            <div className={css.txt}>
                <div className={css.flexbox}>
                    <h2>★あそびかた★</h2>
                    <button onClick={() => { setIsOpen(false) }}>✖</button>
                </div>
                <p className={css.howtouse}>
                    1&emsp;「よろこび」「いかり」「かなしみ」「きたい」のうち<br />
                    &emsp;&emsp;していされた「キモチ」がつたわる「ぶんしょう」をにゅうりょくしよう<br />
                    <br />
                    2&emsp;でも、ぜったいにつかうワードときんしワードがきめられてるよ<br />
                    <br />
                    3&emsp;AIがにゅうりょくされた「ぶんしょう」をしていされた「キモチ」に<br />
                    &emsp;&emsp;どれだけちかいかを「けいさん」して、とくてんをだすよ
                </p>
            </div>
        </>
    );
};
export default FloatingWindow;
