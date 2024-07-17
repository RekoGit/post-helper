// local storageからcountを取得
count = localStorage.getItem('count');

// local storageからpostsを取得
posts = JSON.parse(localStorage.getItem('posts'));

if (count >= posts.length) {
  window.alert('おつかれさまでした！');
} else {
  console.log(`${posts[count]['MM']}-${posts[count]['DD']} ${posts[count]['YYYY']} ${posts[count]['hh']}:${posts[count]['mm']} ${posts[count]['ap']} ${posts[count]['img']}`);
  body = posts[count]['body'];
  navigator.clipboard.writeText(body)
    .then(() => {
      console.log("クリップボード:" + body);
    });
}


// countをカウントアップ
count++;
// local storageに保存
localStorage.setItem('count', count);



