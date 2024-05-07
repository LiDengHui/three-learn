import config from '../../config';
export const resource = (url: string) => {
    return `${config.publicPath}/${url}`;
};
