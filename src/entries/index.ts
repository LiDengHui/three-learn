// @ts-expect-error
const componentsContext = require.context('./', true, /.ts$/);
const maps: string[] = [];

componentsContext.keys().forEach((filePath: string) => {
    // 获取文件中的 default 模块
    const filename = filePath.replace(
        /.\/(\w+)(\.html|\.ts)$/,
        (rs, $1, $2) => $1
    );

    if (filename !== 'index') {
        maps.push(filename);
    }
});

const titles: Record<string, string> = {
    demo01: '基础图形',
    demo02: '增加物体',
    demo03: '雾化',
    demo04: '材质覆盖',
    demo05: '自定义几何体',
    demo06: '照相机',
    demo07: '环境光',
    demo08: '点光源',
    demo09: '聚光灯',
    demo10: '方向光/太阳光',
    demo11: '半球光',
    demo12: '隧道跑车',
    demo13: 'ODC',
    demo14: 'Eath 地球',
    demo15: '雷达图',
    demo16: '雷达扩散图',
    demo17: '雷达扫描图',
    demo18: '地图勾勒',
    demo19: '地图围栏',
    demo20: '地图动态围栏',
    demo21: '热力图',
};
document.body.innerHTML = `
        <ul>
            ${maps
                .map(
                    (filename) =>
                        `<li><a href="${'./' + filename + '.html'}">
                        ${filename + ' ' + (titles[filename] || '')}
                        </a></li>`
                )
                .join('')}
        </ui>
    `;
