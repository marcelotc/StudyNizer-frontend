import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Tooltip } from 'antd';
import { FaPlus, FaPencilAlt } from "react-icons/fa";
 
import { Container, CardLink, CardContainer, Card, AddCard, AddSubjectModal } from './styles';

export default function SubjectsCard() {

  const subjectsArr = [
    {
      id: "diras",
      title: "Disciplina 1",
      description: "bem loca essa disciplina"
    },
    {
      id: "jknkasf",
      title: "Disciplina 2",
      description: "bem loca essa disciplina"
    },
    {
      id: "pkooff",
      title: "Disciplina 3",
      description: "bem loca essa disciplina"
    },
    {
      id: "lkfmskf",
      title: "Disciplina 4",
      description: "bem loca essa disciplina"
    },
    {
      id: "ksfks",
      title: "Disciplina 5",
      description: "bem loca essa disciplina"
    }
  ]

  const [subjects, setSubjects] = useState(subjectsArr);
  const [open, setOpen] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [modalMode, setModalMode] = useState("Adicionar");

  const subjectTitleBlank = subjectTitle?.trim() === "";

  const handleAddSubject = () => {
    setSubjects(subjects => [...subjects, {
      id: "ksfks",
      title: subjectTitle,
    }]);
    setOpen(false);
  }

  const showModal = (subjectTitle, modalMode) => {
    setOpen(true);
    setSubjectTitle(subjectTitle);
    setModalMode(modalMode)
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  return (
    <Container>
      <Modal
        title={`${modalMode} disciplina`}
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Fechar
          </Button>
        ]}
      >
        <AddSubjectModal>
          <Input 
            placeholder="Nome da disciplina" 
            value={subjectTitle} 
            onChange={(e) => setSubjectTitle(e.target.value)} 
          />
          <Button
            type='primary'
            disabled={subjectTitleBlank ? true : false}
            style={{
              opacity: subjectTitleBlank ? '' : '0.8',
              cursor: subjectTitleBlank ? 'not-allowed' : ''
            }}
            onClick={handleAddSubject}
          >Salvar</Button>
        </AddSubjectModal>
      </Modal>
      {subjects.map((subject) => (
        <CardContainer>
          <div>
            <Tooltip placement="top" title="Editar nome da disicplina">
              <FaPencilAlt onClick={() => showModal(subject.title, 'Editar')} />
            </Tooltip>
          </div>
          <CardLink to={`/subject/${subject.id}`} title={subject.title}>
            <Tooltip placement="bottom" title="Ver resumos da disicplina">
              <Card key={subject.id} className="subjectCard">
                <img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />
                <h1>{subject.title}</h1>
              </Card>
            </Tooltip>
          </CardLink>
        </CardContainer>
      ))}
      <AddCard onClick={() => showModal("", 'Adicionar')}>
        <FaPlus />
      </AddCard>
    </Container>
  );
}
