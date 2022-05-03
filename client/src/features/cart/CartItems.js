import { CART_ITEM_TYPE, useCart } from 'core/cart';
import { ActionIcon, Button, createStyles, Group, Table, Text } from '@mantine/core';
import { CloseIcon } from 'theme/icons';
import { localImageSrc } from 'core/images';
import Image from 'shared/components/Image';
import QuantityInput from 'shared/components/inputs/QuantityInput';

const IMAGE_SIZE = 250;

const useStyles = createStyles({
  imagesWrapper: {
    overflowX: 'auto',
    overflowY: 'hidden',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  image: {
    minHeight: IMAGE_SIZE,
    minWidth: IMAGE_SIZE,
  },
});

const CartItems = ({ onActionButtonClick, actionButtonText = 'Proceed to checkout' }) => {
  const { items, update: updateCartItem, remove: removeFromCart } = useCart();

  const { classes } = useStyles();

  const renderMaskImage = (imageId) => (
    <div key={imageId} className={classes.image}>
      <Image src={localImageSrc(imageId)} alt="Mask image" height={IMAGE_SIZE} width={IMAGE_SIZE} />
    </div>
  );

  const totalPrice = items.length ? items.map((x) => x.item.price * x.quantity).reduce((x, y) => x + y) : null;

  return (
    <Table horizontalSpacing="lg" verticalSpacing="lg" fontSize="lg">
      <thead>
        <tr>
          <th />
          <th />
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <ActionIcon color="gray" size="lg" onClick={() => removeFromCart(item.id)}>
                <CloseIcon size={30} />
              </ActionIcon>
            </td>
            <td>
              <Group className={classes.imagesWrapper} direction="row" noWrap>
                {item.type === CART_ITEM_TYPE.custom ? (
                  <>{item.item.imageIds.map(renderMaskImage)}</>
                ) : (
                  renderMaskImage(item.item.imageId)
                )}
              </Group>
            </td>
            <td>{item.type === CART_ITEM_TYPE.custom ? 'Custom mask' : item.item.name}</td>
            <td>{item.item.price} €</td>
            <td>
              <QuantityInput
                value={item.quantity}
                onChange={(quantity) =>
                  updateCartItem({
                    ...item,
                    quantity,
                  })
                }
              />
            </td>
            <td>{item.quantity * item.item.price} €</td>
          </tr>
        ))}
      </tbody>
      <caption>
        {items.length > 0 ? (
          <Group direction="row">
            <Text color="dark" size="xl" weight={600}>
              Total Price: {totalPrice} €
            </Text>
            <Button variant="outline" onClick={onActionButtonClick}>{actionButtonText}</Button>
          </Group>
        ) : (
          'Products cart is empty'
        )}
      </caption>
    </Table>
  );
};

export default CartItems;
