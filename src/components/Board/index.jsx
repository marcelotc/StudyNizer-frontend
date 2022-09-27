import React, {useState} from 'react';
import './styles.jsx';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import { Popconfirm, Modal, Input, Button, Tooltip, Select, DatePicker } from 'antd';
import { FaPlus, FaCalendarAlt, FaTrash } from "react-icons/fa";
import moment from 'moment';

import { Container, AddTaskContainer, BoardContainer, Column, Card, Item, CardHeader, PriorityColor, CardTaskDetails } from "./styles";

const { Option } = Select;
const { TextArea } = Input;

const item = {
  id: v4(),
  name: "Revisar conteúdo",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Alta",
  date: "05-04-2022 18:32:05",
}

const item2 = {
  id: v4(),
  name: "Resumo de programação",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Média",
  date: "28-02-2022 17:11:06",
}

const item3 = {
  id: v4(),
  name: "Revisar SO",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Baixa",
  date: "01-01-2022 16:23:11",
}

const item4 = {
  id: v4(),
  name: "Revisar matéria",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Alta",
  date: "09-03-2022 10:33:09",
}

const item5 = {
  id: v4(),
  name: "Estudar para prova",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Média",
  date: "15-06-2022 13:19:11",
}

const item6 = {
  id: v4(),
  name: "Fazer trabalho",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  priority: "Baixa",
  date: "11-04-2022 23:39:13",
}

const dialogText = 'Tem certeza que deseja excluir esta tarefa?';
const cardTaskDetailsText = 'Clique para ver detalhes desta tarefa';

const dateFormat = "DD-MM-YYYY HH:mm:ss";

function Board() {
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
  const [column, setColumn] = useState('Tarefas');
  const [open, setOpen] = useState(false);
  const [taskDueDate, setTaskDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [modalMode, setModalMode] = useState("Adicionar");

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
              date: taskDueDate,
            },
            ...prev?.[column].items
          ]
        }
      }
    })

    setText("");
    setDescription("");
    setTaskDueDate("");
    setPriority("");
    setOpen(false);
  }

  const removeitem = (data, index) => {

    setState(current => {
      const copy = {...current};

      delete copy[data.title].items[index];

      return copy;
    })
  }

  const confirm = (data, index) => {
    removeitem(data, index);
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
      setModalMode("Adicionar");
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
    setTaskDueDate(date.format(dateFormat));
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

  const taskTextsBlank = text?.trim() === "" || description?.trim() === "" || taskDueDate === undefined || priority === undefined;

  return (
    <Container>
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
          <DatePicker showTime format={dateFormat} value={taskDueDate !== undefined ? moment(taskDueDate, dateFormat) : null}  onChange={handleDateChange} />
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
                    
                          {data.items.map((el, index) => {
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
                                        <FaTrash />
                                      </Popconfirm>
                                      <Tooltip placement="bottom" title={cardTaskDetailsText}>
                                        <CardTaskDetails onClick={() => showModal(data, el, 'edit')}>
                                          <h3>{el?.name}</h3>
                                          <p className='taskDescription'>{el?.description}</p>
                                          {renderPriorityColor(el?.priority)}
                                          <div className='taskDate'>
                                            <p>{el?.date}</p>
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

export default Board;