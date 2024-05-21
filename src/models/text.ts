export type SiteText = {
  login: LoginText,
  signup: SignUpText,
}

export type SignUpText = {
  signUp: string,
  signUpMessage: string,
  signingUp: string,
  signIn: string,
  signInMessage: string,
  button: string
  signedUp: string,
  form: SignUpTextForm,
}

export type SignUpTextForm = {
  userName: string,
  email: string,
  password: string,
}

export type LoginText = {
  login: string,
  loggingIn: string,
  signUp: string,
  forgotPassword: string,
  signUpMessage: string,
  email: string
  password: string
  button: string
  loggedIn: string,
  form: LoginTextForm,
}

export type LoginTextForm = {
  email: string,
  password: string,
}