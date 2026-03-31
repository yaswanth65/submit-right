export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log("Email placeholder", input);
  return { delivered: true };
}
