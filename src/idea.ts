// @ts-nocheck
import "https://deno.land/std@0.170.0/dotenv/load.ts";
import { Configuration, OpenAIApi } from "npm:openai";

/**
 * ChatGPTに「ハッカソンで作成するアプリのアイディア」を生成してもらう関数
 * @param skill ユーザーが選択したスキルタグ
 * @returns アプリアイディアの文字配列
 */
const generateIdeas: GenerateIdeas = async (skill) => {
  const l = skill.language.join(" ");
  const f = skill.framework.join(" ");
  const d = skill.database.join(" ");
  const s = skill.service.join(" ");

  console.log(l, f, d, s);

  // ChatGPT APIと通信するクライアントの作成
  const configuration = new Configuration({
    apiKey: Deno.env.get("OPENAI_API_KEY"), //process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const content = `${l} ${f} ${d} ${s}の技術を使用。
      これらを用いてハッカソンで作成するアプリを3つ以下のjson形式で出力してください。
      文字列は全て日本語で、各アプリの概要は15文字以内の日本語で記述する。
      type string["アプリタイトル：アプリ概要",]`;

  // ChatGPT APIにリクエストを送信
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });
  console.log("data: ", completion.data.choices[0]);

  // 文字列の整形
  const array = completion.data.choices[0].message.content
    .replace("[", "")
    .replace(/\n/g, "")
    .replace(/ /g, "")
    .replace(/"/g, "")
    .replace("]", "")
    .split(",");

  // 例外処理
  if (array == undefined) {
    throw new Error("generateIdeas array is undefined");
  }

  return array;
};

/**
 * main関数
 */
async function main() {
  // モックデータ
  const mockData: SkillSet = {
    language: ["Swift", "Java"],
    framework: [],
    database: [],
    service: [],
  };

  // アイディアを生成
  const idea = await generateIdeas(mockData);
  console.log("idea:", idea);
}

// main関数を実行
main();

/**
 * generateIdeas関数の型
 */
type GenerateIdeas = (skillSet: SkillSet) => Promise<readonly string[]>;

/**
 * スキルタグの型
 * ユーザーが選択したスキルタグ一覧
 */
interface SkillSet {
  /** ジャンル: 言語 */
  language: readonly string[];

  /** ジャンル: フレームワーク */
  framework: readonly string[];

  /** ジャンル: データベース */
  database: readonly string[];

  /** ジャンル: その他 */
  service: readonly string[];
}
