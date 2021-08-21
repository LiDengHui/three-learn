import * as configDev from './config.dev';

import * as configProd from './config';

export default process.env.NODE_ENV === 'production' ? configProd : configDev;