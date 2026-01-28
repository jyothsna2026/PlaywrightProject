export class CartApi
{
    constructor(request)
    {
        this.request = request;
    }


    async addToCart(userId,productId,quantity)
    {
        if(!quantity || quantity <=0)
        {
            throw new Error('Quantity must be greater than 0');
        }

        
        const response = await this.request.post('/carts', {
            data:
            {
                userId,
                date: new Date().toISOString(),
                products: [{productId, quantity}]

            }
        })
         return await response.json();
        }


        async getCartById(cartId)
        {
            const response = await this.request.get(`/carts/${cartId}`);
            return await response.json();
        }
    }
