import "jasmine";
import { GildedRose, Item } from "../app/gilded-rose";

describe("The Gilded Rose", () => {
  function buildRose(...items: Item[]): GildedRose {
    return new GildedRose(items);
  }

  type ValueFn = () => number;
  type ActionFn = () => void;

  function expectDiff(diff: number, value: ValueFn, action: ActionFn): void {
    const before: number = value();
    action();
    const after: number = value();
    expect(after - before).toEqual(diff);
  }

  describe("Basic Items", () => {
    it("should age", () => {
      const rose = buildRose(new Item("+5 Dexterity Vest", 10, 20));
      expectDiff(
        -1,
        () => rose.items[0].sellIn,
        () => rose.updateQuality()
      );
    });

    it("should reduce in quality", () => {
      const rose = buildRose(new Item("+5 Dexterity Vest", 10, 20));
      expectDiff(
        -1,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });

    it("should reduce twice as much in quality after expiration", () => {
      const rose = buildRose(new Item("+5 Dexterity Vest", 0, 20));
      expectDiff(
        -2,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });

    it("should never degrade past zero", () => {
      const rose = buildRose(new Item("+5 Dexterity Vest", 0, 0));
      expectDiff(
        0,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });
  });

  describe("Aged Brie", () => {
    it("should increase in quality", () => {
      const rose = buildRose(new Item("Aged Brie", 2, 0));
      expectDiff(
        1,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });

    it("should increase twice as much in quality after expiration", () => {
      const rose = buildRose(new Item("Aged Brie", 0, 0));
      expectDiff(
        2,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });

    it("should never increase more than fifty", () => {
      const rose = buildRose(new Item("Aged Brie", 0, 50));
      expectDiff(
        0,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });
  });

  describe("Sulfuras", () => {
    it("should never degrade", () => {
      const rose = buildRose(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
      expectDiff(
        0,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });
    it("should never age", () => {
      const rose = buildRose(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
      expectDiff(
        0,
        () => rose.items[0].sellIn,
        () => rose.updateQuality()
      );
    });
  });

  describe("Backstage passes", () => {
    it("should increase in quality", () => {
      const rose = buildRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
      );
      expectDiff(
        1,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });

    it("should increase in quality by two when ten days or less", () => {
      const rose = buildRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)
      );
      expectDiff(
        2,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });

    it("should increase in quality by three when five days or less", () => {
      const rose = buildRose(
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)
      );
      expectDiff(
        3,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });
  });

  describe("Conjured items", () => {
    it("should degrade twice as fast", () => {
      const rose = buildRose(new Item("Conjured Mana Cake", 3, 6));
      expectDiff(
        -2,
        () => rose.items[0].quality,
        () => rose.updateQuality()
      );
    });
  });
});
