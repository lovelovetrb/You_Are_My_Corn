import css from "@/components/buttonArea/ButtonArea.module.css";

type Props = {
    children: React.ReactNode;
};

const ButtonArea = ({ children }: Props) => {
    return <div className={css.wrapper}>{children}</div>;
};

export default ButtonArea;
