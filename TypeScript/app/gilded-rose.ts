export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemFactory {
  static build(item: Item): BasicItem {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return new LegendaryItem(item);
    } else if (item.name === "Aged Brie") {
      return new AgedBrie(item);
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      return new BackstagePass(item);
    } else if (item.name.indexOf("Conjured") !== -1) {
      return new ConjuredItem(item);
    } else {
      return new BasicItem(item);
    }
  }
}

class BasicItem extends Item {
  constructor(item: Item) {
    super(item.name, item.sellIn, item.quality);
  }

  copyInto(item: Item) {
    item.name = this.name;
    item.sellIn = this.sellIn;
    item.quality = this.quality;
  }

  age(): void {
    this.sellIn--;
  }

  expiresIn(days: number): boolean {
    return this.sellIn <= days;
  }

  isExpired(): boolean {
    return this.sellIn < 0;
  }

  updateQuality(): void {
    this.decreaseQuality();
  }

  increaseQuality(): void {
    if (this.quality < 50) {
      this.quality++;
    }
  }

  decreaseQuality(): void {
    if (this.quality > 0) {
      this.quality--;
    }
  }
}

class LegendaryItem extends BasicItem {
  age(): void {}
  updateQuality(): void {}
}

class AgedBrie extends BasicItem {
  updateQuality(): void {
    this.increaseQuality();
  }
}

class BackstagePass extends BasicItem {
  updateQuality(): void {
    this.increaseQuality();
    if (this.expiresIn(10)) {
      this.increaseQuality();
    }
    if (this.expiresIn(5)) {
      this.increaseQuality();
    }
    if (this.isExpired()) {
      this.quality = 0;
    }
  }
}

class ConjuredItem extends BasicItem {
  updateQuality(): void {
    this.decreaseQuality();
    this.decreaseQuality();
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((oldItem: Item) => {
      const item = ItemFactory.build(oldItem);
      item.updateQuality();
      item.age();

      if (item.isExpired()) {
        item.updateQuality();
      }

      item.copyInto(oldItem);
    });

    return this.items;
  }
}
