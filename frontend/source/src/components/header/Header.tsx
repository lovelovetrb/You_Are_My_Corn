import css from "@/components/header/Header.module.css";
import Image from "next/image";

const Header = () => {
    return (
        <div className={css.header}>
            <Image className={css.cornLogo} src="/corn.png" width={120} height={120} alt="logo" />
            <div className={css.headerTextArea}>
                <h2 className={css.title}>エモちゃれ!!</h2>
                <p className={css.subTitle}>~ You Are My Corn ~</p>
            </div>
            <Image className={css.cornLogo} src="/corn.png" width={120} height={120} alt="logo" />
        </div>
    );
};

export default Header;
