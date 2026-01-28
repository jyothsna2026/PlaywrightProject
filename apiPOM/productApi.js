export class ProductApi {
    constructor(request) {
        this.request = request;
    }


    async getAllProducts() {
        const response = await this.request.get('/products');
        if (!response.ok()) {
            throw new Error(`Failed to fetch products, status: ${response.status()}`);
        }
        return await response.json();
    }

    async getProductById(productId) {
       // const response = await this.request.get("/products/206");
        const response = await this.request.get(`/products/${productId}`);
        // Check for empty body since FakeStore API always returns 200, then return parsed JSON
        let body = await response.text();
          if (!body) {
           throw new Error(`Product ${productId} not found empty response `);
        }
        try{
        return JSON.parse(body);
        } catch(error)
        {
            throw new Error(`Invalid JSON response from ${response.url()}: ${body}`);
        }
    }   // can create a reusable helper function for above json parsing and empty/invalid body handling and use here

    async createProduct(payload) {
        const response = await this.request.post('/products', {
            data: payload
        })
        if (!response.ok()) {
            throw new Error(`Failed to create product ${payload.title}, status: ${response.status()}`);
        }
        return response;
    }


    async deleteProductById(id) {
        const response = await this.request.delete(`/products/${id}`);
        if (!response.ok()) {
            throw new Error(`Failed to delete product ${id}, status: ${response.status()}`);
        }

        return response;

    }
}
