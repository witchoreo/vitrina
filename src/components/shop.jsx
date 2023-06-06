import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../config";
import {Preloader} from "./preloader";
import { GoodList } from "./goodsList";
import { Cart } from "./cart";
import { BasketList } from "./basketList";
import { Alert } from "./alert";

function Shop (){
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState("");

    const addToBasket = (item) => {
        const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id)

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder ([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }
        setAlertName([item.name]);
    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const removeFromBasket = (itemID) => {
        const newOrder = order.filter((el) => el.id !== itemID);
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName("");
    };

    useEffect(function getGoods(){
        fetch(API_URL,{
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data)=>{
                data.featured && setGoods(data.featured);
                setLoading(false);
            });
    }, []);

    const incQuantity = (itemID) => {
        const newOrder = order.map((el) => {
            if (el.id === itemID) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemID) => {
        const newOrder = order.map((el) => {
            if (el.id === itemID) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0? newQuantity :0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };


return (
        <main className="container content">
            <Cart quantity = {order.lenght} handleBasketShow={handleBasketShow}/>
            {loading  ? (<Preloader/>
            ):(
                <GoodList goods={goods} addToBasket={addToBasket}/>
            )}
            {isBasketShow && ( 
            <BasketList order={order} 
            handleBasketShow={handleBasketShow} 
            removeFromBasket={removeFromBasket}
            incQuantity={incQuantity}
            decQuantity={decQuantity}/> 
            )}
            {alertName && <Alert name={alertName} closeAlert={closeAlert}/>}
        </main>
);
}

export {Shop};