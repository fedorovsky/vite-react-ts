import { Toaster, toaster } from './toaster';
import styled from 'styled-components';

export default function App() {
  const handleShowSuccessToast = () => {
    const toastId = toaster.success({
      title: 'Success',
      description: 'Your changes have been saved.',
    });

    console.log('Success toast id:', toastId);
  };

  const handleShowErrorToast = () => {
    const toastId = toaster.error({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    });

    console.log('Error toast id:', toastId);
  };

  const handleShowWarningToast = () => {
    const toastId = toaster.warning({
      title: 'Warning',
      description: 'Please check the entered data.',
    });

    console.log('Warning toast id:', toastId);
  };

  const handleShowDefaultToast = () => {
    const toastId = toaster.default({
      title: 'Default',
      description: 'This is a default notification.',
    });

    console.log('Default toast id:', toastId);
  };

  const handleClearToasts = () => {
    toaster.clear();

    console.log('All toasts cleared');
  };

  return (
    <Page>
      <Card>
        <Title>Toast example</Title>

        <Description>Simple toaster with four methods.</Description>

        <Actions>
          <Button type="button" onClick={handleShowSuccessToast}>
            Success
          </Button>

          <Button type="button" onClick={handleShowErrorToast}>
            Error
          </Button>

          <Button type="button" onClick={handleShowWarningToast}>
            Warning
          </Button>

          <Button type="button" onClick={handleShowDefaultToast}>
            Default
          </Button>

          <Button type="button" onClick={handleClearToasts}>
            Clear
          </Button>
        </Actions>
      </Card>

      <Toaster />
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
