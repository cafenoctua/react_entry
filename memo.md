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
useStateでstateの特定の中身のみ書き換えたい場合に頻出する
**...**を使わないと書き換えた値以外が消去されてしまう
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

## 文字列埋め込み
文字列に変数を埋め込みたい場合は文字列を``で囲う必要がある
```js
`https://jsonplaceholder.typicode.com/posts/${id}`
```

# React概要
>"Reactはユーザーインターフェースを構築するためのJavaScriptライブラリです。宣言的に書け、効率的に動作し、柔軟性に富んでいます。"

reactは柔軟に仮想DOMを変更できるのと規模の大きさにもうまく対応する仕組みを持っている。

## Basic
基本的にはjsx形式で記述する
コード内の/</div>と<>は同義


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

子コンポーネントに関数の引数のようにpropsを定義することで親コンポーネントで入れたprops.***を参照渡しで扱えるようになる

## Event handler
使用したいeventのhandlerを指定して関数として作るのとhtmlコードに埋め込めばevent処理ができる
```js
const Basic1 = (props) => {
    const clickHandler = () => {
        console.log('clicked')
    }

    return (
        <div>
            <button onClick={clickHandler}>Click</button>
```

## state
stateは各コンポーネント内でのみ管理することができる情報のことをさします。管理とは、何かイベント（例えばユーザーがそのコンポーネントをクリックした）が起きたときに更新することができる、ということです。

## Hooks
- Classコンポーネントを必要としない
  - コードを簡素化出来た
- props drilling問題を解決した
- Reduxを最小限にした
  - (useContenxt + useReducer)
- functional conponentにuseState(Hooks)が追加された
  - HooksはClass componentのthis.stateと同様の状態を活用できるようになった

### UseState
Reactの宣言と同時にuseStateを宣言する必要がある
```js
import React, {useState} from 'react'
```

シンプルなコード例
```js
const [count, setCount] = useState(0) //初期値 0

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Count {count}</button>
```
stateの管理がFunctinal componentで済むことに利点がある
この書き方だと状態の変更がレンダリング毎での変更のためレンダリング中に複数回処理を回しても1回回したのと同様の結果となる

コード例
```js
<button onClick={() => {setCount(count + 1); setCount(count + 1);}}>Count {count}</button>
```
これを防ぐには前回の状態を保持している```prevCount```を使うことでレンダリングが終わらなくても状態を更新できる

コード例
```js
<button onClick={() => {setCount(prevCount=>prevCount + 1); setCount(prevCount=>prevCount + 1);}}>Count {count}</button>
```
#### Object
コード例
```js
const Basic1 = () => {
    

    const [product, setProduct] = useState({name: '', price: ''})

    return (
        <div>
            <form>
                <input type='text' value={product.name}
                onChange={evt => setProduct({...product, name: evt.target.value})}/>
                <input type='text' value={product.price}
                onChange={evt => setProduct({...product, price: evt.target.value})}/>
            </form>

            <h1>Product name is { product.name }</h1>
            <h1>Product price is { product.price }</h1>
        </div>
    )
}
```

#### Array
.map()はfor文で配列の中身を取り出すのと同様な処理が行える

### UseEffect
レンダリング後に処理を実行するもの
最初にcomponentが読み込まれたときのみやあるstateが読み込まれたときのだけ処理を行う

コード例
```js
useEffect(() => {
    console.log("useEffect invoked")
})
```

最初のレンダリング時のみ実行させる
```js
useEffect(() => {
    console.log("useEffect invoked")
}, [])
```
特定stateのみ実行させる
```js
useEffect(() => {
    console.log("useEffect invoked")
}, [state])
```

#### cleanup

### useContext
propsの受け渡しをコンポーネント階層依存なくできる
contextsフォルダを別途作り例のようなコードを定義する

コード例
```js
import { createContext } from 'react'

const AppContext = createContext()

export default AppContext
```

その後propsの受け渡しをしたいcomponentにuseContextを定義して使うことができる
コード例
```js
import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext';
const C = () => {

    const value = useContext(AppContext)

    return (
        <div>
            <h3>C</h3>
            { value }
        </div>
    )
}

export default C
```

### useReducer
Function内でカレントstateを参照できる変数と指定されたactionに基づいてreducer関数を実行する

コード例
```js
import React, { useReducer } from 'react'

const initialState = 0
const reducer = (currentState, action) => {
    switch(action) {
        case 'add_1':
            return currentState + 1
        case 'multiple_3':
            return currentState * 3
        case 'reset':
            return initialState
        default:
            return currentState
    }
}

const BasicReducer = () => {
    const [count, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <div>Count {count}</div>
            <button onClick={() => dispatch('add_1')}>Add + 1</button>
            <button onClick={() => dispatch('multiple_3')}>Multiple * 3</button>
            <button onClick={() => dispatch('reset')}>Reset</button>
        </div>
    )
}
```

### useReducer + useContext
組み合わせることでコンポーネントをまたがったグローバルなstateに制御が可能になる


### useMemos
計算時間の長い関数の無駄な再計算を防ぐ機能


### useCallback
レンダリングに追従して無駄なコンポーネントをレンダリングさせるのを防ぐ

## API連携
- axios
- fetch

## Redux
複数のReducerをまとめる際にReduxが必要となってくる

## ES7 React/Redux/GraphQL/React-Native snippets
vscodeのreact補完拡張機能
rafceと入力することでFanctional componentのテンプレートを生成できる

# React DjangoRestFramework連携

# Ref
- [Reactの学習、今からやるならこうする](https://qiita.com/d0ne1s/items/971ffc8db6815e9aaad0)
- [【最新版・hooks対応】 Reactの基礎を学んでTODOアプリを作ろう！](https://note.com/dragontaro/n/n04e0b9c0cca7)