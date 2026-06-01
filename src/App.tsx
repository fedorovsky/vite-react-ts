import { Alert, alertApi } from './alert';
import styled from 'styled-components';

export default function App() {
  const handleShowRegularAlert = () => {
    const alertId = alertApi.regular({
      label: 'Regular',
      description: 'This is a regular alert.',
    });

    console.log('Regular alert id:', alertId);
  };

  const handleShowSuccessAlert = () => {
    const alertId = alertApi.success({
      label: 'Success',
      description: 'Your changes have been saved.',
    });

    console.log('Success alert id:', alertId);
  };

  const handleShowErrorAlert = () => {
    const alertId = alertApi.error({
      label: 'Error',
      description: 'Something went wrong. Please try again.',
    });

    console.log('Error alert id:', alertId);
  };

  const handleShowInfoAlert = () => {
    const alertId = alertApi.info({
      label: 'Info',
      description: 'Here is some helpful context.',
    });

    console.log('Info alert id:', alertId);
  };

  const handleShowWarningAlert = () => {
    const alertId = alertApi.warning({
      label: 'Warning',
      description: 'Please check the entered data.',
    });

    console.log('Warning alert id:', alertId);
  };

  const handleClearAlerts = () => {
    alertApi.clear();

    console.log('All alerts cleared');
  };

  return (
    <Page>
      <Card>
        <Title>Alert example</Title>

        <Description>Simple alert with five variants.</Description>

        <Actions>
          <Button type="button" onClick={handleShowRegularAlert}>
            Regular
          </Button>

          <Button type="button" onClick={handleShowSuccessAlert}>
            Success
          </Button>

          <Button type="button" onClick={handleShowErrorAlert}>
            Error
          </Button>

          <Button type="button" onClick={handleShowInfoAlert}>
            Info
          </Button>

          <Button type="button" onClick={handleShowWarningAlert}>
            Warning
          </Button>

          <Button type="button" onClick={handleClearAlerts}>
            Clear
          </Button>
        </Actions>
      </Card>

      <Alert />
    </Page>
  );
}

const Page = styled.main`
  display: grid;
  min-height: 100vh;
  place-items: center;

  background: #f8fafc;
  color: #0f172a;

  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
`;

const Card = styled.section`
  width: min(100% - 32px, 460px);
  padding: 24px;

  border: 1px solid #e2e8f0;
  border-radius: 20px;

  background: #ffffff;

  box-shadow:
    0 24px 60px rgb(15 23 42 / 10%),
    0 4px 16px rgb(15 23 42 / 6%);
`;

const Title = styled.h1`
  margin: 0 0 8px;

  font-size: 24px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0 0 20px;

  color: #475569;

  font-size: 15px;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;

  background: #2563eb;
  color: #ffffff;

  font: inherit;
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }

  &:active {
    transform: translateY(1px);
  }
`;
