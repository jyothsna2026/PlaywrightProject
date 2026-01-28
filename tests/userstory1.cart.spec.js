import { test, expect } from '@playwright/test';
import { ProductApi } from '../apiPOM/ProductApi';
import { CartApi } from '../apiPOM/cartApi';
import { ProductHelpers } from '../helpers/productHelpers';
import users from '../testData/users.data.json';
import category from '../testData/categories.data.json';


test.describe('UserStory1 - Add cheapest electronic product to cart', () => {

    /**
     As an online shopper, I want to view all available products and add the cheapest electronics
     Acceptance Criteria:
     1. The product must belong to a specific category.
     2. Only products that are in stock (have quantity available) should be considered.
     3. Once added to the cart, the product should appear with correct price and quantity.
     **/

    test('Add cheapest electronics product to cart and verify price and quantity', async ({ request }, testInfo) => {

        //Initialise API helpers
        const productapi = new ProductApi(request);
        const cartApi = new CartApi(request);

        try {
            // Fetch all Products
            const products = await productapi.getAllProducts();
            expect(products.length).toBeGreaterThan(0);
            //console.log('All products list is', products);


            //Filter all electronic category products

            const electronicProducts = ProductHelpers.filterElectronicCategory(products, category.electronicsCategory);
            //console.log('electronic products list is', electronicProducts);
            // Validate that there are electronics products
            expect(electronicProducts.length).toBeGreaterThan(0);

            //Find electronic products in stock
            const inStcokElectronicProducts = ProductHelpers.filterInStock(electronicProducts);
            expect(inStcokElectronicProducts.length).toBeGreaterThan(0);

            //Find the cheapest electronic product in stock
            const cheapestProduct = ProductHelpers.findCheapestElectronicProduct(inStcokElectronicProducts);
            expect(cheapestProduct).toBeDefined();
            console.log('Cheapest electronic product selected ' + cheapestProduct.title + 'with price of ' + cheapestProduct.price + 'and id is '
                + cheapestProduct.id
            )

            //Add product to cart

            //console.log('payload details', users.shopping_UserID,cheapestProduct.id, category.productQuantity);
            const cartResponse = await cartApi.addToCart(users.shopping_UserID, cheapestProduct.id, category.productQuantity);
            //validate basic structure of cart response
            expect(cartResponse).toHaveProperty('id');
            expect(cartResponse).toHaveProperty('products');
            expect(cartResponse.products.length).toBeGreaterThan(0);

            //Find added product in the cart
            const addedProduct = cartResponse.products.find(p => p.productId === cheapestProduct.id);
            expect(addedProduct).toBeDefined();
            expect(addedProduct.quantity).toBe(category.productQuantity);  // verify quantity


            // FakeStore cart API does not return price.
            // Verifying price by re-fetching product details.

            const getProductFromApi = await productapi.getProductById(addedProduct.productId);
          //  const getProductFromApiRes = await getProductFromApi.json();
            expect(getProductFromApi.price).toBe(cheapestProduct.price);
            console.log("Verified product price in cart " + getProductFromApi.price + " matches with correct cheapest product price " + cheapestProduct.price);

        } catch (error) {
            await testInfo.attach('Test Failure details', {
                body: error.message + '\n' + JSON.stringify(error, null, 2),
                contentType: 'text/plain',
            })
            throw error;
        }
    })
})

