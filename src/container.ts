import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { ApiService } from './common/services/ApiService';
import { AuthService } from './common/services/AuthService';
import { HttpService } from './common/services/HttpService';
import { CONSTANTS } from './constants';

const container = new Container();
container.bind<HttpService>(HttpService).to(HttpService);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<ApiService>(ApiService).to(ApiService);
container.bind<string>(CONSTANTS.ApiRoot).toConstantValue('https://localhost:8443/api');
container.bind<string>(CONSTANTS.AuthRoot).toConstantValue('https://localhost:8443/auth');

const { lazyInject } = getDecorators(container);

export { container, lazyInject };

