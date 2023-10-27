import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  isEmailValid,
  isPhoneValid,
  randomizeErrorTest,
} from "./util/validation";
import ErrorMessage from "./components/ErrorMessage";
import Checkbox from "./components/Checkbox";

export default function FormComponent() {
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    phone: "",
    email: "",
    agreement_mail: false,
    agreement_call: false,
    agreement_sms: false,
    error_test: "",
  });

  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneAgreement, setPhoneAgreement] = useState(true);

  const [responseContent, setResponseContent] = useState(null);
  const [responseError, setResponseError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const emailCheck = isEmailValid(enteredValues.email);
    setEmailValid(emailCheck);
    if (!emailCheck) {
      return;
    }

    const phoneCheck = isPhoneValid(enteredValues.phone);
    const phoneAgreementCheck =
      enteredValues.agreement_call || enteredValues.agreement_sms;
    setPhoneValid(phoneCheck);
    if (!phoneCheck) {
      return;
    } else if (!phoneAgreementCheck) {
      setPhoneAgreement(phoneAgreementCheck);
      return;
    }

    const url =
      "https://test8.it4u.company/sapi/modules/contact/form/40042ce28394dc369948c018b22c534d";

    const formData = new FormData();

    formData.append("name", enteredValues.name);
    formData.append("phone", enteredValues.phone);
    formData.append("email", enteredValues.email);
    formData.append("agreement_mail", enteredValues.agreement_mail);
    formData.append("agreement_call", enteredValues.agreement_call);
    formData.append("agreement_sms", enteredValues.agreement_sms);
    formData.append("error_test", randomizeErrorTest(enteredValues.email, 0.1));

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.content) {
          setResponseContent(data.content);
          setResponseError(null);
        } else if (data.error.error_test) {
          setResponseContent(null);
          setResponseError(data.error.error_test);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    if (identifier === "phone") {
      setPhoneValid(true);
    }
    if (identifier === "agreement_call" || identifier === "agreement_sms") {
      setPhoneAgreement(true);
    }
  }

  return (
    <div
      id="formWrapper"
      className="pt-4 col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12"
      style={{
        background: "linear-gradient(45deg, #e0e3f8, #ffffff, #e0e3f8)",
      }}
    >
      <Form id="form" className="px-1" onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          <input
            id="name"
            style={{
              height: "3rem",
            }}
            className="mb-4 rounded-0 border-0 p-2"
            onChange={(event) => handleInputChange("name", event.target.value)}
            value={enteredValues.name}
            type="name"
            placeholder="IMIĘ I NAZWISKO"
            required
          />
          {!phoneValid && (
            <ErrorMessage>Nieprawidłowy numer telefonu</ErrorMessage>
          )}
          <input
            id="phone"
            style={{
              height: "3rem",
            }}
            className="mb-4 rounded-0 border-0 p-2"
            onChange={(event) => handleInputChange("phone", event.target.value)}
            value={enteredValues.phone}
            type="tel"
            placeholder="TELEFON"
          />
          {responseContent && (
            <div dangerouslySetInnerHTML={{ __html: responseContent }} />
          )}
          {!emailValid && (
            <ErrorMessage>Nieprawidłowy adres email</ErrorMessage>
          )}
          <input
            id="email"
            style={{
              height: "3rem",
            }}
            className="mb-4 rounded-0 border-0 p-2"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
            type="email"
            placeholder="EMAIL"
            required
          />
          {responseError && <p className="mb-4">Błąd: {responseError}</p>}
        </div>
        <div className="text-start">
          <p className="Roboto GreenText SmallText">
            Wyrażam zgodę na otrzymywanie od XYZ Sp. z o.o. SKA z siedzibą w
            Poznaniu ul. ABC 123, 60-123 Poznań, informacji handlowej:
          </p>
          <Checkbox
            id="emailCheck"
            label="w formie elektronicznej (mail) na wskazany adres mailowy"
            onChange={() =>
              handleInputChange("agreement_mail", !enteredValues.agreement_mail)
            }
            checked={enteredValues.agreement_mail}
            disabled={!isEmailValid(enteredValues.email)}
            required
          />
          {!phoneAgreement && (
            <ErrorMessage>
              Przy podaniu numeru telefonu wymagana jest zgoda na jedną z dwóch
              poniższych form komunikacji
            </ErrorMessage>
          )}
          <Checkbox
            id="callCheck"
            label="drogą telefoniczną, na udostępniony numer telefonu"
            onChange={() =>
              handleInputChange("agreement_call", !enteredValues.agreement_call)
            }
            checked={enteredValues.agreement_call}
            disabled={
              !isPhoneValid(enteredValues.phone) || enteredValues.agreement_sms
            }
          />
          <Checkbox
            id="smsCheck"
            label="w formie SMS, na udostępniony numer telefonu"
            onChange={() =>
              handleInputChange("agreement_sms", !enteredValues.agreement_sms)
            }
            checked={enteredValues.agreement_sms}
            disabled={
              !isPhoneValid(enteredValues.phone) || enteredValues.agreement_call
            }
          />
        </div>
        <Button
          className="text-white border-0 rounded-0 p-0 my-4 fs-3 fw-bold"
          id="submitButton"
          variant="primary"
          type="submit"
        >
          WYŚLIJ
        </Button>
      </Form>
      <p className="Roboto mb-5 fw-bold SmallText">
        <a className="GreenText" href="/about">
          Kto będzie administratorem Twoich danych osobowych?
        </a>
      </p>
    </div>
  );
}
