import { ReactElement } from "react";
import Header from "@/components/header/Header";

import styles from "@/styles/MaxWidthLayout.module.css";

type LayoutProps = Required<{
    readonly children: ReactElement;
}>;

export const MaxWidthLayout = ({ children }: LayoutProps) => (
    <>
        <Header />
        <div className={styles.container}>{children}</div>
    </>
);
