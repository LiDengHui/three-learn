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
    begin: [0, 0],
    end: [25200 * SCALE, 71200 * SCALE],
};
/**
 * 以西北方为(0,0)坐标,x 轴为 北南 轴， y 为 西东 轴
 * @type {({end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]}|{end: number[], type: string, begin: number[]})[]}
 */
export const walls = [
    // 外墙
    {
        type: 'external',
        begin: [0, 0],
        end: [0, 71200 * SCALE],
    },
    {
        type: 'external',
        begin: [25200 * SCALE, 0],
        end: [25200 * SCALE, 71200 * SCALE],
    },
    {
        type: 'external',
        begin: [0, 0],
        end: [25200 * SCALE, 0],
    },
    {
        type: 'external',
        begin: [0, 71200 * SCALE],
        end: [25200 * SCALE, 71200 * SCALE],
    },
    // 入户区域
    {
        type: 'glass',
        begin: [8400 * SCALE, 0],
        end: [8400 * SCALE, 8400 * SCALE],
    },
    {
        type: 'inner',
        begin: [0, 8400 * SCALE],
        end: [8400 * SCALE, 8400 * SCALE],
    },
    // 柜体区域
    {
        type: 'inner',
        begin: [8400 * SCALE, 8400 * SCALE],
        end: [8400 * SCALE, 12600 * SCALE],
    },
    {
        type: 'inner',
        begin: [8400 * SCALE, 12600 * SCALE],
        end: [14400 * SCALE, 16800 * SCALE],
    },
    // ODC 外卫生间区域
    {
        type: 'inner',
        begin: [16800 * SCALE, 0],
        end: [16800 * SCALE, 8400 * SCALE],
    },
    {
        type: 'inner',
        begin: [16800 * SCALE, 8400 * SCALE],
        end: [25200 * SCALE, 8400 * SCALE],
    },
    // ODC 外会议室区域
    {
        type: 'inner',
        begin: [16800 * SCALE, 19200 * SCALE],
        end: [16800 * SCALE, 26800 * SCALE],
    },
    {
        type: 'glass',
        begin: [16800 * SCALE, 16800 * SCALE],
        end: [16800 * SCALE, 19200 * SCALE],
    },
    {
        type: 'glass',
        begin: [16800 * SCALE, 19200 * SCALE],
        end: [25200 * SCALE, 19200 * SCALE],
    },
    {
        type: 'inner',
        begin: [16800 * SCALE, 26800 * SCALE],
        end: [25200 * SCALE, 26800 * SCALE],
    },
    // ODC 中间隔断的大墙
    {
        type: 'inner',
        begin: [14400 * SCALE, 16800 * SCALE],
        end: [14400 * SCALE, 36000 * SCALE],
    },
    {
        type: 'inner',
        begin: [14400 * SCALE, 36000 * SCALE],
        end: [8400 * SCALE, 42000 * SCALE],
    },
    {
        type: 'inner',
        begin: [8400 * SCALE, 45600 * SCALE],
        end: [8400 * SCALE, 49200 * SCALE],
    },
    // 会议室区域离墙
    {
        type: 'glass',
        begin: [16800 * SCALE, 49200 * SCALE],
        end: [16800 * SCALE, 64800 * SCALE],
    },
    {
        type: 'inner',
        begin: [10800 * SCALE, 49200 * SCALE],
        end: [10800 * SCALE, 64800 * SCALE],
    },
    {
        type: 'glass',
        begin: [10800 * SCALE, 49200 * SCALE],
        end: [16800 * SCALE, 49200 * SCALE],
    },
    {
        type: 'inner',
        begin: [10800 * SCALE, 64800 * SCALE],
        end: [16800 * SCALE, 64800 * SCALE],
    },
    // 内部厕所走道墙
    {
        type: 'inner',
        begin: [0, 49200 * SCALE],
        end: [8400 * SCALE, 49200 * SCALE],
    },
    // 尾部会议室
    {
        type: 'glass',
        begin: [14400 * SCALE, 68000 * SCALE],
        end: [25200 * SCALE, 66000 * SCALE],
    },
];

// 厨房参数
export const kitchenStation = {
    begin: [8400 * SCALE, 59200 * SCALE],
    end: [8400 * SCALE, 66400 * SCALE],
};

// 机器人参数
export const robotStation = {
    begin: [15400 * SCALE, 16800 * SCALE],
    end: [15400 * SCALE, 36000 * SCALE],
};
