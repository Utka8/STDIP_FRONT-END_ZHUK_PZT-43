// --- WINDOW ---
let secondsOnPage = 0;
setInterval(() => {
    secondsOnPage++;
    const counterElem = document.getElementById('timer-counter');
    if (counterElem) counterElem.textContent = secondsOnPage;
}, 1000);

function startAlertTimer() {
    window.setTimeout(() => {
        alert('Прошло 3 секунды (window.setTimeout)!');
    }, 3000);
}

let winChild = null;
function openChildWindow() {
    winChild = window.open('', '_blank', 'width=400,height=300');
    winChild.document.write('<h3>Дочернее окно BOM</h3><p>Привет из главного окна!</p>');
}
function closeChildWindow() {
    if (winChild && !winChild.closed) {
        winChild.close();
    } else {
        alert('Дочернее окно уже закрыто или не было открыто.');
    }
}

function showPromptDialog() {
    let userName = window.prompt('Как вас зовут?', 'Гость');
    if (userName) {
        document.getElementById('greeting-output').textContent = `Приветствую, ${userName}! (Использован window.prompt)`;
    }
}

// --- LOCATION ---
function showLocationInfo() {
    let info = `
href: ${window.location.href}
protocol: ${window.location.protocol}
host: ${window.location.host}
pathname: ${window.location.pathname}
search: ${window.location.search}
    `.trim();
    document.getElementById('location-info-output').textContent = info;
}

function redirectToSite(url) {
    if (confirm(`Перейти на ${url}?`)) {
        window.location.href = url;
    }
}

function applyUrlFilter() {
    let val = document.getElementById('filter-input').value;
    let url = new URL(window.location);
    url.searchParams.set('category', val);
    window.history.pushState({}, '', url);
    checkUrlParams();
}

function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
        document.getElementById('url-params-output').textContent = `Активный фильтр из URL: ${category}`;
    }
}
window.onload = checkUrlParams;

// --- NAVIGATOR ---
function showNavigatorInfo() {
    let info = `
appName: ${navigator.appName}
appVersion: ${navigator.appVersion}
platform: ${navigator.platform}
language: ${navigator.language}
userAgent: ${navigator.userAgent}
    `.trim();
    document.getElementById('navigator-output').textContent = info;
}

function updateNetworkStatus() {
    const statusElem = document.getElementById('network-status');
    if (navigator.onLine) {
        statusElem.textContent = 'Онлайн (Интернет есть)';
        statusElem.style.color = 'green';
    } else {
        statusElem.textContent = 'Офлайн (Нет сети)';
        statusElem.style.color = 'red';
    }
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

function getGeoLocation() {
    const geoOut = document.getElementById('geo-output');
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                geoOut.textContent = `Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`;
            },
            (error) => {
                geoOut.textContent = `Ошибка получения геолокации: ${error.message}`;
            }
        );
    } else {
        geoOut.textContent = 'Геолокация не поддерживается вашим браузером.';
    }
}

// --- HISTORY ---
document.getElementById('history-length').textContent = window.history.length;

// --- SCREEN ---
function showScreenDashboard() {
    let info = `
width x height: ${window.screen.width} x ${window.screen.height}
availWidth x availHeight: ${window.screen.availWidth} x ${window.screen.availHeight}
colorDepth: ${window.screen.colorDepth} бит
pixelDepth: ${window.screen.pixelDepth} бит
    `.trim();
    document.getElementById('screen-output').textContent = info;

    let width = window.screen.width;
    let deviceAlert = document.getElementById('device-type-alert');
    if (width < 768) {
        deviceAlert.textContent = 'Тип устройства: Мобильный телефон / Смартфон';
        deviceAlert.style.color = '#e74c3c';
    } else if (width < 1024) {
        deviceAlert.textContent = 'Тип устройства: Планшет';
        deviceAlert.style.color = '#e67e22';
    } else {
        deviceAlert.textContent = 'Тип устройства: Настольный ПК (Desktop)';
        deviceAlert.style.color = '#27ae60';
    }
}