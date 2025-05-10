import "../Display.css";

function DisplayOutput({ contact, education, profEx, skills, proSum }) {
  function formatDate(date) {
    const [year, month] = date.split("-");

    return `${month}/${year}`;
  }
  return (
    <>
      <div className="contact-left">
        <div className="resume-name">
          <p>
            {contact.firstName} {contact.lastName}
          </p>
        </div>
        <div className="contact-info">
          <p className="resume-email-phone">{contact.email}</p>
          <p className="resume-email-phone">{contact.phone}</p>
          <p className="resume-address">
            {contact.city && contact.state && contact.zip
              ? `${contact.city}, ${contact.state} ${contact.zip}`
              : ""}
          </p>
        </div>
        <div className="d-skills">
          <p className="d-skills-h4">{skills.length > 0 ? "Skills:" : ""}</p>
          <div className="d-skills-container">
            {skills.map((skill) => (
              <div id={skill.id} key={skill.id} className="d-skill-list-item">
                <p className="display-skill-name">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="resume-right">
        <div className="prof-sum-wrapper">
          <div className="header-h4">Professional Summary: </div>
          <div className="prof-sum-content">{proSum}</div>
        </div>
        <div className="profEx-wrapper">
          <div className="header-h4">Work Experience: </div>
          <div className="profEx-content">
            {profEx.map((profEx) => (
              <div id={profEx.id} key={profEx.id} className="d-profEx-entry">
                <div className="d-row-1">
                  <div className="d-row-1-left">{profEx.jobTitle}</div>
                  <div className="d-row-1-right">
                    {formatDate(profEx.startDate)} -{" "}
                    {formatDate(profEx.endDate)}
                  </div>
                </div>
                <div className="d-row-2">
                  {profEx.company} - {profEx.location}
                </div>
                {profEx.bulletPoints.map((bullet) => (
                  <p key={bullet.id} className="d-bullet-item">
                    <li>{bullet.text}</li>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="edu-wrapper">
          <div className="header-h4">Education: </div>
          <div className="education-content">
            {education.map((edu) => (
              <div id={edu.id} key={edu.id} className="d-edu-entry">
                <div className="d-row-1">
                  <div className="d-row-1-left">{edu.degree}</div>
                  <div className="d-row-1-right">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                <div className="d-row-2">
                  {edu.institution} - {edu.cityState}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayOutput;
