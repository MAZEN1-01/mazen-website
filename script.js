(() => {
    "use strict";

    const time = document.getElementById("time");
    if (time) {
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Riyadh",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
        const updateTime = () => {
            const now = new Date();
            time.textContent = formatter.format(now);
            time.dateTime = now.toISOString();
        };
        updateTime();
        setInterval(updateTime, 30000);
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) updateTime();
        });
    }

    const video = document.getElementById("background-video");
    const toggle = document.querySelector(".motion-toggle");
    if (!video || !toggle) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let wantsPlayback = !reducedMotion.matches;
    let inView = !("IntersectionObserver" in window);
    const updateButton = () => {
        const playing = !video.paused;
        toggle.textContent = playing ? "إيقاف المشهد" : "تشغيل المشهد";
        toggle.setAttribute("aria-label", playing ? "إيقاف المشهد السينمائي" : "تشغيل المشهد السينمائي");
    };
    const syncPlayback = () => {
        if (!wantsPlayback || document.hidden || !inView) {
            video.pause();
            updateButton();
            return;
        }
        const playRequest = video.play();
        if (playRequest) playRequest.catch(updateButton);
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            syncPlayback();
        }, { threshold: 0.1 });
        observer.observe(video);
    }

    toggle.hidden = false;
    video.addEventListener("play", updateButton);
    video.addEventListener("pause", updateButton);
    video.addEventListener("error", () => { toggle.hidden = true; });
    toggle.addEventListener("click", () => {
        wantsPlayback = video.paused;
        syncPlayback();
    });
    document.addEventListener("visibilitychange", syncPlayback);
    const onMotionChange = () => {
        wantsPlayback = !reducedMotion.matches;
        syncPlayback();
    };
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", onMotionChange);
    else reducedMotion.addListener(onMotionChange);
    syncPlayback();
})();
