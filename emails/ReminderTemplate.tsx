import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';

interface ReminderEmailParams {
  time: string;
  message: string;
}

export default function ReminderEmail({ message, time }: ReminderEmailParams) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Next Edu</Text>
          <Text style={paragraph}>
            Chào bạn, bạn có có nhắc nhở học tập lúc {time}
          </Text>
          <Text style={paragraph}>Thông điệp: {message}</Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#fce36c',
};

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
};
