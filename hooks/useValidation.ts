export function validatePhone(phone: string) {
  let message = [];

  if (phone == "") {
    message.push("Phone should not be empty.");
  }
  if (!phone.startsWith("9")) {
    message.push("Phone number should start at (9).");
  }
  if (!/^\d+$/.test(phone)) {
    message.push("Phone number only accept numbers.");
  }
  if (phone.length !== 10) {
    message.push("Phone number should be 10 character long.");
  }

  return { message: message };
}

export async function validatePassword(password: string) {
  let message = [];

  if (!(password.length >= 8)) {
    message.push("atleast 8 Character long password is required");
  }
  if (!/\d/.test(password)) {
    message.push("Password should contain atleast 1 number");
  }
  if (!/[A-Z]/.test(password)) {
    message.push("Password should contain atleast 1 UpperCase letter");
  }
  if (!/[a-z]/.test(password)) {
    message.push("Password should contain atleast 1 LowerCase letter");
  }

  return { message: message };
}

export async function validateNormal(value: string) {
  let message = [];
  if (value == "") {
    message.push("This feild should not be empty");
  }

  return { message: message };
}
export async function validateSkip(value: string) {
  return { message: [] };
}

export async function validateSelect(value: string) {
  let message = [];
  let isValid = true;
  if (value == "default") {
    message.push("Please select one of.");
  }
  return { message: message };
}
export async function validateUpdatePassword(password: string) {
  let message = [];

  if (password !== "") {
    if (!(password.length >= 8)) {
      message.push("atleast 8 Character long password is required");
    }
    if (!/\d/.test(password)) {
      message.push("Password should contain atleast 1 number");
    }
    if (!/[A-Z]/.test(password)) {
      message.push("Password should contain atleast 1 UpperCase letter");
    }
    if (!/[a-z]/.test(password)) {
      message.push("Password should contain atleast 1 LowerCase letter");
    }
  } else {
    message = [];
  }

  return { message: message };
}

export async function validateNumber(value: any) {
  let message = [];
  if (!/^\d+$/.test(value)) {
    message.push("Numbers are only allowed.");
  }
  return { message: message };
}
