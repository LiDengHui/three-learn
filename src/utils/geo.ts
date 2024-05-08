import d3geo, { geoMercator, GeoProjection } from 'd3-geo';

let geoFun: GeoProjection;
export function initGeoFun(size: number) {
    //放大倍数
    geoFun = geoMercator().scale(size || 100);
}

export const latlng2px = (pos: number[]) => {
    if (pos[0] >= -180 && pos[0] <= 180 && pos[1] >= -90 && pos[1] <= 90) {
        return geoFun(pos as [number, number]);
    }
    return pos;
};
