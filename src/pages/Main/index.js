import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import {formatPrice} from '../../util/format';

import {
    Container,
    Product,
    ProductImage,
    ProductTitle,
    ProductPrice,
    AddButton,
    ProductAmount,
    ProductAmountText,
    AddButtonText,
    Loading,
} from './styles';

export default function Main() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const amount = useSelector((state) =>
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount;

            return sumAmount;
        }, {}),
    );

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);

                const {data} = await api.get('products');

                const response = data.map((product) => ({
                    ...product,
                    priceFormatted: formatPrice(product.price),
                }));

                setProducts(response);
            } catch (err) {
                console.tron.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    function handleAddProduct(id) {
        dispatch(CartActions.addToCartRequest(id));
    }

    function renderProduct({item}) {
        return (
            <Product key={item.id}>
                <ProductImage source={{uri: item.image}} />
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>{formatPrice(item.price)}</ProductPrice>
                <AddButton onPress={() => handleAddProduct(item.id)}>
                    <ProductAmount>
                        <Icon name="add-shopping-cart" color="#FFF" size={20} />
                        <ProductAmountText>
                            {amount[item.id] || 0}
                        </ProductAmountText>
                    </ProductAmount>
                    <AddButtonText>ADICIONAR</AddButtonText>
                </AddButton>
            </Product>
        );
    }

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <FlatList
                    horizontal
                    data={products}
                    extraData={amount}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderProduct}
                />
            )}
        </Container>
    );
}

Main.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};
