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

  isAgedBrie(): boolean {
    return this.name === "Aged Brie";
  }

  isLegendaryItem(): boolean {
    return this.name === "Sulfuras, Hand of Ragnaros";
  }

  isBackstagePass(): boolean {
    return this.name === "Backstage passes to a TAFKAL80ETC concert";
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
  const basicItem = new BasicItem(item);
  if (basicItem.isLegendaryItem()) {
    return new LegendaryItem(item);
  } else if (basicItem.isAgedBrie()) {
    return new AgedBrie(item);
  } else if (basicItem.isBackstagePass()) {
    return new BackstagePass(item);
  } else {
    return basicItem;
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
