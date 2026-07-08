/**
 * 个人博客 - 主逻辑
 * 功能：加载文章列表、渲染 Markdown 文章、路由切换
 */

// ===========================
// 配置
// ===========================
const CONFIG = {
    articleListUrl: 'resource/article-list.json',  // 文章索引文件
    articleDir: 'resource/',                        // 文章根目录（file 字段已含子目录）
};

// ===========================
// DOM 引用
// ===========================
const articleListEl = document.getElementById('articleList');
const mainContentEl = document.getElementById('mainContent');
const welcomeEl = document.getElementById('welcome');
const articleEl = document.getElementById('article');
const articleTitleEl = document.getElementById('articleTitle');
const articleMetaEl = document.getElementById('articleMeta');
const articleBodyEl = document.getElementById('articleBody');

// ===========================
// 状态
// ===========================
let articles = [];
let currentArticleId = null;

// ===========================
// 初始化
// ===========================
document.addEventListener('DOMContentLoaded', async () => {
    initThemeToggle();
    initSidebarToggle();
    await Promise.all([
        loadArticleList(),
        loadGitHubProfile(),
    ]);
    handleInitialRoute();
});

// ===========================
// 主题切换（白天 / 黑夜）
// ===========================
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const iconEl = document.getElementById('themeIcon');
    if (!toggleBtn) return;

    // 从 localStorage 恢复主题，默认白天
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (iconEl) iconEl.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            if (iconEl) iconEl.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (iconEl) iconEl.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ===========================
// 侧栏折叠/展开
// ===========================
function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    if (!toggleBtn) return;

    // 从 localStorage 恢复折叠状态
    const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (collapsed) {
        document.body.classList.add('sidebar-collapsed');
        toggleBtn.innerHTML = '▶';
    }

    toggleBtn.addEventListener('click', () => {
        const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
        toggleBtn.innerHTML = isCollapsed ? '▶' : '◀';
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
}

// ===========================
// 加载 GitHub 用户信息
// ===========================
async function loadGitHubProfile() {
    const username = 'Eastern-Leaf';
    const avatarEl = document.getElementById('githubAvatar');
    const usernameEl = document.getElementById('githubUsername');

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (avatarEl) {
            avatarEl.src = data.avatar_url;
            avatarEl.alt = `${data.login}的头像`;
        }
        if (usernameEl) {
            usernameEl.textContent = data.login;
        }
    } catch (err) {
        console.error('加载 GitHub 用户信息失败:', err);
        // 降级：使用默认头像
        if (avatarEl) {
            avatarEl.src = `https://github.com/${username}.png`;
            avatarEl.alt = `${username}的头像`;
        }
    }
}

// ===========================
// 加载文章列表
// ===========================
async function loadArticleList() {
    try {
        const response = await fetch(CONFIG.articleListUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        articles = (await response.json()).sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        renderArticleList();
    } catch (err) {
        console.error('加载文章列表失败:', err);
        articleListEl.innerHTML = `
            <li style="padding:20px;color:rgba(255,255,255,0.5);font-size:0.85rem;">
                ⚠️ 无法加载文章列表<br>
                <small>请确认 resource/article-list.json 文件存在</small>
            </li>`;
    }
}

// ===========================
// 渲染左侧文章列表
// ===========================
function renderArticleList() {
    if (articles.length === 0) {
        articleListEl.innerHTML = `
            <li style="padding:20px;color:rgba(255,255,255,0.5);font-size:0.85rem;">
                📭 暂无文章
            </li>`;
        return;
    }

    articleListEl.innerHTML = articles.map((article, index) => `
        <li>
            <a data-id="${article.id}" data-index="${index}" class="${article.id === currentArticleId ? 'active' : ''}">
                ${article.title}
                <span class="article-date">${formatDate(article.date)}</span>
            </a>
        </li>
    `).join('');

    // 绑定点击事件
    articleListEl.querySelectorAll('a[data-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.dataset.id;
            loadArticle(id);
        });
    });
}

// ===========================
// 加载并渲染文章
// ===========================
async function loadArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) {
        showError('文章不存在');
        return;
    }

    // 更新侧栏激活状态
    currentArticleId = id;
    articleListEl.querySelectorAll('a[data-id]').forEach(a => {
        a.classList.toggle('active', a.dataset.id === id);
    });

    // 显示加载状态
    showLoading();

    try {
        const response = await fetch(`${CONFIG.articleDir}${article.file}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const mdText = await response.text();

        // 用 marked 解析 Markdown
        const htmlContent = marked.parse(mdText);

        // 渲染文章
        articleTitleEl.textContent = article.title;
        articleMetaEl.innerHTML = `
            <span>📅 ${formatDate(article.date)}</span>
            ${article.tags ? `<span>🏷️ ${article.tags.map(t => `<em>${t}</em>`).join(' ')}</span>` : ''}
        `;
        articleBodyEl.innerHTML = htmlContent;

        // 切换显示
        welcomeEl.style.display = 'none';
        articleEl.style.display = '';

        // 滚动到顶部
        mainContentEl.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 更新 URL hash
        window.location.hash = id;

    } catch (err) {
        console.error('加载文章失败:', err);
        showError(`无法加载文章「${article.title}」，请确认文件 ${article.file} 存在。`);
    }
}

// ===========================
// 初始路由：URL hash 或第一篇文章
// ===========================
function handleInitialRoute() {
    const hash = window.location.hash.slice(1);
    if (hash && articles.some(a => a.id === hash)) {
        loadArticle(hash);
    }
    // 否则显示欢迎页，等待用户选择
}

// 监听浏览器前进/后退
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && articles.some(a => a.id === hash)) {
        loadArticle(hash);
    } else if (!hash) {
        showWelcome();
    }
});

// ===========================
// 辅助函数
// ===========================
function showWelcome() {
    currentArticleId = null;
    welcomeEl.style.display = '';
    articleEl.style.display = 'none';
    articleListEl.querySelectorAll('a[data-id]').forEach(a => a.classList.remove('active'));
}

function showLoading() {
    welcomeEl.style.display = 'none';
    articleEl.style.display = '';
    articleTitleEl.textContent = '加载中...';
    articleMetaEl.innerHTML = '';
    articleBodyEl.innerHTML = '<p style="color:#999;">⏳ 正在加载文章...</p>';
}

function showError(msg) {
    welcomeEl.style.display = 'none';
    articleEl.style.display = '';
    articleTitleEl.textContent = '出错了';
    articleMetaEl.innerHTML = '';
    articleBodyEl.innerHTML = `<p style="color:#e74c3c;">${msg}</p>`;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
