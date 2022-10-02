import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Tooltip, message, Popconfirm } from 'antd';
import { FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
 
import { Header } from '../../components/Header'
import { Container, ListContainer, CardLink, CardContainer, Card, AddCard, AddSubjectModal, ListInnerContainer, CardContainerList } from './styles';

export function SubjectsList() {

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
      id: "ksfkasds",
      title: "Disciplina 5",
      description: "bem loca essa disciplina"
    },
    {
      id: "ksfks22",
      title: "Disciplina 6",
      description: "bem loca essa disciplina"
    },
    {
      id: "ksfksasd",
      title: "Disciplina 7",
      description: "bem loca essa disciplina"
    },
    {
      id: "ksfkasds11",
      title: "Disciplina 8",
      description: "bem loca essa disciplina"
    }
  ]

  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [modalMode, setModalMode] = useState("Adicionar");

  const subjectTitleBlank = subjectTitle?.trim() === "";

  useEffect(() => {
    setSubjects(subjectsArr);
  }, []);

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
                    to={`/subjectAnotations/${subject.title.replace(/ /g, '-').toLowerCase()}-${subject.id}`} 
                    state={{ subject: subject }}
                  >
                    <Tooltip placement="bottom" title="Ver resumos da disciplina">
                      <Card key={subject.id} className="subjectCard">
                        <img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />
                        <h1>{subject.title}</h1>
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
