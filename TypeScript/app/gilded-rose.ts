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
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.isBackstagePass()) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (!item.isLegendaryItem()) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (!item.isAgedBrie()) {
          if (!item.isBackstagePass()) {
            if (item.quality > 0) {
              if (!item.isLegendaryItem()) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }

      item.copyInto(oldItem);
    });

    return this.items;
  }
}
