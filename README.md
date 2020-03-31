# publicdice
You can share globally unique dice rolls with others.

Demo [https://qurihara.github.io/publicdice/]

## How it works?

### in English
The Ethereum blockchain is producing hash values every ~15 seconds. The latest hash value is hard-to-predict, globally unique and difficult to falsify. You can generate random numbers which can be shared with others by applying a simple mapping to the values. For instance, You can share your bet with people all over the world by rolling a dice in a bit future and push "tweet" button to tweet like "When I get a one, I will go on a diet!" and nobody can falsify the result. Yes, it still has some limitations. So use it for non-serious purposes🙂

### in Japanese
イーサリアムのブロックチェーンは、約１５秒おきに予測が困難なハッシュ値という値を作り続けています。この値は全世界で唯一の値であり、改ざんも困難です。そのハッシュ値を乱数とみなし、与えられた値の範囲になるよう変換すれば、他者と共有できる公平なサイコロとして活用できるのです。例えば、少し先の時刻のサイコロを振って、tweetボタンを押せば、世界に向けて絶対に改ざんできない賭けを宣言をすることができます。「1の目が出たら、ダイエットします！」などなど。厳密に言えば制限はあるので、あまり重くない用途にお使いください🙂


### Usage Examples

PublicDiceが有効活用できるのは以下のような局面です。
* あまり信頼関係が確立していない人とオンラインで賭けをする際、信頼できるサイコロとして用いる。
* 納得できるオープンな方法で不特定多数の人から一人を選ぶ。


Slackのサイコロbotでいいじゃないか、という意見もあるかもしれませんが、ちょっと違います。Slackの中にいる人というのは、「同じSlackを使うグループメンバーである」という信頼関係が既に成立しているのです。Slackというシステムを信頼しており、またそのグループの掟に従うという合意が得られています。また、「サイコロbotで決めていいよね？」という事に対し、同意が得られているからbotでOKなのです。


つまり、オンラインでサイコロを振るということを行う場合、（１）共通のコミュニケーション基盤、（２）サイコロのランダムネスに対する信頼、および（３）勝敗決定後の賞罰執行の強制力、の3点が必要になってきます。

（１）について、PublicDiceは静的なwebsiteであり、URLのみを通じて他者とやり取りできます。ですからチャットやメールやSNSなど、テキストさえやり取りできればどんな人とでもサイコロを共有できます。また、（２）について乱数発生に用いているブロックチェーンのハッシュ値というのは改ざんが困難かつ全世界で唯一の値であるため、信頼できる値として活用できるのです。（ただし、通常の利用であればほぼ問題ないものの、擬似乱数として完璧ではないので、若干注意が必要です。）
一方で（３）について、PublicDiceはスマートコントラクトではないため、勝ち負け判定後の賞罰の執行には、強制力はありません。執行がスムーズに行える状況で活用する必要があります。たとえば、衆人環視によるプレッシャーを活用するためにtwitter上で賭けへの参加者に対し、参加意思表明と決定への遵守を公言させるとか、応募者に対する抽選のように、主催者側に決定権があることが自明な場合などです。

### REST API (api.gs)

DEMO running as Google App Script:
[https://script.google.com/macros/s/AKfycbxWrWR4vea8ZQ7UhuIZirt-Hm7Ny_7CBAmPFBCmdAAtGzk2AJU/exec]

Needs 20 seconds to respond.

Returns a JSON:

{
  block: Block hight  
  hash: Hash value
  url: Block information for verification  
  value: A generated random value of [0,1} by mapping the last 16 digits of the hash value
}
