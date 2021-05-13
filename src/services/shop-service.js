export default class ShopService {
  _apiBase = 'http://localhost:3000';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  }

  async getProductItems(searchValue, currentPage, limitPage) {
    return await this.getResource(
      `/products?q=${searchValue}&_sort=price&_order=ASC&_limit=${limitPage}&_page=${currentPage}`
    );
  }
  async getTotalCount() {
    return await this.getResource(`/total_count/`);
  }
  async getCategoryItems() {
    return await this.getResource(`/category/`);
  }
  async getOneItem(id) {
    return await this.getResource(`/products/` + id);
  }
  async getOrderNumber() {
    const res = await this.getResource(`/orders/`);
    const orderNumber = res.length + 1;

    return orderNumber;
  }
  async setOrder(order) {
    const number = await this.getOrderNumber();
    const newOrder = {
      id: number,
      order: order,
    };
    const response = await fetch(`${this._apiBase}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newOrder),
    });
    if (!response.ok) {
      throw new Error('json error');
    }
  }
}
