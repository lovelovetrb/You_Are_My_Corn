import { encryptSha256 } from "@/lib/verify";
import { SubmitData } from "@/types/submitData";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<SubmitData>) {
    //TODO: 返すデータの作成
    
    const forbiddenWordsList = [["嬉しい","美味しい","楽しい","喜","幸せ","快感","感激","笑顔","元気","ありがとう"],
                            ["怒","憤","キレ","破壊","腹立つ","不機嫌","反発"],
                            ["悔しい","悲","哀","切ない","寂しい","嘆","哭","悼","嘆き","泣","壊れる","孤独","喪失","苦悩","不快"],
                            ["楽しみ","期待","希望","予測","きぼう","胸が膨らむ","待つ","未来","可能性","心躍る","待ち望む","見込む"] 
    ];
    const requiredWords = ["猫","宇宙","絵画","サッカー","鉛筆","音楽","モンキー","車","空気清浄機","鳥","プログラミング","チョコレート",
                            "地図","太陽","ダンス","料理","ギター","橋","カメラ","映画","バナナ","スニーカー","ドラゴン","モニター","恋愛","レストラン",
                            "ドライブ","ボート","本","ファッション","夜景","ランニング","サンドイッチ","旅行","ドクター","雪","ダイヤモンド","ビーチ","ゲーム",
                            "山","コーヒー","クッキー","ミュージカル","スマートフォン","釣り","プール","望遠鏡","ホテル","薬","ビール","藤波","バラ","キャンプ",
                            "トランペット","スーパーヒーロー","ジャングル","ハンバーガー","宝箱","美術館","トイレ","サーカス","ロボット","サンタクロース","宝石","電車",
                            "ハリウッド","シャンパン","フットボール","雨","魚","カラオケ","クリスマス","鏡","ゴールド","ドレス","図書館","クリスタル","乗馬",
                            "スケートボード","テレビ","新聞","サイクリング","バルーン","海","神社","プロポーズ","トロフィー","パーティー","彫刻","お化け屋敷"];
    const ramdamInt = Math.floor(Math.random() * 100);
    const requiredWord = requiredWords[ramdamInt];
    const category = Math.floor(Math.random() * 4);
    const submitData: SubmitData = {
        category,
        requiredWords:[requiredWord],
        forbiddenWords:forbiddenWordsList[category],
        startTime: Date.now(),
        verificationHash: "",
    };
    submitData.verificationHash = encryptSha256(JSON.stringify(submitData));
    res.status(200).json(submitData);
}
