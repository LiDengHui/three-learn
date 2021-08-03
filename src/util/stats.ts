import Stats from 'stats-js';

export function initStates() {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    return stats;
}
