let count = 0;
let posts = [];
let body = '';

// クリップボードの内容を取得
const regex = /(\d+)\/(\d+)\/(\d+)\(([^)]+)\)\s*(AM|PM)(\d+):(\d+)/;
let match;
navigator.clipboard.readText()
  .then((text) => {
    let post = {};
    let img = '';

    // textの文字列から"予約設定"で始まる文字の位置を取得し、配列に格納
    let rs = [...text.matchAll(/予約設定/g)];
    i_sch = 0
    i_body = 0
    i_img = 0
    for (r in rs) {
      post = {};
      img = '';

      i_sch = rs[r].index;
      match = text.substring(i_sch).match(regex);
      if (match) {
        post['YYYY'] = match[1];
        post['MM'] = match[2];
        post['DD'] = match[3];
        post['ap'] = match[5];
        post['hh'] = match[6];
        post['mm'] = match[7];
      } else {
        post['YYYY'] = text.substring(i_sch + 5, i_sch + 9);
        post['MM'] = text.substring(i_sch + 10, i_sch + 12);
        post['DD'] = text.substring(i_sch + 13, i_sch + 15);
        post['ap'] = text.substring(i_sch + 19, i_sch + 21);
        post['hh'] = text.substring(i_sch + 21, i_sch + 23);
        post['mm'] = text.substring(i_sch + 24, i_sch + 26);
      }

      i_body = text.indexOf("###Twitter本文ココから###", i_sch) + 19;
      i_img = text.indexOf("###Twitter本文ココまで###", i_body);
      post['body'] = text.substring(i_body, i_img).replace(/\n/g, '');
      img = text.substring(i_img + 56, i_img + 80);

      // imgにjpgの文字が見つかればそこまで切る。なければブランクにする。
      if (img.indexOf('jpg') > 0) {
        post['img'] = img.substring(0, img.indexOf('jpg') + 3)
      } else {
        post['img'] = ''
      }
      posts.push(post);
    }
    console.log(posts);

    // local stroageに保存
    // chrome.storage.local.clear();
    // chrome.storage.local.set({'count': 0}, function () {
    // });
    // chrome.storage.local.set({'posts': JSON.stringify(posts)}, function () {
    // });



    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('count', 0);

  })



