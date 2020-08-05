import React from "react";

import whatsIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
const TeacherItem = ({ teacher }) => {
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Joao Gabriel" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R${teacher.cost}</strong>
        </p>
        <a href={`https://wa.me/${teacher.whatsapp}`} type="button">
          <img src={whatsIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
