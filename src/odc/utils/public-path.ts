import config from '../config';
import path from 'path-browserify';

export function publicPath(url: string) {
    return path.join(config.publicPath, url);
}