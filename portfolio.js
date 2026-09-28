(() => {
    "use strict";

    const links = Array.from(document.querySelectorAll("[data-photo]"));
    const dialog = document.querySelector(".photo-dialog");
    // Image links remain usable when JavaScript or native dialogs are unavailable.
    if (!links.length || !dialog || typeof dialog.showModal !== "function") return;

    const image = dialog.querySelector(".viewer-image");
    const caption = dialog.querySelector("#viewer-caption");
    const counter = dialog.querySelector("#viewer-counter");
    const closeButton = dialog.querySelector(".viewer-close");
    let current = 0;
    let opener = null;

    const render = (index) => {
        current = (index + links.length) % links.length;
        const link = links[current];
        const thumbnail = link.querySelector("img");
        image.alt = thumbnail.alt;
        image.src = link.href;
        caption.textContent = thumbnail.alt;
        counter.textContent = `الصورة ${current + 1} من ${links.length}`;
    };

    links.forEach((link, index) => {
        link.addEventListener("click", (event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            opener = link;
            render(index);
            dialog.showModal();
            document.body.classList.add("viewer-open");
            closeButton.focus();
        });
    });
    closeButton.addEventListener("click", () => dialog.close());
    dialog.querySelector(".viewer-prev").addEventListener("click", () => render(current - 1));
    dialog.querySelector(".viewer-next").addEventListener("click", () => render(current + 1));
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            render(current + (event.key === "ArrowRight" ? 1 : -1));
        }
    });
    dialog.addEventListener("click", (event) => {
        const bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => {
        document.body.classList.remove("viewer-open");
        if (opener) opener.focus();
    });
})();
