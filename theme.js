(() => {
    "use strict";
    const key = "mazen-theme";
    const root = document.documentElement;
    let theme = "dark";
    try {
        const saved = localStorage.getItem(key);
        if (saved === "light" || saved === "dark") theme = saved;
    } catch (_) { /* Theme still works when storage is unavailable. */ }
    root.dataset.theme = theme;

    const update = () => {
        root.dataset.theme = theme;
        const label = theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن";
        document.querySelectorAll(".theme-toggle").forEach(button => {
            button.hidden = false;
            button.setAttribute("aria-label", label);
            button.setAttribute("title", label);
            button.querySelector(".theme-label").textContent = theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن";
        });
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === "dark" ? "#11120f" : "#f4f1e9";
    };
    document.addEventListener("DOMContentLoaded", () => {
        update();
        document.querySelectorAll(".theme-toggle").forEach(button => {
            button.addEventListener("click", () => {
                theme = theme === "dark" ? "light" : "dark";
                try { localStorage.setItem(key, theme); } catch (_) {}
                update();
            });
        });
    });
    window.addEventListener("storage", event => {
        if (event.key === key || event.key === null) {
            theme = event.newValue === "light" ? "light" : "dark";
            update();
        }
    });
})();
