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

export const generateDemoEvents = (taskData) => {
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
  
  const testDate = [{
      name: "Fazer exercico da lista 3",
      date: [
        "Sun Jan 02 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 09 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 16 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 23 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 30 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Feb 06 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Feb 13 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Feb 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Feb 27 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Mar 06 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Mar 13 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Mar 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Mar 27 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Apr 03 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Apr 10 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Apr 17 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Apr 24 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun May 01 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun May 08 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun May 15 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun May 22 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun May 29 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jun 05 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jun 12 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jun 19 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jun 26 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jul 03 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jul 10 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jul 17 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jul 24 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jul 31 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Aug 07 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Aug 14 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Aug 21 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Aug 28 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Sep 04 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Sep 11 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Sep 18 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Sep 25 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Oct 02 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Oct 09 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Oct 16 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Oct 23 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Oct 30 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Nov 06 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Nov 13 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Nov 20 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Nov 27 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Dec 04 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Dec 11 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Dec 18 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Dec 25 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 01 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 08 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 15 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 22 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Jan 29 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Feb 05 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)",
        "Sun Feb 12 2023 00:00:00 GMT-0300 (Horário Padrão de Brasília)"
        ],
      priority: "Alta"
  }]
//https://codesandbox.io/s/rschedule-starter-forked-dq359m?file=/src/index.ts
    console.log('taskData', taskData)

  let taskEvents = taskData.map(task => {

    const taskEvent = {
      id: v4(),
      startAt: task.due_date_start,
      endAt: task.due_date_end,
      summary: task.title,
      color: renderPriorityColor(task.priority),
      allDay: false /*endDate.day !== startDate.day*/,


      /* Estilização para mostar que um evento foi finalizado ou feito  */
      
       /* style: {
         textDecoration: 'line-through',
         border: 'solid 1px black',
         background: 'lightgray',
         color: 'black',
       }, */
    };

    return taskEvent;
  })  

  for(var i=0; i<taskEvents.length; i++){
    events.push(taskEvents[i]);
  }
  
  return events;
};
