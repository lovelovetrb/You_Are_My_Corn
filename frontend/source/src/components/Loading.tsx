import CircleLoader from "./circleLoader/CircleLoader";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "50px",
};

const textStyle = {
    textAlign: "center",
    fontSize: "40px",
    marginBottom: "30px",
};

type Props = {
    text: string;
};

const Loading = ({ text }: Props) => {
    return (
        <div style={containerStyle as React.CSSProperties}>
            <h1 style={textStyle as React.CSSProperties}>{text}</h1>
            <CircleLoader />
        </div>
    );
};
export default Loading;
