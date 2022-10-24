import React, { useState, useEffect } from 'react';
import { v4 } from "uuid";
import { Modal, Button, Input, Tooltip, message, Popconfirm, notification, Skeleton, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
 
import { Header } from '../../components/Header'
import { Container, ListContainer, CardLink, CardContainer, Card, AddCard, AddSubjectModal, ListInnerContainer, CardContainerList } from './styles';
import api from '../../services/api';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

export function SubjectsList() {
  const getUserSession = localStorage.getItem('@StudyNizer:userSession');
  const headers = { Authorization: `Bearer ${JSON.parse(getUserSession).token}` };
  const userId = JSON.parse(getUserSession).id;

  const [subjects, setSubjects] = useState([]);
  const [subjectsLoad, setSubjectsLoad] = useState(false);
  const [updateSubject, setUpdateSubject] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [open, setOpen] = useState(false);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [modalMode, setModalMode] = useState("Adicionar");

  const subjectTitleBlank = subjectTitle?.trim() === "";

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setSubjectsLoad(true);
        const res = await api.get(`/user/subjects/${userId}`, {headers});
        setSubjects(res.data);
        setSubjectsLoad(false);
      } catch (error) {
        notification.info({
          message: `${error?.response?.data?.error}`,
          placement: 'top',
        });
        setSubjectsLoad(false);
      }
    }
    getSubjects();
  }, [updateSubject]);

  console.log(subjects)

  const handleAddSubject = async () => {
    try {
      setSubjectsLoad(true);
       await api.post(`/user/subjects`, {
        users_id: userId,
        title: subjectTitle
       }, {headers});
       setSubjectsLoad(false);
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
      setSubjectsLoad(false);
    }
    setSubjects(subjects => [...subjects, {
      title: subjectTitle,
    }]);
    setOpen(false);
  }

  const handleEditSubject = async () => {
    try {
      setSubjectsLoad(true);
       await api.put(`/user/subjects/${subjectId}`, {
        title: subjectTitle
       }, {headers});
       setSubjectsLoad(false);
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
      setSubjectsLoad(false);
    }
    setOpen(false);
    setUpdateSubject(!updateSubject);
  }

  const showModal = (subjectTitle, modalMode, subject_id) => {
    setOpen(true);
    setSubjectTitle(subjectTitle);
    setModalMode(modalMode)
    setSubjectId(subject_id)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemoveSubject = async (id) => {
    try {
      await api.delete(`/user/subjects/${id}`, {headers});
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
    }
    setSubjects(current =>
      current.filter(subject => {
        return subject.subject_id !== id;
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
              maxLength="70"
            />
            <Button
              type='primary'
              disabled={subjectTitleBlank ? true : false}
              style={{
                opacity: subjectTitleBlank ? '' : '0.8',
                cursor: subjectTitleBlank ? 'not-allowed' : ''
              }}
              onClick={modalMode !== 'Editar' ? handleAddSubject : handleEditSubject}
            >{!subjectsLoad ? modalMode !== 'Editar' ? 'Salvar' : 'Editar' : <Spin indicator={antIcon} />}</Button>
          </AddSubjectModal>
        </Modal>
        <ListInnerContainer>
        {!subjectsLoad ? (
          <>
            <CardContainerList>
                  {subjects?.map((subject) => {
                    return (
                      <CardContainer key={subject.subject_id}>
                        <div>
                          <Tooltip placement="top" title="Editar nome da disicplina">
                            <FaPencilAlt onClick={() => showModal(subject.title, 'Editar', subject.subject_id)} />
                          </Tooltip>
                          <Popconfirm placement="right" title={"Tem certeza que deseja excluir esta disciplina?"} onConfirm={() => confirm(subject.subject_id)} okText="Sim" cancelText="Não">
                            <Tooltip placement="top" title="Excluir disicplina">
                              <FaTrashAlt />
                            </Tooltip>
                          </Popconfirm>
                        </div>
                        <CardLink 
                          title={subject.title}
                          to={`/subject-annotations/${subject.title.replace(/ /g, '-').toLowerCase()}-${subject.subject_id}`} 
                          state={{ subject: subject }}
                        >
                          <Tooltip placement="bottom" title="Ver resumos da disciplina">
                            <Card key={subject.subject_id} className="subjectCard">
                              <img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />
                              <p>{subject.title}</p>
                            </Card>
                          </Tooltip>
                        </CardLink>
                      </CardContainer>
                    )})}
              <Tooltip placement="bottom" title="Adicionar Disciplina">
                <AddCard isSubjectsEmpty={subjects.length === 0} onClick={() => showModal("", 'Adicionar')}>
                  <div className='addCardHeader'></div>
                  <div className='addCardBody'>
                    <FaPlus />
                  </div>
                </AddCard>
              </Tooltip>
            </CardContainerList>
            {subjects.length === 0 && <p className='subjectsEmpty'>Nenhuma disciplina cadastrada, clique no botão para adicionar</p>}
          </>
          ) : <>
                <br/>
                <br/>
                <br/>
                <Skeleton active block />
              </>
          }
          </ListInnerContainer>
      </ListContainer>
    </Container>
  );
}
