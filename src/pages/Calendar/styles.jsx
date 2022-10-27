import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    overflow: hidden;
    
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

export const LoadingContainer = styled.div`
    padding: 30px;
`;
