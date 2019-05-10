# 某サイトおためしのAngularSample（AngularとFireBase）

update:2019/05/10

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

以下の記事にしたがい、とりあえず、AngularによるmBaaSへのCRUDを実行するサンプルを実装。
（簡単なCRUD）

https://qiita.com/seteen/items/43908e33e08a39612a07

以下の各種のコマンドを適時使用（習熟のため）。
Visual Studio Codeを使用しているので、Terminal上で実行基本で。
便利過ぎるとバカになるので注意が必要かｗ

## Development server　（デバッグ用の開発サーバ）

ベタな方法でAngular標準の以下で実行。とりあえず、npmとかyarnでもできるが設定をしないといけないので、それは据え置き。
とりあえず、VSCodeと連携して簡単にやりたいのですが、設定とか事前準備が必要なので、とりあえずはいったん放置。

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding　（各種コードの生成機能）

以下、AngularCLIを使用している。（おもにcoponent中心）
とりあえず、必要なものに応じて実行。

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build　（配布用モジュールのビルド）

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

とりあえず、以下等を色々設定が必要なようだが、面倒そうなので一旦放置。

* package.jsonとか
* launch.json
* tasks.jason

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

単体テストのやりかたがというか、面倒なのでやってません。
現状、xxxxx.specs.tsは放置。
本当は、生成と同時に実装していく作法のような気がするが、
Karmaとの連携（Chromeが自動的に立ち上がるみたいです）する作法のようでこちらも知見が必要。一旦放置。

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

これも、上と同じでProtractorの使い方なんか全然調べてないのでよくわかりません。
ただ、上記とこれを含む機能があることは、AngularはEnterprise用途も想定しているということなんだろう。

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

=======

# 当面（20190510）の課題

* 実装
  * ログイン時のセキュリティトークンをハードコード状態なので、あとで使いまわすようにしておかないとあかんでしょね。

* 広い意味では
  * デプロイ方法は（１）？　＝＞とりあえず、dist配下をファイルコピーできればよさそうだが
  * デプロイ方法は（２）？　＝＞webpackを使うってどうやる？javaのwarみたいになる？
  * フェーズでのパッケージ切り替え
     * 設定をいじらないといけないので、いったん放置してます。めんどくさいので。
  * フェーズでのアクセスパスの切り替え
     * 上と同様に放置。めんどくさいので。

