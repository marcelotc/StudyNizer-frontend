import React, {useState} from 'react';
import './styles.jsx';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import { Popconfirm, Modal, Input, Button, Tooltip, Select, DatePicker } from 'antd';
import { FaPlus } from "react-icons/fa";
 
import { Container, AddTaskContainer, BoardContainer, Column, Card, Item, CardHeader } from "./styles";

const { Option } = Select;

const item = {
  id: v4(),
  name: "item",
  description: "Blablabla"
}

const item2 = {
  id: v4(),
  name: "item2",
  description: "Blablabla",
  priority: "Baixo",
  date: "2022-09-21 23:39:13",
}

const item3 = {
  id: v4(),
  name: "item3",
  description: "Blablabla",
  priority: "Baixo",
  date: "2022-09-21 23:39:13",
}

const item4 = {
  id: v4(),
  name: "item4",
  description: "Blablabla",
  priority: "Baixo",
  date: "2022-09-21 23:39:13",
}

const item5 = {
  id: v4(),
  name: "item5",
  description: "Blablabla",
  priority: "Baixo",
  date: "2022-09-21 23:39:13",
}

const item6 = {
  id: v4(),
  name: "item6",
  description: "Blablabla",
  priority: "Baixo",
  date: "2022-09-21 23:39:13",
}

const dialogText = 'Tem certeza que deseja excluir esta tarefa?';
const toolTipText = 'Adicionar Tarefa';

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

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
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

  const showModal = (data) => {
    setOpen(true);
    setColumn(data.title)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    setPriority(value)
  };

  const handleDateChange = (value) => {
    const date = value;
    setTaskDueDate(date.format("YYYY-MM-DD HH:mm:ss"));
  };

  const renderPriorityColor = (priority) => {
    if(priority === 'Baixo') {
      return <div style={{background: 'green', color: '#fff', fontWeight: 'bold'}}>{priority}</div>
    } else if (priority === 'Médio') {
      return <div style={{ background: 'yellow', color: '#fff', fontWeight: 'bold' }}>{priority}</div>
    } else {
      return <div style={{ background: 'red', color: '#fff', fontWeight: 'bold' }}>{priority}</div>
  }
  }

  const taskTextsBlank = text.trim() === "" || description.trim() === "";

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
          <Input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Select
            placeholder="Prioridade"
            onChange={handleChange}
          >
            <Option value="alta">Alta</Option>
            <Option value="media">Média</Option>
            <Option value="baixa">Baixa</Option>
          </Select>
          <DatePicker showTime onChange={handleDateChange} />
          <Button
            type='primary'
            disabled={taskTextsBlank ? true : false}
            style={{
              opacity: taskTextsBlank ? '' : '0.8',
              cursor: taskTextsBlank ? 'not-allowed' : ''
            }}
            onClick={addItem}
          >Adicionar Tarefa</Button>
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
                          <Tooltip placement="top" title={toolTipText}>
                            <FaPlus onClick={() => showModal(data)} />
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
                                      <span style={{cursor: 'pointer'}}>X</span>
                                    </Popconfirm>
                                      <h3>{el?.name}</h3>
                                      <p>{el?.description}</p>
                                      {renderPriorityColor(el?.priority)}
                                      <p>{el?.date}</p>
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