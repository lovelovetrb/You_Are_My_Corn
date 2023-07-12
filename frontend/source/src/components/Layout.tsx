import { ReactElement } from "react";

import Image from "next/image";

import Header from "@/components/header/Header";

import styles from "@/styles/Home.module.css";

type LayoutProps = Required<{
    readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
    <>
        <Header />
        <div className={styles.wrapper}>
            <div className={styles.imageArea}>
                <Image src="/star.svg" alt="star" width={150} height={150} className={styles.star} />
                <Image src="/polygon.svg" alt="polygon" width={150} height={150} className={styles.polygon} />
            </div>
            <div className={styles.container}>{children}</div>
            <div className={styles.imageArea}>
                <Image src="/polygon_revese.svg" alt="polygon" width={150} height={150} className={styles.polygon} />
                <Image src="/star_yellow.svg" alt="star" width={150} height={150} className={styles.star} />
            </div>
        </div>
    </>
);
