// Types
import { CustomError } from "../api/apiSlice";

const isValidCustomError = (response: any): response is CustomError => {
  try {
    return "errors" in response.data;
  } catch (err) {
    return false;
  }
};

const handleError = (response: any) => {
  const isValid = isValidCustomError(response);

  if (isValid) {
    return response.data.errors[0];
  } else {
    return "Serviço indisponível, tente novamente mais tarde.";
  }
};
export default handleError;
