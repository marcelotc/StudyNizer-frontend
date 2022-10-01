import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import { Header } from '../../components/Header'
import { TextMarkdown } from '../../components/TextMarkdown';

import { Container, TextAreaContainer, BackButton } from './styles';

export function SubjectAnotations() {
  return (
    <Container>
      <Header />
      <TextAreaContainer>
        <BackButton to="/SubjectsList">
          <FaChevronLeft />
          Voltar
        </BackButton>
        <TextMarkdown />
      </TextAreaContainer>
    </Container>
  )
}
