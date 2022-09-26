import React, {useState} from 'react';
import './styles.jsx';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

import { Container, AddTaskContainer, BoardContainer, Column, Card, Item } from "./styles";

const item = {
  id: v4(),
  name: "item"
}

const item2 = {
  id: v4(),
  name: "item2"
}

const item3 = {
  id: v4(),
  name: "item3"
}

const item4 = {
  id: v4(),
  name: "item4"
}

const item5 = {
  id: v4(),
  name: "item5"
}

const item6 = {
  id: v4(),
  name: "item6"
}

function Board() {
  const [text, setText] = useState("")
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
              name: text
            },
            ...prev?.[column].items
          ]
        }
      }
    })

    setText("")
  }

  const removeitem = (data, index) => {

    setState(current => {
      const copy = {...current};

      delete copy[data.title].items[index];

      return copy;
    })
  }

  return (
    <Container>
      <AddTaskContainer>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <label for="cars">Coluna:</label>

        <select name="coluna" id="coluna" value ={column} onChange={(e) => setColumn(e.target.value)}>
          <option value="Fazendo">Fazendo</option>
          <option value="Tarefas">Tarefas</option>
          <option value="Concluído">Concluído</option>
        </select>
        
        <button 
          disabled={text.trim() === "" ? true : false} 
          style={{ opacity: text.trim() === "" ? '' : '0.8', 
          cursor: text.trim() === "" ? 'not-allowed' : ''}} 
          onClick={addItem}
        >Adicionar Tarefa</button>
      </AddTaskContainer>
      <BoardContainer>
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return(
              <Column key={key}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return(
                      <Card
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {data.items.map((el, index) => {
                          return(
                            <Draggable key={el.id} index={index} draggableId={el.id}>
                              {(provided, snapshot) => {
                                return(
                                  <Item
                                    isDragging={snapshot.isDragging}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <span style={{cursor: 'pointer'}} onClick={() => removeitem(data, index)}>X</span>
                                    {el.name}
                                  </Item>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </Card>
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