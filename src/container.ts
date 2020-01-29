import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { ApiService } from "./common/services/ApiService";
import { AuthService } from "./common/services/AuthService";
import { HttpService } from "./common/services/HttpService";

const container = new Container();
container.bind<HttpService>(HttpService).to(HttpService);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<ApiService>(ApiService).to(ApiService);

const { lazyInject } = getDecorators(container);

export { container, lazyInject };

