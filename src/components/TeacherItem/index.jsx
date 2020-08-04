import React from "react";

import whatsIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/56052678?s=460&u=92c7b9e7ebac7c4a7caee2cd2b67165b460678dd&v=4"
          alt="Joao Gabriel"
        />
        <div>
          <strong>João Gabriel Cervo</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>
        Lorem ipsum dolor sit amet.
        <br /> <br />
        consectetur adipiscing elit. Aliquam aliquet ornare mi, ut sagittis
        tellus tempus et. Mauris tincidunt dignissim dignissim. In tempus magna
        id lorem pulvinar, sodales blandit erat mollis. Vestibulum vitae semper
        turpis.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$80,00</strong>
        </p>
        <button type="button">
          <img src={whatsIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
