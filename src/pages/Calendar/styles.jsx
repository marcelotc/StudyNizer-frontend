import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;

    .Kalend__CalendarBodyHours__text, .Kalend__CalendarBodyHours__text-dark {
        font-size: 1.9em;

        &:after{
            content: ":00";
        }
    }

    .Kalend__CalendarBody {
        padding-left: 100px !important;
    }

`;