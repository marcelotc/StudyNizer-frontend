import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import Kalend, { CalendarView, OnEventDragFinish } from 'kalend';
import { CALENDAR_VIEW } from 'kalend-layout';

import { Header } from '../../components/Header';
import { generateDemoEvents } from '../../utils/helper';

import 'kalend/dist/styles/index.css';
import { Container } from "./styles";

export const CalendComponent = (props) => {
    const kalendRef = useRef();
    const taskDate = useSelector(state => state.calendarDate.date);

    const [demoEvents, setDemoEvents] = useState([]);
    const [selectedView, setSelectedView] = useState(CALENDAR_VIEW.MONTH);
    const [selectedDate, setSelectedDate] = useState(
        DateTime.now().toFormat('MM.yyyy')
    );

    // Create and load demo events
    useEffect(() => {
        setDemoEvents(generateDemoEvents(taskDate));
    }, []);

    const onNewEventClick = (data) => {
        const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
            hour: data.hour,
            day: data.day,
            startAt: data.startAt,
            endAt: data.endAt,
            view: data.view,
            event: 'click event ',
        })}`;
        console.log(msg);
    };

    // Callback for event click
    const onEventClick = (data) => {
        const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
            data
        )}`;
        console.log(msg);
    };

    // Callback after dragging is finished
    const onEventDragFinish = (
        prev,
        current,
        data
    ) => {
        setDemoEvents(data);
    };

    const goForward = () => {
        kalendRef?.current?.navigateForward();
    };
    const goBack = () => {
        kalendRef?.current?.navigateBackwards();
    };
    const goToday = () => {
        kalendRef?.current?.navigateToTodayDate();
    };

    const onStateChange = (state) => {
        setSelectedDate(DateTime.fromISO(state.selectedDate).toFormat('MM.yyyy'));
    };

    return (
        <Container>
            <Header />
            <Kalend
                kalendRef={props.kalendRef}
                onNewEventClick={onNewEventClick}
                initialView={CalendarView.WEEK}
                disabledViews={[]}
                onEventClick={onEventClick}
                events={demoEvents}
                initialDate={new Date().toISOString()}
                hourHeight={60}
                // showWeekNumbers={true}
                // draggingDisabledConditions={{
                //   summary: 'Computers',
                //   allDay: false,
                //   color: 'pink',
                // }}
                onEventDragFinish={onEventDragFinish}
                onStateChange={props.onStateChange}
                selectedView={props.selectedView}
                showTimeLine={true}
                isDark={false}
                autoScroll={true}
                language={'ptBR'}
            // disabledDragging={true}
            // colors={{
            //   light: {
            //     primaryColor: 'blue',
            //   },
            //   dark: {
            //     primaryColor: 'orange',
            //   },
            // }}
            />
        </Container> 
    );
};
