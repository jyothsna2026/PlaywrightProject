import { test, expect } from '@playwright/test';
import { ProductApi } from '../apiPOM/productApi';
import { productSchema } from '../helpers/productSchemaValidator';

test.describe('Product API Contract Tests', () => {

    test('Validate product schema for all products', async ({ request }) => {
        const productApi = new ProductApi(request);

        // Fetch all products
        const products = await productApi.getAllProducts();
        expect(products.length).toBeGreaterThan(0);

        // Validate each product against the defined schema to ensure each product has all required fields and correct data types
        for (const product of products) {
            for (const [field, type] of Object.entries(productSchema)) {
                expect(product).toHaveProperty(field);
                expect(typeof product[field]).toBe(type);
            }
            expect(product.rating).toHaveProperty('rate');
            expect(product.rating).toHaveProperty('count');
            expect(typeof product.rating.rate).toBe('number');
            expect(typeof product.rating.count).toBe('number');
        }
    });

});
