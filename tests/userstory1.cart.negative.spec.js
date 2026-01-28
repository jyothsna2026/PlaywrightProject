import {test,expect} from '@playwright/test';
import { ProductApi } from '../apiPOM/productApi';
import { CartApi } from '../apiPOM/cartApi';
import users from '../testData/users.data.json';
import negativeData from '../testData/negativeCases.data.json';
import category from '../testData/categories.data.json';

test.describe('Userstory1 - Negative test cases',() => {

    /**** API Level Negative Tests (What API does)***/
test('API: Fetching a non existent product should throw an error / empty response', async({request}) =>
{

const productapi = new ProductApi(request);

await expect(async()=> {
    await productapi.getProductById(negativeData.invalidProduct.nonExistentProductId);
}).rejects.toThrow(/not found|empty response/i);   //returning empty response


})

test('API: Cart should reject non-existent product ID - API gap', async({request}) =>
{

 const cartApi = new CartApi(request);

 const response = await cartApi.addToCart(users.shopping_UserID, negativeData.invalidProduct.invalidProductId, category.productQuantity);
 expect(response).toHaveProperty('id');
 expect(response.products).toBeDefined();

 //FakeStore API allows invalid product IDs
   const productExistsInCart = response.products.some(
    p => p.productId === negativeData.invalidProduct.invalidProductId
  );
 expect(productExistsInCart).toBeTruthy();  //invalid product actually added - API Issue

})

 


    /**Business Rule Negative Test enforcement - Validates user story requirement (quantity > 0) even if API allows invalid data.**/
    test('Business rule: Reject adding product with quantity <= 0', async ({ request }) => {
        
    const cartApi = new CartApi(request);
    const productApi = new ProductApi(request);
     // Pick a valid product
    const products = await productApi.getAllProducts();
    const validProductId = products[0].id;
    for(const qty of Object.values(negativeData.incorrectQuantity))
        {
    await expect(async()=> { await cartApi.addToCart(users.shopping_UserID, validProductId, qty);}).rejects.toThrow('Quantity must be greater than 0');
        }
    });


})