import css from "@/components/button/Button.module.css";

type props = {
    text: string;
    onClickFunc?: () => void;
};

const Button = ({ text, onClickFunc }: props) => {
    return (
        <button className={css.button} onClick={onClickFunc}>
            <p>{text}</p>
        </button>
    );
};

export default Button;
