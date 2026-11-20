(() => {
    'use strict';
    const nav = document.querySelector('.portfolio-sections');
    const photos = document.querySelector('#photos');
    const videos = document.querySelector('#videos');
    if (!nav || !photos || !videos) return;
    const controls = [...nav.querySelectorAll('[data-filter]')];
    const select = (filter) => {
        photos.hidden = filter === 'videos';
        videos.hidden = filter === 'photos';
        videos.classList.toggle('is-filtered', filter === 'videos');
        if (videos.hidden) videos.querySelectorAll('video').forEach(video => video.pause());
        for (const control of controls) {
            const selected = control.dataset.filter === filter;
            control.classList.toggle('is-selected', selected);
            if (control.tagName === 'BUTTON') control.setAttribute('aria-pressed', String(selected));
            else if (selected) control.setAttribute('aria-current', 'true');
            else control.removeAttribute('aria-current');
        }
    };
    controls.find(control => control.dataset.filter === 'all').hidden = false;
    select('all');
    nav.addEventListener('click', event => {
        const control = event.target.closest('[data-filter]');
        if (!control || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        select(control.dataset.filter);
    });
    // External hash links remain valid even after a visitor selects a filter.
    window.addEventListener('hashchange', () => {
        if (location.hash === '#photos' && photos.hidden) select('photos');
        if (location.hash === '#videos' && videos.hidden) select('videos');
    });
})();
