/* Flow sidebar: expose Jellyfin 12's overflow links without changing React-owned nodes. */
(() => {
    'use strict';

    if (window.FlowAllLibraries) return;
    const navSelector = 'header.MuiAppBar-root .MuiToolbar-root > .MuiStack-root:has(> a[href$="/home?tab=1"])';
    const menuSelector = '#user-view-overflow-menu';
    const owned = 'data-flow-library-link';
    const desktop = window.matchMedia('(min-width: 900px)');
    let nav = null;
    let signature = '';
    let frame = 0;
    const style = document.createElement('style');
    style.setAttribute('data-flow-all-libraries-styles', '');
    style.textContent = `
        @media (min-width: 900px) {
            header.MuiAppBar-root .flow-all-libraries > button[aria-controls="user-view-overflow-menu"] {
                display: none !important;
            }
            header.MuiAppBar-root .flow-sidebar-extra {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                text-decoration: none;
                cursor: pointer;
            }
        }
    `;
    document.head.appendChild(style);

    function clear() {
        if (nav) {
            nav.querySelectorAll(`:scope > [${owned}]`).forEach(link => link.remove());
            nav.classList.remove('flow-all-libraries');
        }
        signature = '';
    }

    function readLink(source) {
        const href = source.getAttribute('href');
        if (!href || /^\s*(javascript|vbscript|data):/i.test(href)) return null;
        const label = source.querySelector('.MuiListItemText-root')?.textContent.trim() || source.textContent.trim();
        if (!label) return null;
        const icon = source.querySelector('.MuiListItemIcon-root');
        return {
            href, label, icon,
            selected: source.classList.contains('Mui-selected'),
            target: source.getAttribute('target') || '',
            rel: source.getAttribute('rel') || ''
        };
    }

    function refresh() {
        frame = 0;
        const current = document.querySelector(navSelector);
        if (current !== nav) {
            clear();
            nav = current;
        }
        const appearance = nav ? getComputedStyle(nav) : null;
        if (!desktop.matches || !nav || appearance.position !== 'fixed' ||
            !(parseFloat(appearance.getPropertyValue('--flow-sidebar-width')) > 0)) {
            clear();
            return;
        }
        const menu = document.querySelector(menuSelector);
        const more = nav.querySelector('button[aria-controls="user-view-overflow-menu"]');
        if (!menu || !more) {
            clear();
            return;
        }
        // Leave an already-open native menu alone until it closes.
        if (getComputedStyle(menu).visibility !== 'hidden' && menu.getAttribute('aria-hidden') !== 'true') return;
        const sources = [...menu.querySelectorAll('a.MuiMenuItem-root[href]')];
        const links = sources.map(readLink);
        if (!links.length || links.some(link => !link)) {
            clear();
            return;
        }
        const primary = new Set([...nav.querySelectorAll(`:scope > a[href]:not([${owned}])`)].map(link => link.getAttribute('href')));
        const unique = new Set(primary);
        const extra = links.filter(link => {
            if (unique.has(link.href)) return false;
            unique.add(link.href);
            return true;
        });
        const next = JSON.stringify(extra.map(link => [link.href, link.label, link.selected, link.target, link.rel, link.icon?.innerHTML]));
        if (signature === next && nav.querySelectorAll(`:scope > [${owned}]`).length === extra.length) return;
        const fragment = document.createDocumentFragment();
        for (const item of extra) {
            const link = document.createElement('a');
            link.setAttribute(owned, '');
            link.href = item.href;
            link.className = 'MuiButtonBase-root MuiButton-root MuiButton-text flow-sidebar-extra';
            if (item.selected) {
                link.classList.add('MuiButton-textPrimary');
                link.setAttribute('aria-current', 'page');
            }
            if (item.target) link.target = item.target;
            if (item.rel) link.rel = item.rel;
            if (link.target === '_blank') link.rel = `${link.rel} noopener noreferrer`.trim();
            if (item.icon) {
                const icon = document.createElement('span');
                icon.className = 'MuiButton-startIcon';
                icon.setAttribute('aria-hidden', 'true');
                item.icon.childNodes.forEach(child => icon.appendChild(child.cloneNode(true)));
                link.appendChild(icon);
            }
            link.appendChild(document.createTextNode(item.label));
            fragment.appendChild(link);
        }
        clear();
        nav.appendChild(fragment);
        nav.classList.add('flow-all-libraries');
        signature = next;
    }

    function schedule() {
        if (!frame) frame = requestAnimationFrame(refresh);
    }

    const observer = new MutationObserver(records => {
        for (const record of records) {
            const target = record.target.nodeType === Node.ELEMENT_NODE ? record.target : record.target.parentElement;
            if (target?.closest(`[${owned}]`)) continue;
            if (record.type === 'attributes' && target === nav) continue;
            if (record.type === 'childList') {
                const nodes = [...record.addedNodes, ...record.removedNodes];
                if (nodes.length && nodes.every(node => node.nodeType === Node.ELEMENT_NODE && node.hasAttribute(owned))) continue;
                if (nodes.some(node => node.nodeType === Node.ELEMENT_NODE &&
                    (node.matches(`header.MuiAppBar-root, ${menuSelector}`) || node.querySelector(`header.MuiAppBar-root, ${menuSelector}`)))) {
                    schedule();
                    return;
                }
            }
            if (target?.closest(`header.MuiAppBar-root, ${menuSelector}`)) {
                schedule();
                return;
            }
        }
    });

    function start() {
        observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true,
            attributeFilter: ['class', 'href', 'target', 'rel', 'aria-hidden'] });
        schedule();
    }
    if (document.body) start();
    else document.addEventListener('DOMContentLoaded', start, { once: true });
    desktop.addEventListener('change', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    document.addEventListener('load', schedule, true);
    window.FlowAllLibraries = {
        refresh: schedule,
        dispose() {
            observer.disconnect();
            cancelAnimationFrame(frame);
            document.removeEventListener('DOMContentLoaded', start);
            document.removeEventListener('load', schedule, true);
            desktop.removeEventListener('change', schedule);
            window.removeEventListener('hashchange', schedule);
            window.removeEventListener('popstate', schedule);
            clear();
            style.remove();
            delete window.FlowAllLibraries;
        }
    };
})();
