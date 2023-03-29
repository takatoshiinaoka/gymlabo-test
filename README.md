# gymlabo-test
GYMLABOハッカソン中のテストリポジトリ

- ChatGPT APIのテスト
- ChatGPTが生成したREADMEのプレビュー
- アーキテクチャ図

など
## 環境変数の設定  
rcディレクトリに移動
```
cd src
```
以下のコマンドで.envファイルを作成
```
cp .env.exmample .env
```
keyの設定  
`OPENAI_API_KEY` にChatGPTのAPIキーを設定
## Deno実行
インストール
```
brew install deno
```
実行
```
deno run -A idea.ts  
```
