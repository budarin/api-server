import OAuthModel from './model';
import OAuthServerConfig from './server.config';

export default {
    model: OAuthModel,
    ...OAuthServerConfig
};
