import css from "@/components/button/Button.module.css";

type props = {
    text: string;
};

const Button = ({ text }: props) => {
    return (
        <button className={css.button}>
            <p>{text}</p>
        </button>
    );
};

export default Button;
