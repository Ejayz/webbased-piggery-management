export default function ErrorMessage(errors: any, form_name: string) {
  console.log(errors[form_name]);
  if (Object.keys(errors).length !== 0) {
    return Object.keys(errors[form_name]);
  } else {
    return [];
  }
}
