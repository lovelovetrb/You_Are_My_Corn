import { Layout } from "@/components/Layout";
import Text from "@/components/text/Text";
const _500 = () => {
    return (
        <div style={{textAlign: "center"}}>
            <Text text="500エラーです... ごめんなさい" />
        </div>
    );
};
_500.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
};
export default _500;
