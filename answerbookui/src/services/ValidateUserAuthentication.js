import jwt_decode from 'jwt-decode';

class ValidateUserAuthentication {
  static getTokenExpirationDate (token) {
    if (token) {
      const decoded = jwt_decode(token);
      if (!decoded.hasOwnProperty('exp')) {
        return null;
      }

      // The 0 here is the key, which sets the date to the epoch
      let date = new Date(0);
      date.setUTCSeconds(decoded.exp);

      return date;
    }
  }

  static isTokenExpired (token, offsetSeconds) {
    let tokenExpirationDate = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (tokenExpirationDate == null) {
      return false;
    }

    // Token expired?
    return !(tokenExpirationDate.valueOf() >
        (new Date().valueOf() + (offsetSeconds * 1000)))
  }

  static isUserLoggedIn () {
    const token = localStorage.getItem('id_token');
    return token !== null && !ValidateUserAuthentication.isTokenExpired(token);
  }
}

export default ValidateUserAuthentication;