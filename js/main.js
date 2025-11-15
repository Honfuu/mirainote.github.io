// ハンバーガーメニューの制御
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

// お問い合わせフォームの処理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const phone = formData.get('phone') || '';
            const email = formData.get('email') || '';
            const service = formData.get('service') || '';
            const preferredDate = formData.get('preferred-date') || '';
            const message = formData.get('message') || '';
            
            // メール本文を作成
            let body = '以下の内容でお問い合わせいたします。\n\n';
            body += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            body += '【お名前】\n' + name + '\n\n';
            body += '【電話番号】\n' + phone + '\n\n';
            if (email) {
                body += '【メールアドレス】\n' + email + '\n\n';
            }
            if (service) {
                body += '【お問い合わせサービス】\n' + service + '\n\n';
            }
            if (preferredDate) {
                body += '【希望日時】\n' + preferredDate + '\n\n';
            }
            body += '【お問い合わせ内容】\n' + message + '\n';
            body += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            
            // 件名を作成
            const subject = encodeURIComponent('【みらいのて】お問い合わせ');
            const bodyEncoded = encodeURIComponent(body);
            
            // mailtoリンクを作成
            const mailtoLink = `mailto:mirainote.0416@icloud.com?subject=${subject}&body=${bodyEncoded}`;
            
            // メールクライアントを開く
            window.location.href = mailtoLink;
        });
    }
}); 
