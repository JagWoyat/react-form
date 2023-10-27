import { Form } from "react-bootstrap";

export default function Checkbox({
  id,
  label,
  onChange,
  checked,
  disabled,
  required = false,
}) {
  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check
        className="Roboto GreenText SmallText"
        id={id}
        type="checkbox"
        label={label}
        onChange={onChange}
        checked={checked}
        disabled={disabled ? true : false}
        required={required}
      />
    </Form.Group>
  );
}
