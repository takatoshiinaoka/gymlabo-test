// @ts-nocheck
import "https://deno.land/std@0.170.0/dotenv/load.ts";

// Denoで環境変数が使えるかチェック
console.log(Deno.env.get("FOO"));
console.log(Deno.env.get("HELLO"));
