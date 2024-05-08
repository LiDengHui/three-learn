import config from '../../config';
export const resource = (url: string) => {
    return `${config.publicPath}${url}`;
};

export const getData = async (url: string) => {
    return fetch(resource(url)).then((res) => res.json());
};
