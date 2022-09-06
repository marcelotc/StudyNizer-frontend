import React, { useState } from 'react';
import Kalend, { CalendarView } from 'kalend' // import component
import 'kalend/dist/styles/index.css'; // import styles
import { AppstoreOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GlobalStyle } from '../styles/globalStyles';
import { Menu } from 'antd';
import Board from '../components/Board';


import SubjectsCard from '../components/SubjectsCard';

const App = () => {
    const [current, setCurrent] = useState('subjects');

    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: 'Disciplinas',
            key: 'subjects',
            icon: <BookOutlined />,
        },
        {
            label: 'Board',
            key: 'board',
            icon: <AppstoreOutlined />,
            //disabled: true,
        },
        {
            label: 'Calendário',
            key: 'calendar',
            icon: <CalendarOutlined />,
        },
    ];

    const events = [
        {
            id: 1,
            startAt: '2022-09-06T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'test',
            color: 'blue',
            calendarID: 'work'
        },
        {
            id: 2,
            startAt: '2021-11-21T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'test',
            color: 'blue'
        }
    ]

    const renderSection = () => {
        switch (current) {
            case 'subjects': return <SubjectsCard/>; 
            case 'board': return <Board />;
            case 'calendar': return (
                <Kalend
                    onEventClick={() => {}}
                    onNewEventClick={() => {}}
                    events={events}
                    initialDate={new Date().toISOString()}
                    hourHeight={60}
                    initialView={CalendarView.WEEK}
                    disabledViews={[CalendarView.DAY]}
                    onSelectView={() => { }}
                    selectedView={() => { }}
                    onPageChange={() => { }}
                    timeFormat={'24'}
                    weekDayStart={'Monday'}
                    calendarIDsHidden={['work']}
                    language={'ptBR'}
                />
            )
            default: return <h1>DISCIPLINAS</h1>;
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            {renderSection()}
            <GlobalStyle />
        </DndProvider>
    );
};

export default App;