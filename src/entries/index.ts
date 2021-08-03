// @ts-expect-error
const componentsContext = require.context('./', true, /.ts$/);
const maps = [];
componentsContext.keys().forEach((filePath) => {
    // 获取文件中的 default 模块
    const filename = filePath.replace(
        /.\/(\w+)(\.html|\.ts)$/,
        (rs, $1, $2) => $1
    );

    if (filename !== 'index') {
        maps.push(filename);
    }
});

const titles = {
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
