import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

const colors = [
  'indigo',
  'blue',
  'orange',
  'red',
  'pink',
  'crimson',
  'dodgerblue',
  'brown',
  'purple',
  'tomato',
  'salmon',
  'gray',
];

export const generateDemoEvents = (taskDate) => {
  const events = [];

  const Event = (props) => {
    return (
        <div>
            <p style={{ fontSize: 15, color: '#fff' }}>{props.summary}</p>
        </div>
    );
  };

  const renderPriorityColor = (priority) => {
    if(priority === 'Alta') {
      return '#E77669';
    } else if (priority === 'Baixa') {
      return '#BEEC5A';
    }

    return '#EEE950'
  }

  let taskEvents = taskDate.map(task => {
    const taskEvent = {
      id: v4(),
      startAt: task.date[0],
      endAt: task.date[1],
      summary: task.name,
      color: renderPriorityColor(task.priority),
      allDay: false /*endDate.day !== startDate.day*/,


      /* Estilização para mostar que um evento foi finalizado ou feito  */
      
      // style: {
      //   textDecoration: 'line-through',
      //   border: 'solid 1px red',
      //   background: 'white',
      //   color: 'black',
      // },
    };

    return taskEvent;
  })  

  for(var i=0; i<taskEvents.length; i++){
    events.push(taskEvents[i]);
  }
  
  return events;
};
