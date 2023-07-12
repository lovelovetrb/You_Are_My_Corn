import { Layout } from "@/components/Layout";

import Text from "@/components/text/Text";
import Button from "@/components/button/Button";

import Link from "next/link";

const _404 = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Text text="404エラーです... ごめんなさい" />
            <div style={{ marginInline: "auto" }}>
                <Link href="/">
                    <Button text="HOME" />
                </Link>
            </div>
        </div>
    );
};
_404.getLayout = function getLayout(page: any) {
    return <Layout>{page}</Layout>;
};
export default _404;
