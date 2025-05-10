import editBtn from "/src/assets/edit-3-svgrepo-com.svg";
import deleteBtn from "/src/assets/close-svgrepo-com.svg";

const profSummary = {
  name: "profSummary",
  id: crypto.randomUUID(),
  type: "textarea",
  display: "Professional Summary: ",
};

const bulletPoints = {
  name: "bulletPoints",
  id: crypto.randomUUID(),
  type: "text",
  display: "Job Responsibilities: ",
};

const profInputFields = [
  {
    name: "jobTitle",
    id: crypto.randomUUID(),
    type: "text",
    display: "Job Title: ",
  },
  {
    name: "company",
    id: crypto.randomUUID(),
    type: "text",
    display: "Company: ",
  },
  {
    name: "location",
    id: crypto.randomUUID(),
    type: "text",
    display: "Location: ",
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

export default function ProfessionalExp({
  profExInput,
  professionalSum,
  handleBulletPointChange,
  handleProfExChange,
  handleProfessionalSum,
  addBulletPoint,
  addProfExp,
  removeBullet,
  removeProfEx,
  editProfEx,
  bulletPoint,
  bulletPointList,
  isProfExEditing,
  profExList,
}) {
  function formatDate(date) {
    const [year, month] = date.split("-");

    return `${month}/${year}`;
  }

  return (
    <>
      <form className="prof-exp-inputs">
        <div className={`input-wrapper ${profSummary.name}`}>
          <label className="input-label">{profSummary.display}</label>{" "}
          <textarea
            className="profSummary"
            id={profSummary.id}
            value={professionalSum}
            onChange={handleProfessionalSum}
            required
          ></textarea>{" "}
        </div>
        <hr />
        {profInputFields.map((field) => (
          <div key={field.id} className={`input-wrapper ${field.name}`}>
            <label key={field.id} htmlFor={field.name} className="input-label">
              {field.display}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.id}
              onChange={handleProfExChange}
              value={profExInput[field.name]}
              required
            />
          </div>
        ))}
        <div className={`input-wrapper ${bulletPoints.name}`}>
          <label key={bulletPoints.id} className="input-label">
            {bulletPoints.display}
          </label>
          <div className="bullet-point-wrapper">
            <input
              type={bulletPoints.type}
              onChange={handleBulletPointChange}
              value={bulletPoint}
            ></input>{" "}
            <button className="add-btn" onClick={addBulletPoint}>
              Add
            </button>
          </div>
          <div className="bullet-point-container">
            {bulletPointList.map((bullet) => (
              <div key={bullet.id} className="bullet-point-entry">
                <span className="bullet-text">{bullet.text} </span>
                <button
                  className="remove-btn"
                  onClick={(e) => removeBullet(bullet.id, e)}
                >
                  <img src={deleteBtn} alt="close" width="15px" height="15px" />
                </button>
              </div>
            ))}
          </div>
          <hr />

          <button
            className="add-btn"
            onClick={(e) => {
              addProfExp(e);
            }}
          >
            {isProfExEditing ? "Update Work Experience" : "Add Work Experience"}{" "}
          </button>
        </div>
        <div className="profEx-container">
          {profExList.map((profEx) => (
            <div className="profEx-item" id={profEx.id} key={profEx.id}>
              <span className="edu-degree-delete-btn">
                <p className="edu-degree edu-entry">{profEx.jobTitle}</p>
                <div className="edit-remove-btns">
                  <button
                    className="edit-btn"
                    onClick={(e) => editProfEx(profEx.id, e)}
                  >
                    <img src={editBtn} alt="edit" width="15px" height="15px" />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeProfEx(profEx.id)}
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
              <p className="profEx-company profEx-entry">{profEx.company}</p>
              <p className="profEx-location profEx-entry">
                {profEx.location}
              </p>{" "}
              {profEx.bulletPoints.length > 0 ? (
                <div className="profEx-responsibilities">
                  {" "}
                  {profEx.bulletPoints.map((bullet) => (
                    <li key={bullet.id}>{bullet.text}</li>
                  ))}
                </div>
              ) : (
                ""
              )}{" "}
              <p className="profEx-start-end profEx-entry">
                <span className="profEx-start">
                  Start: {formatDate(profEx.startDate)}
                </span>

                <span className="profEx-end">
                  End: {formatDate(profEx.endDate)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
