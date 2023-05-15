import {
  CLIENT_ID,
  RESPONSE_TYPE,
  REDIRECT_URI,
  URL_API_AUTH,
  SCOPE,
} from './const';

const searchParamsCode = new URLSearchParams('');

searchParamsCode.append('client_id', CLIENT_ID);
searchParamsCode.append('redirect_uri', REDIRECT_URI);
searchParamsCode.append('response_type', RESPONSE_TYPE);
searchParamsCode.append('scope', SCOPE);

export const urlAuth = `${URL_API_AUTH}${searchParamsCode.toString()}`;

