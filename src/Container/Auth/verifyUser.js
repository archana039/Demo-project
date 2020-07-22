import React, { useEffect } from 'react'
import * as queryString from 'query-string';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
import { ApiHelper } from '../../helper';
import { AppRoutes, ApiRoutes } from '../../Config';
import { toast } from 'react-toastify';

const VerifyUser = (props) => {
  let { search } = useLocation();
  let history = useHistory();
  useEffect(() => {
    console.log(search, 'search')
    if (search) {
      let searchParams = queryString.parse(search);
      console.log(searchParams, 'searchParamssearchParams')
      const data = {
        token: searchParams.token
      }
      async function VerifyToken() {
        const res = await new ApiHelper().FetchFromServer(
          ApiRoutes.VERIFY_USER.service,
          ApiRoutes.VERIFY_USER.url,
          ApiRoutes.VERIFY_USER.method,
          ApiRoutes.VERIFY_USER.authenticate,
          undefined,
          data
        );
        if (res &&res.status) {
          localStorage.setItem('token', res.token)
          history.push(AppRoutes.PROFILE);
        }
        else{
          toast.error(res.messages && res.messages[0]);

        }
      }
     VerifyToken()

    }
  },[])
  return (
    <>
    </>
  )
}
export default VerifyUser