import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";
import ContactInfo from "./components/ContactInfo";
import Skills from "./components/Skills";
import ToggleSection from "./components/ToggleSection";
import DisplayContactInfo from "./components/DisplayContactInfo";
import Education from "./components/Education";
import ProfessionalExp from "./components/ProfessionalExp";

export default function App() {
  // For PDF download //
  function downloadPDF() {
    const resumePDF = document.querySelector(".paper-container");

    html2canvas(resumePDF, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("myResume.pdf");
    });
  }

  // For Contact Form //
  const [contactFormData, setContactFormData] = useState({
    firstName: "Thor",
    lastName: "Cattison",
    email: "snuggles@orangecat.com",
    phone: "(123) 456-7890",
    city: "Skyline",
    state: "AK",
    zip: "00090",
  });

  const [contactInfoVisible, setContactInfoVisible] = useState(false);

  function toggleContactInfo() {
    setContactInfoVisible((contactInfoVisible) => !contactInfoVisible);
  }

  function handleContactChange(e) {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // For Professional Experience Form //
  const [isProfExVisible, setIsProfExVisible] = useState(false);

  function toggleProfEx() {
    setIsProfExVisible((isProfExVisible) => !isProfExVisible);
  }

  const [profExInput, setProfExInput] = useState("");
  const [professionalSum, setProfessionalSum] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor doloribus et officiis odit architecto delectus possimus non reiciendis earum, corporis animi. Quam et nostrum maxime! Asperiores officiis cumque reprehenderit sed."
  );
  const [profExList, setProfExList] = useState([
    {
      jobTitle: "Napping Specialist",
      company: "Very Good Sleep",
      location: "Charlotte, NC",
      bulletPoints: [
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec quam odio. Curabitur feugiat mi imperdiet congue vehicula. Mauris hendrerit augue augue. Maecenas efficitur lorem vitae nisi iaculis, ut scelerisque nisi aliquet. Mauris ullamcorper imperdiet efficitur.",
        },
        {
          text: " Curabitur feugiat mi imperdiet congue vehicula. Mauris hendrerit augue augue. Maecenas efficitur lorem vitae nisi iaculis, ut scelerisque nisi aliquet. Mauris ullamcorper imperdiet efficitur.",
        },
      ],
      startDate: "2018-09",
      endDate: "2024-10",
      id: crypto.randomUUID(),
    },
    {
      jobTitle: "Full Stack Developer",
      company: "Very Good Coding",
      location: "Durham, NC",
      bulletPoints: [
        {
          id: crypto.randomUUID(),
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec quam odio. Curabitur feugiat mi imperdiet congue vehicula. Mauris hendrerit augue augue. Maecenas efficitur lorem vitae nisi iaculis, ut scelerisque nisi aliquet. Mauris ullamcorper imperdiet efficitur.",
        },
        {
          id: crypto.randomUUID(),
          text: " Curabitur feugiat mi imperdiet congue vehicula. Mauris hendrerit augue augue. Maecenas efficitur lorem vitae nisi iaculis, ut scelerisque nisi aliquet. Mauris ullamcorper imperdiet efficitur.",
        },
      ],
      startDate: "2008-09",
      endDate: "2017-10",
      id: crypto.randomUUID(),
    },
  ]);
  const [bulletPoint, setBulletPoint] = useState("");
  const [bulletPointList, setBulletPointList] = useState([]);
  const [isProfExEditing, setisProfExEditing] = useState(false);
  const [profExId, setProfExId] = useState(null);

  function handleProfessionalSum(e) {
    setProfessionalSum(e.target.value);
  }

  function handleProfExChange(e) {
    const { name, value } = e.target;

    setProfExInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  function handleBulletPointChange(e) {
    setBulletPoint(e.target.value);
  }

  function addProfExp(e) {
    e.preventDefault();

    if (
      profExInput.jobTitle.trim() === "" ||
      profExInput.company.trim() === "" ||
      profExInput.location.trim() === "" ||
      profExInput.startDate.trim() === "" ||
      profExInput.endDate.trim() === ""
    ) {
      return;
    } else if (isProfExEditing) {
      console.log(profExId);
      setProfExList((prevProfExList) =>
        prevProfExList.map((profEx) =>
          profEx.id === profExId
            ? { ...profExInput, bulletPoints: bulletPointList, id: profExId }
            : profEx
        )
      );
      setisProfExEditing(false);
      setProfExId(null);
      setProfExInput({
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
      });
      setBulletPointList([]);
    } else {
      setProfExList((prevExList) => [
        ...prevExList,
        {
          ...profExInput,
          bulletPoints: bulletPointList,
          id: crypto.randomUUID(),
        },
      ]);
      setProfExInput({
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
      });
      setBulletPointList([]);
      console.log(profExList);
    }
  }

  function editProfEx(id, e) {
    e.preventDefault();

    const profExToEdit = profExList.find((profEx) => profEx.id === id);

    console.log(profExToEdit.id);
    if (profExToEdit) {
      setisProfExEditing(true);
      setProfExInput(profExToEdit);
      setBulletPointList(profExToEdit.bulletPoints);
      setProfExId(profExToEdit.id);
    }
  }

  function removeProfEx(id) {
    setProfExList((prevProfExList) =>
      prevProfExList.filter((list) => list.id !== id)
    );

    setProfExInput({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
    });

    setBulletPoint("");
    setBulletPointList([]);
  }

  function addBulletPoint(e) {
    e.preventDefault();

    if (bulletPoint.trim() === "") {
      return;
    }

    setBulletPointList((prevBulletPointList) => [
      ...prevBulletPointList,
      { text: bulletPoint.trim(), id: crypto.randomUUID() },
    ]);

    setBulletPoint("");
  }

  function removeBullet(id, e) {
    e.preventDefault();

    setBulletPointList((prevBulletPointList) =>
      prevBulletPointList.filter((bullet) => bullet.id !== id)
    );
    setBulletPoint("");
  }

  // For EDU Form //
  const [eduInfoVisible, setEduInfoVisible] = useState(false);
  const [eduInput, setEduInput] = useState("");
  const [eduIsEditing, setEduIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  function toggleEduInfo() {
    setEduInfoVisible((eduInfoVisible) => !eduInfoVisible);
  }

  function handleEduChange(e) {
    const { name, value } = e.target;

    setEduInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [eduList, setEduList] = useState([
    {
      degree: "Doctorate in Napping",
      institution: "Harvard University",
      cityState: "Cambridge, MA",
      startDate: "2012-08",
      endDate: "2016-05",
      id: crypto.randomUUID(),
    },
    {
      degree: "B.A. Mathematics",
      institution: "University of North Carolina at Chapel Hill",
      cityState: "Chapel Hill, NC",
      startDate: "2008-08",
      endDate: "2012-05",
      id: crypto.randomUUID(),
    },
  ]);

  function addEducation(e) {
    e.preventDefault;

    if (
      !eduInput.degree.trim() ||
      !eduInput.institution.trim() ||
      !eduInput.cityState.trim() ||
      !eduInput.startDate.trim() ||
      !eduInput.endDate.trim()
    ) {
      return;
    }
    if (eduIsEditing) {
      setEduList((prevEduList) =>
        prevEduList.map((edu) =>
          edu.id === editId ? { ...eduInput, id: editId } : edu
        )
      );
      setEduIsEditing(false);
      setEditId(null);
      setEduInput({
        degree: "",
        institution: "",
        cityState: "",
        startDate: "",
        endDate: "",
      });
    } else {
      setEduList((prevEduList) => [
        ...prevEduList,
        { ...eduInput, id: crypto.randomUUID() },
      ]);

      setEduInput({
        degree: "",
        institution: "",
        cityState: "",
        startDate: "",
        endDate: "",
      });
    }
  }

  function editEdu(id, e) {
    e.preventDefault();
    const eduToEdit = eduList.find((edu) => edu.id === id);

    if (eduToEdit) {
      setEduInput(eduToEdit);
      setEduIsEditing(true);
      setEditId(id);
    }
  }

  function removeEdu(id) {
    setEduList((prevEduList) => prevEduList.filter((edu) => edu.id !== id));
    setEduInput({
      degree: "",
      institution: "",
      cityState: "",
      startDate: "",
      endDate: "",
    });
  }

  // For Skills Form //
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [skillsList, setSkillsList] = useState([
    { name: "React.js", id: crypto.randomUUID() },
    { name: "Javascript", id: crypto.randomUUID() },
    { name: "CSS", id: crypto.randomUUID() },
    { name: "HTML5", id: crypto.randomUUID() },
    { name: "Webpack", id: crypto.randomUUID() },
    { name: "Vite", id: crypto.randomUUID() },
  ]);
  const [isSkillEditing, setIsSkillEditing] = useState(false);
  const [skillId, setSkillId] = useState(null);

  function toggleSkills() {
    setSkillsVisible((skillsVisible) => !skillsVisible);
  }

  function handleSkillChange(e) {
    setSkillInput(e.target.value);
  }

  function addNewSkill(e) {
    e.preventDefault();

    if (isSkillEditing) {
      setSkillsList((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId ? { ...skill, name: skillInput.trim() } : skill
        )
      );
      setSkillId(null);
      setIsSkillEditing(false);
    } else if (skillInput.trim() !== "") {
      setSkillsList((currentSkills) => [
        ...currentSkills,
        { name: skillInput.trim(), id: crypto.randomUUID() },
      ]);
    }
    setSkillInput("");
  }

  function editSkill(id, e) {
    e.preventDefault();
    const skillToEdit = skillsList.find((skill) => skill.id === id);
    if (skillToEdit) {
      setIsSkillEditing(true);
      setSkillId(id);
      setSkillInput(skillToEdit.name);
    }
  }

  function removeSkill(id, e) {
    e.preventDefault();
    e.stopPropagation();

    if (skillId === id) {
      setSkillInput("");
      setIsSkillEditing(false);
    }
    setSkillsList((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== id)
    );
  }

  function clearData() {
    setContactFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      zip: "",
    });
    setProfessionalSum("");
    setEduList([]);
    setProfExList([]);
    setSkillsList([]);
  }

  return (
    <div className="main-container">
      <div className="input-side">
        <p className="site-title">resume builder</p>
        <div className="forms-wrapper">
          <ToggleSection
            title="Contact Information: "
            isVisible={contactInfoVisible}
            toggleVisibility={toggleContactInfo}
          >
            <ContactInfo
              formData={contactFormData}
              handleChange={handleContactChange}
            />
          </ToggleSection>
          <ToggleSection
            title="Professional Experience: "
            isVisible={isProfExVisible}
            toggleVisibility={toggleProfEx}
          >
            <ProfessionalExp
              profExInput={profExInput}
              professionalSum={professionalSum}
              handleBulletPointChange={handleBulletPointChange}
              handleProfExChange={handleProfExChange}
              handleProfessionalSum={handleProfessionalSum}
              addBulletPoint={addBulletPoint}
              addProfExp={addProfExp}
              removeBullet={removeBullet}
              removeProfEx={removeProfEx}
              editProfEx={editProfEx}
              bulletPoint={bulletPoint}
              bulletPointList={bulletPointList}
              isProfExEditing={isProfExEditing}
              profExList={profExList}
            />
          </ToggleSection>
          <ToggleSection
            title="Education: "
            isVisible={eduInfoVisible}
            toggleVisibility={toggleEduInfo}
          >
            <Education
              handleChange={handleEduChange}
              removeEdu={removeEdu}
              eduList={eduList}
              eduInput={eduInput}
              addEducation={addEducation}
              editEdu={editEdu}
              eduIsEditing={eduIsEditing}
            />
          </ToggleSection>
          <ToggleSection
            title="Skills: "
            className="skills-inputs"
            isVisible={skillsVisible}
            toggleVisibility={toggleSkills}
          >
            <Skills
              skillsList={skillsList}
              skillInput={skillInput}
              handleSkillChange={handleSkillChange}
              addNewSkill={addNewSkill}
              removeSkill={removeSkill}
              editSkill={editSkill}
              isSkillEditing={isSkillEditing}
            />
          </ToggleSection>
        </div>{" "}
        <button className="clear-data-btn" onClick={clearData}>
          Clear All Data
        </button>
      </div>
      <div className="output-side">
        <div className="paper-container">
          <DisplayContactInfo
            contact={contactFormData}
            education={eduList}
            profEx={profExList}
            skills={skillsList}
            proSum={professionalSum}
          />
        </div>
        <button className="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
