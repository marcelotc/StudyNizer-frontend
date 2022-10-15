import { FaChevronLeft } from 'react-icons/fa';

import { Header } from '../../components/Header'
import { TextMarkdown } from '../../components/TextMarkdown';

import { Container, BackButton } from './styles';

export function SubjectAnnotations() {
  return (
    <Container>
      <Header />
      <BackButton to="/subjects-list">
        <FaChevronLeft />
        Voltar
      </BackButton>
      <TextMarkdown />
    </Container>
  )
}
