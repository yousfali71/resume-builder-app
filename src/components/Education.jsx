import editBtn from "/src/assets/edit-3-svgrepo-com.svg";
import deleteBtn from "/src/assets/close-svgrepo-com.svg";

export default function Education({
  handleChange,
  eduList,
  addEducation,
  eduInput,
  removeEdu,
  editEdu,
  eduIsEditing,
}) {
  function formatDate(date) {
    const [year, month] = date.split("-");

    return `${month}/${year}`;
  }

  const eduInputFields = [
    {
      name: "degree",
      id: crypto.randomUUID(),
      type: "text",
      display: "Degree: ",
    },
    {
      name: "institution",
      id: crypto.randomUUID(),
      type: "text",
      display: "University/School/Institution: ",
    },
    {
      name: "cityState",
      id: crypto.randomUUID(),
      type: "text",
      display: "City, State",
    },
    {
      name: "startDate",
      id: crypto.randomUUID(),
      type: "month",
      display: "Start Date: ",
    },

    {
      name: "endDate",
      id: crypto.randomUUID(),
      type: "month",
      display: "End Date: ",
    },
  ];

  return (
    <>
      <form className="education-inputs">
        {eduInputFields.map((field) => (
          <div key={field.name} className={`input-wrapper ${field.name}`}>
            <label key={field.id} htmlFor={field.name} className="input-label">
              {field.display}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.id}
              onChange={handleChange}
              value={eduInput[field.name]}
              required
            />
          </div>
        ))}
        <button className="add-btn" onClick={addEducation}>
          {eduIsEditing ? "Update" : "Add Education"}
        </button>
        <div className="edu-container">
          {eduList.map((edu) => (
            <div className="edu-item" id={edu.id} key={edu.id}>
              <span className="edu-degree-delete-btn">
                <p className="edu-degree edu-entry">{edu.degree}</p>
                <div className="edit-remove-btns">
                  <button
                    className="edit-btn"
                    onClick={(e) => editEdu(edu.id, e)}
                  >
                    <img src={editBtn} alt="edit" width="15px" height="15px" />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeEdu(edu.id)}
                  >
                    <img
                      src={deleteBtn}
                      alt="delete"
                      width="15px"
                      height="15px"
                    />
                  </button>
                </div>
              </span>
              <p className="edu-institution edu-entry">{edu.institution}</p>
              <p className="edu-city-state edu-entry">{edu.cityState}</p>
              <p className="edu-start-end edu-entry">
                <span className="edu-start">
                  Start: {formatDate(edu.startDate)}
                </span>

                <span className="edu-end">End: {formatDate(edu.endDate)}</span>
              </p>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
