import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import { notification, Popconfirm, Modal, Input, Button, Tooltip, Select, DatePicker, Skeleton, message, Checkbox, TimePicker, Spin } from 'antd';
import { FaPlus, FaCalendarAlt, FaTrash, FaQuestionCircle } from "react-icons/fa";
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import Axios from 'axios';
import { v4 } from 'uuid';

import { setCalendarDate } from '../../store/modules/userSession/actions';
import { Header } from '../../components/Header'
import api from '../../services/api';

import { Container, BoardFilter, AddTaskContainer, BoardContainer, Column, Card, Item, CardHeader, PriorityColor, CardTaskDetails, RecurringTaskContainer } from "./styles";
import './styles.jsx';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const dialogText = 'Tem certeza que deseja excluir esta tarefa?';
const cardTaskDetailsText = 'Clique para ver detalhes desta tarefa';

export function Board() {
  const dispatch = useDispatch();
  const getUserSession = localStorage.getItem('@StudyNizer:userSession');
  const headers = { Authorization: `Bearer ${JSON.parse(getUserSession).token}` };
  const userId = JSON.parse(getUserSession).id;
  const getUserInfo = useSelector(state => state.userSession.userInfo);

  if(getUserInfo?.name !== '') {
    notification.success({
      message: `Bem vindo ${getUserInfo.name}!`,
      placement: 'bottomLeft',
    });
    dispatch(setCalendarDate({ name: '' }));
  }

  const [boardTasksLoad, setBoardTasksLoad] = useState(false);


  const [state, setState] = useState({
    "Tarefas": {
      title: "Tarefas",
      items: [],
      columnType: 'todo'
    },
    "Fazendo": {
      title: "Fazendo",
      items: [],
      columnType: 'doing'
    },
    "Concluído": {
      title: "Concluído",
      items: [],
      columnType: 'completed'
    }
});
  const [boardUpdate, setBoardUpdate] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      setBoardTasksLoad(true);
      const [ resTasksTodo, resTasksDoing, resTasksCompleted ] =  await Axios.all([
        api.get(`/user/board-tasks-todo/${JSON.parse(getUserSession).id}`, {headers}), 
        api.get(`/user/board-tasks-doing/${JSON.parse(getUserSession).id}`, {headers}),
        api.get(`/user/board-tasks-completed/${JSON.parse(getUserSession).id}`, {headers}),
      ]);

      let resTasksTodoArr = resTasksTodo.data.map((values) => {

        const tasksTodo = {
          id: values.task_id,
          name: values.title,
          description: values.description,
          priority: values.priority,
          date: [values.due_date_start, values.due_date_end],
        }

        return tasksTodo
      })

      let resTasksDoingArr = resTasksDoing.data.map((values) => {

        const tasksDoing = {
          id: values.task_id,
          name: values.title,
          description: values.description,
          priority: values.priority,
          date: [values.due_date_start, values.due_date_end],
        }

        return tasksDoing
      })

      let resTasksCompletedArr = resTasksCompleted.data.map((values) => {

        const tasksCompleted = {
          id: values.task_id,
          name: values.title,
          description: values.description,
          priority: values.priority,
          date: [values.due_date_start, values.due_date_end],
        }

        return tasksCompleted
      })
      
      const boardInitialState = {
        "Tarefas": {
          title: "Tarefas",
          items: resTasksTodoArr,
          columnType: 'todo'
        },
        "Fazendo": {
          title: "Fazendo",
          items: resTasksDoingArr,
          columnType: 'doing'
        },
        "Concluído": {
          title: "Concluído",
          items: resTasksCompletedArr,
          columnType: 'completed'
        }
    }
      setState(boardInitialState);
      setBoardTasksLoad(false);
    }
    getTasks();
  }, [boardUpdate]);

  const [cardId, setCardId] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState('Tarefas');
  const [columnType, setColumnType] = useState('');
  const [columnTypeToDelete, setColumnTypeToDelete] = useState('');
  const [open, setOpen] = useState(false);
  const [taskDueDate, setTaskDueDate] = useState([]);
  const [priority, setPriority] = useState("");
  const [modalMode, setModalMode] = useState("Salvar");
  const [searchTermTitle, setSearchTermTitle] = useState("");
  const [searchTermPriority, setSearchTermPriority] = useState(undefined);
  const [recurringTask, setRecurringTask] = useState(false);
  const [recurringWeek, setRecurringWeek] = useState('');
  const [recurringTime, setRecurringTime] = useState('');
  const [addTaskLoad, setAddTaskLoad] = useState(false);
  const [searchTermTaskDueData, setSearchTermTaskDueData] = useState({
    min: 0,
    max: 0
  });

  const taskTextsBlank = text?.trim() === "" || description?.trim() === "" || taskDueDate === undefined || priority === undefined;

  const handleDragEnd = async ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      prev[source.droppableId].items.splice(source.index, 1)

      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })

    if(columnType !== columnTypeToDelete) {
      try {
        await Axios.all[
          await api.post(`/user/board-tasks-${columnType}`, {
            id: cardId,
            users_id: userId,
            title: text,
            description: description,
            priority: priority,
            due_date_start: taskDueDate[0],
            due_date_end: taskDueDate[1]
          }, {headers}),
          await api.delete(`/user/board-tasks-${columnTypeToDelete}/${cardId}`, {headers})
        ]
      } catch (error) {
        /*notification.info({
          message: `${error?.response?.data?.error}`,
          placement: 'top',
        });*/
        console.log('error?.response?.data?.error', error?.response?.data?.error)
      }
    }
  }

  const handleFillStateForDragEnd = (data, el) => {
      setColumn(data?.columnType);
      setText(el?.name);
      setDescription(el?.description);
      setPriority(el?.priority);
      setTaskDueDate(el?.date);
      setCardId(el?.id)
  }

  const handleCurrentCardIdToDelete = (data) => {
      setColumnTypeToDelete(data?.columnType);
  }

  const addItem = async () => {
    try {
      setAddTaskLoad(true);
      await api.post(`/user/board-tasks-${columnType}`, {
        id: v4(),
        users_id: userId,
        title: text,
        description: description,
        priority: priority,
        due_date_start: taskDueDate[0].format("YYYY-MM-DDTHH:mm:ssZ"),
        due_date_end: taskDueDate[1].format("YYYY-MM-DDTHH:mm:ssZ")
      }, {headers});
      setBoardUpdate(!boardUpdate);
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
      setAddTaskLoad(false);
    }

    setText("");
    setDescription("");
    setTaskDueDate([]);
    setPriority("");
    setOpen(false);
    setAddTaskLoad(false);
    message.success('Tarefa adicionada!');
  }

  const editItem = async () => {
    try {
      setAddTaskLoad(true);
      await api.put(`/user/board-tasks-${columnType}/${cardId}`, {
        users_id: userId,
        title: text,
        description: description,
        priority: priority,
        due_date_start: taskDueDate[0],
        due_date_end: taskDueDate[1]
      }, {headers});
      setBoardUpdate(!boardUpdate);
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
      setAddTaskLoad(false);
    }
    setAddTaskLoad(false);
    setOpen(false);
    message.success('Tarefa editada!');
  }

  const removeitem = async (data, el, index) => {
    try {
      await api.delete(`/user/board-tasks-${data?.columnType}/${el?.id}`, {headers});
      message.success('Tarefa removida!', );
    } catch (error) {
      notification.info({
        message: `${error?.response?.data?.error}`,
        placement: 'top',
      });
    }

    setState(current => {
      const copy = {...current};

      delete copy[data.title].items[index];

      return copy;
    })
  }

  const confirm = (data, el, index) => {
    removeitem(data, el, index);
  };

  const showModal = (data, el, modalMode) => {
    setOpen(true);
    setColumn(data.title);
    setText(el?.name);
    setDescription(el?.description);
    setPriority(el?.priority);
    setTaskDueDate(el?.date);
    setColumnType(data?.columnType);

    if(modalMode === "edit") {
      setModalMode("Editar");
    } else {
      setModalMode("Salvar"); 
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setRecurringTask(false);
  };

  const handleChange = (value) => {
    setPriority(value);
  };

  const handleDateChange = (value) => {
    const date = value;
    setTaskDueDate([date[0], date[1]]);
  };

  const renderPriorityColor = (priority) => {
    if(priority === 'Baixa') {
      return <PriorityColor color='#BEEC5A'><p>{priority}</p></PriorityColor>
    } else if (priority === 'Média') {
      return <PriorityColor color='#EEE950'><p>{priority}</p></PriorityColor>
    } else {
      return <PriorityColor color='#E77669'><p>{priority}</p></PriorityColor>
    }
  }

  const handleFilterCard = (el) => {
    let taskDateStart = el?.date !== undefined ? new Date(el?.date[0]).getTime() : new Date();

    if (
      (taskDateStart) >= searchTermTaskDueData.min && 
      (taskDateStart) <= searchTermTaskDueData.max
    ) {
      return el;
    } else if (
      (searchTermTaskDueData.min === 0 && searchTermTaskDueData.max === 0) && 
      (searchTermPriority === undefined || searchTermPriority === "") && 
      el?.name?.toLocaleLowerCase().includes(searchTermTitle?.toLocaleLowerCase())
    ) {
      return el;
    } else if (
      searchTermTitle === "" && 
      el?.priority?.toLocaleLowerCase().includes(searchTermPriority?.toLocaleLowerCase())
      ) {
      return el;
    } 
  }
  
  const handleDateChangeFilter = (value) => {
    const date = value;
    
    if(date === null) {
      setSearchTermTaskDueData((prevState) => ({
        ...prevState,
            min: 0,
            max: 0
        }));
    } else {
      let min = date[0].toDate().getTime();
      let max = date[1].toDate().getTime();
  
  
      setSearchTermTaskDueData((prevState) => ({
      ...prevState,
          min: min,
          max: max
      }));
    }
  };

  const onChangeCheckBox = (e) => {
    setRecurringTask(e.target.checked);
  }

  function formatDate(date, modalMode, arrayPosition) {
    if(modalMode === 'Editar') {
      var d = new Date(date[arrayPosition]),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      let taskDate = [day, month, year].join('/');
      let taskTime = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

      return taskDate + ' ' + taskTime;
    } else {
      return date[arrayPosition]
    }
  }

  const onChangeRecurringWeek = (week) => {
    setRecurringWeek(week);
  }

  const onChangeRecurringTime = (time) => {
    setRecurringTime(time);
  }

  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

  return (
    <Container>
      <Header/>
      <Modal
        open={open}
        title={`Coluna "${column}"`}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Fechar
          </Button>
        ]}
      >
        <AddTaskContainer>
          <Input placeholder="Título" value={text} onChange={(e) => setText(e.target.value)} />
          <TextArea rows={6} placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Select
            placeholder="Prioridade"
            onChange={handleChange}
            value={priority}
          >
            <Option value="Alta">Alta</Option>
            <Option value="Média">Média</Option>
            <Option value="Baixa">Baixa</Option>
          </Select>
          {!recurringTask ? 
            <RangePicker showTime format={dateFormat} value={taskDueDate !== undefined ? [moment(formatDate(taskDueDate, modalMode, 0), dateFormat), moment(formatDate(taskDueDate, modalMode, 1), dateFormat)] : null}  onChange={handleDateChange} />
            : (
            <>
              <RecurringTaskContainer>
                {weekDays.map((week) => (
                  <p
                    className={`${recurringWeek == week && 'activeWeek'}`}
                    onClick={() => onChangeRecurringWeek(week)}>{week}</p>
                ))}
              </RecurringTaskContainer>
                <TimePicker onChange={onChangeRecurringTime} value={recurringTime !== '' ? moment(recurringTime, 'HH:mm:ss') : null} />
              </>
            )
          }
          <div className='recurrentTask'>
            <Checkbox onChange={onChangeCheckBox} checked={recurringTask}>Tarefa recorrente</Checkbox>                          
            <Tooltip placement="top" title="Tarefas que irão se repetir no dia da semana e horário selecionados">
              <FaQuestionCircle />
            </Tooltip>
          </div>
          <Button
            type='primary'
            disabled={taskTextsBlank ? true : false}
            style={{
              opacity: taskTextsBlank ? '' : '0.8',
              cursor: taskTextsBlank ? 'not-allowed' : ''
            }}
            onClick={modalMode !== 'Editar' ? addItem : editItem}
          >{!addTaskLoad ? `${modalMode} Tarefa` : <Spin indicator={antIcon} />}</Button>
        </AddTaskContainer>
      </Modal>
      <BoardFilter>
        <div>
          <Input 
            allowClear
            placeholder='Buscar tarefa pelo título' 
            value={searchTermTitle} 
            onChange={(e) => setSearchTermTitle(e.target.value)} 
          />
          <Select
            allowClear
            placeholder="Prioridade"
            onChange={(value) => setSearchTermPriority(value)}
            value={searchTermPriority}
          >
            <Option value="Alta">Alta</Option>
            <Option value="Média">Média</Option>
            <Option value="Baixa">Baixa</Option>
          </Select> 
          <RangePicker
            format={dateFormat} 
            onChange={handleDateChangeFilter} 
          />
        </div>
      </BoardFilter>
      <BoardContainer>
        <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
              return(
                <Column key={key} onMouseOver={() => setColumnType(data?.columnType)}>
                  <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                      return(
                        <>
                          <CardHeader>
                            <div>
                              <h3>{data.title}</h3>
                              <span>{state?.[data.title].items.length}</span>
                            </div>
                            <Tooltip placement="top" title="Adicionar Tarefa">
                              <FaPlus color='#fff' onClick={() => showModal(data)} />
                            </Tooltip>
                          </CardHeader> 
                            <Card
                              id='taskCard'
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                            {!boardTasksLoad ? (
                              <>
                              {data.items.filter((el) => handleFilterCard(el)).map((el, index) => {
                                if (el !== undefined) {
                                  return(
                                    <Draggable 
                                      key={el?.id} 
                                      index={index} 
                                      draggableId={el?.id}
                                    >
                                      {(provided, snapshot) => {
                                        return(
                                          <Item
                                            isDragging={snapshot.isDragging}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onMouseOver={() => handleFillStateForDragEnd(data, el)}
                                            onMouseDown={() => handleCurrentCardIdToDelete(data, el)}
                                          >      
                                            <Popconfirm placement="right" title={dialogText} onConfirm={() => confirm(data, el, index)} okText="Sim" cancelText="Não">
                                              <Tooltip placement="right" title="Excluir Tarefa">
                                                <FaTrash />
                                              </Tooltip>
                                            </Popconfirm>
                                            <Tooltip placement="bottom" title={cardTaskDetailsText}>
                                              <CardTaskDetails onClick={() => showModal(data, el, 'edit')}>
                                                <h3>{el?.name}</h3>
                                                <p className='taskDescription'>{el?.description}</p>
                                                {renderPriorityColor(el?.priority)}
                                                <div className='taskDate'>
                                                  <p>{moment(el?.date[0]).format(dateFormat)} - {moment(el?.date[1]).format(dateFormat)}</p>
                                                  <FaCalendarAlt />
                                                </div>
                                              </CardTaskDetails>
                                            </Tooltip>
                                          </Item>
                                        )
                                      }}
                                    </Draggable>
                                  )}
                                })}
                                </>
                              ) : <Skeleton active block />}
                              {provided.placeholder}
                          </Card>
                      </>
                      )
                    }}
                  </Droppable>
                </Column>
              )
          })}
        </DragDropContext>
      </BoardContainer>
      <div className='tour' onClick={() => alert('Colocar um tour aqui')}><FaQuestionCircle /></div>
    </Container>
  );
}
