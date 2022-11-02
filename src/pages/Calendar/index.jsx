import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { DateTime } from 'luxon';
import { notification, Skeleton } from 'antd';
import Kalend, { CalendarView, OnEventDragFinish } from 'kalend';
import { CALENDAR_VIEW } from 'kalend-layout';

import { Header } from '../../components/Header';
import { generateDemoEvents } from '../../utils/helper';
import api from '../../services/api';

import 'kalend/dist/styles/index.css';
import { Container, LoadingContainer } from "./styles";

export const CalendComponent = (props) => {
    const getUserSession = localStorage.getItem('@StudyNizer:userSession');
    const headers = { Authorization: `Bearer ${JSON.parse(getUserSession).token}` };
    const userId = JSON.parse(getUserSession).id;

    const kalendRef = useRef();
    const taskDate = JSON.parse(localStorage.getItem('@StudyNizer:tasksTitleDate')) || [];
    console.log('taskDate', taskDate)
    const [demoEvents, setDemoEvents] = useState([]);
    const [calendarLoad, setCalendarLoad] = useState(false);
    const [selectedView, setSelectedView] = useState(CALENDAR_VIEW.MONTH);
    const [selectedDate, setSelectedDate] = useState(
        DateTime.now().toFormat('MM.yyyy')
    );

    // Create and load demo events
    useEffect(() => {
        const getTasksTitleDate = async () => {
            try {
                setCalendarLoad(true);
                const [ resTasksTodo, resTasksDoing, resTasksCompleted ] =  await Axios.all([
                    api.get(`/user/board-tasks-todo/${JSON.parse(getUserSession).id}`, {headers}), 
                    api.get(`/user/board-tasks-doing/${JSON.parse(getUserSession).id}`, {headers}),
                    api.get(`/user/board-tasks-completed/${JSON.parse(getUserSession).id}`, {headers}),
                  ]);

                  const resTasksTodoArr = resTasksTodo.data;
                  const resTasksDoingArr = resTasksDoing.data;
                  const resTasksTodoDoingArr = resTasksTodoArr.concat(resTasksDoingArr);
                  const resTasksCompletedArr = resTasksCompleted.data;

                  const mergedArrays = resTasksTodoDoingArr.concat(resTasksCompletedArr);
                setDemoEvents(generateDemoEvents(mergedArrays));
                setCalendarLoad(false);
            } catch (error) {
                notification.info({
                  message: `${error?.response?.data?.error}`,
                  placement: 'top',
                });
            }
        }

        getTasksTitleDate();
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
        alert('aa')
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
            {!calendarLoad ? (
                <Kalend
                    kalendRef={props.kalendRef}
                    onNewEventClick={onNewEventClick}
                    initialView={CalendarView.AGENDA}
                    disabledViews={[CalendarView.WEEK, CalendarView.THREE_DAYS, CalendarView.DAY]}
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
                    autoScroll={false}
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
                ) : <LoadingContainer>
                        <Skeleton active block />
                    </LoadingContainer>
            }
        </Container> 
    );
};
