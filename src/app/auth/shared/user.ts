export class User {
  username: string;
  passwordHash: string;
  name: string;
  email: string;


  constructor(username: string = "", password: string = "", name: string = "", email: string = "") {
    this.username = username;
    this.passwordHash = password;
    this.name = name;
    this.email = email;
  }
}

export class LoginUser {
  userName: string;
  password: string;

  constructor(userName: string = "", password: string = "") {
    this.userName = userName;
    this.password = password;
  }
}

export class ResetPasswordDto {
  email: string;
  token: string;
  newPassword: string;

  constructor(email: string, token: string, newPassword: string) {
    this.email = email;
    this.token = token;
    this.newPassword = newPassword;
  }
}




