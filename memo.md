# es6概要
## let, const
- let → 変数
- const → 定数
その他の言語と同様な扱い

## =>演算子
無名関数を作れる
```js
const HelloWorld = () => {
  return "Hello World!!";
}
// const HelloWorld = () => "Hello World!!";   // １行でも書ける
console.log(HelloWorld());     
```

## Class
```js
class HelloWorld extends React.Component {
 render() {
   return (
     <div>
       HelloWorld
     </div>
   );
 }
}
```
extendsでクラスの継承も可能
> React.Componentクラスを継承することで、render関数が使えたりstateやpropsといったreactの構文を使えることができるようになります。
この辺りはオブジェクト指向の基本なので気になる方は調べてみてください。

hooksが実装されてからはreactでclassを使うことは非推奨となっており代わりにfunction componentを使う

## デフォルト引数
```js
const PlusOne = (a = 1) => {   // aのデフォルト値が1という意味
 return a + 1;
}
console.log(PlusOne());        // =>   1 + 1 = 2
console.log(PlusOne(100));     // => 100 + 1 = 101
```

## テンプレート文字列
```js
const Hello = (name) => `${name}, Hello!`, ;
console.log(Hello("Tom"));              // Tom, Hello!
```

## スプレッド演算子
**...**は配列やオブジェクトの展開で使う

```js
array = [1, 2, 3];
console.log(...array); // 1 2 3
```

## 分割代入

```js
const state = {
    hoge: "hoge",
    fuga: "fuga"
}

const { hoge, fuga } = state
```
配列でも可能
```js
const arr = ["hoge", "fuga"];
const [hoge, fuga] = arr;

console.log(hoge) // "hoge"
console.log(fuga) // "fuga"
```

## Promiseおよびasync/await
jsで非同期処理を実装するときのデファクトスタンダードとなっているAPIです。
フロントエンドであればほとんどがfetchでしかPromiseを扱うことはありません。
```js
let user = {};

fetch("/user").then(res => res.json()).then(json => user = json);

# async/await
const res = await fetch("/user")
const user = await res.json()
```

# React概要
>"Reactはユーザーインターフェースを構築するためのJavaScriptライブラリです。宣言的に書け、効率的に動作し、柔軟性に富んでいます。"

reactは柔軟に仮想DOMを変更できるのと規模の大きさにもうまく対応する仕組みを持っている。

## コンポーネント
```js
const HelloWorld = () => {
  return (
    <div>
      HelloWorld
    </div>
  );
}
```
↑これが最新の書き方(関数コンポーネント)

## props
これは親コンポーネントから渡ってきた情報を参照するときに使います。なぜこのような仕組みが必要かというと、コンポーネント内の情報は基本的に他のコンポーネントから参照できないからです。

## state
stateは各コンポーネント内でのみ管理することができる情報のことをさします。管理とは、何かイベント（例えばユーザーがそのコンポーネントをクリックした）が起きたときに更新することができる、ということです。



# Ref
- [Reactの学習、今からやるならこうする](https://qiita.com/d0ne1s/items/971ffc8db6815e9aaad0)
- [【最新版・hooks対応】 Reactの基礎を学んでTODOアプリを作ろう！](https://note.com/dragontaro/n/n04e0b9c0cca7)