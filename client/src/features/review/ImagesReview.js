import Slider from 'react-slick';
import Image from 'shared/components/Image';
import { localImageSrc } from 'core/images';
import { ActionIcon, createStyles, LoadingOverlay } from '@mantine/core';
import { ArrowLeftIcon, ArrowRightIcon } from 'theme/icons';
import { useState } from 'react';

const useStyles = createStyles({
  wrapper: {
    width: '70%',
    margin: '0 auto',
  },
  wrapperLoading: {
    visibility: 'hidden',
  },
  arrow: {
    color: 'initial !important',
    position: 'absolute',
    top: 'calc(50% - 9px)',
  },
  leftArrow: {
    left: -50,
  },
  rightArrow: {
    right: -50,
  },
});

const createArrow =
  (Icon, isLeft = false) =>
  ({ onClick }) => {
    const { classes, cx } = useStyles();

    return (
      <ActionIcon
        onClick={onClick}
        className={cx(classes.arrow, isLeft ? classes.leftArrow : classes.rightArrow)}
        variant="outline"
      >
        <Icon size={18} />
      </ActionIcon>
    );
  };

const LeftArrow = createArrow(ArrowLeftIcon, true);
const RightArrow = createArrow(ArrowRightIcon, false);

const ImagesReview = ({ model }) => {
  const { classes, cx } = useStyles();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Slider
        slidesToScroll={1}
        slidesToShow={1}
        dots
        arrows
        nextArrow={<RightArrow />}
        prevArrow={<LeftArrow />}
        className={cx(classes.wrapper, isLoading && classes.wrapperLoading)}
      >
        {model.imageIds.map((id) => (
          <Image key={id} src={localImageSrc(id)} alt="Model image" onLoad={() => setIsLoading(false)} />
        ))}
      </Slider>
    </>
  );
};

export default ImagesReview;
