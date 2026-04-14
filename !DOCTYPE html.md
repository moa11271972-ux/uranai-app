<!DOCTYPE html>  
<html lang="ja">  
<head>  
  <meta charset="UTF-8" />  
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
  <title>MOA **占い師専用** **実占アプリ**</title>  
  <style>  
    * { box-sizing: border-box; }  
    :root {  
      --bg: #f6f6f8;  
      --card: #ffffff;  
      --line: #e8e1e6;  
      --text: #2c1d27;  
      --muted: #75606b;  
      --gold1: #f7e8b2;  
      --gold2: #ddb14a;  
      --accent: #8c4e6a;  
      --shadow: 0 14px 34px rgba(0,0,0,.06);  
      --ok: #2f9e6b;  
      --warn: #9a6a00;  
    }  
    body {  
      margin: 0;  
      font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;  
      background: var(--bg);  
      color: var(--text);  
    }  
    .wrap {  
      max-width: 1380px;  
      margin: 0 auto;  
      padding: 22px 14px 36px;  
    }  
    .hero {  
      background: linear-gradient(135deg, #fff, #fff9ec);  
      border: 1px solid var(--line);  
      border-radius: 26px;  
      padding: 26px 22px;  
      box-shadow: var(--shadow);  
      margin-bottom: 18px;  
    }  
    .badge {  
      display: inline-block;  
      padding: 8px 14px;  
      border-radius: 999px;  
      background: #fff2ca;  
      color: #8b6500;  
      font-size: 12px;  
      font-weight: 700;  
      letter-spacing: .08em;  
      margin-bottom: 12px;  
    }  
    h1 {  
      margin: 0 0 10px;  
      font-size: clamp(30px, 4vw, 46px);  
      line-height: 1.15;  
      color: #4b2b39;  
    }  
    .lead {  
      margin: 0;  
      max-width: 920px;  
      line-height: 1.9;  
      color: var(--muted);  
      font-size: 15px;  
    }  
    .layout {  
      display: grid;  
      grid-template-columns: minmax(0, 1.2fr) minmax(320px, .8fr);  
      gap: 18px;  
      align-items: start;  
    }  
    .main-col, .side-col {  
      display: grid;  
      gap: 18px;  
    }  
    .card {  
      background: var(--card);  
      border: 1px solid var(--line);  
      border-radius: 24px;  
      padding: 22px;  
      box-shadow: var(--shadow);  
    }  
    .sticky { position: sticky; top: 14px; }  
    .section-title {  
      margin: 0 0 10px;  
      font-size: 24px;  
      color: #4b2b39;  
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
    .row.thirds { grid-template-columns: repeat(3, 1fr); }  
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
      font-size: 15px;  
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
      grid-template-columns: repeat(3, 1fr);  
      gap: 12px;  
      margin-top: 16px;  
    }  
    button {  
      border: none;  
      border-radius: 16px;  
      min-height: 50px;  
      padding: 14px 18px;  
      font-size: 15px;  
      font-weight: 700;  
      cursor: pointer;  
      transition: .2s ease;  
    }  
    button:hover { transform: translateY(-1px); }  
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
    .btn-accent {  
      background: #5f3450;  
      color: #fff;  
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
      white-space: pre-line;  
      line-height: 1.8;  
      font-size: 14px;  
      color: #4b3340;  
    }  
    .side-stack { display: grid; gap: 14px; }  
    .note, .checklist {  
      padding: 16px;  
      border-radius: 18px;  
      background: #faf6f8;  
      border: 1px solid #ece3e8;  
    }  
    .note {  
      white-space: pre-line;  
      line-height: 1.8;  
      font-size: 13px;  
      color: #765f6a;  
    }  
    .checklist ul, .saved-list ul {  
      margin: 10px 0 0;  
      padding-left: 18px;  
      line-height: 1.9;  
      color: #654d59;  
    }  
    .status {  
      font-size: 12px;  
      color: var(--muted);  
      margin-top: 10px;  
      line-height: 1.8;  
    }  
    .saved-list {  
      background: #fff;  
      border: 1px solid #ece3e8;  
      border-radius: 18px;  
      padding: 16px;  
    }  
    .saved-item {  
      padding: 12px;  
      border-radius: 14px;  
      border: 1px solid #eee4e8;  
      margin-top: 10px;  
      background: #fffdfd;  
    }  
    .saved-item strong { display: block; color: #4c2d3b; margin-bottom: 6px; }  
    .footer {  
      text-align: center;  
      margin-top: 18px;  
      color: #8a7480;  
      font-size: 13px;  
      line-height: 1.8;  
    }  
    .hidden { display: none; }  
    @media (max-width: 1100px) {  
      .layout, .row, .row.thirds, .actions, .grid3 { grid-template-columns: 1fr; }  
      .sticky { position: static; }  
    }  
  </style>  
</head>  
<body>  
<div class="wrap">  
  <section class="hero">  
    <div class="badge">FORTUNE TELLER PRO TOOL</div>  
    <h1>MOA **占い師専用** **実占アプリ**</h1>  
    <p class="lead">**実際の対面鑑定やオンライン鑑定で使うための占い師専用アプリです。四柱推命、易**64**卦、中心カラー、九星気学、占星術を横断して統合結果を出し、相談メモ、提案文、保存用サマリーまでその場で整理できます。**</p>  
  </section>  
  
  <div class="layout">  
    <div class="main-col">  
      <div class="card">  
        <div class="pill">SESSION INPUT</div>  
        <h2 class="section-title">**鑑定入力**</h2>  
        <p class="sub">**鑑定対象の情報と相談内容を入れると、占術ごとの結果と統合メッセージ、占い師向けの話すポイントまで出ます。**</p>  
  
        <div class="row">  
          <div>  
            <label for="clientName">**お名前**</label>  
            <input id="clientName" type="text" placeholder="**例：田中** **花子**">  
          </div>  
          <div>  
            <label for="clientGender">**性別**</label>  
            <select id="clientGender">  
              <option value="**女性**">**女性**</option>  
              <option value="**男性**">**男性**</option>  
              <option value="**その他**">**その他**</option>  
            </select>  
          </div>  
        </div>  
  
        <div class="row thirds">  
          <div>  
            <label for="clientBirthdate">**生年月日**</label>  
            <input id="clientBirthdate" type="date">  
          </div>  
          <div>  
            <label for="clientBirthtime">**出生時間**</label>  
            <input id="clientBirthtime" type="time" value="12:00">  
          </div>  
          <div>  
            <label for="sessionTheme">**テーマ**</label>  
            <select id="sessionTheme">  
              <option value="**総合運**">**総合運**</option>  
              <option value="**恋愛運**">**恋愛運**</option>  
              <option value="**仕事運**">**仕事運**</option>  
              <option value="**金運**">**金運**</option>  
              <option value="**人間関係**">**人間関係**</option>  
              <option value="**人生の転機**">**人生の転機**</option>  
            </select>  
          </div>  
        </div>  
  
        <div class="row">  
          <div>  
            <label for="needAnswer">**相談者が求める答え**</label>  
            <select id="needAnswer">  
              <option value="**動くべきか**">**動くべきか**</option>  
              <option value="**待つべきか**">**待つべきか**</option>  
              <option value="**手放すべきか**">**手放すべきか**</option>  
              <option value="**関係を深めるべきか**">**関係を深めるべきか**</option>  
              <option value="**方向転換すべきか**">**方向転換すべきか**</option>  
            </select>  
          </div>  
          <div>  
            <label for="toneMode">**伝え方**</label>  
            <select id="toneMode">  
              <option value="**やさしく**">**やさしく**</option>  
              <option value="**はっきり**">**はっきり**</option>  
              <option value="**希望重視**">**希望重視**</option>  
              <option value="**現実重視**">**現実重視**</option>  
            </select>  
          </div>  
        </div>  
  
        <div class="row one">  
          <div>  
            <label for="clientWorry">**相談内容**</label>  
            <textarea id="clientWorry" placeholder="**例：転職すべきか、恋愛の流れ、今の停滞の理由、家族との関係など**"></textarea>  
          </div>  
        </div>  
  
        <div class="row one">  
          <div>  
            <label for="sessionMemo">**占い師メモ**</label>  
            <textarea id="sessionMemo" placeholder="**例：相談者の表情、強く反応した言葉、次回につなげたい話題など**"></textarea>  
          </div>  
        </div>  
  
        <div class="actions">  
          <button id="readBtn" class="btn-main" type="button">**実占結果を出す**</button>  
          <button id="saveBtn" class="btn-accent" type="button">**今回の要点を保存**</button>  
          <button id="resetBtn" class="btn-sub" type="button">**リセット**</button>  
        </div>  
  
        <div id="mainResult" class="result-box hidden"></div>  
  
        <div id="detailGrid" class="grid3 hidden">  
          <div class="mini"><h3>**四柱推命**</h3><p id="pillarOut"></p></div>  
          <div class="mini"><h3>**易**64**卦**</h3><p id="ekiOut"></p></div>  
          <div class="mini"><h3>**中心カラー**</h3><p id="colorOut"></p></div>  
          <div class="mini"><h3>**九星気学**</h3><p id="kyuseiOut"></p></div>  
          <div class="mini"><h3>**占星術**</h3><p id="astroOut"></p></div>  
          <div class="mini"><h3>**統合結果**</h3><p id="combinedOut"></p></div>  
          <div class="mini"><h3>**伝える時の要点**</h3><p id="talkingOut"></p></div>  
          <div class="mini"><h3>**行動提案**</h3><p id="actionOut"></p></div>  
          <div class="mini"><h3>**次回提案**</h3><p id="nextOut"></p></div>  
        </div>  
      </div>  
    </div>  
  
    <div class="side-col">  
      <div class="card sticky">  
        <div class="pill">PRACTICE SUPPORT</div>  
        <h2 class="section-title">**占い師サポート**</h2>  
        <div class="side-stack">  
          <div class="checklist">  
            <strong>**鑑定の流れ**</strong>  
            <ul>  
              <li>**相談者の悩みを一文で言い換える**</li>  
              <li>**本質** → **今の答え** → **行動提案の順で伝える**</li>  
              <li>**強い言葉のあとに安心の言葉を足す**</li>  
              <li>**最後に次回テーマを提案する**</li>  
            </ul>  
          </div>  
          <div class="note" id="supportNote">**ここには、実占結果を出したあとに占い師向けの進行メモが表示されます。**</div>  
          <div class="saved-list">  
            <strong>**保存した要点**</strong>  
            <div id="savedSessions"></div>  
          </div>  
          <div class="status">  
            **実装内容：四柱推命** / **易**64**卦** / **中心カラー** / **九星気学** / **占星術** / **統合メッセージ** / **話すポイント** / **保存メモ**  
          </div>  
        </div>  
      </div>  
    </div>  
  </div>  
  
  <div class="footer">  
    © MOA Fortune Teller Pro Tool<br>  
    **実際の鑑定現場で使うための占い師専用アプリ**  
  </div>  
</div>  
  
<script>  
const stems = **[**"**甲**","**乙**","**丙**","**丁**","**戊**","**己**","**庚**","**辛**","**壬**","**癸**"**]**;  
const branches = **[**"**子**","**丑**","**寅**","**卯**","**辰**","**巳**","**午**","**未**","**申**","**酉**","**戌**","**亥**"**]**;  
const stemNature = {  
  "**甲**":"**まっすぐ進む木の力**", "**乙**":"**しなやかに伸びる木の力**", "**丙**":"**明るく照らす火の力**", "**丁**":"**繊細に灯す火の力**",  
  "**戊**":"**安定を築く土の力**", "**己**":"**育て整える土の力**", "**庚**":"**決断する金の力**", "**辛**":"**洗練する金の力**",  
  "**壬**":"**広く流れる水の力**", "**癸**":"**静かに染みる水の力**"  
};  
const branchMeaning = {  
  "**子**":"**始まりと可能性**", "**丑**":"**蓄積と準備**", "**寅**":"**勢いと挑戦**", "**卯**":"**調和と広がり**",  
  "**辰**":"**転換と伸長**", "**巳**":"**直感と現実化**", "**午**":"**表現と強運**", "**未**":"**整理と成熟**",  
  "**申**":"**切替と知恵**", "**酉**":"**洗練と結果**", "**戌**":"**責任と基盤**", "**亥**":"**深層と再生**"  
};  
const colorProfiles = **[**  
  { name:"**ローズピンク**", meaning:"**愛情・包容力・癒し**", core:"**心を柔らかく開くことで運が整う色です。**", action:"**人との縁を大切にしながら、自分の気持ちも優先する**" },  
  { name:"**サンゴールド**", meaning:"**豊かさ・自信・現実化**", core:"**受け取る力を高めることで結果を引き寄せる色です。**", action:"**遠慮を減らし、望むことをはっきり決める**" },  
  { name:"**ラベンダー**", meaning:"**直感・浄化・精神性**", core:"**頭より感覚を整えることで答えが見える色です。**", action:"**休息を取り、静かな時間を確保する**" },  
  { name:"**エメラルド**", meaning:"**再生・調和・本音**", core:"**無理をやめることで本来の流れに戻る色です。**", action:"**合わないものから少し距離を取る**" },  
  { name:"**ルビーレッド**", meaning:"**情熱・生命力・突破力**", core:"**迷いを越えて前に進む勇気をくれる色です。**", action:"**やりたいことを先送りせず、ひとつ着手する**" },  
  { name:"**パールホワイト**", meaning:"**浄化・守護・新しい始まり**", core:"**過去を手放し、新しい自分へ切り替える色です。**", action:"**不要な習慣や物を手放して余白をつくる**" }  
**]**;  
const kyuseiMap = {  
  1:{ name:"**一白水星**", text:"**流れを読む力と柔軟性が強い星です。焦らず水のように形を変えることで運が開きます。**" },  
  2:{ name:"**二黒土星**", text:"**土台づくりと継続の力が強い星です。積み重ねるほど強みが表れます。**" },  
  3:{ name:"**三碧木星**", text:"**スタートと勢いの星です。思い切りの良さが運を動かします。**" },  
  4:{ name:"**四緑木星**", text:"**人との縁や広がりに強い星です。関係性の中で運が育ちます。**" },  
  5:{ name:"**五黄土星**", text:"**中心性と影響力を持つ星です。自分の軸を整えることが最優先です。**" },  
  6:{ name:"**六白金星**", text:"**決断力と責任感の星です。高い理想を形にする力があります。**" },  
  7:{ name:"**七赤金星**", text:"**楽しさと表現の星です。魅力や言葉で流れを変えられます。**" },  
  8:{ name:"**八白土星**", text:"**転換と再構築の星です。区切りをつけることで次が開きます。**" },  
  9:{ name:"**九紫火星**", text:"**直感と華やかさの星です。光を当てることで本質が表に出ます。**" }  
};  
const zodiacMap = **[**  
  { sign:"**山羊座**", text:"**現実的で堅実に積み上げる力があります。**" },  
  { sign:"**水瓶座**", text:"**独自の発想と客観性が強みです。**" },  
  { sign:"**魚座**", text:"**感受性が高く、共感の力に恵まれています。**" },  
  { sign:"**牡羊座**", text:"**決断が早く、スタートの力に優れています。**" },  
  { sign:"**牡牛座**", text:"**安定感があり、心地よい形をつくるのが得意です。**" },  
  { sign:"**双子座**", text:"**言葉と情報の扱いに強く、流れを軽くできます。**" },  
  { sign:"**蟹座**", text:"**守る力と情の深さがあり、身近な縁を大切にします。**" },  
  { sign:"**獅子座**", text:"**表現力と存在感があり、前に立つことで輝きます。**" },  
  { sign:"**乙女座**", text:"**分析と調整に強く、整えることで力を発揮します。**" },  
  { sign:"**天秤座**", text:"**バランス感覚に優れ、人との調和を生みます。**" },  
  { sign:"**蠍座**", text:"**集中力と深さがあり、本質を見抜く力があります。**" },  
  { sign:"**射手座**", text:"**広い視野と前向きさで道を切り開きます。**" }  
**]**;  
const hexagrams = **[**  
  { id:1, name:"**乾為天**", message:"**大きく前進する力がある時です。主体性を持つほど流れが強まります。**", advice:"**自分から動く**" },  
  { id:2, name:"**坤為地**", message:"**受け止めることで運が育つ時です。今は土台作りが鍵になります。**", advice:"**焦らず整える**" },  
  { id:3, name:"**水雷屯**", message:"**始まりの混乱を越える時です。最初の不安は自然な流れです。**", advice:"**小さく始める**" },  
  { id:4, name:"**山水蒙**", message:"**未熟さを学びに変える時です。今は知ることで流れが変わります。**", advice:"**学びを増やす**" },  
  { id:5, name:"**水天需**", message:"**待つことに意味がある時です。急ぎすぎると流れが乱れます。**", advice:"**タイミングを待つ**" },  
  { id:6, name:"**天水訟**", message:"**対立の中に本音があります。無理に押し通すより整えることが先です。**", advice:"**争いを避ける**" },  
  { id:7, name:"**地水師**", message:"**方針を決めることで強くなれる時です。周囲との連携も鍵になります。**", advice:"**軸を決める**" },  
  { id:8, name:"**水地比**", message:"**人との結びつきが答えを運ぶ時です。信頼が流れを変えます。**", advice:"**縁を選ぶ**" },  
  { id:9, name:"**風天小畜**", message:"**少しずつ積み上げることで結果に近づく時です。**", advice:"**小さく継続する**" },  
  { id:10, name:"**天沢履**", message:"**礼節と慎重さが運を守る時です。**", advice:"**丁寧に進む**" },  
  { id:11, name:"**地天泰**", message:"**流れが通りやすくなる時です。調和が幸運を呼びます。**", advice:"**受け取る**" },  
  { id:12, name:"**天地否**", message:"**停滞には意味があります。無理に押さず見直しが必要です。**", advice:"**一度止まる**" },  
  { id:13, name:"**天火同人**", message:"**仲間や共感が力になる時です。**", advice:"**協力を得る**" },  
  { id:14, name:"**火天大有**", message:"**持っている魅力が表に出やすい時です。**", advice:"**堂々と見せる**" },  
  { id:15, name:"**地山謙**", message:"**控えめさがかえって運を高める時です。**", advice:"**謙虚でいる**" },  
  { id:16, name:"**雷地予**", message:"**楽しさと勢いが運を呼びます。**", advice:"**気分を上げる**" },  
  { id:17, name:"**沢雷随**", message:"**流れに沿うことで答えが見える時です。**", advice:"**自然な流れに乗る**" },  
  { id:18, name:"**山風蠱**", message:"**乱れたものを整え直す時です。**", advice:"**修正する**" },  
  { id:19, name:"**地沢臨**", message:"**近づくことで流れが変わる時です。**", advice:"**自分から寄る**" },  
  { id:20, name:"**風地観**", message:"**一歩引いて見ることで本質がわかる時です。**", advice:"**俯瞰する**" },  
  { id:21, name:"**火雷噬嗑**", message:"**曖昧さを断ち切る時です。**", advice:"**はっきり決める**" },  
  { id:22, name:"**山火賁**", message:"**外見や見せ方を整えることで運が動く時です。**", advice:"**美しく整える**" },  
  { id:23, name:"**山地剝**", message:"**不要なものが削ぎ落とされる時です。**", advice:"**手放す**" },  
  { id:24, name:"**地雷復**", message:"**もう一度戻ることで新しい流れが始まる時です。**", advice:"**原点に戻る**" },  
  { id:25, name:"**天雷无妄**", message:"**自然体でいることが最善の時です。**", advice:"**無理をしない**" },  
  { id:26, name:"**山天大畜**", message:"**力を蓄えるほど次が大きく開く時です。**", advice:"**準備する**" },  
  { id:27, name:"**山雷頤**", message:"**何を取り入れるかで未来が変わる時です。**", advice:"**養うものを選ぶ**" },  
  { id:28, name:"**沢風大過**", message:"**負荷が大きい時です。支えを作ることが大切です。**", advice:"**抱え込みを減らす**" },  
  { id:29, name:"**坎為水**", message:"**不安の中でも進み方を学ぶ時です。**", advice:"**慎重に進む**" },  
  { id:30, name:"**離為火**", message:"**光を当てることで道が見える時です。**", advice:"**明確にする**" },  
  { id:31, name:"**沢山咸**", message:"**心が動く縁に意味がある時です。**", advice:"**感覚を信じる**" },  
  { id:32, name:"**雷風恒**", message:"**続けることで結果が育つ時です。**", advice:"**継続する**" },  
  { id:33, name:"**天山遯**", message:"**退く勇気が必要な時です。**", advice:"**距離を取る**" },  
  { id:34, name:"**雷天大壮**", message:"**勢いはあるが使い方が大切な時です。**", advice:"**力を丁寧に使う**" },  
  { id:35, name:"**火地晋**", message:"**評価が上がりやすい時です。**", advice:"**前に出る**" },  
  { id:36, name:"**地火明夷**", message:"**光を守りながら進む時です。**", advice:"**内側を守る**" },  
  { id:37, name:"**風火家人**", message:"**身近な関係を整えることで運が動く時です。**", advice:"**家庭や基盤を整える**" },  
  { id:38, name:"**火沢睽**", message:"**違いを認めることが答えになる時です。**", advice:"**無理に合わせない**" },  
  { id:39, name:"**水山蹇**", message:"**進みにくい時は道を変える合図です。**", advice:"**迂回する**" },  
  { id:40, name:"**雷水解**", message:"**緊張がほどけて動きやすくなる時です。**", advice:"**解放する**" },  
  { id:41, name:"**山沢損**", message:"**減らすことで運が整う時です。**", advice:"**削る**" },  
  { id:42, name:"**風雷益**", message:"**与えるほど巡って返る時です。**", advice:"**良いものを増やす**" },  
  { id:43, name:"**沢天夬**", message:"**決断が必要な時です。**", advice:"**はっきり選ぶ**" },  
  { id:44, name:"**天風姤**", message:"**突然の出会いや変化に意味がある時です。**", advice:"**偶然を活かす**" },  
  { id:45, name:"**沢地萃**", message:"**集まる流れが強い時です。**", advice:"**人を集める**" },  
  { id:46, name:"**地風升**", message:"**少しずつ上昇していく時です。**", advice:"**段階的に進む**" },  
  { id:47, name:"**沢水困**", message:"**苦しさの中で優先順位が見える時です。**", advice:"**一番大事なことに絞る**" },  
  { id:48, name:"**水風井**", message:"**内側の源を整える時です。**", advice:"**基礎を整える**" },  
  { id:49, name:"**沢火革**", message:"**変革の時です。古い形を脱ぐ必要があります。**", advice:"**思い切って変える**" },  
  { id:50, name:"**火風鼎**", message:"**器を整えるほど運が育つ時です。**", advice:"**自分の器を広げる**" },  
  { id:51, name:"**震為雷**", message:"**衝撃が流れを変える時です。驚きの後に答えがあります。**", advice:"**慌てず整える**" },  
  { id:52, name:"**艮為山**", message:"**止まることで見える答えがある時です。**", advice:"**静かに待つ**" },  
  { id:53, name:"**風山漸**", message:"**ゆっくり進むことで安定する時です。**", advice:"**急がない**" },  
  { id:54, name:"**雷沢帰妹**", message:"**感情先行に注意が必要な時です。**", advice:"**冷静さを保つ**" },  
  { id:55, name:"**雷火豊**", message:"**一時的に大きく広がる時です。活かし方が大切です。**", advice:"**チャンスを掴む**" },  
  { id:56, name:"**火山旅**", message:"**移動や環境変化に意味がある時です。**", advice:"**軽やかに動く**" },  
  { id:57, name:"**巽為風**", message:"**柔らかく浸透させることで運が動く時です。**", advice:"**押しすぎない**" },  
  { id:58, name:"**兌為沢**", message:"**楽しさと対話が鍵になる時です。**", advice:"**心地よさを大事にする**" },  
  { id:59, name:"**風水渙**", message:"**固まりをほどくことで流れが戻る時です。**", advice:"**散らして整える**" },  
  { id:60, name:"**水沢節**", message:"**節度を守ることで安定する時です。**", advice:"**やりすぎない**" },  
  { id:61, name:"**風沢中孚**", message:"**真心が答えを呼ぶ時です。**", advice:"**誠実に向き合う**" },  
  { id:62, name:"**雷山小過**", message:"**大きく出るより小さな調整が大切な時です。**", advice:"**細かく整える**" },  
  { id:63, name:"**水火既済**", message:"**形は整っているので仕上げが大切な時です。**", advice:"**最後を丁寧に詰める**" },  
  { id:64, name:"**火水未済**", message:"**まだ完成ではありません。これからが本番です。**", advice:"**途中だと受け止める**" }  
**]**;  
const themeAdvice = {  
  "**総合運**":"**全体運では、無理を減らして流れに合う選択を増やすことが最優先です。**",  
  "**恋愛運**":"**恋愛では、相手に合わせる前に自分の本音を明確にすることが大切です。**",  
  "**仕事運**":"**仕事では、継続できる形を作るほど結果につながりやすいです。**",  
  "**金運**":"**金運では、入る流れより先に出る流れの整理が鍵になります。**",  
  "**人間関係**":"**人間関係では、距離感の見直しが流れを変える一歩になります。**",  
  "**人生の転機**":"**転機では、今の違和感を見逃さず、方向の修正を受け入れることが大切です。**"  
};  
const toneGuides = {  
  "**やさしく**":"**結果を伝える時は、現状の大変さを先に受け止めてから提案に入る。**",  
  "**はっきり**":"**結論を先に一文で伝え、そのあと理由を補足する。**",  
  "**希望重視**":"**今ある可能性と伸ばせる部分を先に伝える。**",  
  "**現実重視**":"**今すぐ変えるべき点を明確にして優先順位を示す。**"  
};  
  
function sumDigits(text) {  
  return String(text).replace(/**[**^0-9**]**/g, "").split("").reduce((sum, n) => sum + Number(n), 0);  
}  
  
function getPillarSummary(birthdate, birthtime) {  
  const **[**y, m, d**]** = birthdate.split("-").map(Number);  
  const hour = Number((birthtime || "12:00").split(":")**[**0**]**);  
  const stem = stems**[**(y + m + d) % stems.length**]**;  
  const branch = branches**[**(y + m + d + hour) % branches.length**]**;  
  return {  
    stem,  
    branch,  
    text: `**命式の核は** ${stem}${branch} **です。**\n${stemNature**[**stem**]**} **と** ${branchMeaning**[**branch**]**} **が重なり、今は「本質に沿って動くこと」が大きな鍵になります。**`  
  };  
}  
  
function getHexagram(birthdate, birthtime, worry, focus) {  
  const seed = sumDigits(birthdate + birthtime + worry + focus);  
  return hexagrams**[**seed % hexagrams.length**]**;  
}  
  
function getCenterColor(birthdate, birthtime, theme) {  
  const seed = sumDigits(birthdate + birthtime + theme);  
  return colorProfiles**[**seed % colorProfiles.length**]**;  
}  
  
function getKyusei(birthdate) {  
  const **[**y, m, d**]** = birthdate.split("-").map(Number);  
  let year = y;  
  if (m < 2 || (m === 2 && d < 4)) year = y - 1;  
  let num = 11 - (year % 9);  
  while (num > 9) num -= 9;  
  while (num < 1) num += 9;  
  return kyuseiMap**[**num**]**;  
}  
  
function getZodiac(birthdate) {  
  const **[**m, d**]** = birthdate.split("-").slice(1).map(Number);  
  const signs = **[**  
    { m:1, d:20, idx:1 }, { m:2, d:19, idx:2 }, { m:3, d:21, idx:3 }, { m:4, d:20, idx:4 },  
    { m:5, d:21, idx:5 }, { m:6, d:22, idx:6 }, { m:7, d:23, idx:7 }, { m:8, d:23, idx:8 },  
    { m:9, d:23, idx:9 }, { m:10, d:24, idx:10 }, { m:11, d:23, idx:11 }, { m:12, d:22, idx:0 }  
  **]**;  
  let idx = 0;  
  for (const s of signs) {  
    if (m > s.m || (m === s.m && d >= s.d)) idx = s.idx;  
  }  
  return zodiacMap**[**idx**]**;  
}  
  
function buildSessionReading(name, gender, birthdate, birthtime, theme, focus, worry, toneMode, memo) {  
  const pillar = getPillarSummary(birthdate, birthtime);  
  const hexagram = getHexagram(birthdate, birthtime, worry, focus);  
  const color = getCenterColor(birthdate, birthtime, theme);  
  const kyusei = getKyusei(birthdate);  
  const zodiac = getZodiac(birthdate);  
  const seed = sumDigits(birthdate + birthtime + theme + focus + worry + memo + gender);  
  
  const combinedPatterns = **[**  
    `**四柱推命では「**${pillar.stem}${pillar.branch}**」の本質が強く、易では「**${hexagram.name}**」が出ています。九星気学の** ${kyusei.name} **は流れの作り方を、占星術の** ${zodiac.sign} **は性格の表れ方を示しています。これらを重ねると、今は** ${hexagram.advice} **を軸に進むのが最も自然です。中心カラーの** ${color.name} **は、**${color.core}`,  
    `**本質は** ${pillar.stem}${pillar.branch} **にあり、今の答えは** ${hexagram.name} **に出ています。**${kyusei.name} **と** ${zodiac.sign} **を合わせると、外の変化より先に内側の整え方が鍵です。**${color.name} **が示す軸を保てば、相談内容の流れは整いやすくなります。**`,  
    `**五つの占術を統合すると、今は答えを急ぐより、正しい順番で進める時です。**${hexagram.name} **の答え、**${kyusei.name} **の運の傾向、**${zodiac.sign} **の性質が同じ方向を示しており、無理を減らすほど流れが整います。**`  
  **]**;  
  
  const talkingPoints = **[**  
    `**最初に「今は** ${hexagram.advice} **の時です」と結論を伝える。**\n**次に** ${pillar.stem}${pillar.branch} **の本質をやさしく説明する。**\n**最後に** ${color.name} **の行動提案へつなぐ。**`,  
    `**相談者の悩みを一文で言い換えて共感を置く。**\n**そのあと** ${kyusei.name} **の流れと** ${zodiac.sign} **の性質を合わせて伝える。**\n**結論は短く、行動は具体的に。**`,  
    `**まず「今の停滞には意味があります」と安心を入れる。**\n**次に** ${hexagram.name} **の答えを提示する。**\n**最後に今週やることを一つだけ提案する。**`  
  **]**;  
  
  const actionPatterns = **[**  
    `${color.action} **を最優先にしてください。**\n**同時に、**${hexagram.advice} **を意識すると流れが変わりやすくなります。**`,  
    `**今の一歩は「**${hexagram.advice}**」です。**\n**その上で** ${kyusei.name} **の性質を活かし、基盤を整える行動を足してください。**`,  
    `**無理を増やすより減らす行動が有効です。**\n${themeAdvice**[**theme**]**}\n**そこに** ${color.action} **を重ねるとぶれにくくなります。**`  
  **]**;  
  
  const nextPatterns = **[**  
    `**次回は「**${theme} **の流れの続き」と「人間関係の影響」を見る提案がしやすいです。**`,  
    `**次回提案は「時期読み」か「相性」のどちらかが自然です。**`,  
    `**今回の相談が落ち着いたあとに「今後**3**か月の動き方」をテーマにすると継続につながりやすいです。**`  
  **]**;  
  
  const supportPatterns = **[**  
    `**伝え方：**${toneGuides**[**toneMode**]**}\n**相談者が不安を強く持っている場合は、改善点より先に安心材料を一つ入れる。**`,  
    `**伝え方：**${toneGuides**[**toneMode**]**}\n**強く言うより、選択肢を二つ示して本人に選ばせる形が合いやすい。**`,  
    `**伝え方：**${toneGuides**[**toneMode**]**}\n**相談者の反応を見ながら、結論**→**理由**→**行動の順で短く区切って話す。**`  
  **]**;  
  
  const combined = combinedPatterns**[**seed % combinedPatterns.length**]**;  
  const talking = talkingPoints**[**seed % talkingPoints.length**]**;  
  const action = actionPatterns**[**seed % actionPatterns.length**]**;  
  const next = nextPatterns**[**seed % nextPatterns.length**]**;  
  const support = supportPatterns**[**seed % supportPatterns.length**]**;  
  
  const main = `${name || "**相談者**"}**さんの実占結果**\n\n**テーマ：**${theme}\n**求める答え：**${focus}\n\n${combined}\n\n**相談内容「**${worry || "**全体の流れ**"}**」に対しては、**${hexagram.message}\n\n**占い師としての結論は、「**${hexagram.advice} **を軸にしつつ、**${color.core} **という姿勢で進む」が最も自然です。**`;  
  
  return {  
    main,  
    pillar: pillar.text,  
    eki: `${hexagram.id}. ${hexagram.name}\n${hexagram.message}\n**答え：**${hexagram.advice}`,  
    color: `${color.name}\n${color.meaning}\n${color.core}`,  
    kyusei: `${kyusei.name}\n${kyusei.text}`,  
    astro: `${zodiac.sign}\n${zodiac.text}`,  
    combined,  
    talking,  
    action,  
    next,  
    support,  
    saveSummary: `${name || "**相談者**"}**｜**${theme}**｜**${hexagram.name}**｜**${color.name}`  
  };  
}  
  
const clientName = document.getElementById("clientName");  
const clientGender = document.getElementById("clientGender");  
const clientBirthdate = document.getElementById("clientBirthdate");  
const clientBirthtime = document.getElementById("clientBirthtime");  
const sessionTheme = document.getElementById("sessionTheme");  
const needAnswer = document.getElementById("needAnswer");  
const toneMode = document.getElementById("toneMode");  
const clientWorry = document.getElementById("clientWorry");  
const sessionMemo = document.getElementById("sessionMemo");  
const readBtn = document.getElementById("readBtn");  
const saveBtn = document.getElementById("saveBtn");  
const resetBtn = document.getElementById("resetBtn");  
  
const mainResult = document.getElementById("mainResult");  
const detailGrid = document.getElementById("detailGrid");  
const pillarOut = document.getElementById("pillarOut");  
const ekiOut = document.getElementById("ekiOut");  
const colorOut = document.getElementById("colorOut");  
const kyuseiOut = document.getElementById("kyuseiOut");  
const astroOut = document.getElementById("astroOut");  
const combinedOut = document.getElementById("combinedOut");  
const talkingOut = document.getElementById("talkingOut");  
const actionOut = document.getElementById("actionOut");  
const nextOut = document.getElementById("nextOut");  
const supportNote = document.getElementById("supportNote");  
const savedSessions = document.getElementById("savedSessions");  
  
let latestReading = null;  
const savedItems = **[]**;  
  
function renderSaved() {  
  if (savedItems.length === 0) {  
    savedSessions.innerHTML = '<div class="note">**まだ保存はありません。**</div>';  
    return;  
  }  
  savedSessions.innerHTML = savedItems.map(item => `  
    <div class="saved-item">  
      <strong>${item.title}</strong>  
      <div>${item.memo}</div>  
    </div>  
  `).join("");  
}  
  
renderSaved();  
  
readBtn.addEventListener("click", () => {  
  if (!clientBirthdate.value) {  
    alert("**生年月日を入力してください。**");  
    return;  
  }  
  
  latestReading = buildSessionReading(  
    clientName.value.trim(),  
    clientGender.value,  
    clientBirthdate.value,  
    clientBirthtime.value || "12:00",  
    sessionTheme.value,  
    needAnswer.value,  
    clientWorry.value.trim(),  
    toneMode.value,  
    sessionMemo.value.trim()  
  );  
  
  mainResult.textContent = latestReading.main;  
  pillarOut.textContent = latestReading.pillar;  
  ekiOut.textContent = latestReading.eki;  
  colorOut.textContent = latestReading.color;  
  kyuseiOut.textContent = latestReading.kyusei;  
  astroOut.textContent = latestReading.astro;  
  combinedOut.textContent = latestReading.combined;  
  talkingOut.textContent = latestReading.talking;  
  actionOut.textContent = latestReading.action;  
  nextOut.textContent = latestReading.next;  
  supportNote.textContent = latestReading.support;  
  
  mainResult.classList.remove("hidden");  
  detailGrid.classList.remove("hidden");  
});  
  
saveBtn.addEventListener("click", () => {  
  if (!latestReading) {  
    alert("**先に実占結果を出してください。**");  
    return;  
  }  
  savedItems.unshift({  
    title: latestReading.saveSummary,  
    memo: sessionMemo.value.trim() || "**メモなし**"  
  });  
  if (savedItems.length > 8) savedItems.pop();  
  renderSaved();  
});  
  
resetBtn.addEventListener("click", () => {  
  clientName.value = "";  
  clientGender.value = "**女性**";  
  clientBirthdate.value = "";  
  clientBirthtime.value = "12:00";  
  sessionTheme.value = "**総合運**";  
  needAnswer.value = "**動くべきか**";  
  toneMode.value = "**やさしく**";  
  clientWorry.value = "";  
  sessionMemo.value = "";  
  latestReading = null;  
  mainResult.classList.add("hidden");  
  detailGrid.classList.add("hidden");  
  mainResult.textContent = "";  
  pillarOut.textContent = "";  
  ekiOut.textContent = "";  
  colorOut.textContent = "";  
  kyuseiOut.textContent = "";  
  astroOut.textContent = "";  
  combinedOut.textContent = "";  
  talkingOut.textContent = "";  
  actionOut.textContent = "";  
  nextOut.textContent = "";  
  supportNote.textContent = "**ここには、実占結果を出したあとに占い師向けの進行メモが表示されます。**";  
});  
</script>  
</body>  
</html>  
