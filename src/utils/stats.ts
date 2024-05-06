import Stats from 'three/examples/jsm/libs/stats.module';

export function initStates(type = 0) {
    const stats = Stats();
    stats.showPanel(type);
    document.body.appendChild(stats.dom);
    return stats;
}
