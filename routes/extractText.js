const keywords = {
  startName: {
    index: "",
    value: "名",
  },
  birthday: {
    index: "",
    value: "生年月日",
  },
  year: {
    index: "",
    value: "年",
  },
  month: {
    index: "",
    value: "月",
  },
  day: {
    index: "",
    value: "日",
  },
  startAddress: {
    index: "",
    value: "現住所",
  },
  endAdress: {
    index: "",
    value: "(携帯電話)",
  },
  mail: {
    index: "",
    value: "E-mail",
  },
  startPhone: {
    // Plus symbol
    index: "",
    value: "+",
  },
  introduction: {
    index: "",
    value: "自己 PR",
  },
};

// const data =
//   "履歷書 2020年 05 月 03 日現在 ふりがな チャン·アイン·トゥアン-番号:12 图,女 氏 名 TRAN ANΗ TUAN 生年月日 1999 年 05 月16日生 満(21)歳 ふりがな 47/76、ヴ·シュアン·ティエウ、ロング·ビエン·ハノイ (自宅電話) 現住所 No 47/76, Vu Xuan Thieu, Long Bien, Hanoi (携帯電話) E-mail trananhtuan12a10@gmail. com +84 0981524316 ふりがな (連絡先電話) 連絡先 年 免許,資格 2019 12 日本語力試験 N3 合格 通勤時間 約 時間 分 扶養家族数 配偶者 最寄り駅 線 駅 (配偶者を除く) 有。 有。 ハハ ハハン 特技,趣味,得意科目など * ポスターデザイン、フルスタックウェブ開発 * コミック、映画、小説(フィクション/少年/ミステリー/ ) * データベース、Cプログラミング、日本語 ■PC スキル/テクニカルスキル 使用 OS 使用ソフト Windows, Ubuntu Illustrator Photoshop CS6, Microsoft Office Visual Studio Code, Eclipse, Slack, Robo 3T, Postman, SQL Server 2014 Management Studio, fE C, Java, HTML, CSS, JavaScript, NodeJS, ReactJS, SQL 使用言語 使用フレームワーク NodeJS, Bootstrap 使用 DB MongoDB, Microsoft SQL Server 2 プロジェクト一例 開発期間 2019年 10月 業務内容 役割·規模 【役割】 担当 環境·言語 等 オンラインでファーストフードを注文:制作ディレクション HTML+CSS するためのウェブサイト https://github. com/tatuan19/fooddev - (Github) スケジュール管理 JavaScript (Node JS, ReactJS) SQL (Microsoft;バックエンド開発1名 チームリーダー バックエンド開発 【チーム) 2019年12月 クオリティ管理 データベース設計 バックエンド開発 フロントエンド開発1 名 SQL Server) Web インターフェース 設計1名 ■自己 PR 私は発想力がある人ですが責任感もあって、真面目な人です。将来、上手な ITのエンジニアとして日本 で働きたいです。今、ウェブサイトのプログラミングを勉強しています。Javascript、C、HTML、 MongoDB/SQL、NodeJS を習得しています。簡素なウェブサイトを開発できます。ウェブプログラミング エンジニアになる予定です。 学校以外では工科大学の日本語のクラブで活動しています。デザイン部門で働いており、クラブのファ ンページで写真、ポスター、バナーをデザインしています。 よろしくお願いします。 3";

const extractText = async (data) => {
  // Convert all new lines to spaces
  data = data.replace(/\n/g, " ");

  keywords.startName.index = data.indexOf(keywords.startName.value);
  keywords.birthday.index = data.indexOf(keywords.birthday.value);
  keywords.year.index = data.indexOf(
    keywords.year.value,
    keywords.birthday.index + 6
  );
  keywords.month.index = data.indexOf(
    keywords.month.value,
    keywords.birthday.index + 6
  );
  keywords.day.index = data.indexOf(
    keywords.day.value,
    keywords.birthday.index + 6
  );
  keywords.startAddress.index = data.indexOf(keywords.startAddress.value);
  keywords.endAdress.index = data.indexOf(keywords.endAdress.value);
  keywords.mail.index = data.indexOf(keywords.mail.value);
  keywords.startPhone.index = data.indexOf(
    keywords.startPhone.value,
    keywords.mail.index
  );
  keywords.introduction.index = data.indexOf(keywords.introduction.value);

  // Name
  const name = data.slice(
    keywords.startName.index + 1,
    keywords.birthday.index
  );

  // Birhtday
  const year = data.slice(keywords.birthday.index + 4, keywords.year.index);
  const month = data.slice(keywords.year.index + 1, keywords.month.index);
  const day = data.slice(keywords.month.index + 1, keywords.day.index);

  const birthday = `${year}-${month}-${day}`.trim();
  const address = data.slice(
    keywords.startAddress.index + 3,
    keywords.endAdress.index
  );

  const email = data.slice(keywords.mail.index + 6, keywords.startPhone.index);
  // const email = _email.split(" ")[0];

  const _phoneNumber = data.slice(keywords.startPhone.index).trimStart();

  console.log("_phoneNumber", _phoneNumber);
  const phoneNumber = _phoneNumber.split(" ")[0];

  const introduction = data
    .slice(keywords.introduction.index + 5)
    .replace(/\s/g, "");

  console.log(keywords);

  const result = {
    name,
    birthday,
    address,
    email,
    phoneNumber,
    introduction,
  };

  for (const property in result) {
    result[property] = result[property].trim();
    console.log(`${property}: ${result[property]}`);
  }
  console.log(result);

  return result;
};
// extractText();
module.exports = extractText;
