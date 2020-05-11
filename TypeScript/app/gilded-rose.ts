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
  increaseQuality(): void {}
  decreaseQuality(): void {}
}

class AgedBrie extends BasicItem {
  increaseQuality(): void {
    super.decreaseQuality();
  }
  decreaseQuality(): void {
    super.increaseQuality();
  }
}

function toItem(item: Item): BasicItem {
  const basicItem = new BasicItem(item);
  if (basicItem.isLegendaryItem()) {
    return new LegendaryItem(item);
  } else if (basicItem.isAgedBrie()) {
    return new AgedBrie(item);
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

      if (!item.isBackstagePass()) {
        item.decreaseQuality();
      } else {
        item.increaseQuality();
        if (item.isBackstagePass()) {
          if (item.sellIn < 11) {
            item.increaseQuality();
          }
          if (item.sellIn < 6) {
            item.increaseQuality();
          }
        }
      }

      item.age();

      if (item.sellIn < 0) {
        if (!item.isBackstagePass()) {
          item.decreaseQuality();
        } else {
          item.quality = 0;
        }
      }

      item.copyInto(oldItem);
    });

    return this.items;
  }
}
