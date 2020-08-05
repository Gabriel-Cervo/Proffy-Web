import React, { useState } from "react";
import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [inputs, setInputs] = useState({
    subject: "",
    week_day: "",
    time: "",
  });

  function updateInputs(event) {
    const { id: name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  }

  async function searchTeachers(e) {
    e.preventDefault();

    if (inputs.subject === "" || inputs.week_day === "" || inputs.time === "") {
      return;
    }

    const response = await api.get("/classes", {
      params: {
        ...inputs,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponiveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matérias"
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
            value={inputs.subject}
            onChange={updateInputs}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
            value={inputs.week_day}
            onChange={updateInputs}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={inputs.time}
            onChange={updateInputs}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
