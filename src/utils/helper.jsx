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

  console.log('taskData', taskData)
    
  //https://codesandbox.io/s/rschedule-starter-forked-dq359m?file=/src/index.ts

  /*FORMATO DAS TAREFAS RECORRENTES */

  /** Dai mergear o atributo recurringTasks de cada 
   * tabela de tasks todo, doing, completed etc... */

    const recurringTaksObj = {
      user_id: "f3d9395e-5029-4e43-b5ed-72db6d67452e",
      name: "a",
      email: "a",
      task_id: "d010d33e-8c75-4f64-aac8-24cc61e79e0a",
      title: "Revisar matéria semana 9",
      description: "basd",
      priority: "Baixa",
      due_date_start: "2022-10-27T13:59:02.000Z",
      due_date_end: "2022-10-27T22:43:01.000Z",
      recurringTasks: [
        /* EXEMPLO o usuário escolheu que cada segunda tem que fazer essa tarefa */
        {
          title: 'nome ta tarefa',
          priority: 'Alta',
          startAt: '2022-10-21T10:30:00.000Z',
          endAt: '2022-10-21T19:30:00.000Z',
        },
        {
          title: 'nome ta tarefa',
          priority: 'Alta',
          startAt: '2022-10-07T10:30:00.000Z',
          endAt: '2022-10-07T10:30:00.000Z',
        },
        {
          title: 'nome ta tarefa',
          priority: 'Alta',
          startAt: '2022-10-14T10:30:00.000Z',
          endAt: '2022-10-14T10:30:00.000Z',
        },
      ]
  }

  let taskEvents = recurringTaksObj.recurringTasks.map(task => {
    console.log('tasktask', task.due_date_start)

    const taskEvent = {
      id: v4(),
      startAt: task.startAt,
      endAt: task.endAt,
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
