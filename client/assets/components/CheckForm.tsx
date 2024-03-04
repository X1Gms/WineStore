type inputObjs = { name: string; value: string; type: string }[];

const CheckForm = (inputs: inputObjs) => {
  const regex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  const Eregex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emptyInputs: any = inputs.filter(({ value }) => !value);

  const password: inputObjs = inputs.filter(
    ({ type }) => type === "password" || type === "Cpassword"
  );
  const email: inputObjs = inputs.filter(({ type }) => type === "email");

  const checks: { condition: boolean; message: string }[] = [
    {
      condition: inputs.length === emptyInputs.length,
      message: "Caixas de Texto Vazias",
    },
    {
      condition: emptyInputs.length > 1,
      message:
        `As caixas${emptyInputs.map(
          (item: any) => " " + item.name
        )} estão vazias` || "Caixa de Texto Vazia",
    },
    {
      condition: emptyInputs.length === 1 && emptyInputs[0].name,
      message:
        emptyInputs.length === 1
          ? `A caixa ${emptyInputs[0].name} está vazia`
          : "Caixa de Texto Vazia",
    },
    {
      condition: email.length > 0 && !Eregex.test(email[0].value),
      message: "E-mail Inválido",
    },
    {
      condition: password.length > 0 && !regex.test(password[0].value),
      message: "Palavra-Passe Inválida",
    },
  ];

  let msg: string = "";
  checks.some(({ condition, message }) => {
    if (condition) {
      msg = message;
      return true;
    }
  });

  if (msg === "" && password.length > 1) {
    if (password[0].value !== password[1].value) {
      msg = "As Palavras-Passes Não Coincidem";
    }
  }

  return msg === "" ? true : msg;
};

export default CheckForm;
