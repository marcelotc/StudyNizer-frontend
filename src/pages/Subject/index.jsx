import TextArea from 'antd/lib/input/TextArea';
import { NavLink } from 'react-router-dom';
import { Container, TextAreaContainer } from './styles';

import { TextMarkdown } from '../../components/TextMarkdown';

export function Subject() {
  return (
    <Container>
      <NavLink to="/">
        Voltar
      </NavLink>
      <TextAreaContainer>
        <TextMarkdown />
      </TextAreaContainer>
    </Container>
  )
}
