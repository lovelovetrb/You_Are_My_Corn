import css from "@/components/header/Header.module.css";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className={css.header}>
            <Image className={css.cornLogo} src="/corn.png" width={120} height={120} alt="logo" />
            <div className={css.headerTextArea}>
                <Link href="/">
                    <h2 className={css.title}>エモちゃれ!!</h2>
                    <p className={css.subTitle}>~ You Are My Corn ~</p>
                </Link>
            </div>
            <Image className={css.cornLogo} src="/corn.png" width={120} height={120} alt="logo" />
        </div>
    );
};

export default Header;
