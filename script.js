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

})();
