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
  count = 1
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

    const dateStart = faker.date.between(start, end);

    const hour = Math.floor(Math.random() * 23) + 1;
    const minute = Math.floor(Math.random() * 40) + 1;
    const minuteDuration = Math.floor(Math.random() * 120) + 30;

    const startDate = DateTime.fromJSDate(dateStart).set({
      hour: hour,
      minute: minute,
    });
    const endDate = startDate.plus({ minute: minuteDuration });

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

    console.log('startAt', startAt)

    const event= {
      id: v4(),
      startAt: '2022-10-03T13:14:17+00:00',
      endAt: '2022-10-03T14:22:17.48+00:00',
      summary,
      color: colors[Math.floor(Math.random() * colors.length - 1) + 1],
      allDay: endDate.day !== startDate.day,


      /* Estilização para mostar que um evento foi finalizado ou feito  */
      
      // style: {
      //   textDecoration: 'line-through',
      //   border: 'solid 1px red',
      //   background: 'white',
      //   color: 'black',
      // },
    };

    events.push(event);

  return events;
};
