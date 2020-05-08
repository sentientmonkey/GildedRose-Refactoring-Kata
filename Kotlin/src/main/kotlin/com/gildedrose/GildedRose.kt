package com.gildedrose

class GildedRose(var items: Array<Item>) {
    fun updateQuality() {
        items.forEach { oldItem ->
            val item = when {
                oldItem.name == "Sulfuras, Hand of Ragnaros" -> LegendaryItem(oldItem)
                oldItem.name == "Aged Brie" -> AgedBrie(oldItem)
                oldItem.name == "Backstage passes to a TAFKAL80ETC concert" -> BackStagePass(oldItem)
                oldItem.name.contains("Conjured") -> ConjuredItem(oldItem)
                else -> BasicItem(oldItem)
            }

            item.updateQuality()
            item.age()

            if (item.isExpired()) {
                item.updateQuality()
            }

            item.copyInto(oldItem)
        }
    }

    open class BasicItem(item: Item) : Item(item.name, item.sellIn, item.quality) {
        fun copyInto(item: Item) {
            item.sellIn = sellIn
            item.quality = quality
            item.name = name
        }

        private fun belowMaximumQuality() = quality < 50
        private fun aboveMinimumQuality() = quality > 0

        fun increaseQuality() {
            if (belowMaximumQuality()) {
                quality += 1
            }
        }

        fun decreaseQuality() {
            if (aboveMinimumQuality()) {
                quality -= 1
            }
        }

        open fun updateQuality() = decreaseQuality()

        open fun age() {
            sellIn -= 1
        }

        open fun isExpired() = sellIn < 0
    }

    class LegendaryItem(item: Item) : BasicItem(item) {
        override fun updateQuality() = Unit
        override fun age() = Unit
    }

    class AgedBrie(item: Item) : BasicItem(item) {
        override fun updateQuality() {
            super.increaseQuality()
        }
    }

    class BackStagePass(item: Item) : BasicItem(item) {
        private fun expiresIn(days: Int) = sellIn <= days

        override fun updateQuality() {
            if (isExpired()) {
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

    class ConjuredItem(item: Item) : BasicItem(item) {
        override fun updateQuality() {
            super.decreaseQuality()
            super.decreaseQuality()
        }
    }
}

