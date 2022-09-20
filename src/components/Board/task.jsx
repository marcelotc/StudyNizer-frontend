import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const TaskContainer = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  min-height: 113px;
  
  &:hover {
    cursor: grabbing;
  }
`;

const Task = (props) => {
    return (
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided) => (
          <TaskContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.task.content}
          </TaskContainer>
        )}
      </Draggable>
    );
  }

export default Task;