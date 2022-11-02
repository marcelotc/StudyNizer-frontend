import React, { useState, useEffect, useRef } from 'react';
import FileSaver  from "file-saver";
import { Modal, Button, Input, Tooltip, message, Popconfirm, notification, Skeleton, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FaPlus, FaTrash, FaFileDownload, FaFileImport } from "react-icons/fa";
 
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

  const handleAddSubject = async (fileNameExport) => {
    console.log('subjectTitle', subjectTitle)
    if(subjects.find(subject =>  subject.title.replace(/ /g, '-').toLowerCase() === subjectTitle.replace(/ /g, '-').toLowerCase())) {
      notification.info({
        message: `Disciplina já adicionada!`,
        placement: 'top',
      });
      setFileName('');
    } else {
      try {
        setSubjectsLoad(true);
        await api.post(`/user/subjects`, {
          users_id: userId,
          title: subjectTitle || fileNameExport
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
    }
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

  const handleRemoveSubject = async (subjectId, subjectTitle) => {
    try {
      await api.delete(`/user/subjectsMarkdown/${userId}/${subjectTitle}`, {headers});
      await api.delete(`/user/subjects/${subjectId}`, {headers});
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
    }
    setSubjects(current =>
      current.filter(subject => {
        return subject.subject_id !== subjectId;
    }));
  }

  const confirm = (subjectId, subjectTitle) => {
    handleRemoveSubject(subjectId, subjectTitle);
    message.success('Disciplina removida!');
  };

  const handleExportSubject = async (subject) => {
    try {
      const res = await api.get(`/user/markdown/${userId}/${subject.title.replace(/ /g, '-').toLowerCase()}`, {headers});
      var blob = new Blob([JSON.stringify(res.data)], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, `${subject.title}.txt`);
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
    }
  }

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  let fileRef = useRef();

  const readFile = e => {
    const fileReader = new FileReader();
    const { files } = e.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = e => {
      var content = e.target.result;
      setFileContent(JSON.parse(content));
      setFileName(files[0].name);
    };

  };

  const handleImportSubject = async (e) => {
    e.stopPropagation();
    const removeParenthesis = fileName.replace(/[\])}[{(1-9]/g, '');
    const removeExtension = removeParenthesis.replace('.txt', '');
    const fileNameSanitized = removeExtension.trim();

    if(subjects.find(subject =>  subject.title === fileNameSanitized)) {
      notification.info({
        message: `Disciplina já importada!`,
        placement: 'top',
      });
      setFileName('');
    } else {
      try {
        await api.post(`/user/markdownImport`, {
         users_id: userId,
         markdown_data: fileContent
        }, {headers});
     } catch (error) {
       notification.info({
         message: `${error?.response?.data?.error}`,
         placement: 'top',
       });
     }
     handleAddSubject(fileNameSanitized);
     setFileName('');
    }
    setUpdateSubject(!updateSubject);
  }

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
                          <Tooltip placement="top" title="Exportar disciplina">
                            <FaFileDownload onClick={() => handleExportSubject(subject)} />
                          </Tooltip>
                          <Popconfirm placement="right" title={"Tem certeza que deseja excluir esta disciplina?"} onConfirm={() => confirm(subject.subject_id, subject.title.replace(/ /g, '-').toLowerCase())} okText="Sim" cancelText="Não">
                            <Tooltip placement="top" title="Excluir disicplina">
                              <FaTrash />
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
              <Tooltip placement="bottom" title="Importar Disciplina">
                <AddCard isSubjectsEmpty={subjects.length === 0} onClick={() => fileRef.current.click()}>
                  <div className='addCardHeader'><input style={{display: 'none'}} ref={fileRef} type="file" onChange={readFile} /></div>
                  <div className='importCard'>
                    <FaFileImport />
                    <p style={{textAlign: 'center'}}>{fileName}</p>
                    {fileName && <Button style={{marginBottom: '10px'}} type='primary' key="back" onClick={(e) => handleImportSubject(e)}>
                      Importar disciplina
                    </Button>}
                  </div>
                </AddCard>
              </Tooltip>
            </CardContainerList>
            {subjects.length === 0 && <p className='subjectsEmpty'>Nenhuma disciplina cadastrada, clique em um botão para adicionar ou importar uma disciplina</p>}
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
