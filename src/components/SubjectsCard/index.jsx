import { Card } from 'antd';
import React from 'react';

import { Container } from './styles';

const { Meta } = Card;

export default function SubjectsCard() {

  return (
    <Container>
      <Card
        className='subjectCard'
        hoverable
        cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
      >
        <Meta title="DISCIPLINA 1" description="bem loca essa disciplina" />
      </Card>
      <Card
        className='subjectCard'
        hoverable
        cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
      >
        <Meta title="DISCIPLINA 1" description="bem loca essa disciplina" />
      </Card>
      <Card
        className='subjectCard'
        hoverable
        cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
      >
        <Meta title="DISCIPLINA 1" description="bem loca essa disciplina" />
      </Card>
      <Card
        className='subjectCard'
        hoverable
        cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
      >
        <Meta title="DISCIPLINA 1" description="bem loca essa disciplina" />
      </Card>
      <Card
        className='subjectCard'
        hoverable
        cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
      >
        <Meta title="DISCIPLINA 1" description="bem loca essa disciplina" />
      </Card>
      <Card
        className='subjectCard'
        hoverable
        cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
      >
        <Meta title="DISCIPLINA 1" description="bem loca essa disciplina" />
      </Card>
    </Container>
  );
}
