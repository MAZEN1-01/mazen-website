// ==========================================
// شاشة البداية
// ==========================================

// ==========================================
// شاشة البداية
// ==========================================

window.addEventListener("load", () => {

    const splash = document.getElementById("splash");
    const content = document.getElementById("content");

    setTimeout(() => {

        splash.classList.add("hide");
        content.classList.add("show");

    }, 600);

});

// ==========================================
// الساعة
// ==========================================

// ==========================================
// الساعة
// ==========================================

function updateTime() {

    const now = new Date();

    const time = now.toLocaleTimeString("en-US", {

        hour: "2-digit",

        minute: "2-digit",

        hour12: true

    });

    document.getElementById("time").textContent = time;

}

updateTime();

setInterval(updateTime, 1000);