import { ReactElement } from "react";
import Header from "@/components/header/Header";

import styles from "@/styles/Home.module.css";

type LayoutProps = Required<{
    readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
    <>
        <Header />
        <div className={styles.container}>{children}</div>
    </>
);
