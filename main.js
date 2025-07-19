// ハンバーガーメニュー制御
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('nav');
    const body = document.body;

    // ハンバーガーボタンのクリックイベント
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    // メニューリンクのクリック時にメニューを閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });

    // 画面外クリックでメニューを閉じる
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !nav.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
}); 
