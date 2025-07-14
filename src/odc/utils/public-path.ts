import config from '../config';
import path from 'path-browserify';

export function publicPath(url: string) {
    const result = path.join(config.publicPath, url);
    console.log(result);
    return result;
}