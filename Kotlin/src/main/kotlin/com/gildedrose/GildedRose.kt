package com.gildedrose

class GildedRose(var items: Array<Item>) {
    fun updateQuality() {
        items.forEach { item ->
            if (!isAgedBrie(item) && !isBackstagePass(item)) {
                if (aboveMinimumQuality(item)) {
                    if (!isLegendary(item)) {
                        decreaseQuality(item)
                    }
                }
            } else {
                if (aboveMaximumQuality(item)) {
                    increaseQuality(item)

                    if (isBackstagePass(item)) {
                        if (expiresIn(item, 11)) {
                            if (aboveMaximumQuality(item)) {
                                increaseQuality(item)
                            }
                        }

                        if (expiresIn(item, 6)) {
                            if (aboveMaximumQuality(item)) {
                                increaseQuality(item)
                            }
                        }
                    }
                }
            }

            if (!isLegendary(item)) {
                age(item)
            }

            if (isExpired(item)) {
                if (!isAgedBrie(item)) {
                    if (!isBackstagePass(item)) {
                        if (aboveMinimumQuality(item)) {
                            if (!isLegendary(item)) {
                                decreaseQuality(item)
                            }
                        }
                    } else {
                        halfQuality(item)
                    }
                } else {
                    if (aboveMaximumQuality(item)) {
                        increaseQuality(item)
                    }
                }
            }
        }
    }

    private fun isBackstagePass(item: Item) = item.name == "Backstage passes to a TAFKAL80ETC concert"
    private fun isAgedBrie(item: Item) = item.name == "Aged Brie"
    private fun isLegendary(item: Item) = item.name == "Sulfuras, Hand of Ragnaros"
    private fun increaseQuality(item: Item) {
        item.quality = item.quality + 1
    }

    private fun decreaseQuality(item: Item) {
        item.quality = item.quality - 1
    }

    private fun halfQuality(item: Item) {
        item.quality = item.quality - item.quality
    }

    private fun age(item: Item) {
        item.sellIn = item.sellIn - 1
    }

    private fun aboveMinimumQuality(item: Item) = item.quality > 0
    private fun isExpired(item: Item) = item.sellIn < 0
    private fun aboveMaximumQuality(item: Item) = item.quality < 50
    private fun expiresIn(item: Item, days: Int) = item.sellIn < days
}

