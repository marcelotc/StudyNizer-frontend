import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  const buttonAdd = () => {
    alert(':)')
  }

  const cardTest = 
    {
      id: -1,
      content: '',
      labels: [],
      user: ''
    }

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" onClick={() => buttonAdd()}></MdAdd>
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => {
          console.log('index', index)
          return (
          <Card
            key={card?.id}
            listIndex={listIndex}
            index={index}
            data={card}
            invalid={false}
          ></Card>
          )
        })}
        {data.cards.length === 0 && (
          <Card
            key={-1}
            listIndex={listIndex}
            index={-1}
            data={cardTest}
            invalid={true}
          ></Card>
        )}
      </ul>
    </Container>
  );
}
