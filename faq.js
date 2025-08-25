// FAQページのアコーディオン機能
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // 初期状態では回答を非表示
        answer.style.display = 'none';
        
        // 質問クリック時の処理
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // 他の開いているFAQを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    otherAnswer.style.display = 'none';
                    otherToggle.textContent = '+';
                    otherItem.classList.remove('active');
                }
            });
            
            // 現在のFAQの開閉
            if (isOpen) {
                answer.style.display = 'none';
                toggle.textContent = '+';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                toggle.textContent = '−';
                item.classList.add('active');
            }
        });
        
        // キーボードアクセシビリティ
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
});
