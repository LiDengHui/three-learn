const measurementLength = 71200;
const viewLength = 1600;
export const SCALE = viewLength / measurementLength;

/**
 * 墙的高度
 * @type {number}
 */
export const WALL_HEIGHT = 2800 * SCALE;
/**
 * 墙的厚度
 * @type {number}
 */
export const WALL_THICKNESS = 100 * SCALE;
/**
 * 地面参数
 * @type {{end: number[], begin: number[]}}
 */
export const floor = {
    begin: {y: 0, x: 0},
    end: {y: 25200 * SCALE, x: 71200 * SCALE}
};
/**
 * 以西北方为(0,0)坐标,x 轴为 北南 轴， y 为 西东 轴
 * @type {({end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]})[]}
 */
export const walls = [
    // 外墙
    {
        type: 'external',
        begin: {y: 0, x: 0},
        end: {y: 0, x: 71200 * SCALE}
    },
    {
        type: 'external',
        begin: {y: 25200 * SCALE, x: 0},
        end: {y: 25200 * SCALE, x: 71200 * SCALE}
    },
    {
        type: 'external',
        begin: {y: 0, x: 0},
        end: {y: 25200 * SCALE, x: 0}
    },
    {
        type: 'external',
        begin: {y: 0, x: 71200 * SCALE},
        end: {y: 25200 * SCALE, x: 71200 * SCALE}
    },
    // 入户区域
    {
        type: 'glass',
        begin: {y: 8400 * SCALE, x: 0},
        end: {y: 8400 * SCALE, x: 8400 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 0, x: 8400 * SCALE},
        end: {y: 8400 * SCALE, x: 8400 * SCALE}
    },
    // 柜体区域
    {
        type: 'inner',
        begin: {y: 8400 * SCALE, x: 8400 * SCALE},
        end: {y: 8400 * SCALE, x: 12600 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 8400 * SCALE, x: 12600 * SCALE},
        end: {y: 14400 * SCALE, x: 16800 * SCALE}
    },
    // ODC 外卫生间区域
    {
        type: 'inner',
        begin: {y: 16800 * SCALE, x: 0},
        end: {y: 16800 * SCALE, x: 8400 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 16800 * SCALE, x: 8400 * SCALE},
        end: {y: 25200 * SCALE, x: 8400 * SCALE}
    },
    // ODC 外会议室区域
    {
        type: 'inner',
        begin: {y: 16800 * SCALE, x: 19200 * SCALE},
        end: {y: 16800 * SCALE, x: 26800 * SCALE}
    },
    {
        type: 'glass',
        begin: {y: 16800 * SCALE, x: 16800 * SCALE},
        end: {y: 16800 * SCALE, x: 19200 * SCALE}
    },
    {
        type: 'glass',
        begin: {y: 16800 * SCALE, x: 19200 * SCALE},
        end: {y: 25200 * SCALE, x: 19200 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 16800 * SCALE, x: 26800 * SCALE},
        end: {y: 25200 * SCALE, x: 26800 * SCALE}
    },
    // ODC 中间隔断的大墙
    {
        type: 'inner',
        begin: {y: 14400 * SCALE, x: 16800 * SCALE},
        end: {y: 14400 * SCALE, x: 36000 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 14400 * SCALE, x: 36000 * SCALE},
        end: {y: 8400 * SCALE, x: 42000 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 8400 * SCALE, x: 45600 * SCALE},
        end: {y: 8400 * SCALE, x: 49200 * SCALE}
    },
    // 会议室区域离墙
    {
        type: 'glass',
        begin: {y: 16800 * SCALE, x: 49200 * SCALE},
        end: {y: 16800 * SCALE, x: 64800 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 10800 * SCALE, x: 49200 * SCALE},
        end: {y: 10800 * SCALE, x: 64800 * SCALE}
    },
    {
        type: 'glass',
        begin: {y: 10800 * SCALE, x: 49200 * SCALE},
        end: {y: 16800 * SCALE, x: 49200 * SCALE}
    },
    {
        type: 'inner',
        begin: {y: 10800 * SCALE, x: 64800 * SCALE},
        end: {y: 16800 * SCALE, x: 64800 * SCALE}
    },
    // 内部厕所走道墙
    {
        type: 'inner',
        begin: {y: 0, x: 49200 * SCALE},
        end: {y: 8400 * SCALE, x: 49200 * SCALE}
    },
    // 尾部会议室
    {
        type: 'glass',
        begin: {y: 14400 * SCALE, x: 68000 * SCALE},
        end: {y: 25200 * SCALE, x: 66000 * SCALE}
    },
];

// 厨房参数
export const kitchenStation = {
    begin: {y: 8400 * SCALE, x0: 59200 * SCALE},
    end: {y: 8400 * SCALE, x0: 66400 * SCALE}
};

// 机器人参数
export const robotStation = {
    begin: {y: 15400 * SCALE, x0: 16800 * SCALE},
    end: {y: 15400 * SCALE, x0: 36000 * SCALE}
}
