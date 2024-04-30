import { Modal, upsellOffersModule } from '@/app/upsell-offers';
import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';

function generateMockData() {
  const items = [
    {
      key: '0',
      name: '0',
      quantity: 110,
      image: 'https://place-hold.it/32x32.png/00F/FFF&text=0',
    },
    {
      key: '1',
      name: '0',
      quantity: 110,
      image: 'https://place-hold.it/32x32.png/00F/FFF&text=0',
    },
  ];

  return {
    regular: {
      priceId: 100,
      customData: 'customData',
      title: `title-regular-${Date.now()}`,
      items: items,
    },
    upsell: {
      title: `title-upsell-${Date.now()}`,
      priceId: 1000,
      customData: 'customData',
      items: items,
    },
  };
}

export default function App() {
  const dispatch = useAppDispatch();

  const triggerModal = async () => {
    try {
      console.log('Modal start ======>');
      const result = await dispatch(
        upsellOffersModule.asyncActions.openModalWithPromise(
          generateMockData(),
        ),
      ).unwrap();
      console.log('Modal confirmed ======>', result);
    } catch (error) {
      console.log('Modal cancelled ======>', error);
    }
  };

  const hideModal = () => {
    dispatch(upsellOffersModule.actions.rejectModal());
  };

  return (
    <div>
      <button onClick={triggerModal}>Show Modal</button>
      <button onClick={hideModal}>Hide Modal</button>
      <Modal />
    </div>
  );
}
