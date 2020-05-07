package com.gildedrose

class GildedRose(var items: Array<Item>) {
    fun updateQuality() {
        items = items.map { oldItem ->
            val item = BasicItem(oldItem.name, oldItem.sellIn, oldItem.quality)

            if (!isAgedBrie(item) && !isBackstagePass(item)) {
                if (aboveMinimumQuality(item)) {
                    if (!isLegendary(item)) {
                        item.decreaseQuality()
                    }
                }
            } else {
                if (aboveMaximumQuality(item)) {
                    item.increaseQuality()

                    if (isBackstagePass(item)) {
                        if (expiresIn(item, 11)) {
                            if (aboveMaximumQuality(item)) {
                                item.increaseQuality()
                            }
                        }

                        if (expiresIn(item, 6)) {
                            if (aboveMaximumQuality(item)) {
                                item.increaseQuality()
                            }
                        }
                    }
                }
            }

            if (!isLegendary(item)) {
                item.age()
            }

            if (isExpired(item)) {
                if (!isAgedBrie(item)) {
                    if (!isBackstagePass(item)) {
                        if (aboveMinimumQuality(item)) {
                            if (!isLegendary(item)) {
                                item.decreaseQuality()
                            }
                        }
                    } else {
                        halfQuality(item)
                    }
                } else {
                    if (aboveMaximumQuality(item)) {
                        item.increaseQuality()
                    }
                }
            }

            item
        }.toTypedArray()
    }

    class BasicItem(name: String, sellIn: Int, quality: Int) : Item(name, sellIn, quality) {
        fun increaseQuality() {
            quality += 1
        }

        fun decreaseQuality() {
            quality -= 1
        }

        fun age() {
            sellIn -= 1
        }
    }

    private fun isBackstagePass(item: Item) = item.name == "Backstage passes to a TAFKAL80ETC concert"
    private fun isAgedBrie(item: Item) = item.name == "Aged Brie"
    private fun isLegendary(item: Item) = item.name == "Sulfuras, Hand of Ragnaros"

    private fun halfQuality(item: Item) {
        item.quality = item.quality - item.quality
    }

    private fun aboveMinimumQuality(item: Item) = item.quality > 0
    private fun isExpired(item: Item) = item.sellIn < 0
    private fun aboveMaximumQuality(item: Item) = item.quality < 50
    private fun expiresIn(item: Item, days: Int) = item.sellIn < days
}

