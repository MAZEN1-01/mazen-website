(() => {
    'use strict';
    const grid = document.querySelector('.photo-grid');
    const videoGrid = document.querySelector('.video-grid');
    const dialog = document.querySelector('.photo-dialog');
    let current = 0;
    let opener = null;
    const links = () => Array.from(document.querySelectorAll('[data-photo]'));
    const render = (index) => {
        const photos = links();
        current = (index + photos.length) % photos.length;
        const link = photos[current];
        const thumbnail = link.querySelector('img');
        const image = dialog.querySelector('.viewer-image');
        image.alt = thumbnail.alt;
        image.src = link.href;
        dialog.querySelector('#viewer-caption').textContent = thumbnail.alt;
        dialog.querySelector('#viewer-counter').textContent = `الصورة ${current + 1} من ${photos.length}`;
    };
    if (dialog && typeof dialog.showModal === 'function') {
        grid.addEventListener('click', event => {
            const link = event.target.closest('[data-photo]');
            if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            opener = link;
            render(links().indexOf(link));
            dialog.showModal();
            document.body.classList.add('viewer-open');
            dialog.querySelector('.viewer-close').focus();
        });
        dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
        dialog.querySelector('.viewer-prev').addEventListener('click', () => render(current - 1));
        dialog.querySelector('.viewer-next').addEventListener('click', () => render(current + 1));
        dialog.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                render(current + (event.key === 'ArrowRight' ? 1 : -1));
            }
        });
        dialog.addEventListener('click', event => {
            const bounds = dialog.getBoundingClientRect();
            if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
        });
        dialog.addEventListener('close', () => {
            document.body.classList.remove('viewer-open');
            opener?.focus();
        });
    }
    // Static files remain the source of truth; GitHub Pages needs no server or database.
    const loadWorks = async () => {
        const response = await fetch('content/works.json', { cache: 'no-cache' });
        if (response.status === 404) return;
        if (!response.ok) throw new Error('manifest');
        const data = await response.json();
        if (!Array.isArray(data.items)) throw new Error('manifest');
        const photos = document.createDocumentFragment();
        const videos = document.createDocumentFragment();
        const seen = new Set();
        for (const item of [...data.items].reverse()) {
            if (!item || !['photo', 'video'].includes(item.type) || typeof item.title !== 'string' || typeof item.src !== 'string' || seen.has(item.src)) continue;
            // Only local uploaded media are accepted; no injected markup or external URLs.
            const extensions = item.type === 'photo' ? /\.(jpe?g|png|webp)$/i : /\.(mp4|webm)$/i;
            if (!/^assets\/uploads\/[a-zA-Z0-9_-]+\.[a-z0-9]+$/i.test(item.src) || !extensions.test(item.src)) continue;
            seen.add(item.src);
            const figure = document.createElement('figure');
            figure.className = item.type === 'photo' ? 'photo-card' : 'video-card';
            const title = item.title.slice(0, 120);
            if (item.type === 'photo') {
                const anchor = document.createElement('a');
                anchor.href = item.src;
                anchor.className = 'photo-link';
                anchor.dataset.photo = '';
                anchor.setAttribute('aria-label', `عرض الصورة: ${title}`);
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = title;
                img.loading = 'lazy';
                img.decoding = 'async';
                const zoom = document.createElement('span');
                zoom.className = 'photo-zoom';
                zoom.textContent = '+';
                zoom.setAttribute('aria-hidden', 'true');
                anchor.append(img, zoom);
                figure.append(anchor);
            } else {
                const video = document.createElement('video');
                video.src = item.src;
                video.controls = true;
                video.playsInline = true;
                video.preload = 'metadata';
                video.setAttribute('aria-label', title);
                const fallback = document.createElement('a');
                fallback.href = item.src;
                fallback.textContent = 'فتح المقطع مباشرة';
                video.append(fallback);
                figure.append(video);
            }
            const caption = document.createElement('figcaption');
            const label = document.createElement('span');
            label.textContent = title;
            const signature = document.createElement('span');
            signature.lang = 'en';
            signature.textContent = 'MAZEN';
            caption.append(label, signature);
            figure.append(caption);
            (item.type === 'photo' ? photos : videos).append(figure);
        }
        grid.prepend(photos);
        videoGrid.prepend(videos);
        document.querySelector('#photo-count').textContent = grid.children.length;
        document.querySelector('#video-count').textContent = videoGrid.children.length;
    };
    loadWorks().catch(() => {
        const status = document.querySelector('#works-status');
        status.textContent = 'تعذّر تحميل الأعمال المضافة حديثًا. يمكنك تحديث الصفحة للمحاولة مجددًا.';
        status.hidden = false;
    });
    document.addEventListener('play', event => {
        if (event.target.tagName === 'VIDEO') document.querySelectorAll('video').forEach(video => { if (video !== event.target) video.pause(); });
    }, true);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause());
    });
})();
