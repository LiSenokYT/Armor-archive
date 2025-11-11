class DataLoader {
  constructor() {
    this.basePath = '/src/data';
  }

  async loadVehicles(type) {
    try {
      const response = await fetch(`${this.basePath}/vehicles/${type}.json`);
      if (!response.ok) throw new Error(`Failed to load ${type} vehicles`);
      const data = await response.json();
      return data.vehicles || [];
    } catch (error) {
      console.error('Error loading vehicles:', error);
      return [];
    }
  }

  async loadCategories(type) {
    try {
      const response = await fetch(`${this.basePath}/categories/${type}-types.json`);
      if (!response.ok) throw new Error(`Failed to load ${type} categories`);
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  }

  async loadVehicleById(id) {
    // Будем искать по всем типам техники
    const types = ['ground', 'air', 'naval'];
    
    for (let type of types) {
      const vehicles = await this.loadVehicles(type);
      const vehicle = vehicles.find(v => v.id === id);
      if (vehicle) {
        vehicle.type = type; // Добавляем тип для детальной страницы
        return vehicle;
      }
    }
    
    return null;
  }
}

// Создаём глобальный экземпляр
window.dataLoader = new DataLoader();