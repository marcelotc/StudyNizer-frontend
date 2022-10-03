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

export const generateDemoEvents = (
  date = DateTime.now(),
  count = 250
) => {
  const events = [];

  const start= date
    .set({ day: 1 })
    .minus({ month: 2 })
    .toFormat('yyyy-MM-dd');
  const end= date
    .set({ day: 28 })
    .plus({ month: 2 })
    .toFormat('yyyy-MM-dd');

  for (let i = 1; i < count; i += 1) {
    const dateStart = faker.date.between(start, end);

    const hour = Math.floor(Math.random() * 23) + 1;
    const minute = Math.floor(Math.random() * 40) + 1;
    const minuteDuration = Math.floor(Math.random() * 120) + 30;

    const startDate = DateTime.fromJSDate(dateStart).set({
      hour: hour,
      minute: minute,
    });
    const endDate = startDate.plus({ minute: minuteDuration });

    console.log('startDate.toUTC().toString()', startDate.toUTC().toString())
    console.log('endDate.toUTC().toString()', endDate.toUTC().toString())
    console.log('faker.commerce.department()', faker.commerce.department())
    console.log('colors[Math.floor(Math.random() * colors.length - 1) + 1]', colors[Math.floor(Math.random() * colors.length - 1) + 1])
    console.log('endDate.day !== startDate.day', endDate.day !== startDate.day)

    const Event = (props) => {
      return (
          <div>
              <p style={{ fontSize: 15, color: '#fff' }}>{props.summary}</p>
          </div>
      );
  };

    const summary = faker.commerce.department();
    const startAt = startDate.toUTC().toString();
    const endAt = endDate.toUTC().toString();
    const startTime = startDate.toLocaleString(DateTime.TIME_SIMPLE).toString();
    const endTime = endDate.toLocaleString(DateTime.TIME_SIMPLE).toString();
    
    const event= {
      id: v4(),
      startAt,
      endAt,
      summary,
      color: colors[Math.floor(Math.random() * colors.length - 1) + 1],
      allDay: endDate.day !== startDate.day,
      children: {
        daysView: <Event 
                    summary={summary} 
                    startTime={startTime} 
                    endTime={endTime} 
                  /> // Opções: agendaView, daysView, monthView
      }

      /* Estilização para mostar que um evento foi finalizado ou feito  */
      
      // style: {
      //   textDecoration: 'line-through',
      //   border: 'solid 1px red',
      //   background: 'white',
      //   color: 'black',
      // },
    };

    events.push(event);
  }

  return events;
};
