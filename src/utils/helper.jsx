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

  const summary = faker.commerce.department();

  let taskEvents = taskDate.map(task => {
    const taskEvent = {
      id: v4(),
      startAt: task[0].format("YYYY-MM-DDTHH:mm:ssZ"),
      endAt: task[1].format("YYYY-MM-DDTHH:mm:ssZ"),
      summary,
      color: colors[Math.floor(Math.random() * colors.length - 1) + 1],
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
