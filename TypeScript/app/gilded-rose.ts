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
    this.quality++;
  }

  decreaseQuality(): void {
    this.quality--;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((oldItem: Item) => {
      const item = new BasicItem(oldItem);

      if (!item.isAgedBrie() && !item.isBackstagePass()) {
        if (item.quality > 0) {
          if (!item.isLegendaryItem()) {
            item.decreaseQuality();
          }
        }
      } else {
        if (item.quality < 50) {
          item.increaseQuality();
          if (item.isBackstagePass()) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.increaseQuality();
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.increaseQuality();
              }
            }
          }
        }
      }

      if (!item.isLegendaryItem()) {
        item.age();
      }

      if (item.sellIn < 0) {
        if (!item.isAgedBrie()) {
          if (!item.isBackstagePass()) {
            if (item.quality > 0) {
              if (!item.isLegendaryItem()) {
                item.decreaseQuality();
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            item.increaseQuality();
          }
        }
      }

      item.copyInto(oldItem);
    });

    return this.items;
  }
}
