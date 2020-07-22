import { API_ENDPOINT } from "../Config";
// import { API_VERSION } from '../Config'
import { ErrorHandlerHelper } from "./errorHandler";
import { SuccessHandlerHelper } from "./successHandler";
import Axios from "axios";

/**
 * ApiHelper Class - For making Api Requests
 */
export class ApiHelper {
  _portalGateway;
  _apiVersion;

  constructor() {
    this._portalGateway = API_ENDPOINT;
    this._apiVersion = '';
  }
  setHost = host => {
    this._portalGateway = host;
  };
  setApiVersion = version => {
    this._apiVersion = version;
  };
  /**
   * Fetches from the Gateway defined by the instantiated object. Accepts <T> as output object.
   * @example <caption>"/Auth/UserAccount", "/GetCurrentUser", "GET", "JWT Content"</caption>
   * @param {service} service - wanting to be access ex. "UserAuth/Auth"
   * @param {endpoint} endpoint - you wish to call ex. "/Login"
   * @param {method} mehotd - method (GET, UPDATE, DELETE, POST)
   * @param {jwt} JWT - JSON Web Token (Optional)
   * @param {queryOptions} Query - query options for "GET" methods (Optional)
   * @param {body} body - JSON body for "UPDATE, DELETE and POST" methods (Optional)
   */
  async FetchFromServer(
    service,
    endpoint,
    method,
    authenticated = false,
    queryOptions = undefined,
    body = undefined,
    jsonData: string[] = []

  ) {
    let fd = new FormData();
    for (const k in body) {
      if (body.hasOwnProperty(k)) {
        const element = body[k];
        fd.append(k, element);

      }
    }
    let url = this._portalGateway + this._apiVersion + service + endpoint;
    let headers = { "Content-Type": "application/json" };
    if (authenticated) {
      const storageSession = localStorage.getItem("token")
      headers.Authorization = storageSession;
    }
    console.log(fd, 'body')
    try {
      method = method.toLowerCase();
      let response = await Axios.request({
        method,
        url,
        data: fd,
        headers: headers,
        params: queryOptions
      });
      if (response.ok === false || response.status !== 200) {
        let errorObject = {
          code: response.status,
          data: response.data
        };

        throw errorObject;
      }
      // console.log(response.data,'response.dataresponse.data')
      // const data = new SuccessHandlerHelper(response.data);
      return response.data
      // return data.data;
    } catch (err) {
      // const errorHelper = new ErrorHandlerHelper(err.response);
      // return errorHelper.error;
    }
  }
}
