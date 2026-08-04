function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");

    document.getElementById("clock").textContent =
        `${hours}:${minutes} ${ampm}`;
}

updateClock();

setInterval(updateClock, 1000);

/* ========================================= */
/* شاشة البداية */
/* ========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").classList.add("hide");

    }, 500);

});