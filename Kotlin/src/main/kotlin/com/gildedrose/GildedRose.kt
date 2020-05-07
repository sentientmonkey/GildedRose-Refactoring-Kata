package com.gildedrose

class GildedRose(var items: Array<Item>) {
    fun updateQuality() {
        items = items.map { oldItem ->
            val item = when {
                isLegendary(oldItem) -> LegendaryItem(oldItem)
                isAgedBrie(oldItem) -> AgedBrie(oldItem)
                isBackstagePass(oldItem) -> BackStagePass(oldItem)
                else -> BasicItem(oldItem)
            }

            if (!isAgedBrie(item) && !isBackstagePass(item)) {
                if (aboveMinimumQuality(item)) {
                    item.decreaseQuality()
                }
            } else {
                if (belowMaximumQuality(item)) {
                    item.increaseQuality()

                    if (isBackstagePass(item)) {
                        if (expiresIn(item, 11)) {
                            if (belowMaximumQuality(item)) {
                                item.increaseQuality()
                            }
                        }

                        if (expiresIn(item, 6)) {
                            if (belowMaximumQuality(item)) {
                                item.increaseQuality()
                            }
                        }
                    }
                }
            }

            item.age()

            if (isExpired(item)) {
                if (!isAgedBrie(item)) {
                    if (!isBackstagePass(item)) {
                        if (aboveMinimumQuality(item)) {
                            item.decreaseQuality()
                        }
                    } else {
                        halfQuality(item)
                    }
                } else {
                    if (belowMaximumQuality(item)) {
                        item.increaseQuality()
                    }
                }
            }

            item
        }.toTypedArray()
    }

    open class BasicItem(item: Item) : Item(item.name, item.sellIn, item.quality) {
        open fun increaseQuality() {
            quality += 1
        }

        open fun decreaseQuality() {
            quality -= 1
        }

        open fun age() {
            sellIn -= 1
        }
    }

    class LegendaryItem(item: Item) : BasicItem(item) {
        override fun increaseQuality() = Unit
        override fun decreaseQuality() = Unit
        override fun age() = Unit
    }

    class BackStagePass(item: Item) : BasicItem(item)
    class AgedBrie(item: Item) : BasicItem(item)

    private fun isBackstagePass(item: Item) = item.name == "Backstage passes to a TAFKAL80ETC concert"
    private fun isAgedBrie(item: Item) = item.name == "Aged Brie"
    private fun isLegendary(item: Item) = item.name == "Sulfuras, Hand of Ragnaros"

    private fun halfQuality(item: Item) {
        item.quality = item.quality - item.quality
    }

    private fun aboveMinimumQuality(item: Item) = item.quality > 0
    private fun isExpired(item: Item) = item.sellIn < 0
    private fun belowMaximumQuality(item: Item) = item.quality < 50
    private fun expiresIn(item: Item, days: Int) = item.sellIn < days
}

