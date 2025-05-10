function ContactInfo({ formData, handleChange }) {
  const inputFields = [
    {
      name: "firstName",
      id: crypto.randomUUID(),
      type: "text",
      display: "First Name: ",
    },
    {
      name: "lastName",
      id: crypto.randomUUID(),
      type: "text",
      display: "Last Name: ",
    },
    {
      name: "email",
      id: crypto.randomUUID(),
      type: "email",
      display: "Email: ",
    },
    {
      name: "phone",
      id: crypto.randomUUID(),
      type: "tel",
      display: "Phone: ",
    },

    {
      name: "city",
      id: crypto.randomUUID(),
      type: "text",
      display: "City: ",
    },
    {
      name: "state",
      id: crypto.randomUUID(),
      type: "text",
      display: "State: ",
    },
    {
      name: "zip",
      id: crypto.randomUUID(),
      type: "number",
      display: "ZIP: ",
    },
  ];

  return (
    <>
      <form className="contact-inputs">
        {inputFields.map((field) => (
          <div key={field.name} className={`input-wrapper ${field.name}`}>
            <label key={field.id} htmlFor={field.name} className="input-label">
              {field.display}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.id}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </>
  );
}

export default ContactInfo;
