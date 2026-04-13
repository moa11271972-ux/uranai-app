<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MOA プレミアム統合鑑定アプリ</title>
  <style>
    * { box-sizing: border-box; }
    :root {
      --bg: #f7f7f9;
      --card: #ffffff;
      --line: #e9e0e6;
      --text: #2f1d28;
      --muted: #735c68;
      --gold1: #f7e8b2;
      --gold2: #ddb14a;
      --rose: #d98ab0;
      --shadow: 0 14px 36px rgba(0,0,0,.06);
    }
    body {
      margin: 0;
      font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .wrap {
      max-width: 1240px;
      margin: 0 auto;
      padding: 24px 16px 40px;
    }
    .hero {
      background: linear-gradient(135deg, #fff 0%, #fff9ec 100%);
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 30px 24px;
      box-shadow: var(--shadow);
      margin-bottom: 18px;
    }
    .badge {
      display: inline-block;
      padding: 8px 14px;
      border-radius: 999px;
      background: #fff3cd;
      color: #8a6200;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .08em;
      margin-bottom: 12px;
    }
    h1 {
      margin: 0 0 10px;
      font-size: clamp(30px, 4vw, 48px);
      color: #4b2938;
      line-height: 1.15;
    }
    .lead {
      margin: 0;
      max-width: 860px;
      color: var(--muted);
      line-height: 1.95;
      font-size: 15px;
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(300px, .92fr);
      gap: 18px;
      align-items: start;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 24px;
      padding: 22px;
      box-shadow: var(--shadow);
    }
    .sticky { position: sticky; top: 16px; }
    .section-title {
      margin: 0 0 10px;
      font-size: 24px;
      color: #4b2938;
    }
    .sub {
      margin: 0 0 16px;
      color: var(--muted);
      line-height: 1.85;
      font-size: 14px;
    }
    .pill {
      display: inline-block;
      padding: 7px 12px;
      border-radius: 999px;
      background: #fbf0f5;
      color: #9a4871;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    .row.one { grid-template-columns: 1fr; }
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #553340;
    }
    input, select, textarea {
      width: 100%;
      padding: 14px;
      border-radius: 14px;
      border: 1px solid #ddd4da;
      background: #fff;
      font-size: 16px;
      color: var(--text);
      outline: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--gold2);
      box-shadow: 0 0 0 3px rgba(221,177,74,.12);
    }
    textarea { resize: vertical; min-height: 120px; }
    .actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    button, .button-link {
      border: none;
      border-radius: 16px;
      min-height: 52px;
      padding: 14px 18px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: .2s ease;
    }
    button:hover, .button-link:hover { transform: translateY(-1px); }
    .btn-main {
      background: linear-gradient(135deg, var(--gold1), var(--gold2));
      color: #4a2b35;
      box-shadow: 0 8px 18px rgba(221,177,74,.22);
    }
    .btn-sub {
      background: #fff;
      color: #6b5560;
      border: 1px solid #ddd4da;
    }
    .result-box {
      margin-top: 16px;
      padding: 18px;
      border-radius: 18px;
      background: #fffdf8;
      border: 1px solid #eee4c8;
      color: #35222d;
      line-height: 1.9;
      white-space: pre-line;
    }
    .hidden { display: none; }
    .grid3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 16px;
    }
    .mini {
      padding: 16px;
      border-radius: 18px;
      background: #fff;
      border: 1px solid #ece4e8;
    }
    .mini h3 {
      margin: 0 0 8px;
      font-size: 14px;
      color: #7d4f63;
    }
    .mini p {
      margin: 0;
      line-height: 1.8;
      white-space: pre-line;
      color: #4b3340;
      font-size: 14px;
    }
    .price-box {
      margin-top: 14px;
      padding: 20px;
      border-radius: 20px;
      background: linear-gradient(135deg, #fff8de, #fff);
      border: 1px solid #ecd998;
    }
    .price-title {
      font-size: 14px;
      color: #7e5e1d;
      font-weight: 700;
    }
    .price {
      margin: 8px 0;
      font-size: 34px;
      font-weight: 800;
      color: #8a6400;
    }
    .list {
      margin: 14px 0 0;
      padding-left: 18px;
      line-height: 1.9;
      color: #654d59;
    }
    .notice {
      margin-top: 14px;
      padding: 14px;
      border-radius: 16px;
      background: #faf6f8;
      border: 1px solid #ece3e8;
      line-height: 1.8;
      font-size: 13px;
      color: #7a6570;
      white-space: pre-line;
    }
    .cta {
      display: grid;
      gap: 10px;
      margin-top: 16px;
    }
    .footer {
      text-align: center;
      margin-top: 18px;
      color: #8a7480;
      font-size: 13px;
      line-height: 1.8;
    }
    @media (max-width: 980px) {
      .layout, .row, .actions, .grid3 { grid-template-columns: 1fr; }
      .sticky { position: static; }
    }
  </style>
</head>
<body>
<div class="wrap">
  <section class="hero">
    <div class="badge">PREMIUM INTEGRATED APP</div>
    <h1>MOA プレミアム統合鑑定アプリ</h1>
    <p class="lead">四柱推命、易64卦、中心カラー、九星気学、占星術をひとつに重ねて読み解く有料版専用アプリです。ひとつの占術だけではなく、複数の視点を統合して、今の答えと行動の方向性まで表示します。</p>
  </section>

  <div class="layout">
    <div class="card">
      <div class="pill">PREMIUM FORM</div>
      <h2 class="section-title">有料版入力</h2>
      <p class="sub">生年月日・出生時間・悩みをもとに、5つの占術を組み合わせた統合回答を表示します。</p>

      <div class="row">
        <div>
          <label for="name">お名前</label>
          <input id="name" type="text" placeholder="例：MOA">
        </div>
        <div>
          <label for="gender">性別</label>
          <select id="gender">
            <option value="女性">女性</option>
            <option value="男性">男性</option>
            <option value="その他">その他</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div>
          <label for="birthdate">生年月日</label>
          <input id="birthdate" type="date">
        </div>
        <div>
          <label for="birthtime">出生時間</label>
          <input id="birthtime" type="time" value="12:00">
        </div>
      </div>

      <div class="row">
        <div>
          <label for="theme">知りたいこと</label>
          <select id="theme">
            <option value="総合運">総合運</option>
            <option value="恋愛運">恋愛運</option>
            <option value="仕事運">仕事運</option>
            <option value="金運">金運</option>
            <option value="人間関係">人間関係</option>
            <option value="人生の転機">人生の転機</option>
          </select>
        </div>
        <div>
          <label for="focus">今いちばん必要な答え</label>
          <select id="focus">
            <option value="動くべきか">動くべきか</option>
            <option value="待つべきか">待つべきか</option>
            <option value="手放すべきか">手放すべきか</option>
            <option value="関係を深めるべきか">関係を深めるべきか</option>
            <option value="方向転換すべきか">方向転換すべきか</option>
          </select>
        </div>
      </div>

      <div class="row one">
        <div>
          <label for="worry">悩み・相談内容</label>
          <textarea id="worry" placeholder="例：転職のタイミング、恋愛の流れ、今の停滞の理由を知りたい"></textarea>
        </div>
      </div>

      <div class="actions">
        <button id="diagnoseBtn" class="btn-main" type="button">統合鑑定を表示する</button>
        <button id="resetBtn" class="btn-sub" type="button">リセット</button>
      </div>

      <div id="resultBox" class="result-box hidden"></div>

      <div id="detailGrid" class="grid3 hidden">
        <div class="mini"><h3>四柱推命</h3><p id="pillarText"></p></div>
        <div class="mini"><h3>易64卦</h3><p id="ekiText"></p></div>
        <div class="mini"><h3>中心カラー</h3><p id="colorText"></p></div>
        <div class="mini"><h3>九星気学</h3><p id="kyuseiText"></p></div>
        <div class="mini"><h3>占星術</h3><p id="astroText"></p></div>
        <div class="mini"><h3>相互的な答え</h3><p id="combinedText"></p></div>
        <div class="mini"><h3>今の行動指針</h3><p id="actionText"></p></div>
        <div class="mini"><h3>テーマ別メッセージ</h3><p id="themeText"></p></div>
        <div class="mini"><h3>有料版の案内</h3><p id="premiumText"></p></div>
      </div>
    </div>

    <div class="card sticky">
      <div class="pill">PREMIUM MENU</div>
      <h2 class="section-title">有料版メニュー</h2>
      <div class="price-box">
        <div class="price-title">統合鑑定</div>
        <div class="price">¥12,800</div>
        <div>四柱推命・易64卦・中心カラー・九星気学・占星術をまとめて読むプレミアム版です。</div>
      </div>
      <ul class="list">
        <li>四柱推命から見る本質と流れ</li>
        <li>易64卦から見る今の答え</li>
        <li>中心カラーから見る心の軸</li>
        <li>九星気学から見る運の傾向</li>
        <li>占星術から見る性質と強み</li>
        <li>5つを重ねた相互鑑定結果</li>
      </ul>
      <div class="cta">
        <a id="applyLink" class="button-link btn-main" href="#" target="_blank" rel="noopener noreferrer">この内容で申し込みを受ける</a>
        <a id="instagramLink" class="button-link btn-sub" href="#" target="_blank" rel="noopener noreferrer">Instagramを見る</a>
        <a id="homepageLink" class="button-link btn-sub" href="#" target="_blank" rel="noopener noreferrer">ホームページを見る</a>
      </div>
      <div class="notice">このアプリは有料版専用です。
無料版とは分けて運用しやすいように、入口・価格・鑑定内容を独立させています。</div>
    </div>
  </div>

  <div class="footer">
    © MOA Fortune App<br>
    四柱推命 × 易64卦 × 中心カラー × 九星気学 × 占星術 統合版
  </div>
</div>

<script>
const APPLY_URL = "https://example.com";
const INSTAGRAM_URL = "https://www.instagram.com/";
const HOMEPAGE_URL = "https://example.com";

document.getElementById("applyLink").href = APPLY_URL;
document.getElementById("instagramLink").href = INSTAGRAM_URL;
document.getElementById("homepageLink").href = HOMEPAGE_URL;

const stems = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const branches = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const stemNature = {
  "甲":"まっすぐ進む木の力", "乙":"しなやかに伸びる木の力", "丙":"明るく照らす火の力", "丁":"繊細に灯す火の力",
  "戊":"安定を築く土の力", "己":"育て整える土の力", "庚":"決断する金の力", "辛":"洗練する金の力",
  "壬":"広く流れる水の力", "癸":"静かに染みる水の力"
};
const branchMeaning = {
  "子":"始まりと可能性", "丑":"蓄積と準備", "寅":"勢いと挑戦", "卯":"調和と広がり",
  "辰":"転換と伸長", "巳":"直感と現実化", "午":"表現と強運", "未":"整理と成熟",
  "申":"切替と知恵", "酉":"洗練と結果", "戌":"責任と基盤", "亥":"深層と再生"
};
const colorProfiles = [
  { name:"ローズピンク", meaning:"愛情・包容力・癒し", core:"心を柔らかく開くことで運が整う色です。", action:"人との縁を大切にしながら、自分の気持ちも優先する" },
  { name:"サンゴールド", meaning:"豊かさ・自信・現実化", core:"受け取る力を高めることで結果を引き寄せる色です。", action:"遠慮を減らし、望むことをはっきり決める" },
  { name:"ラベンダー", meaning:"直感・浄化・精神性", core:"頭より感覚を整えることで答えが見える色です。", action:"休息を取り、静かな時間を確保する" },
  { name:"エメラルド", meaning:"再生・調和・本音", core:"無理をやめることで本来の流れに戻る色です。", action:"合わないものから少し距離を取る" },
  { name:"ルビーレッド", meaning:"情熱・生命力・突破力", core:"迷いを越えて前に進む勇気をくれる色です。", action:"やりたいことを先送りせず、ひとつ着手する" },
  { name:"パールホワイト", meaning:"浄化・守護・新しい始まり", core:"過去を手放し、新しい自分へ切り替える色です。", action:"不要な習慣や物を手放して余白をつくる" }
];
const kyuseiMap = {
  1:{ name:"一白水星", text:"流れを読む力と柔軟性が強い星です。焦らず水のように形を変えることで運が開きます。" },
  2:{ name:"二黒土星", text:"土台づくりと継続の力が強い星です。積み重ねるほど強みが表れます。" },
  3:{ name:"三碧木星", text:"スタートと勢いの星です。思い切りの良さが運を動かします。" },
  4:{ name:"四緑木星", text:"人との縁や広がりに強い星です。関係性の中で運が育ちます。" },
  5:{ name:"五黄土星", text:"中心性と影響力を持つ星です。自分の軸を整えることが最優先です。" },
  6:{ name:"六白金星", text:"決断力と責任感の星です。高い理想を形にする力があります。" },
  7:{ name:"七赤金星", text:"楽しさと表現の星です。魅力や言葉で流れを変えられます。" },
  8:{ name:"八白土星", text:"転換と再構築の星です。区切りをつけることで次が開きます。" },
  9:{ name:"九紫火星", text:"直感と華やかさの星です。光を当てることで本質が表に出ます。" }
};
const zodiacMap = [
  { sign:"山羊座", text:"現実的で堅実に積み上げる力があります。" },
  { sign:"水瓶座", text:"独自の発想と客観性が強みです。" },
  { sign:"魚座", text:"感受性が高く、共感の力に恵まれています。" },
  { sign:"牡羊座", text:"決断が早く、スタートの力に優れています。" },
  { sign:"牡牛座", text:"安定感があり、心地よい形をつくるのが得意です。" },
  { sign:"双子座", text:"言葉と情報の扱いに強く、流れを軽くできます。" },
  { sign:"蟹座", text:"守る力と情の深さがあり、身近な縁を大切にします。" },
  { sign:"獅子座", text:"表現力と存在感があり、前に立つことで輝きます。" },
  { sign:"乙女座", text:"分析と調整に強く、整えることで力を発揮します。" },
  { sign:"天秤座", text:"バランス感覚に優れ、人との調和を生みます。" },
  { sign:"蠍座", text:"集中力と深さがあり、本質を見抜く力があります。" },
  { sign:"射手座", text:"広い視野と前向きさで道を切り開きます。" }
];
const hexagrams = [
  { id:1, name:"乾為天", message:"大きく前進する力がある時です。主体性を持つほど流れが強まります。", advice:"自分から動く" },
  { id:2, name:"坤為地", message:"受け止めることで運が育つ時です。今は土台作りが鍵になります。", advice:"焦らず整える" },
  { id:3, name:"水雷屯", message:"始まりの混乱を越える時です。最初の不安は自然な流れです。", advice:"小さく始める" },
  { id:4, name:"山水蒙", message:"未熟さを学びに変える時です。今は知ることで流れが変わります。", advice:"学びを増やす" },
  { id:5, name:"水天需", message:"待つことに意味がある時です。急ぎすぎると流れが乱れます。", advice:"タイミングを待つ" },
  { id:6, name:"天水訟", message:"対立の中に本音があります。無理に押し通すより整えることが先です。", advice:"争いを避ける" },
  { id:7, name:"地水師", message:"方針を決めることで強くなれる時です。周囲との連携も鍵になります。", advice:"軸を決める" },
  { id:8, name:"水地比", message:"人との結びつきが答えを運ぶ時です。信頼が流れを変えます。", advice:"縁を選ぶ" },
  { id:9, name:"風天小畜", message:"少しずつ積み上げることで結果に近づく時です。", advice:"小さく継続する" },
  { id:10, name:"天沢履", message:"礼節と慎重さが運を守る時です。", advice:"丁寧に進む" },
  { id:11, name:"地天泰", message:"流れが通りやすくなる時です。調和が幸運を呼びます。", advice:"受け取る" },
  { id:12, name:"天地否", message:"停滞には意味があります。無理に押さず見直しが必要です。", advice:"一度止まる" },
  { id:13, name:"天火同人", message:"仲間や共感が力になる時です。", advice:"協力を得る" },
  { id:14, name:"火天大有", message:"持っている魅力が表に出やすい時です。", advice:"堂々と見せる" },
  { id:15, name:"地山謙", message:"控えめさがかえって運を高める時です。", advice:"謙虚でいる" },
  { id:16, name:"雷地予", message:"楽しさと勢いが運を呼びます。", advice:"気分を上げる" },
  { id:17, name:"沢雷随", message:"流れに沿うことで答えが見える時です。", advice:"自然な流れに乗る" },
  { id:18, name:"山風蠱", message:"乱れたものを整え直す時です。", advice:"修正する" },
  { id:19, name:"地沢臨", message:"近づくことで流れが変わる時です。", advice:"自分から寄る" },
  { id:20, name:"風地観", message:"一歩引いて見ることで本質がわかる時です。", advice:"俯瞰する" },
  { id:21, name:"火雷噬嗑", message:"曖昧さを断ち切る時です。", advice:"はっきり決める" },
  { id:22, name:"山火賁", message:"外見や見せ方を整えることで運が動く時です。", advice:"美しく整える" },
  { id:23, name:"山地剝", message:"不要なものが削ぎ落とされる時です。", advice:"手放す" },
  { id:24, name:"地雷復", message:"もう一度戻ることで新しい流れが始まる時です。", advice:"原点に戻る" },
  { id:25, name:"天雷无妄", message:"自然体でいることが最善の時です。", advice:"無理をしない" },
  { id:26, name:"山天大畜", message:"力を蓄えるほど次が大きく開く時です。", advice:"準備する" },
  { id:27, name:"山雷頤", message:"何を取り入れるかで未来が変わる時です。", advice:"養うものを選ぶ" },
  { id:28, name:"沢風大過", message:"負荷が大きい時です。支えを作ることが大切です。", advice:"抱え込みを減らす" },
  { id:29, name:"坎為水", message:"不安の中でも進み方を学ぶ時です。", advice:"慎重に進む" },
  { id:30, name:"離為火", message:"光を当てることで道が見える時です。", advice:"明確にする" },
  { id:31, name:"沢山咸", message:"心が動く縁に意味がある時です。", advice:"感覚を信じる" },
  { id:32, name:"雷風恒", message:"続けることで結果が育つ時です。", advice:"継続する" },
  { id:33, name:"天山遯", message:"退く勇気が必要な時です。", advice:"距離を取る" },
  { id:34, name:"雷天大壮", message:"勢いはあるが使い方が大切な時です。", advice:"力を丁寧に使う" },
  { id:35, name:"火地晋", message:"評価が上がりやすい時です。", advice:"前に出る" },
  { id:36, name:"地火明夷", message:"光を守りながら進む時です。", advice:"内側を守る" },
  { id:37, name:"風火家人", message:"身近な関係を整えることで運が動く時です。", advice:"家庭や基盤を整える" },
  { id:38, name:"火沢睽", message:"違いを認めることが答えになる時です。", advice:"無理に合わせない" },
  { id:39, name:"水山蹇", message:"進みにくい時は道を変える合図です。", advice:"迂回する" },
  { id:40, name:"雷水解", message:"緊張がほどけて動きやすくなる時です。", advice:"解放する" },
  { id:41, name:"山沢損", message:"減らすことで運が整う時です。", advice:"削る" },
  { id:42, name:"風雷益", message:"与えるほど巡って返る時です。", advice:"良いものを増やす" },
  { id:43, name:"沢天夬", message:"決断が必要な時です。", advice:"はっきり選ぶ" },
  { id:44, name:"天風姤", message:"突然の出会いや変化に意味がある時です。", advice:"偶然を活かす" },
  { id:45, name:"沢地萃", message:"集まる流れが強い時です。", advice:"人を集める" },
  { id:46, name:"地風升", message:"少しずつ上昇していく時です。", advice:"段階的に進む" },
  { id:47, name:"沢水困", message:"苦しさの中で優先順位が見える時です。", advice:"一番大事なことに絞る" },
  { id:48, name:"水風井", message:"内側の源を整える時です。", advice:"基礎を整える" },
  { id:49, name:"沢火革", message:"変革の時です。古い形を脱ぐ必要があります。", advice:"思い切って変える" },
  { id:50, name:"火風鼎", message:"器を整えるほど運が育つ時です。", advice:"自分の器を広げる" },
  { id:51, name:"震為雷", message:"衝撃が流れを変える時です。驚きの後に答えがあります。", advice:"慌てず整える" },
  { id:52, name:"艮為山", message:"止まることで見える答えがある時です。", advice:"静かに待つ" },
  { id:53, name:"風山漸", message:"ゆっくり進むことで安定する時です。", advice:"急がない" },
  { id:54, name:"雷沢帰妹", message:"感情先行に注意が必要な時です。", advice:"冷静さを保つ" },
  { id:55, name:"雷火豊", message:"一時的に大きく広がる時です。活かし方が大切です。", advice:"チャンスを掴む" },
  { id:56, name:"火山旅", message:"移動や環境変化に意味がある時です。", advice:"軽やかに動く" },
  { id:57, name:"巽為風", message:"柔らかく浸透させることで運が動く時です。", advice:"押しすぎない" },
  { id:58, name:"兌為沢", message:"楽しさと対話が鍵になる時です。", advice:"心地よさを大事にする" },
  { id:59, name:"風水渙", message:"固まりをほどくことで流れが戻る時です。", advice:"散らして整える" },
  { id:60, name:"水沢節", message:"節度を守ることで安定する時です。", advice:"やりすぎない" },
  { id:61, name:"風沢中孚", message:"真心が答えを呼ぶ時です。", advice:"誠実に向き合う" },
  { id:62, name:"雷山小過", message:"大きく出るより小さな調整が大切な時です。", advice:"細かく整える" },
  { id:63, name:"水火既済", message:"形は整っているので仕上げが大切な時です。", advice:"最後を丁寧に詰める" },
  { id:64, name:"火水未済", message:"まだ完成ではありません。これからが本番です。", advice:"途中だと受け止める" }
];
const themeAdvice = {
  "総合運":"全体運では、無理を減らして流れに合う選択を増やすことが最優先です。",
  "恋愛運":"恋愛では、相手に合わせる前に自分の本音を明確にすることが大切です。",
  "仕事運":"仕事では、継続できる形を作るほど結果につながりやすいです。",
  "金運":"金運では、入る流れより先に出る流れの整理が鍵になります。",
  "人間関係":"人間関係では、距離感の見直しが流れを変える一歩になります。",
  "人生の転機":"転機では、今の違和感を見逃さず、方向の修正を受け入れることが大切です。"
};

function sumDigits(text) {
  return String(text).replace(/[^0-9]/g, "").split("").reduce((sum, n) => sum + Number(n), 0);
}

function getPillarSummary(birthdate, birthtime) {
  const [y, m, d] = birthdate.split("-").map(Number);
  const hour = Number((birthtime || "12:00").split(":")[0]);
  const stem = stems[(y + m + d) % stems.length];
  const branch = branches[(y + m + d + hour) % branches.length];
  return {
    stem,
    branch,
    text: `命式の核は ${stem}${branch} です。\n${stemNature[stem]} と ${branchMeaning[branch]} が重なり、今は「本質に沿って動くこと」が大きな鍵になります。`
  };
}

function getHexagram(birthdate, birthtime, worry, focus) {
  const seed = sumDigits(birthdate + birthtime + worry + focus);
  return hexagrams[seed % hexagrams.length];
}

function getCenterColor(birthdate, birthtime, theme) {
  const seed = sumDigits(birthdate + birthtime + theme);
  return colorProfiles[seed % colorProfiles.length];
}

function getKyusei(birthdate) {
  const [y, m, d] = birthdate.split("-").map(Number);
  let year = y;
  if (m < 2 || (m === 2 && d < 4)) year = y - 1;
  let num = 11 - (year % 9);
  while (num > 9) num -= 9;
  while (num < 1) num += 9;
  return kyuseiMap[num];
}

function getZodiac(birthdate) {
  const [y, m, d] = birthdate.split("-").map(Number);
  const signs = [
    { m:1, d:20, idx:1 }, { m:2, d:19, idx:2 }, { m:3, d:21, idx:3 }, { m:4, d:20, idx:4 },
    { m:5, d:21, idx:5 }, { m:6, d:22, idx:6 }, { m:7, d:23, idx:7 }, { m:8, d:23, idx:8 },
    { m:9, d:23, idx:9 }, { m:10, d:24, idx:10 }, { m:11, d:23, idx:11 }, { m:12, d:22, idx:0 }
  ];
  let idx = 0;
  for (const s of signs) {
    if (m > s.m || (m === s.m && d >= s.d)) idx = s.idx;
  }
  return zodiacMap[idx];
}

function buildIntegratedAnswer(name, gender, birthdate, birthtime, theme, focus, worry) {
  const pillar = getPillarSummary(birthdate, birthtime);
  const hexagram = getHexagram(birthdate, birthtime, worry, focus);
  const color = getCenterColor(birthdate, birthtime, theme);
  const kyusei = getKyusei(birthdate);
  const zodiac = getZodiac(birthdate);

  const combinedMessages = [
    `四柱推命では「${pillar.stem}${pillar.branch}」の性質が強く、易では「${hexagram.name}」が出ています。さらに九星気学の ${kyusei.name} は、${kyusei.text} 占星術の ${zodiac.sign} は、${zodiac.text} これらを重ねると、今は本質に沿って動くほど道が開く一方で、焦りは禁物という流れです。中心カラーの ${color.name} は、${color.core}`,
    `四柱推命の本質は ${pillar.stem}${pillar.branch} に表れています。易の ${hexagram.name} は、今この瞬間の答えとして「${hexagram.advice}」を示しています。九星気学の ${kyusei.name} と占星術の ${zodiac.sign} を重ねると、今は外に答えを探すより、自分の軸を整えて選ぶことが重要です。中心カラーの ${color.name} が示すのは、内側を整えた時に現実が動くということです。`,
    `四柱推命・易・中心カラー・九星気学・占星術を重ねると、今は無理に結果を取りに行くより、流れを見極めて正しい一歩を選ぶ時です。${hexagram.name} の答え、${kyusei.name} の運の傾向、${zodiac.sign} の性質がひとつの方向を示しており、答えは自然に集約されています。`
  ];

  const actionMessages = [
    `今の${name}さんに必要なのは「${hexagram.advice}」です。そのうえで、${color.action} を意識し、${kyusei.name} の流れに合わせて土台を整えると運が動きやすくなります。`,
    `まずは ${color.action} を実践してください。${hexagram.name} は大きく動く前の姿勢を整えることを勧めています。${zodiac.sign} の性質を活かすなら、無理に合わせるより自分らしい形を守ることが大切です。`,
    `行動の優先順位は「本音を確認する → ${hexagram.advice} → ${color.action}」です。そこに ${kyusei.name} の持つ運のリズムを重ねることで、ぶれにくくなります。`
  ];

  const premiumGuide = `${name}さん向けプレミアム版では、この結果を入口にして、さらに詳しい個別鑑定へつなげられます。恋愛・仕事・人間関係・転機の時期も、同じ流れで深掘りできます。`;

  const seed = sumDigits(birthdate + birthtime + theme + focus + worry + gender);
  const combined = combinedMessages[seed % combinedMessages.length];
  const action = actionMessages[seed % actionMessages.length];
  const themeText = themeAdvice[theme] || themeAdvice["総合運"];

  const main = `${name}さんの統合鑑定結果\n\n${theme}について見ると、今いちばん大切なのは「${focus}」への答えを間違えないことです。\n\n${combined}\n\n相談内容「${worry || "今の流れ全体"}」に対しては、${hexagram.message}\n\n最終的な答えとしては、今は ${hexagram.advice} を軸にしながら、${color.core} という姿勢で進むのが最も自然です。`;

  return {
    main,
    pillar: pillar.text,
    eki: `${hexagram.id}. ${hexagram.name}\n${hexagram.message}\n答え：${hexagram.advice}`,
    color: `${color.name}\n${color.meaning}\n${color.core}`,
    kyusei: `${kyusei.name}\n${kyusei.text}`,
    astro: `${zodiac.sign}\n${zodiac.text}`,
    combined,
    action,
    themeText,
    premium: premiumGuide
  };
}

const nameEl = document.getElementById("name");
const genderEl = document.getElementById("gender");
const birthdateEl = document.getElementById("birthdate");
const birthtimeEl = document.getElementById("birthtime");
const themeEl = document.getElementById("theme");
const focusEl = document.getElementById("focus");
const worryEl = document.getElementById("worry");
const diagnoseBtn = document.getElementById("diagnoseBtn");
const resetBtn = document.getElementById("resetBtn");
const resultBox = document.getElementById("resultBox");
const detailGrid = document.getElementById("detailGrid");
const pillarText = document.getElementById("pillarText");
const ekiText = document.getElementById("ekiText");
const colorText = document.getElementById("colorText");
const kyuseiText = document.getElementById("kyuseiText");
const astroText = document.getElementById("astroText");
const combinedText = document.getElementById("combinedText");
const actionText = document.getElementById("actionText");
const themeText = document.getElementById("themeText");
const premiumText = document.getElementById("premiumText");

diagnoseBtn.addEventListener("click", () => {
  if (!birthdateEl.value) {
    alert("生年月日を入力してください。");
    return;
  }
  const name = nameEl.value.trim() || "あなた";
  const result = buildIntegratedAnswer(
    name,
    genderEl.value,
    birthdateEl.value,
    birthtimeEl.value || "12:00",
    themeEl.value,
    focusEl.value,
    worryEl.value.trim()
  );

  resultBox.textContent = result.main;
  pillarText.textContent = result.pillar;
  ekiText.textContent = result.eki;
  colorText.textContent = result.color;
  kyuseiText.textContent = result.kyusei;
  astroText.textContent = result.astro;
  combinedText.textContent = result.combined;
  actionText.textContent = result.action;
  themeText.textContent = result.themeText;
  premiumText.textContent = result.premium;

  resultBox.classList.remove("hidden");
  detailGrid.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  nameEl.value = "";
  genderEl.value = "女性";
  birthdateEl.value = "";
  birthtimeEl.value = "12:00";
  themeEl.value = "総合運";
  focusEl.value = "動くべきか";
  worryEl.value = "";
  resultBox.classList.add("hidden");
  detailGrid.classList.add("hidden");
  resultBox.textContent = "";
  pillarText.textContent = "";
  ekiText.textContent = "";
  colorText.textContent = "";
  kyuseiText.textContent = "";
  astroText.textContent = "";
  combinedText.textContent = "";
  actionText.textContent = "";
  themeText.textContent = "";
  premiumText.textContent = "";
});
</script>
</body>
</html>
