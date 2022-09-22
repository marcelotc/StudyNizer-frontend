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
    "todo": {
      title: "Tarefas",
      items: [item, item2, item3, item4, item5, item6]
    },
    "in-progress": {
      title: "Fazendo",
      items: []
    },
    "done": {
      title: "Concluído",
      items: []
    }
  })

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
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }

  return (
    <Container>
      <AddTaskContainer>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addItem}>Adicionar Tarefa</button>
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
                                console.log(snapshot)
                                return(
                                  <Item
                                    isDragging={snapshot.isDragging}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
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