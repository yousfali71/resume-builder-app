import deleteBtn from "/src/assets/close-svgrepo-com.svg";

export default function Skills({
  skillsList,
  skillInput,
  handleSkillChange,
  addNewSkill,
  removeSkill,
  editSkill,
  isSkillEditing,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addNewSkill(e);
    }
  }

  return (
    <>
      <div className="skills-input-wrapper">
        <input
          type="text"
          value={skillInput}
          onChange={handleSkillChange}
          onKeyDown={(e) => handleKeyDown(e)}
          className="skills-input"
        ></input>
        <button onClick={addNewSkill} className="add-btn">
          {isSkillEditing ? "Update" : "Add"}
        </button>
      </div>

      <div className="skills-container">
        {skillsList.map((skill) => (
          <div
            id={skill.id}
            key={skill.id}
            className="skill-list-item"
            onClick={(e) => editSkill(skill.id, e)}
          >
            <p className="skill-name">{skill.name}</p>
            <div className="edit-remove-btns">
              <button
                className="remove-btn"
                onClick={(e) => removeSkill(skill.id, e)}
              >
                <img src={deleteBtn} alt="close" width="15px" height="15px" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
