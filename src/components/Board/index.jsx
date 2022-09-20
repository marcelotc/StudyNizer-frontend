import React, { useState } from 'react';
import initialData from './data';
import Column from './column';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  padding: 30px;
`;

const Board = () => {
  const [initialDataState, setInitialDataState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) { return }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const start = initialDataState.columns[source.droppableId];
    const finish = initialDataState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...initialDataState,
        columns: {
          ...initialDataState.columns,
          [newColumn.id]: newColumn,
        }
      }

      setInitialDataState(newState)
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...initialDataState,
      columns: {
        ...initialDataState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    setInitialDataState(newState);
  };
    return (
    <Container>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {
          initialDataState.columnOrder.map((columnId) => {
            const column = initialDataState.columns[columnId];
            const tasks = column.taskIds.map(taskId => initialDataState.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
        </DragDropContext>
      </Container>
    )
  }

export default Board