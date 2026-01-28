export class ProductHelpers
{

    static filterElectronicCategory(products, category) {
        const result = [];
        for(const product of products)
        {
            if(product.category===category)
            {
                result.push(product);
            }
        }
        return result;
    }


    static filterInStock(products)
    {
        // FakeStore API has no quantity/stock info.
        //Assumption: all returned products are considered in stock.
        return products;
    }


    static findCheapestElectronicProduct(electronicProducts)
    {
        if(!electronicProducts || electronicProducts.length === 0)
        {
            return null;
        }
        let cheapestElectronicProduct = electronicProducts[0];
        for(const product of electronicProducts )
        {
                if(product.price < cheapestElectronicProduct.price)
                {
                    cheapestElectronicProduct = product;
                }
        }
            return cheapestElectronicProduct;
    }


    static generateUniqueTitle(existingTitles,baseTitle)
    {
        
    let uniqueTitle;
    do {
      const randomSuffix = Math.floor(Math.random() * 10000);
     uniqueTitle = `${baseTitle}_${randomSuffix}`;
        } while (existingTitles.includes(uniqueTitle));
        return uniqueTitle;
    }


    static getLowestRatedProduct(products)
    {
        if(!products || products.length<=0)
        {
            return null;
        }
        let lowestRatedProduct = products[0];
        for(const product of products)
        {
            if (product.rating.rate < lowestRatedProduct.rating.rate)
            {
                lowestRatedProduct = product;
            }
        }
            return lowestRatedProduct;
    }

    static isProductInList(products, productId) {
    if (!products || products.length === 0)
         return false;
    for (const product of products) {
      if (product.id === productId) 
        return true;
    }
    return false;
  }

}

