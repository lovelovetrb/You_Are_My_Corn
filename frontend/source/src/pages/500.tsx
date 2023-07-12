import { Layout } from "@/components/Layout";

import Text from "@/components/text/Text";
import Button from "@/components/button/Button";
import ButtonArea from "@/components/buttonArea/ButtonArea";

import Link from "next/link";

const _500 = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Text text="500エラーです... ごめんなさい" />
            <div style={{ marginInline: "auto" }}>
                <Link href="/">
                    <Button text="HOME" />
                </Link>
            </div>
        </div>
    );
};
_500.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
};
export default _500;
