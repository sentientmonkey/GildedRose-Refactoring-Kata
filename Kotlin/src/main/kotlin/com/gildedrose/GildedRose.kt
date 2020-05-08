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

            item.decreaseQuality()

            item.age()

            if (item.isExpired()) {
                item.decreaseQuality()
            }

            item
        }.toTypedArray()
    }

    open class BasicItem(item: Item) : Item(item.name, item.sellIn, item.quality) {
        private fun belowMaximumQuality() = quality < 50
        private fun aboveMinimumQuality() = quality > 0

        open fun increaseQuality() {
            if (belowMaximumQuality()) {
                quality += 1
            }
        }

        open fun decreaseQuality() {
            if (aboveMinimumQuality()) {
                quality -= 1
            }
        }

        open fun age() {
            sellIn -= 1
        }

        open fun isExpired() = sellIn < 0
    }

    class LegendaryItem(item: Item) : BasicItem(item) {
        override fun increaseQuality() = Unit
        override fun decreaseQuality() = Unit
        override fun age() = Unit
    }


    class AgedBrie(item: Item) : BasicItem(item) {
        override fun increaseQuality() {
            super.decreaseQuality()
        }

        override fun decreaseQuality() {
            super.increaseQuality()
        }
    }

    class BackStagePass(item: Item) : BasicItem(item) {
        private fun expiresIn(days: Int) = sellIn <= days

        override fun decreaseQuality() {
            if (expiresIn(0)) {
                quality = 0
                return
            }

            super.increaseQuality()
            if (expiresIn(10)) {
                super.increaseQuality()
            }

            if (expiresIn(5)) {
                super.increaseQuality()
            }
        }
    }

    private fun isBackstagePass(item: Item) = item.name == "Backstage passes to a TAFKAL80ETC concert"
    private fun isAgedBrie(item: Item) = item.name == "Aged Brie"
    private fun isLegendary(item: Item) = item.name == "Sulfuras, Hand of Ragnaros"
}

