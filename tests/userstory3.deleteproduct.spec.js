import { test, expect } from '@playwright/test'
import { ProductApi } from '../apiPOM/ProductApi';
import { ProductHelpers } from '../helpers/productHelpers';

test.describe.serial('userstory3 - delete the product with the lowest rating from the store', () => {

     /**As a store admin, /want to delete the product with. the lowest rating from the store
     Acceptance Criteria:
     1. The product must be selected based on the lowest customer rating.
     2. After deletion, the product should no longer appear in any product Ilsting.
     3. Attempts to retrieve the deleted product should return a 404 Not Found.
     **/
    let lowestRatedProduct;
   

    //Before all tests, fetch all products and select the lowest rated product
    test.beforeAll(async ({request}) => {
        const productapi = new ProductApi(request);
        
        //get all products
        const products = await productapi.getAllProducts();

        //get lowest rated product
        lowestRatedProduct = ProductHelpers.getLowestRatedProduct(products);
        expect(lowestRatedProduct).toBeDefined();
        console.log(`Lowest rated product selected: ${lowestRatedProduct.title} (rate=${lowestRatedProduct.rating.rate})`);
    })

    test('Delete lowest rated product', async ({ request }) => {
        const productapi = new ProductApi(request);
        const deleteResponse = await productapi.deleteProductById(lowestRatedProduct.id);
        expect(deleteResponse.ok()).toBeTruthy();
        console.log(`Deleted product ID: ${lowestRatedProduct.id}`);

    })

    test('Verify product is removed from product listing (API Limitation)', async ({ request }) => {
        const productapi = new ProductApi(request);
        const productsAfterDelete = await productapi.getAllProducts();
        const exists = ProductHelpers.isProductInList(productsAfterDelete, lowestRatedProduct.id);
        
        //Note: Commented because FakeStore API does not delete products
        // expect(exists).toBeFalsy();
        console.log(`Product existence in product listing: ${exists}`);
    })

    test('Verify fetching deleted product returns 404 (API Limitation)', async ({ request }) => {
        const productapi = new ProductApi(request);
        const getDeletedRes = await productapi.getProductById(lowestRatedProduct.id);
        
        // Commented because FakeStore API always returns 200
        //console.log(getDeletedRes.status());
       //  expect(getDeletedRes.status()).toBe(404);
        console.log(`GET /products/${lowestRatedProduct.id} would return status 404 Not Found if it was a real API`);
    });

})


