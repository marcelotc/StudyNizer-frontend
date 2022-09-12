import { Card } from 'antd';
import React from 'react';
 
import { Container, CardLink } from './styles';

const { Meta } = Card;

export default function SubjectsCard() {

  const subjectsArr = [
    {
      id: "diras",
      title: "Disciplina 1",
      description: "bem loca essa disciplina"
    },
    {
      id: "jknkasf",
      title: "Disciplina 2",
      description: "bem loca essa disciplina"
    },
    {
      id: "pkooff",
      title: "Disciplina 3",
      description: "bem loca essa disciplina"
    },
    {
      id: "lkfmskf",
      title: "Disciplina 4",
      description: "bem loca essa disciplina"
    },
    {
      id: "ksfks",
      title: "Disciplina 5",
      description: "bem loca essa disciplina"
    },
    {
      id: "6",
      title: "Disciplina 6",
      description: "bem loca essa disciplina"
    }
  ]

  return (
    <Container>
      {subjectsArr.map((subject) => (
        <CardLink to={`/subject/${subject.id}`} title="Subject">
          <Card
            key={subject.id}
            className='subjectCard'
            hoverable
            cover={<img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />}
          >
            <Meta title={subject.title} description={subject.description} />
          </Card>
        </CardLink>
      ))}
    </Container>
  );
}
