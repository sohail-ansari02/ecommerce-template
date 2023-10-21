import axios from "axios";

function generateRandomOrderNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    const length = 10;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        orderId += chars.charAt(randomIndex);
    }

    return orderId;
}

export const saveOrder = async (data, setHasSavedOrder) => {
    const userId = data.metadata?.userId;
    const products = data.metadata?.products ? JSON.parse(data.metadata.products) : [];
    const randomOrderNumber = generateRandomOrderNumber();

    const newOrder = {
        name: data.customer_details?.name,
        email: data.customer_details?.email,
        phone: data.customer_details?.phone,
        address: {
            line1: data.customer_details?.address?.line1,
            line2: data.customer_details?.address?.line2,
            city: data.customer_details?.address?.city,
            state: data.customer_details?.address?.state,
            postal_code: data.customer_details?.address?.postal_code,
            country: data.customer_details?.address?.country,
        },
        products: products,
        orderId: data.id,
        orderNumber: randomOrderNumber,
        total_price: data.amount_total,
    };

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders?userId=${userId}`);
        const userOrders = response.data;

        if (userOrders) {
            const orderIdMatch = userOrders.orders.some(order => order.orderId === data.id);
            if (!orderIdMatch) {
                const updatedOrders = [...userOrders.orders, newOrder];
                const response = await axios.put(`/api/orders?id=${userOrders._id}`, {
                    orders: updatedOrders,
                });
                console.log("Orders successfully updated.", response);
            } else {
                console.log("This order has already been saved.");
            }
        } else {
            const updatedOrders = [newOrder];
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders`, {
                userId: userId,
                order: updatedOrders,
            });
            console.log("Order created and saved successfully.", response);
        }

        setHasSavedOrder(true);
    } catch (error) {
        console.error('Error saving the order:', error);
    }
};

export const getOrdersWithProducts = async (userId) => {
    try {
        const response = await axios.get(`/api/orders?userId=${userId}`);
        const userOrders = response.data;

        if (!userOrders) {
            console.log("No orders were found for the user.");
            return null;
        }

        const fetchProducts = async (productId) => {
            try {
                const res = await fetch(`/api/products?_id=${productId}`);

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(`Failed to fetch data. Status: ${res.status}, Message: ${errorData.message}`);
                }

                return res.json();
            } catch (error) {
                console.error("Error obtaining product with ID:", productId, error);
                return null;
            }
        };

        const ordersWithEnrichedProducts = await Promise.all(
            userOrders.orders.map(async (order) => {
                const enrichedProducts = await Promise.all(
                    order.products.map(async (product) => {
                        const matchingProduct = await fetchProducts(product.productId);
                        if (matchingProduct) {
                            const matchingVariant = matchingProduct.variants.find((variant) => variant.color === product.color);
                            if (matchingVariant) {
                                return {
                                    ...product,
                                    name: matchingProduct.name,
                                    category: matchingProduct.category,
                                    image: [matchingVariant.images[0]],
                                    price: matchingProduct.price,
                                    purchased: true,
                                    color: product.color,
                                };
                            }
                        }
                        return product;
                    })
                );
                return {
                    ...order,
                    products: enrichedProducts
                };
            })
        );

        const enrichedUserOrders = {
            ...userOrders,
            orders: ordersWithEnrichedProducts
        };

        return enrichedUserOrders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
};