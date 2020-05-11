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
    super.increaseQuality();
  }
}

class BackstagePass extends BasicItem {
  updateQuality(): void {
    super.increaseQuality();
    if (this.sellIn < 11) {
      super.increaseQuality();
    }
    if (this.sellIn < 6) {
      super.increaseQuality();
    }
    if (this.sellIn < 0) {
      this.quality = 0;
    }
  }
}

function toItem(item: Item): BasicItem {
  if (item.name === "Sulfuras, Hand of Ragnaros") {
    return new LegendaryItem(item);
  } else if (item.name === "Aged Brie") {
    return new AgedBrie(item);
  } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
    return new BackstagePass(item);
  } else {
    return new BasicItem(item);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((oldItem: Item) => {
      const item = toItem(oldItem);
      item.updateQuality();
      item.age();

      if (item.sellIn < 0) {
        item.updateQuality();
      }

      item.copyInto(oldItem);
    });

    return this.items;
  }
}
