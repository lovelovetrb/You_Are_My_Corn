import styles from "@/components/text/Text.module.css";

type Props = {
    text: string;
    color?: string;
};

const Text = ({ text, color="#7B664B" }: Props) => {
    return <div className={styles.text} style={{color}}>{text}</div>;
};

export default Text;
