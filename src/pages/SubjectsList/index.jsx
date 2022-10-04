import React, { useState, useEffect } from 'react';
import { v4 } from "uuid";
import { Modal, Button, Input, Tooltip, message, Popconfirm } from 'antd';
import { FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
 
import { Header } from '../../components/Header'
import { Container, ListContainer, CardLink, CardContainer, Card, AddCard, AddSubjectModal, ListInnerContainer, CardContainerList } from './styles';

export function SubjectsList() {

  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [modalMode, setModalMode] = useState("Adicionar");

  const getSubjects = JSON.parse(localStorage.getItem('@StudyNizer:subjects'))
  localStorage.setItem('@StudyNizer:subjects', JSON.stringify(subjects));

  const subjectTitleBlank = subjectTitle?.trim() === "";

  useEffect(() => {
    if (getSubjects) {
      setSubjects(getSubjects);
    } else {
      setSubjects([]);
    }
  }, []);

  const saveSubjectsToLocalStorage = (subjects) => {
    let subjectsArr = [];
    subjectsArr = JSON.parse(localStorage.getItem('@StudyNizer:subjects')) || [];
    subjectsArr.push(subjects);
    localStorage.setItem('@StudyNizer:subjects', JSON.stringify(subjectsArr));
  }


  const handleAddSubject = () => {
    const subjectId = v4();

    setSubjects(subjects => [...subjects, {
      id: subjectId,
      title: subjectTitle,
    }]);

    const subjects = {
      id: subjectId,
      title: subjectTitle,
    };

    setOpen(false);

    saveSubjectsToLocalStorage(subjects);
  }

  const showModal = (subjectTitle, modalMode) => {
    setOpen(true);
    setSubjectTitle(subjectTitle);
    setModalMode(modalMode)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemoveSubject = (id) => {
    setSubjects(current =>
      current.filter(subject => {
        return subject.id !== id;
    }));
  }

  const confirm = (data, index) => {
    handleRemoveSubject(data, index);
    message.success('Disciplina removida!');
  };
    
  return (
    <Container>
      <Header/>
      <ListContainer>
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
              maxlength="70"
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
        <ListInnerContainer>
          <CardContainerList>
            {subjects?.map((subject, index) => {
              return (
                <CardContainer key={subject.id}>
                  <div>
                    <Tooltip placement="top" title="Editar nome da disicplina">
                      <FaPencilAlt onClick={() => showModal(subject.title, 'Editar')} />
                    </Tooltip>
                    <Popconfirm placement="right" title={"Tem certeza que deseja excluir esta disciplina?"} onConfirm={() => confirm(subject.id)} okText="Sim" cancelText="Não">
                      <Tooltip placement="top" title="Excluir disicplina">
                        <FaTrashAlt />
                      </Tooltip>
                    </Popconfirm>
                  </div>
                  <CardLink 
                    title={subject.title}
                    to={`/subject-anotations/${subject.title.replace(/ /g, '-').toLowerCase()}-${subject.id}`} 
                    state={{ subject: subject }}
                  >
                    <Tooltip placement="bottom" title="Ver resumos da disciplina">
                      <Card key={subject.id} className="subjectCard">
                        <img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />
                        <p>{subject.title}</p>
                      </Card>
                    </Tooltip>
                  </CardLink>
                </CardContainer>
              )})}
            <Tooltip placement="bottom" title="Adicionar Disciplina">
              <AddCard onClick={() => showModal("", 'Adicionar')}>
                <div className='addCardHeader'></div>
                <div className='addCardBody'>
                  <FaPlus />
                </div>
              </AddCard>
            </Tooltip>
          </CardContainerList>
        </ListInnerContainer>
      </ListContainer>
    </Container>
  );
}
