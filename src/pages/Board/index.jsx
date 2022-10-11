import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import { Popconfirm, Modal, Input, Button, Tooltip, Select, DatePicker, message, Checkbox, TimePicker } from 'antd';
import { FaPlus, FaCalendarAlt, FaTrash, FaQuestionCircle } from "react-icons/fa";
import moment from 'moment';

import { Header } from '../../components/Header'

import { Container, BoardFilter, AddTaskContainer, BoardContainer, Column, Card, Item, CardHeader, PriorityColor, CardTaskDetails, RecurringTaskContainer } from "./styles";
import './styles.jsx';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const dialogText = 'Tem certeza que deseja excluir esta tarefa?';
const cardTaskDetailsText = 'Clique para ver detalhes desta tarefa';

export function Board() {
  const getBoardTasks = localStorage.getItem('@StudyNizer:boardTasks');
  const [state, setState] = useState(() => {
    if (getBoardTasks) {
      return JSON.parse(getBoardTasks);
    } else {
      return {
        "Tarefas": {
          title: "Tarefas",
          items: []
        },
        "Fazendo": {
          title: "Fazendo",
          items: []
        },
        "Concluído": {
          title: "Concluído",
          items: []
        }
    }
  }});
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState('Tarefas');
  const [open, setOpen] = useState(false);
  const [taskDueDate, setTaskDueDate] = useState([]);
  const [priority, setPriority] = useState("");
  const [modalMode, setModalMode] = useState("Salvar");
  const [searchTermTitle, setSearchTermTitle] = useState("");
  const [searchTermPriority, setSearchTermPriority] = useState(undefined);
  const [recurringTask, setRecurringTask] = useState(false);
  const [recurringWeek, setRecurringWeek] = useState('');
  const [recurringTime, setRecurringTime] = useState('');
  const [searchTermTaskDueData, setSearchTermTaskDueData] = useState({
    min: 0,
    max: 0
  });

  localStorage.setItem('@StudyNizer:boardTasks', JSON.stringify(state));

  const taskTextsBlank = text?.trim() === "" || description?.trim() === "" || taskDueDate === undefined || priority === undefined;

  const handleDragEnd = ({destination, source}) => {
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
  }

  const saveTasksToLocalStorage = (boardTasks, tasksTitleDate) => {
    localStorage.setItem('@StudyNizer:boardTasks', JSON.stringify(boardTasks));

    let tasksTitleDateArr = [];
    tasksTitleDateArr = JSON.parse(localStorage.getItem('@StudyNizer:tasksTitleDate')) || [];
    tasksTitleDateArr.push(tasksTitleDate);
    localStorage.setItem('@StudyNizer:tasksTitleDate', JSON.stringify(tasksTitleDateArr));
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        [column]: {
          title: column,
          items: [
            {
              id: v4(),
              name: text,
              description: description,
              priority: priority,
              date: [taskDueDate[0], taskDueDate[1]],
            },
            ...prev?.[column].items
          ]
        }
      }
    })

    const boardTasks = state;
    const tasksTitleDate = {
      name: text,
      date: [taskDueDate[0], taskDueDate[1]],
      priority: priority
    };

    saveTasksToLocalStorage(boardTasks, tasksTitleDate);

    setText("");
    setDescription("");
    setTaskDueDate([]);
    setPriority("");
    setOpen(false);
    message.success('Tarefa adicionada!');
  }

  // TODO - Remover task pelo ID e não pelo index
  const removeitem = (data, index) => {
    setState(current => {
      const copy = {...current};

      delete copy[data.title].items[index];

      return copy;
    })

    const getTasksTitleDate = JSON.parse(localStorage.getItem('@StudyNizer:tasksTitleDate'))
    getTasksTitleDate.splice(index, 1);
    localStorage.setItem('@StudyNizer:tasksTitleDate', JSON.stringify(getTasksTitleDate));
  }

  const confirm = (data, index) => {
    removeitem(data, index);
    message.success('Tarefa removida!');
  };

  const showModal = (data, el, modalMode) => {
    setOpen(true);
    setColumn(data.title);
    setText(el?.name);
    setDescription(el?.description);
    setPriority(el?.priority);
    setTaskDueDate(el?.date);

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
  console.log('setRecurringWeek', recurringWeek)

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
            onClick={addItem}
          >{`${modalMode} Tarefa`}</Button>
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
              <Column key={key}>
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
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {data.items.filter((el) => handleFilterCard(el)).map((el, index) => {
                            if (el !== undefined) {
                              return(
                                <Draggable key={el?.id} index={index} draggableId={el?.id}>
                                  {(provided, snapshot) => {
                                    return(
                                      <Item
                                        isDragging={snapshot.isDragging}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >      
                                        <Popconfirm placement="right" title={dialogText} onConfirm={() => confirm(data, index)} okText="Sim" cancelText="Não">
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
    </Container>
  );
}
