import { Helmet } from 'react-helmet';
import { Space, Tabs, Title } from '@mantine/core';
import useCurrentModel from 'core/currentModel';
import { CameraIcon, CartIcon, ImagesIcon } from 'theme/icons';
import ImagesReview from 'features/review/ImagesReview';
import OrderMasksModal from 'shared/components/OrderMasksModal';
import { useState } from 'react';
import { useCart } from 'core/cart';
import { Navigate, useNavigate } from 'react-router-dom';
import ReviewOnFace from 'features/review/ReviewOnFace';

const ModelReviewPage = () => {
  const navigate = useNavigate();

  const { model: currentModel, clearCurrentModel } = useCurrentModel();

  const { add: addToCart } = useCart();

  const [currentTab, setCurrentTab] = useState(0);

  const handleAddToCart = () => {
    addToCart({});
    clearCurrentModel();
    navigate('/');
  };

  if (!currentModel) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Review your mask - VELK</title>
      </Helmet>
      <Title order={2}>Review your mask</Title>
      <Space h="md" />
      <Tabs active={currentTab} onTabChange={setCurrentTab}>
        <Tabs.Tab label="Images" icon={<ImagesIcon size={18} />}>
          <ImagesReview model={currentModel} />
        </Tabs.Tab>
        <Tabs.Tab label="On Face" icon={<CameraIcon size={18} />}>
          <ReviewOnFace />
        </Tabs.Tab>
        <Tabs.Tab label="Purchase" icon={<CartIcon size={18} />}>
          <OrderMasksModal opened onClose={() => setCurrentTab(0)} onAddToCart={handleAddToCart} />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default ModelReviewPage;
