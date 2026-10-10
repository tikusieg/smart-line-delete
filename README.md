# Smart Line Delete

現在カーソルがある行を丸ごと削除し、直前の行の末尾へ移動する VS Code 拡張機能です。

## インストール

VS Code の拡張機能ビューの「…」→「VSIX からのインストール…」で、`smart-line-delete-0.1.0.vsix` を選択してください。ソースからの作成方法は下記を参照してください。

## 使い方

デフォルトのキーボードショートカットは割り当てていません。次の手順で好きなキーを設定してください。

1. VS Code の「キーボード ショートカット」を開きます。
2. `Smart Line Delete` を検索します。
3. 「現在行を削除して前の行末へ移動」のキー割り当てを追加します。

コマンドパレットから **Smart Line Delete: 現在行を削除して前の行末へ移動** を選んでも実行できます。

行の先頭・途中・末尾のどこでも同じ動作です。折り返し表示されていても、改行で区切られた行全体を削除します。移動先は空白を含む実際の行末です。

先頭行を削除した場合は、削除後の先頭行の先頭へ移動します。1行だけの場合は空の文書になります。最終行の削除では直前の改行も取り除きます。

選択範囲がある場合は、その範囲のアクティブな端（カーソル側）の行だけを削除します。複数カーソルには対応していません。通常の「元に戻す」で削除を取り消せます。

コマンド ID は `smartLineDelete.execute` です。`keybindings.json` で設定する場合は、割り当ての `when` に `editorTextFocus && !editorReadonly && !editorHasMultipleSelections` を指定すると、編集可能なエディターにカーソルが1つある場合に限定できます。

## 開発

このフォルダーを VS Code で開き、F5 で拡張機能の開発用ウィンドウを起動します。ビルドや依存パッケージのインストールは不要です。Node.js があれば `npm test` で行削除ロジックのテストを実行できます。

```sh
git clone https://github.com/tikusieg/smart-line-delete.git
cd smart-line-delete
npm test
```

### VSIX の作成

Node.js 22 以降で、次のコマンドを実行します。

```sh
npx @vscode/vsce package --no-dependencies
```

生成した VSIX は Git 管理から除外しています。配布する場合は GitHub Releases などに添付してください。

### 手動確認

F5 で起動した開発用ウィンドウで、ショートカットを手動で設定します。折り返しを有効にした長い行の途中から実行し、行全体の削除と前の行末への移動を確認します。先頭行・最終行・空行・選択範囲がある場合と、元に戻す操作も確認してください。

### Marketplace への公開

`package.json` の `publisher` はローカル配布用の仮値 `local-tools` です。Marketplace に公開する際は、自分が登録した Publisher ID に置き換えてから VSIX を作り直してください。GitHub のユーザー名とは別の設定です。

## リンク

- [GitHub リポジトリ](https://github.com/tikusieg/smart-line-delete)
- [不具合報告](https://github.com/tikusieg/smart-line-delete/issues)

## ライセンス

MIT License。詳細は [LICENSE](LICENSE) を参照してください。
