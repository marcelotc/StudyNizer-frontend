import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import { Popconfirm, Modal, Input, Button, Tooltip, Select, DatePicker, message } from 'antd';
import { FaPlus, FaCalendarAlt, FaTrash } from "react-icons/fa";
import moment from 'moment';

import { setCalendarDate } from '../../store/modules/calendarDate/actions';

import { Header } from '../../components/Header'

import { Container, BoardFilter, AddTaskContainer, BoardContainer, Column, Card, Item, CardHeader, PriorityColor, CardTaskDetails } from "./styles";
import './styles.jsx';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY HH:mm:ss";

const item = {
  id: v4(),
  name: "Revisar conteúdo",
  description: "Lorem celou is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Alta",
  date: [moment('11/02/2022 13:11:11', dateFormat), moment('02/02/2022 15:11:11', dateFormat)],
}

const item2 = {
  id: v4(),
  name: "Resumo de programação",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Média",
  date: [moment('01/01/2022 09:11:11', dateFormat), moment('02/01/2022 11:11:11', dateFormat)],
}

const item3 = {
  id: v4(),
  name: "Revisar SO",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Baixa",
  date: [moment('08/05/2022 12:11:11', dateFormat), moment('13/05/2022 15:11:11', dateFormat)],
}

const item4 = {
  id: v4(),
  name: "Revisar matéria",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Alta",
  date: [moment('11/11/2022 11:11:11', dateFormat), moment('12/11/2022 14:11:11', dateFormat)],
}

const item5 = {
  id: v4(),
  name: "Estudar para prova",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Média",
  date: [moment('06/05/2022 08:11:11', dateFormat), moment('07/09/2022 09:11:11', dateFormat)],
}

const item6 = {
  id: v4(),
  name: "Fazer trabalho",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Baixa",
  date: [moment('09/09/2022 11:11:11', dateFormat), moment('09/09/2022 12:11:11', dateFormat)],
}

const dialogText = 'Tem certeza que deseja excluir esta tarefa?';
const cardTaskDetailsText = 'Clique para ver detalhes desta tarefa';


export function Board() {
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")
  const [state, setState] = useState({
    "Tarefas": {
      title: "Tarefas",
      items: [item, item2]
    },
    "Fazendo": {
      title: "Fazendo",
      items: [item3, item4, item5]
    },
    "Concluído": {
      title: "Concluído",
      items: [item6]
    }
  })
  const dispatch = useDispatch();
  const [column, setColumn] = useState('Tarefas');
  const [open, setOpen] = useState(false);
  const [taskDueDate, setTaskDueDate] = useState([]);
  const [priority, setPriority] = useState("");
  const [modalMode, setModalMode] = useState("Salvar");
  const [searchTermTitle, setSearchTermTitle] = useState("");
  const [searchTermPriority, setSearchTermPriority] = useState(undefined);
  const [searchTermTaskDueData, setSearchTermTaskDueData] = useState({
    min: 0,
    max: 0
  });

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

    setText("");
    setDescription("");
    setTaskDueDate([]);
    setPriority("");
    setOpen(false);
    message.success('Tarefa adicionada!');
    dispatch(setCalendarDate(taskDueDate));
  }

  // TODO - Remover task pelo ID e não pelo index
  const removeitem = (data, index) => {
    setState(current => {
      const copy = {...current};

      delete copy[data.title].items[index];

      return copy;
    })
  }

  const confirm = (data, index) => {
    removeitem(data, index);
    message.success('Tarefa removida!');
  };

  const showModal = (data, el, modalMode) => {
    setOpen(true);
    setColumn(data.title)

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
    console.log('el', el?.date)
    if (
      el?.date !== undefined &&
      (el?.date[0]?.toDate().getTime()) >= searchTermTaskDueData.min && 
      (el?.date[0]?.toDate().getTime()) <= searchTermTaskDueData.max
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
          <RangePicker showTime format={dateFormat} value={taskDueDate !== undefined ? [moment(taskDueDate[0], dateFormat), moment(taskDueDate[1], dateFormat)] : null}  onChange={handleDateChange} />
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
