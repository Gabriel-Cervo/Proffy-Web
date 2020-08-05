import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import api from "../../services/api";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    avatar: "",
    whatsapp: "",
    bio: "",
    subject: "",
    cost: "",
  });

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function updateValue(e) {
    const { id: name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  function setScheduleItemValue(position, field, value) {
    const updatedScheduleArray = scheduleItems.map((item, index) =>
      position === index ? { ...item, [field]: value } : item
    );

    setScheduleItems(updatedScheduleArray);
  }

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("/classes", {
        ...input,
        cost: Number(input.cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        history.push("/");
      })
      .catch(() => {
        alert("Erro ao cadastrar informações :(");
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={input.name}
              onChange={updateValue}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={input.avatar}
              onChange={updateValue}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={input.whatsapp}
              onChange={updateValue}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={input.bio}
              onChange={updateValue}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matérias"
              value={input.subject}
              onChange={updateValue}
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
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={input.cost}
              onChange={updateValue}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => (
              <div key={item.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  onChange={(e) =>
                    setScheduleItemValue(index, "week_day", e.target.value)
                  }
                  value={item.week_day}
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quinta-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  onChange={(e) =>
                    setScheduleItemValue(index, "from", e.target.value)
                  }
                  value={item.from}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  onChange={(e) =>
                    setScheduleItemValue(index, "to", e.target.value)
                  }
                  value={item.to}
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
