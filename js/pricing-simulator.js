// 料金シミュレーター（料金案内ページ専用）
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.simulator-tab');
    const panels = document.querySelectorAll('.simulator-panel');

    if (tabs.length === 0) {
        return;
    }

    // タブ切り替え
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(function (p) {
                p.hidden = true;
                p.classList.remove('active');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const target = document.getElementById(tab.dataset.target);
            if (target) {
                target.hidden = false;
                target.classList.add('active');
            }
        });
    });

    // 分数プリセットボタン
    document.querySelectorAll('.simulator-preset-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const input = document.getElementById(btn.dataset.target);
            if (input) {
                input.value = btn.dataset.value;
            }
        });
    });

    // まごのてサービス：料金計算
    const mnResult = document.getElementById('mn-result');
    const mnCalcBtn = document.querySelector('[data-calc="magonote"]');
    if (mnCalcBtn) {
        mnCalcBtn.addEventListener('click', function () {
            const unitPrice = parseInt(document.getElementById('mn-plan').value, 10);
            const minutes = parseInt(document.getElementById('mn-minutes').value, 10);

            mnResult.hidden = false;

            if (!minutes || minutes <= 0) {
                mnResult.innerHTML = '<p class="simulator-error">ご利用時間を入力してください。</p>';
                return;
            }

            const units = Math.ceil(minutes / 30);
            const price = units * unitPrice;

            mnResult.innerHTML =
                '<p class="simulator-price">概算料金：<strong>' + price.toLocaleString() + '円</strong></p>' +
                '<p class="simulator-detail">' + minutes + '分のご利用（30分単位・端数切り上げで計算）・消費税の対象外です</p>';
        });
    }

    // 福祉タクシー：距離ごとの料金表（サイト内の料金一覧と同じ値・税込）
    // 通常料金：初乗り1.1kmまで500円、以降256mごとに100円
    // 手帳割引：通常料金の9割を10円単位で切り上げ
    const TAXI_BASE_DISTANCE = 1.1;
    const TAXI_FARE_TABLE = [
        [1.1, 500, 450], [1.5, 700, 630], [2.0, 900, 810], [2.5, 1100, 990], [3.0, 1300, 1170],
        [3.5, 1500, 1350], [4.0, 1700, 1530], [4.5, 1900, 1710], [5.0, 2100, 1890], [5.5, 2300, 2070],
        [6.0, 2500, 2250], [6.5, 2700, 2430], [7.0, 2900, 2610], [7.5, 3000, 2700], [8.0, 3200, 2880],
        [8.5, 3400, 3060], [9.0, 3600, 3240], [9.5, 3800, 3420], [10.0, 4000, 3600], [10.5, 4200, 3780],
        [11.0, 4400, 3960], [11.5, 4600, 4140], [12.0, 4800, 4320], [12.5, 5000, 4500], [13.0, 5200, 4680],
        [13.5, 5400, 4860], [14.0, 5600, 5040], [14.5, 5800, 5220], [15.0, 6000, 5400], [15.5, 6200, 5580],
        [16.0, 6400, 5760], [16.5, 6600, 5940], [17.0, 6800, 6120], [17.5, 7000, 6300], [18.0, 7200, 6480],
        [18.5, 7300, 6570], [19.0, 7500, 6750], [19.5, 7700, 6930], [20.0, 7900, 7110], [20.5, 8100, 7290],
        [21.0, 8300, 7470], [21.5, 8500, 7650], [22.0, 8700, 7830], [22.5, 8900, 8010], [23.0, 9100, 8190],
        [23.5, 9300, 8370], [24.0, 9500, 8550], [24.5, 9700, 8730], [25.0, 9900, 8910], [25.5, 10100, 9090],
        [26.0, 10300, 9270], [26.5, 10500, 9450], [27.0, 10700, 9630], [27.5, 10900, 9810], [28.0, 11100, 9990],
        [28.5, 11300, 10170], [29.0, 11400, 10260], [29.5, 11600, 10440]
    ];

    const txResult = document.getElementById('tx-result');
    const txCalcBtn = document.querySelector('[data-calc="taxi"]');
    if (txCalcBtn) {
        txCalcBtn.addEventListener('click', function () {
            const distance = parseFloat(document.getElementById('tx-distance').value);
            const discount = document.getElementById('tx-discount').checked;

            txResult.hidden = false;

            if (!distance || distance <= 0) {
                txResult.innerHTML = '<p class="simulator-error">距離を入力してください。</p>';
                return;
            }

            if (distance > 29.5) {
                txResult.innerHTML = '<p class="simulator-error">29.5kmを超える場合は目安の算出ができません。お手数ですがお問い合わせください。</p>';
                return;
            }

            // 初乗り1.1km以内は初乗り料金、それを超える場合は0.5km単位で切り上げ
            const isBase = distance <= TAXI_BASE_DISTANCE;
            const rounded = isBase ? TAXI_BASE_DISTANCE : Math.ceil(distance * 2) / 2;
            const row = TAXI_FARE_TABLE.find(function (r) { return r[0] >= rounded - 0.001; });
            const price = discount ? row[2] : row[1];

            txResult.innerHTML =
                '<p class="simulator-price">概算料金：<strong>' + price.toLocaleString() + '円</strong>（税込）</p>' +
                '<p class="simulator-detail">' + distance + 'km（' +
                (isBase ? '初乗り' + TAXI_BASE_DISTANCE.toFixed(1) + 'km以内' : rounded.toFixed(1) + 'kmとして計算') + '）' +
                (discount ? '・障がい者手帳1割引適用' : '') + '</p>';
        });
    }
});
