import { FaChevronLeft } from 'react-icons/fa';

import { Header } from '../../components/Header'
import { TextMarkdown } from '../../components/TextMarkdown';

import { Container, BackButton } from './styles';

export function SubjectAnotations() {
  return (
    <Container>
      <Header />
      <BackButton to="/subjectsList">
        <FaChevronLeft />
        Voltar
      </BackButton>
      <TextMarkdown />
    </Container>
  )
}
