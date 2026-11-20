// Compatibility for previously cached pages: this site is always dark.
(() => {
    document.documentElement.dataset.theme = 'dark';
    try { localStorage.removeItem('mazen-theme'); } catch (_) {}
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.theme-toggle').forEach(button => button.remove());
    });
})();
