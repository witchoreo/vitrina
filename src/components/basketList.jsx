import { BaketItem } from "./basketItems";

function BasketList(props) {
    const { order = [], handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);
    return (
        <ul className="collection basket-list ">
            <li className="collection-item" active>Корзина</li>
            {order.length ? (order.map((item) => <BaketItem
                key={item.id}
                removeFromBasket={removeFromBasket}
                incQuantity={incQuantity}
                decQuantity={decQuantity}
                {...item} />)
            ) : (
                <li className="collection-item">Корзина пуста</li>
            )}
            <li className="collection-item active light-green accent-4">Общая стоимость заказа: {totalPrice} руб.</li>
            <i className="material-icons basket-clear light-green accent-4" onClick={handleBasketShow}>
                clear
            </i>
        </ul>
    );
}

export { BasketList };