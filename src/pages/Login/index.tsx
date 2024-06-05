import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import styles from './Login.module.css';
import { GoogleCredential } from '../../interfaces/GoogleCredential';

const Login = () => {
  return (
    <div className={styles.container}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const credential = credentialResponse.credential;
          let decodedCredential;
          let user;

          if (credential) {
            decodedCredential = jwtDecode<GoogleCredential>(credential);
            user = {
              name: decodedCredential.name,
              email: decodedCredential.email,
              picture: decodedCredential.picture
            };

            console.log(user);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Login;
