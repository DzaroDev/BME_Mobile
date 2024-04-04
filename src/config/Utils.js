import { LoginType } from "../Constants";
import { isEmpty } from "./Validations";

export const checkLoginType = (input) => {
  if (isEmpty(input)) return LoginType.UNKNOWN;
  if (/\@/.test(input)) {
    return LoginType.EMAIL;
  } else {
    LoginType.PHONE;
  }
};
